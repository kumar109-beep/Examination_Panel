// $(document).ready(function () {
//     // course Type
//     var couseTypeID = $(thistxt).val();
//     $('#subjectName').html('');
//     $('#subjectName').selectpicker('refresh');
//     $.ajax({
//         type: 'GET',
//         url: "/chainedCourses",
//         data: { courseTypeId: couseTypeID },
//         success: function (response) {
//             console.log(response['courseList']);
//             var courseStr = ' <option value="" class="d-none"> Select Course</option>'
//             if (response['courseList'].length > 0) {
//                 for (var i = 0; i < response['courseList'].length; i++) {
//                     var data = '<option value = "' + response['courseList'][i]['id'] + '" > ' + response['courseList'][i]['courseName'] + '</option > ';
//                     courseStr = courseStr + data;

//                 }
//                 $('#courseName').html('');
//                 $('#courseName').html(courseStr);
//                 $('#courseName').selectpicker('refresh');

//             } else {
//                 var data = '<option value="">No Course Associated with this Course Type !</option>';
//                 $('#baseSelectOption').show();
//                 $('#courseName').html('');
//                 $('#courseName').html(data);
//                 $('#courseName').selectpicker('refresh');

//             }
//         }
//     }).then(function(){
//         // course
//         var couseID = $(thistxt).val();
//         var courseTypeID = $('select[name="course"]').val();
//         $.ajax({
//             type: 'GET',
//             url: "/getSlectedSubject",
//             data: { 'couseID': couseID, 'courseTypeID': courseTypeID },
//             success: function (response) {
//                 $('#subjectName').html('');
//                 $('#subjectName').selectpicker('refresh');
//                 console.log(response['subjectList']);
//                 var courseStr = ' <option  value="" class="d-none"> Select Course</option>'
//                 for (var i = 0; i < response['subjectList'].length; i++) {
//                     var data = '<option value = "' + response['subjectList'][i]['id'] + '" > ' + response['subjectList'][i]['subjectName'] + '</option > ';
//                     courseStr = courseStr + data;
//                 }
//                 if (response['subjectList']['message'] == "Subject not found") {
//                     var data = '<option>No Subject</option > ';
//                     courseStr = courseStr + data;
//                 }

//                 $('#subjectName').html('');
//                 $('#subjectName').html(courseStr);
                
//                 $('#subjectName').selectpicker('refresh');
//                 // subjectListing
//             }
//         })
//     })
// });
// -------------------------------------------    validateRegistrationNumber  ---------------------------------------------------------------
function validateRegistrationNumber(){
    var data = $('#studentRegNo').val();
    
}

function checkParentEmail() {
    var emailData = $('#guardianEmail').val();
    var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailData.match(mailformat)) {
        $('#parentEmailValidation').text('Valid email');
        $('#parentEmailValidation').css('color','green');
        $('#updateStudentData').attr('disabled',false);
    }
    else {
        $('#parentEmailValidation').text('Invalid email');
        $('#parentEmailValidation').css('color','red');
        $('#updateStudentData').attr('disabled',true);        
    }
}
function checkstuContact(){
    var data = $('#phone1').val();
    if(data.length != 10){
        $('#StudentContactValidat').text('Invalid Contact');
        $('#StudentContactValidat').css('color','red');
        $('#addStudentData').attr('disabled',false);
    }else{
        $('#StudentContactValidat').text('Valid Contact');
        $('#StudentContactValidat').css('color','green');
        $('#addStudentData').attr('disabled',true);
    }
}

function checkParentContact(){
    var data = $('#phone2').val();
    if(data.length != 10){
        $('#ParentContactValidat').text('Invalid Contact');
        $('#ParentContactValidat').css('color','red');
        $('#addStudentData').attr('disabled',false);
    }else{
        $('#ParentContactValidat').text('Valid Contact');
        $('#ParentContactValidat').css('color','green');
        $('#addStudentData').attr('disabled',true);
    }
}
// -------------------------------------------    validateFName  ----------------------------------------------------------------------------
function validateFName(){
    var data = $('#StudentFname').val();
    
    var regx = /^[A-Za-z]+$/;
    if(data.length > 0){
        if (data.match(regx)) {
            $('#fNameErrorMsg').css('display','none');
        } else {
            $('#fNameErrorMsg').css('display','');
        }
    }else{
        $('#fNameErrorMsg').css('display','none');
    }
}

// -------------------------------------------    validateLName  ----------------------------------------------------------------------------
function validateLName(){
    var data = $('#StudentLname').val();
    
    var regx = /^[A-Za-z]+$/;
    if(data.length > 0){
        if (data.match(regx)) {
            $('#lNameErrorMsg').css('display','none');
        } else {
            $('#lNameErrorMsg').css('display','');
        }
    }else{
        $('#lNameErrorMsg').css('display','none');
    }
}

// -------------------------------------------    validateParentName  -----------------------------------------------------------------------
function validateParentName(){
    var data = $('#StudentguardianName').val();
    
    var regx = /^[A-Za-z & ' ']+$/;
    if(data.length > 0){
        if (data.match(regx)) {
            $('#parentNameErrorMsg').css('display','none');
        } else {
            $('#parentNameErrorMsg').css('display','');
        }
    }else{
        $('#parentNameErrorMsg').css('display','none');
    }
}

// -------------------------------------------    validateEmail  ----------------------------------------------------------------------------
function validateEmail(){
    var data = $('#studentEmail').val();
    
    var regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.]{2,5})+\.([A-Za-z]{2,5})$/;

    if(data.length > 0){
        if (data.match(regx)) {
            $('#emailErrorMsg').css('display','none');
        } else {
            $('#emailErrorMsg').css('display','');
        }
    }else{
        $('#emailErrorMsg').css('display','none');
    }
}

// -------------------------------------------    validateContact  --------------------------------------------------------------------------
function validateContact(){
    var data = $('#phone1').val();
        // 
}

// -------------------------------------------    validateParentContact  --------------------------------------------------------------------
function validateParentContact(){
    var data = $('#phone2').val();
        // 
}

// -------------------------------------------    validateParentEmail  ----------------------------------------------------------------------
function validateParentEmail(){
    var data = $('#guardianEmail').val();
    
    var regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.]{2,5})+\.([A-Za-z]{2,5})$/;

    if(data.length > 0){
        if (data.match(regx)) {
            $('#parentEmailErrorMsg').css('display','none');
        } else {
            $('#parentEmailErrorMsg').css('display','');
        }
    }else{
        $('#parentEmailErrorMsg').css('display','none');
    }
}

// -------------------------------------------    validateCurrentAddress  -------------------------------------------------------------------
function validateCurrentAddress(thistxt){
    var data = $(thistxt).val();
}

// -------------------------------------------    validateCurrDistrict  ---------------------------------------------------------------------
function validateCurrDistrict(){
    var data = $('#studentCurrentDistrict').value;
    console.log(data);
    var regx = /^[A-Za-z]+$/;
    if(data.length > 0){
        if (data.match(regx)) {
            $('#currDistrictErrorMsg').css('display','none');
        } else {
            $('#currDistrictErrorMsg').css('display','');
        }
    }else{
        $('#currDistrictErrorMsg').css('display','none');
    }
        
}

// -------------------------------------------    validateCurrPincode  ----------------------------------------------------------------------
function validateCurrPincode(){
    var data = $('#StudentPinCode').val();
    
        
}

// -------------------------------------------    validatePermAddress  ----------------------------------------------------------------------
function validatePermAddress(){
    var data = $('#studentPermanentAddress').val();
        
}

// -------------------------------------------    validatePermDistrict  ---------------------------------------------------------------------
function validatePermDistrict(){
    var data = $('#studentPermanentDistrict').val();
    var regx = /^[A-Za-z]+$/;
    if(data.length > 0){
        if (data.match(regx)) {
            $('#permDistrictErrorMsg').css('display','none');
        } else {
            $('#permDistrictErrorMsg').css('display','');
        }
    }else{
        $('#permDistrictErrorMsg').css('display','none');
    }
        
}

// -------------------------------------------    validatePermPincode  ----------------------------------------------------------------------
function validatePermPincode(){
    var data = $('#StudentPermanentPinCode').val();
        
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
// =================================================================================================================
// =============================================== CHECKBOX SELECTER AS SAME PARMANENT ADDRESS ==================================================================
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

// =================================================================================================================
// ############################################################
// ######################  getCourseTyep ######################

function onChangeGetCourseType(thistxt) {
    var couseTypeID = $(thistxt).val();
    $('#subjectName').html('');
    $('#subjectName').selectpicker('refresh');
    $.ajax({
        type: 'GET',
        url: "/chainedCourses",
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
        url: "/getSlectedSubject",
        data: { 'couseID': couseID, 'courseTypeID': courseTypeID },
        success: function (response) {
            $('#subjectName').html('');
            $('#subjectName').selectpicker('refresh');
            console.log(response['subjectList']);
            var courseStr = ' <option  value="" class="d-none"> Select Course</option>'
            for (var i = 0; i < response['subjectList'].length; i++) {
                var data = '<option value = "' + response['subjectList'][i]['id'] + '" > ' + response['subjectList'][i]['subjectName'] + '</option > ';
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
