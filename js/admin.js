jQuery(document).ready(function ($) {
    let file_frame;

    $(document).on('click', '.waorder a.gallery-add', function (e) {
        e.preventDefault();

        if (file_frame)
            file_frame.close();

        file_frame = wp.media.frames.file_frame = wp.media({
            title: $(this).data('uploader-title'),
            button: {
                text: $(this).data('uploader-button-text'),
            },
            multiple: true
        });

        file_frame.on('select', function () {
            let listIndex = $('#waorder-gallery-metabox-list li').index($('#waorder-gallery-metabox-list li:last')),
            selection = file_frame.state().get('selection'),
            url = '';

            selection.map(function (attachment, i) {
                attachment = attachment.toJSON(),
                index = listIndex + (i + 1);
                if( typeof attachment.sizes.thumbnail !== 'undefined'){
                    url = attachment.sizes.thumbnail.url;
                }else{
                    url = attachment.url;
                }

                $('#waorder-gallery-metabox-list').append('<li><input type="hidden" name="waorder_gallery_ids[' + index + ']" value="' + attachment.id + '"><img class="image-preview" src="' + url + '"><div class="remove-image"><span class="dashicons dashicons-trash"></span></div></li>');
            });
        });

        // makeSortable();

        file_frame.open();

    });

    function resetIndex() {
        jQuery('#waorder-gallery-metabox-list li').each(function (i) {
            $(this).find('input:hidden').attr('name', 'waorder_gallery_ids[' + i + ']');
        });
    }

    // function makeSortable() {
    //     jQuery('#waorder-gallery-metabox-list').sortable({
    //         opacity: 0.6,
    //         stop: function () {
    //             resetIndex();
    //         }
    //     });
    // }

    $(document).on('click', '.waorder .remove-image', function (e) {
        e.preventDefault();

        $(this).parents('li').animate({opacity: 0}, 200, function () {
            $(this).remove();
            resetIndex();
        });
    });

    //makeSortable();


    $('.rajaongkirtype').on('change', function(){
        let val = $(this).val();

        if( val == 'starter' ){
            $('.basic').prop('checked', false);
            $('.basic').prop('disabled', true);

            $('.pro').prop('checked', false);
            $('.pro').prop('disabled', true);
        }else if( val == 'basic' ){
            $('.basic').prop('disabled', false);

            $('.pro').prop('checked', false);
            $('.pro').prop('disabled', true);
        }else{
            $('.basic').prop('disabled', false);

            $('.pro').prop('disabled', false);
        }
    })
});

function customerFollowUp(nomor){

    let wa = 'https://web.whatsapp.com/send';

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        wa = 'whatsapp://send';
	}

    let url = wa + '?phone=' + nomor;

    let w = 960,h = 540,left = Number((screen.width / 2) - (w / 2)),top = Number((screen.height / 2) - (h / 2)),popupWindow = window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    popupWindow.focus();
    return false;
}

var metaImageFrame;
function waorderMediaOpen(ini){

    let selector = jQuery(ini).attr('selector'),
    preview = jQuery(ini).attr('preview');

    // Sets up the media library frame
    metaImageFrame = wp.media.frames.metaImageFrame = wp.media({
        title: jQuery(ini).attr('data-uploader-title'),
        button: {
            text:  jQuery(ini).attr('data-uploader-button-text'),
        },
    });

    // Runs when an image is selected.
    metaImageFrame.on('select', function() {

        // Grabs the attachment selection and creates a JSON representation of the model.
        var media_attachment = metaImageFrame.state().get('selection').first().toJSON();

        // Sends the attachment URL to our custom image input field.
        jQuery(selector).val(media_attachment.url);
        jQuery(preview).attr('src', media_attachment.url);

    });

    // Opens the media library frame.
    metaImageFrame.open();
}

function waorderDynamicInputAdd(ini, id){

    let fields = ini.getAttribute('data-fields');
    console.log(fields);

    let box = document.getElementById(id);
    // let inputbox = box.firstElementChild.cloneNode(true);
    // let inputs = inputbox.querySelectorAll('input');
    // for (var i = 0; i < inputs.length; i++) {
    //     inputs[i].value = '';
    // }
    let div = document.createElement('div');
    div.className = 'customvariablefieldbox';
    div.innerHTML = fields;
    box.appendChild(div);
}

function waorderDynamicInputDelete(ini){

    let inputbox = ini.parentNode;
    inputbox.parentNode.removeChild(inputbox);

}


function waorderOpenTab(evt, targetID) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(targetID).style.display = "block";
    evt.currentTarget.className += " active";
}
