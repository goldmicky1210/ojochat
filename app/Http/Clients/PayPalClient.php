<?php
namespace App\Http\Clients;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
class PayPalClient
{
    /**
     * Returns PayPal HTTP context instance with environment that has access
     * credentials context. Use this instance to invoke PayPal APIs, provided the
     * credentials have access.
     */
    public function context()
    {
        return new ApiContext($this->credentials());
    }
    /**
     * Set up and return PayPal PHP SDK environment with PayPal access credentials.
     *
     * Paste your client_id and client secret as below
     */
    protected function credentials()
    {
        $clientId     = 'Ae5iKpz9uVQtYf-5eto3sWE5d-nJGq2BVIw63cqg4UJZP4EwDjKh1gGvC2zLpfyZJoKAdQGZdx7iS7J7';
        $clientSecret = 'EG4lBROZ5qsT4YEZOhqHkm-N7HGPuZV7D2XJjSsapWFrdpU8GO5f375IGuaIxkDqjzquZqZmV7tkBUzN';
        return new OAuthTokenCredential($clientId, $clientSecret);
    }
}