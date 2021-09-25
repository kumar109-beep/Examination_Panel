function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function updatePassword(){
    $('#updateBtn').attr('disabled',true);
                    
    $('#updateBtn').html('Updating <span class="spinner-border spinner-border-sm"></span>');

    $('#spinUpdateLoader').css('display','');
    $('#cancelBtn').css('display','none');
    console.log('password updating...');

    var oldPassword = $('#exampleInputPassword').val().trim();
    var newPassword = $('#exampleInputPassword2').val().trim();

    $('#exampleInputPassword').attr('readonly',true);
    $('#exampleInputPassword1').attr('readonly',true);
    $('#exampleInputPassword2').attr('readonly',true);

    // =======================   AJAX call for password Update   =========================================
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "updateUserPassword",
        headers: { 'X-CSRFToken': csrftoken },
        data: {'old_password': oldPassword, 'new_password': newPassword},
        success: function (response) {
            console.log('student data response', response);
            if('status' in response['resultData']){
                if(response['resultData']['message'] == 'Password updated successfully' && response['resultData']['code'] == 200){
                    $('#data').html('<i class="far fa-check-circle"></i> Password updated successfully');
                    $('#data').css('color','green');
                    $('#updateBtn').html('Update');
                    $('#updateBtn').attr('disabled',false);
                    $('#cancelBtn').css('display','');
    
                    $('#exampleInputPassword').val('');
                    $('#exampleInputPassword1').val('');
                    $('#exampleInputPassword2').val('');

                    $('#exampleInputPassword1').css('border','');
                    $('#exampleInputPassword2').css('border','');
    
                    $('#exampleInputPassword').attr('readonly',false);
                    $('#exampleInputPassword1').attr('readonly',true);
                    $('#exampleInputPassword2').attr('readonly',true);
                }
            }else{
                $('#data').html('<i class="far fa-times-circle"></i> Wrong old password! Try Again');
                $('#data').css('color','red');
                $('#updateBtn').html('Update');
                $('#updateBtn').attr('disabled',false);
                $('#cancelBtn').css('display','');

                $('#exampleInputPassword').val('');
                $('#exampleInputPassword1').val('');
                $('#exampleInputPassword2').val('');

                $('#exampleInputPassword1').css('border','');
                $('#exampleInputPassword2').css('border','');

                $('#exampleInputPassword').attr('readonly',false);
                $('#exampleInputPassword1').attr('readonly',true);
                $('#exampleInputPassword2').attr('readonly',true);
            }
        }
    });
    // ===================================================================================================
}

function checkOldPassword(){
    var oldPassword = $('#exampleInputPassword').val().trim();
    if(oldPassword.length >= 1){
        $('#exampleInputPassword1').attr('readonly',false);
        $('#exampleInputPassword1').css('cursor','');
    }else{
        $('#exampleInputPassword1').attr('readonly',true);
        $('#exampleInputPassword2').attr('readonly',true);

        $('#exampleInputPassword1').val('');
        $('#exampleInputPassword2').val('');
        $('#exampleInputPassword1').css('cursor','not-allowed');
        $('#exampleInputPassword2').css('cursor','not-allowed');

        $('#exampleInputPassword1').css('border','');
        $('#exampleInputPassword2').css('border','');

        $('#updateBtn').attr('disabled',true);
        $('#updateBtn').css('cursor','not-allowed');
    }
}

function checkNewPassword(){
    var newPassword = $('#exampleInputPassword1').val().trim();
    var re_enterNewPassword = $('#exampleInputPassword2').val().trim();

    if(newPassword.length >= 1){
        $('#exampleInputPassword2').attr('readonly',false);
        $('#exampleInputPassword2').css('cursor','');
    }if(newPassword.length < 1){
        $('#exampleInputPassword2').attr('readonly',true);
        $('#exampleInputPassword2').val('');
        $('#exampleInputPassword2').css('cursor','not-allowed');
    }if(newPassword == re_enterNewPassword){
        $('#exampleInputPassword1').css('border','1px solid green');
        $('#exampleInputPassword2').css('border','1px solid green');
        $('#updateBtn').attr('disabled',false);
        $('#updateBtn').css('cursor','');
    }if(newPassword != re_enterNewPassword){
        $('#exampleInputPassword1').css('border','1px solid red');
        $('#exampleInputPassword2').css('border','1px solid red');
        $('#updateBtn').attr('disabled',true);
        $('#updateBtn').css('cursor','not-allowed');
    }
}


function CancelBtn(){
    $('#exampleInputPassword').val('');
    $('#exampleInputPassword1').val('');
    $('#exampleInputPassword2').val('');
    $('#data').html('');

    $('#exampleInputPassword1').css('border','');
    $('#exampleInputPassword2').css('border','');

    $('#exampleInputPassword1').css('cursor','not-allowed');
    $('#exampleInputPassword2').css('cursor','not-allowed');

    $('#exampleInputPassword1').attr('readonly',true);
    $('#exampleInputPassword2').attr('readonly',true);

    $('#updateBtn').attr('disabled',true);
    $('#updateBtn').css('cursor','not-allowed');
}


function showPassword(){
    const cb = document.getElementById('togglePassword');
    console.log(cb.checked);
    if(cb.checked){
        $('#exampleInputPassword').attr('type','text');
        $('#exampleInputPassword1').attr('type','text');
        $('#exampleInputPassword2').attr('type','text');
    }else{
        $('#exampleInputPassword').attr('type','password');
        $('#exampleInputPassword1').attr('type','password');
        $('#exampleInputPassword2').attr('type','password');
    }
}