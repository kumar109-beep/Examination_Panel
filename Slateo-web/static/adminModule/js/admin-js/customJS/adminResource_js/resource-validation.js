function checkResourceEmail() {
    var emailData = $('#resourceEmailID').val();
    var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailData.match(mailformat)) {
        $('#resEmailValidation').text('Valid email');
        $('#resEmailValidation').css('color','green');
        $('#addResourceData').attr('disabled',false);
    }
    else {
        $('#resEmailValidation').text('Invalid email');
        $('#resEmailValidation').css('color','red');
        $('#addResourceData').attr('disabled',true);        
    }
}
function checkResourceContact(){
    var data = $('#phone1').val();
    if(data.length != 10){
        $('#ResourceContactValidat').text('Invalid Contact');
        $('#ResourceContactValidat').css('color','red');
        $('#addResourceData').attr('disabled',true);
    }else{
        $('#ResourceContactValidat').text('Valid Contact');
        $('#ResourceContactValidat').css('color','green');
        $('#addResourceData').attr('disabled',false);
    }
}

function checkUserAvailability(thisTxt) {
    var check = '';
    var fieldname = thisTxt['name'];
    if (fieldname == 'employeeCode') {
        check = 'EmployeeCode';
    } else if (fieldname == 'emailID') {
        check = 'emailID';
        var emailData = $('#resourceEmailID').val();
        var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailData.match(mailformat)) {
            $('#empEmailAlreadyExist').text('Valid');
            $('#empEmailAlreadyExist').css('color', 'green');
            $('#addResourceData').attr('disabled', false);
        }
        else {
            $('#empEmailAlreadyExist').text('Invalid');
            $('#empEmailAlreadyExist').css('color', 'red');
            $('#addResourceData').attr('disabled', true);
            return false;
        }
    } else if (fieldname == 'mobileNumber') {
        check = 'mobileNumber';
         var data = $('#phone1').val();
    if (data.length != 10) {
        $('#empMobileAlreadyExist').text('Invalid');
        $('#empMobileAlreadyExist').css('color', 'red');
        $('#addResourceData').attr('disabled', true);
        return false;
    } else {
        $('#empMobileAlreadyExist').text('Valid');
        $('#empMobileAlreadyExist').css('color', 'green');
        $('#addResourceData').attr('disabled', false);
    }
    }

    console.log('check value : ', check);
    console.log('----------------------------')

    $.ajax({
        type: 'GET',
        url: "/validateResourceUserAvailability",
        data: { 'check': check, 'valiadteString': thisTxt['value'].trim() },
        success: function (response) {
             console.log(response['resultData'],response['resultData'].length);
            if (fieldname == 'employeeCode' && response['resultData'].length > 0) {
                $('#empCodeAlreadyExist').css('display', '');
                $('#addResourceData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'employeeCode' && response['resultData'].length == 0) {
                $('#empCodeAlreadyExist').css('display', 'none');
                $('#addResourceData').attr('disabled',false);
                return false;
            }
            if (fieldname == 'emailID' && response['resultData'].length > 0) {
                $('#empEmailAlreadyExist').text('');
                $('#empEmailAlreadyExist').css('color', 'red');
                $('#empEmailAlreadyExist').text('Email already exist!');
                $('#addResourceData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'emailID' && response['resultData'].length == 0) {
                $('#empEmailAlreadyExist').text('');
                $('#empEmailAlreadyExist').css('color', 'green');
                $('#addResourceData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'mobileNumber' && response['resultData'].length > 0) {
                $('#empMobileAlreadyExist').text('');
                $('#empMobileAlreadyExist').css('color', 'red');
                $('#empMobileAlreadyExist').text('Contact already exist!');
                $('#addResourceData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'mobileNumber' && response['resultData'].length == 0) {
                $('#empMobileAlreadyExist').text('');
                $('#empMobileAlreadyExist').css('color', 'green');
                $('#addResourceData').attr('disabled',false);
                return false;
            }
        }
    });

}