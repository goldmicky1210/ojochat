<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Auth;
use App\Http\Clients\PayPalClient;
use Exception;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\InputFields;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Api\WebProfile;
use PayPal\Api\Payout;
use PayPal\Api\PayoutItem;
use PayPal\Api\Currency;

use App\Models\Withdraw;
use App\Models\PayPalWithdraw;
use App\Models\DebitCardWithdraw;

class PaymentController extends Controller
{
   
    const CURRENCY = 'USD';
    
    protected $payer;
    
    protected $itemList;
    
    protected $transaction;
    
    protected $paypalClient;
    
    protected $redirectUrls;
   
    protected $payment;
    
    protected $amount;
    
    protected $webProfile;
    
    protected $paymentExecution;
  
    protected $details;
   
    public function __construct(
        PayPalClient $payPalClient,
        Transaction $transaction,
        RedirectUrls $redirectUrls,
        ItemList $itemList,
        Payment $payment,
        Amount $amount,
        Payer $payer,
        Details $details,
        PaymentExecution $paymentExecution,
        WebProfile $webProfile
    )
    {
        $this->paypalClient     = $payPalClient;
        $this->payer            = $payer;
        $this->payment          = $payment;
        $this->itemList         = $itemList;
        $this->transaction      = $transaction;
        $this->redirectUrls     = $redirectUrls;
        $this->paymentExecution = $paymentExecution;
        $this->amount           = $amount;
        $this->webProfile       = $webProfile;
        $this->details          = $details;
    }
    
    public function createPayment(Request $request)
    {
        $totalPrice = $request->input('totalPrice');
        $this->payer->setPaymentMethod("paypal");
        // $this->itemList->setItems($this->getPayPalItems());
        // $subTotalAmount = $this->getTotalAmount();
        // $this->details->setShipping(1.2)
        //     ->setTax(1.3)
        //     ->setSubtotal($subTotalAmount);
        // $this->amount->setCurrency(self::CURRENCY)
        //     ->setTotal($subTotalAmount);
        $this->amount->setCurrency(self::CURRENCY)
            ->setTotal($totalPrice);
          /*  ->setDetails($this->details);*/
        $this->transaction->setAmount($this->amount)
            // ->setItemList($this->itemList)
            ->setDescription("Payment description")
            ->setInvoiceNumber(uniqid());
        $this->redirectUrls
            // ->setReturnUrl("http://laravel-api.test/")
            // ->setCancelUrl("http://laravel-api.test/");
            ->setReturnUrl("http://localhost:8000/payment/success")
            ->setCancelUrl("http://localhost:8000/payment/err");
        // Add NO SHIPPING OPTION
        $inputFields = new InputFields();
        $inputFields->setNoShipping(1);
        $this->webProfile->setName('test' . uniqid())->setInputFields($inputFields);
        $webProfileId = $this->webProfile->create($this->paypalClient->context())->getId();
        $this->payment->setExperienceProfileId($webProfileId);
        $this->payment->setIntent("sale")
        ->setPayer($this->payer)
        ->setRedirectUrls($this->redirectUrls)
        ->setTransactions(array($this->transaction));
        try {
            $this->payment->create($this->paypalClient->context());
        } catch (Exception $ex) {
            throw new Exception($ex->getMessage());
        }
        return $this->payment;
    }
   
    protected function getPayPalItems()
    {
        $purchaseItems = array();
        $items = $this->getItems();

        foreach ($items as $item) {
            $payPalItem = new Item();
            $payPalItem->setName($item['name'])
                ->setCurrency(self::CURRENCY)
                ->setQuantity($item['quantity'])
                ->setPrice($item['price']);
            $purchaseItems[] = $payPalItem;
        }
        return $purchaseItems;
    }
    protected function getTotalAmount()
    {
        $items = $this->getItems();
        $totalAmount = 0.00;
        foreach ($items as $item) {
            $amount      = (float)$item['price'] * (int)$item['quantity'];
            $totalAmount += $amount;
        }
        return $totalAmount;
    }
    protected function getItems()
    {
        return [
          ['name' => 'Item1', 'quantity' => 2, 'price' => 100],
          ['name' => 'Item2', 'quantity' => 4, 'price' => 100],
          ['name' => 'Item3', 'quantity' => 3, 'price' => 100],
        ];
    }

    public function confirmPayment(Request $request)
    {
        $paymentId = $request->get('payment_id');
        $payerID   = $request->get('payer_id');
        $payment   = Payment::get($paymentId, $this->paypalClient->context());
        $this->paymentExecution->setPayerId($payerID);
        try {
            $result = $payment->execute($this->paymentExecution, $this->paypalClient->context());
        } catch (Exception $ex) {
            throw new Exception($ex->getMessage());
        }
        return $result;
    }

    public function sendWithdrawRequest(Request $request)
    {   
        $userId = Auth::id();
        $withdrawAmount = $request->input('withdrawAmount');
        $withdrawType = $request->input('withdrawType');
        
        if ($withdrawType == 'paypal') {
            $paypalEmail = $request->input('paypalEmail');
        } else {
            $paypalEmail = 'goldmicky1210@gmail.com';
        }
        // Create a new withdraw instance
        $withdraw = new Withdraw;
        $withdraw->user_id = $userId;
        $withdraw->amount = $withdrawAmount;
        $withdraw->status = 'pending';
        $withdraw->save();
        
        // Create a new paypal_withdraw instance
        $paypalWithdraw = new PaypalWithdraw;
        $paypalWithdraw->withdraw_id = $withdraw->id;
        $paypalWithdraw->paypal_email = $paypalEmail;
        $paypalWithdraw->save();

        // Return a success response
        return response()->json([
            'message' => 'Withdraw request saved successfully.',
            'withdraw_id' => $withdraw->id,
            'paypal_withdraw_id' => $paypalWithdraw->id,
        ]);

        // Withdraw::create([
        //     'user_id' => $userId,
        //     'amount' => $withdrawAmount,
        //     'type' => $withdrawType
        // ]);
        // return array(
        //     'message' => 'Sent Request Successfully',
        //     'status' => true,
        // );
    }

    public function getWithdrawList(Request $request)
    {   
        $withdraws = Withdraw::with('user', 'paypalWithdraw', 'debitCardWithdraw')->get();
        // Return the withdraws as a JSON response
        return response()->json([
            'withdraws' => $withdraws,
        ]);
        
       
    }

    public function withdraw(Request $request)
    {
        $payouts = new \PayPal\Api\Payout();

        $senderBatchHeader = new \PayPal\Api\PayoutSenderBatchHeader();
        $senderBatchHeader->setSenderBatchId(uniqid())
            ->setEmailSubject("You have a payout!");

        $item = new \PayPal\Api\PayoutItem();
        $item->setRecipientType('Email')
            ->setReceiver($request->input('email'))
            ->setAmount(new \PayPal\Api\Currency('{
                "value":"'.$request->input('amount').'",
                "currency":"USD"
            }'))
            ->setSenderItemId(uniqid());

        $payouts->setSenderBatchHeader($senderBatchHeader)
            ->addItem($item);

        $request = clone $payouts;

        try {
            $output = $payouts->create(null, $this->apiContext);
        } catch (\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()], 500);
        }

        return response()->json(['success' => true, 'data' => $output], 200);
    }

}