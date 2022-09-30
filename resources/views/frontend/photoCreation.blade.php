@section('photoCreation')
<div class="text-tool">
    <div>
        <input type="text" class="text form-control" placeholder="Text Here">
        <select class="form-select form-select-sm font_select" id="font-family" aria-label=".form-select-sm example">

        </select>
        <div class="font-style">
            <span class="bold">B</span>
            <span class="italic">I</span>
        </div>
        <div class="colorPicker fontColorPicker" value="#4700B3"></div>
        <div class="colorPicker backColorPicker" value="#4700B3"></div>

        <button type="button" class="btn btn-primary btn-sm addText">Add</button>
    </div>
</div>
<div class="blur-tool">
    <div>
        <img src="/images/blur.png" alt="">
        <input type="range" class="form-range blurRange" min="0" max="1.5" step="0.1" value="0">
    </div>
</div>
<div class="photo-container">
    <canvas id="back_canvas">
    </canvas>
    <div class="emojis-tool">
        <div class="photo-price"></div>
        <select class="form-select form-select-sm price-list preview-paid" aria-label="Default select example">
            <option value="0" selected>Preview</option>
            <option value="-2">Paid</option>
        </select>
        <div class="price_type">
            <div class="form-group paid_type">
                <label>Mode</label>
                <select class="form-select form-select-sm price-list emojis-price d-none" aria-label="Default select example">
                    <option value="0">Free</option>
                    <option value="-1">Sticky</option>
                    <option value="1">Paid</option>
                </select>
            </div>
            <div class="form-group paid_value">
                <label>Price ($)</label>
                <input type="number" min=1 max=100 class="form-control form-control-sm" />
            </div>
        </div>
        <div class="btn background_btn">
            <input id="input_file" class="input-file" type="file">
            <img id="input_btn" class="" src="/images/gallery.png"></button>
        </div>
        <div class="btn emoji_btn">
            <div id="create_emoji_button" class="emoji-button"></div>
        </div>
        <div id="input_emoji_btn" class="btn add_photo_btn">
            <input class="input-file layer_photo_btn" type="file" id="input_emoji_select">
            <img class="" src="/images/add_photo.png"></button>
        </div>
        <div class="btn text_btn">
            <img src="/images/text.png" alt="Text">
        </div>
        <div class="btn blur_btn">
            <img src="/images/blur.png" alt="Blur">
        </div>
        <div class="btn lock-tool unlock lock_btn">
            <a class="icon-btn btn-outline-success outside" href="#">
                <i class="fa fa-lock"></i>
                <i class="fa fa-unlock-alt"></i>
            </a>
        </div>
        <div class="btn reset_btn">
            <img class="" id="input_reset" src="/images/reset.png"></button>
        </div>
        <div class="btn">
            <button class="submit icon-btn btn-primary" data-bs-dismiss="modal" id="save-photo">
                <img src="/images/save.png" alt="Save">
            </button>
        </div>
        <div class="btn">
            <button class="submit icon-btn btn-primary" data-bs-dismiss="modal" id="send-photo">
                <img src="/images/send.png" alt="Send">
            </button>
        </div>
    </div>
</div>
@endsection

@section('media')
    <div class="form-group">
        <div class="dropzone dz-clickable" id="dropzoneForm"></div>
    </div>
    <div class="form-group mt-2">
        <button type="button" class="btn btn-primary btn-sm float-end send_attach_btn">Send</button>
    </div>
@endsection