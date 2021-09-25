// -------------------------------------------    validateRegistrationNumber  ---------------------------------------------------------------

function validateRegistrationNumber() {
    var data = $('#registrationNumber').val();


}




$("input[name='emailID']").keyup(function () {
    var flag = ValidateEmail($(this).val());

    if (flag == true) {

        $('#showErrorEmail').hide();
    } else {
        $('#showErrorEmail').show();
    }
});


function checkStudentEmail(thistxt) {
    var parentEmail = $(thistxt).val()
    var studentEmail = $('#emailID').val()
    if (parentEmail.trim() == studentEmail.trim()) {
        $('#error_or_lable_parentEMail').html("<p style='color:red'>mail should be not same</p>");
    } else {
        $('#error_or_lable_parentEMail').html("Parent's Email ID");
    }
}







function allLetter(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    if (inputtxt.value.match(letters)) {
        return true;
    }
    else {
        alert("message");
        return false;
    }
}















function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}

$(function () {
    var todaysDate = new Date();

    var yesterday = convertDate(todaysDate);
    $("input[name='dateOfBirth']").attr("max", yesterday);
})


function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = (date.getDate() - 1).toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
}











// -------------------------------------------    validateFName  ----------------------------------------------------------------------------
function validateFName() {
    var data = $('#StudentFname').val();


    var regx = /^[A-Za-z]+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#StudentFname').css('display', 'none');
        } else {
            $('#StudentFname').css('display', '');
        }
    } else {
        $('#fNameErrorMsg').css('display', 'none');
    }
}

// -------------------------------------------    validateLName  ----------------------------------------------------------------------------
function validateLName() {
    var data = $('#StudentLname').val();

    var regx = /^[A-Za-z]+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#StudentLname').css('display', 'none');
        } else {
            $('#StudentLname').css('display', '');
        }
    } else {
        $('#lNameErrorMsg').css('display', 'none');
    }
}

// -------------------------------------------    validateParentName  -----------------------------------------------------------------------
function validateParentName() {
    var data = $('#guardianName').val();

    var regx = /^[A-Za-z & ' ']+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#guardianName').css('display', 'none');
        } else {
            $('#guardianName').css('display', '');
        }
    } else {
        $('#parentNameErrorMsg').css('display', 'none');
    }
}

// -------------------------------------------    validateEmail  ----------------------------------------------------------------------------
function validateEmail() {
    var data = $('#emailID').val();

    var regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.]{2,5})+\.([A-Za-z]{2,5})$/;

    if (data.length > 0) {
        if (data.match(regx)) {
            $('#emailID').css('display', 'none');
        } else {
            $('#emailID').css('display', '');
        }
    } else {
        $('#emailErrorMsg').css('display', 'none');
    }
}

// -------------------------------------------    validateContact  --------------------------------------------------------------------------
function validateContact() {
    var data = $('#phone1').val();
    // 
}

// -------------------------------------------    validateParentContact  --------------------------------------------------------------------
function validateParentContact() {
    var data = $('#phone2').val();
    // 
}

// -------------------------------------------    validateParentEmail  ----------------------------------------------------------------------
function validateParentEmail() {
    var data = $('#guardianEmail').val();

    var regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.]{2,5})+\.([A-Za-z]{2,5})$/;

    if (data.length > 0) {
        if (data.match(regx)) {
            $('#guardianEmail').css('display', 'none');
        } else {
            $('#guardianEmail').css('display', '');
        }
    } else {
        $('#parentEmailErrorMsg').css('display', 'none');
    }
}

// -------------------------------------------    validateCurrentAddress  -------------------------------------------------------------------
function validateCurrentAddress() {
    var data = $('#currentAddress').val();

}

// function isSame_Current_Adrr(thisTxt) {

//     var data1 = $('#isSame_Current_Adrr').text();
//     console.log(data1);
//      if (data1.checked == true) {
//          var data= document.getElementById("currentAddress").value;
//         var copydata = data;
//          document.getElementById("perm_address").value = copydata;
//      }
//      else if (data1.checked == false) {
//          document.getElementById("perm_address").value = '';
//      }
// }

// -------------------------------------------    validateCurrDistrict  ---------------------------------------------------------------------
function validateCurrDistrict() {
    var data = $('#studentDistrict').value;
    console.log(data);
    var regx = /^[A-Za-z]+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#studentDistrict').css('display', 'none');
        } else {
            $('#studentDistrict').css('display', '');
        }
    } else {
        $('#currDistrictErrorMsg').css('display', 'none');
    }

}

// -------------------------------------------    validateCurrPincode  ----------------------------------------------------------------------
function validateCurrPincode() {
    var data = $('#currentPincode').val();


}

// -------------------------------------------    validatePermAddress  ----------------------------------------------------------------------
function validatePermAddress() {
    var data = $('#perm_address').val();

}

// -------------------------------------------    validatePermDistrict  ---------------------------------------------------------------------
function validatePermDistrict() {
    var data = $('#permanentDistrict').val();
    var regx = /^[A-Za-z]+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#permanentDistrict').css('display', 'none');
        } else {
            $('#permanentDistrict').css('display', '');
        }
    } else {
        $('#permDistrictErrorMsg').css('display', 'none');
    }

}

// -------------------------------------------    validatePermPincode  ----------------------------------------------------------------------
function validatePermPincode() {
    var data = $('#permanentPincode').val();

}

// =========================================
function onlyNumberKey(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
}


// $('input[name="managerEmail"]').on('keypress', function (e) {
//     if (e.which == 32) {
//         console.log('Space Detected');
//         return false;
//     }
// })
// -------------------------------------------    VALIDATE FOR UNIQUE { username/email/contact }  -------------------------------------------
function checkUserAvailability(thisTxt) {
    var check = '';
    var fieldname = thisTxt['name'];
    if (fieldname == 'registrationNumber') {
        check = 'registrationNumber';
    } else if (fieldname == 'emailID') {
        check = 'emailID';
        var emailData = $('#emailID').val();
        var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailData.match(mailformat)) {
            $('#studentEmailAlreadyExist').text('Valid');
            $('#studentEmailAlreadyExist').css('color', 'green');
            $('#addStudentData').attr('disabled', false);
        }
        else {
            $('#studentEmailAlreadyExist').text('Invalid');
            $('#studentEmailAlreadyExist').css('color', 'red');
            $('#addStudentData').attr('disabled', true);
            return false;
        }
    } else if (fieldname == 'mobileNumber') {
        check = 'mobileNumber';
        var data = $('#phone1').val();
    if (data.length != 10) {
        $('#studentMobileAlreadyExist').text('Invalid');
        $('#studentMobileAlreadyExist').css('color', 'red');
        $('#addStudentData').attr('disabled', false);
    } else {
        $('#studentMobileAlreadyExist').text('Valid');
        $('#studentMobileAlreadyExist').css('color', 'green');
        $('#addStudentData').attr('disabled', false);
    }
    }

    console.log('check value : ', check);
    console.log('----------------------------')
    // $('#studentUsernameAlreadyExist').css('display', 'none');
    // $('#studentEmailAlreadyExist').css('display', 'none');
    // $('#studentMobileAlreadyExist').css('display', 'none');

    $.ajax({
        type: 'GET',
        url: "validateUserAvailability",
        data: { 'check': check, 'valiadteString': thisTxt['value'].trim() },
        success: function (response) {
            console.log(response['resultData'],response['resultData'].length);
            if (fieldname == 'registrationNumber' && response['resultData'].length > 0) {
                $('#studentUsernameAlreadyExist').text('display', '');
                $('#addStudentData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'registrationNumber' && response['resultData'].length == 0) {
                $('#studentUsernameAlreadyExist').css('display', 'none');
                $('#addStudentData').attr('disabled',false);
                return false;
            }
            if (fieldname == 'emailID' && response['resultData'].length > 0) {
                $('#studentEmailAlreadyExist').text('');
                $('#studentEmailAlreadyExist').css('color', 'red');
                $('#studentEmailAlreadyExist').text('Email already exist!');
                $('#addStudentData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'emailID' && response['resultData'].length == 0) {
                $('#studentEmailAlreadyExist').text('');
                $('#studentEmailAlreadyExist').css('color', 'green');
                $('#addStudentData').attr('disabled',false);
                return false;
            }
            if (fieldname == 'mobileNumber' && response['resultData'].length > 0) {
                $('#studentMobileAlreadyExist').text('');
                $('#studentMobileAlreadyExist').css('color', 'red');
                $('#studentMobileAlreadyExist').text('Contact already exist!');
                $('#addStudentData').attr('disabled',true);
                return false;
            }
            if (fieldname == 'mobileNumber' && response['resultData'].length == 0) {
                $('#studentMobileAlreadyExist').text('');
                $('#studentMobileAlreadyExist').css('color', 'green');
                $('#addStudentData').attr('disabled',false);
                return false;
            }
            // else {
            //     $('#studentUsernameAlreadyExist').css('display', 'none');
            //     $('#studentEmailAlreadyExist').css('display', 'none');
            //     $('#studentMobileAlreadyExist').css('display', 'none');
            //     $('#addStudentData').attr('disabled',false);

            //     return false;
            // }
        }
    });

}

// =================================================================================================================
// =============================================== CHECKBOX SELECTER AS SAME PARMANENT ADDRESS ==================================================================
function isSame_Current_Adrr() {
    var atLeastOneIsChecked = $('input[name="temp_vs_perm"]:checked').length > 0;
    if (atLeastOneIsChecked) {
        var currentAddress = $('#temp_address').val();
        var permdistrict = $('#temp_district').val();
        var permPincode = $('#currentPincode').val();
        var temp_country = $('select[name="temp_country"]').val();
        var temp_state = $('select[name="temp_state"]').val();
        $('#perm_address').val(currentAddress);
        $('#perm_district').val(permdistrict);
        $('#permanentPincode').val(permPincode);
        $('select[name="perm_country"]').val(temp_country);
        $('select[name="perm_country"]').selectpicker('refresh')
        $('select[name="perm_state"]').val(temp_state);
        $('select[name="perm_state"]').selectpicker('refresh')

    } else {
        $('#perm_address').val('');
        $('#perm_district').val('');
        $('#permanentPincode').val('');
        $('select[name="perm_country"]').val('Select');
        $('select[name="perm_country"]').selectpicker('refresh')
        $('select[name="perm_state"]').val('Select');
        $('select[name="perm_state"]').selectpicker('refresh')


    }
}

// =================================================================================================================
// ############################################################
// ######################  getCourseTyep ######################

function onChangeGetCourseType(thistxt) {
    var couseTypeID = $(thistxt).val();
    $('#subjectName').html('');
    $('#subjectName').selectpicker('refresh');
    $.ajax({
        type: 'GET',
        url: "chainedCourses",
        data: { courseTypeId: couseTypeID },
        success: function (response) {
            console.log(response['courseList']);
            var courseStr = ' <option value="" class="d-none"> Select Course</option>'
            if (response['courseList'].length > 0) {
                for (var i = 0; i < response['courseList'].length; i++) {
                    var data = '<option value = "' + response['courseList'][i]['id'] + '" > ' + response['courseList'][i]['courseName'] + '</option > ';
                    courseStr = courseStr + data;

                }
                $('#courseName').html('');
                $('#courseName').html(courseStr);
                $('#courseName').selectpicker('refresh');

            } else {
                var data = '<option value="">No Course Associated with this Course Type !</option>';
                $('#baseSelectOption').show();
                $('#courseName').html('');
                $('#courseName').html(data);
                $('#courseName').selectpicker('refresh');

            }
        }
    });
}
// =================================================================================================================
function onChangeCourse(thistxt) {
    var couseID = $(thistxt).val();
    var courseTypeID = $('select[name="course"]').val();
    $.ajax({
        type: 'GET',
        url: "getSlectedSubject",
        data: { 'couseID': couseID, 'courseTypeID': courseTypeID },
        success: function (response) {
            $('#subjectName').html('');
            $('#subjectName').selectpicker('refresh');
            console.log(response['subjectList']);
            var courseStr = ' <option  value="" class="d-none"> Select Course</option>'
            for (var i = 0; i < response['subjectList'].length; i++) {
                var data = '<option value =' + response['subjectList'][i]['id'] + '> ' + response['subjectList'][i]['subjectName'] + '</option > ';
                courseStr = courseStr + data;
            }
            if (response['subjectList']['message'] == "Subject not found") {
                var data = '<option>No Subject</option > ';
                courseStr = courseStr + data;
            }

            $('#subjectName').html('');
            $('#subjectName').html(courseStr);
            $('#subjectName').selectpicker('refresh');
            // subjectListing
        }
    })
}
// =================================================================================================================
// =================================================================================================================
function checkStudentEmail() {
    var emailData = $('#emailID').val();
    var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailData.match(mailformat)) {
        $('#stuEmailValidation').text('Valid email');
        $('#stuEmailValidation').css('color', 'green');
        $('#addStudentData').attr('disabled', false);
    }
    else {
        $('#stuEmailValidation').text('Invalid email');
        $('#stuEmailValidation').css('color', 'red');
        $('#addStudentData').attr('disabled', true);
    }
}

function checkParentEmail() {
    var emailData = $('#guardianEmail').val();
    var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailData.match(mailformat)) {
        $('#parentEmailValidation').text('Valid');
        $('#parentEmailValidation').css('color', 'green');
        $('#addStudentData').attr('disabled', false);
    }
    else {
        $('#parentEmailValidation').text('Invalid');
        $('#parentEmailValidation').css('color', 'red');
        $('#addStudentData').attr('disabled', true);
    }
}

function checkstuContact() {
    var data = $('#phone1').val();
    if (data.length != 10) {
        $('#StudentContactValidat').text('Invalid');
        $('#StudentContactValidat').css('color', 'red');
        $('#addStudentData').attr('disabled', false);
    } else {
        $('#StudentContactValidat').text('Valid');
        $('#StudentContactValidat').css('color', 'green');
        $('#addStudentData').attr('disabled', false);
    }
}

function checkParentContact() {
    var data = $('#phone2').val();
    if (data.length != 10) {
        $('#ParentContactValidat').text('Invalid');
        $('#ParentContactValidat').css('color', 'red');
        $('#addStudentData').attr('disabled', false);
    } else {
        $('#ParentContactValidat').text('Valid');
        $('#ParentContactValidat').css('color', 'green');
        $('#addStudentData').attr('disabled', false);
    }
}

function isSame_Current_Adrr_Edit() {
    var atLeastOneIsChecked = $('input[name="temp_vs_perm"]:checked').length > 0;
    if (atLeastOneIsChecked) {
        var currentAddress = $('#temp_address').val();
        var permdistrict = $('#temp_district').val();
        var permPincode = $('#currentPincode').val();
        var temp_country = $('select[name="temp_country"]').val();
        var temp_state = $('select[name="temp_state"]').val();
        $('#perm_address').val(currentAddress);
        $('#perm_district').val(permdistrict);
        $('#permanentPincode').val(permPincode);
        $('select[name="perm_country"]').val(temp_country);
        $('select[name="perm_country"]').selectpicker('refresh')
        $('select[name="perm_state"]').val(temp_state);
        $('select[name="perm_state"]').selectpicker('refresh')

    } else {
        $('#perm_address').val('');
        $('#perm_district').val('');
        $('#permanentPincode').val('');
        $('select[name="perm_country"]').val('Select');
        $('select[name="perm_country"]').selectpicker('refresh')
        $('select[name="perm_state"]').val('Select');
        $('select[name="perm_state"]').selectpicker('refresh')


    }
}