document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('addStudentData').addEventListener('click', upload);

}

function isSame_Current_Adrr(thisTxt) {
    var x = $('select[name="temp_state"]').val();
    $('select[name="perm_state"]').val(x);
    $('select[name="perm_state"]').selectpicker('refresh');

}

function upload(ev) {
    var registrationData = $('#registrationNumber').val();
    var mobileData = $('#phone1').val();
    var emailData = $('#emailID').val();

    if (registrationData.trim().length == 0) {
        Swal.fire("Registration fields can't be blank.")
        return false;
    } else if (mobileData.trim().length == 0) {
        Swal.fire("Student mobile fields can't be blank.")
        return false;
    } else if (emailData.trim().length == 0) {
        Swal.fire("Student email fields can't be blank.")
        return false;
    }
    else {
        var Fname = $('input[name="StudentFname"]').val();
        var Lname = $('input[name="StudentLname"]').val();
        var Fullname = Fname + "-" + Lname;

        ev.preventDefault();    //stop the form submitting
        let myHeaders = new Headers(); //create any headers we want
        hidenTokenKey = $('#hiddenTokenKey').text();
        console.log('hidenTokenKey : ', hidenTokenKey);
        const token = "Token " + hidenTokenKey + "";
        myHeaders.append("Authorization", token.trim());


        // myHeaders.append('Accept', 'application/json'); //what we expect back
        //bundle the files and data we want to send to the server
        var formdata = new FormData();
        formdata.append("registrationNumber", $('input[name="registrationNumber"]').val());
        formdata.append("fullName", Fullname);

        // condition ? exprIfTrue : exprIfFalse

        formdata.append("mobileNumber", $('input[name="mobileNumber"]').val());
        formdata.append("emailID", $('input[name="emailID"]').val());
        // return false;
        formdata.append("dateOfBirth", $('input[name="dateOfBirth"]').val());
        formdata.append("gender", $('select[name="gender"]').val());
        formdata.append("guardianName", $('input[name="guardianName"]').val());
        formdata.append("relationwithGuardian", $('select[name="relationwithGuardian"]').val());
        formdata.append("guardianEmail", $('input[name="guardianEmail"]').val());
        formdata.append("guardianMobile", $('input[name="guardianMobile"]').val());
        formdata.append("course", $('select[name="course"]').val());
        // formdata.append("branch", $('select[name="branch"]').val());
        formdata.append("year", $('select[name="year"]').val());
        formdata.append("handy", $('input[name="handy"]').val());
        formdata.append("temp_country", $('select[name="temp_country"]').val());
        formdata.append("temp_state", $('select[name="temp_state"]').val());
        formdata.append("temp_district", $('input[name="temp_district"]').val());
        formdata.append("temp_address", $('textarea[name="temp_address"]').val());
        formdata.append("temp_pincode", $('input[name="temp_pincode"]').val());
        formdata.append("temp_vs_perm", $('input[name="temp_vs_perm"]').val());
        formdata.append("perm_country", $('select[name="perm_country"]').val());
        formdata.append("perm_state", $('select[name="perm_state"]').val());
        formdata.append("perm_district", $('input[name="perm_district"]').val());
        formdata.append("perm_address", $('textarea[name="perm_address"]').val());
        formdata.append("perm_pincode", $('input[name="perm_pincode"]').val());

        let myFileimg = document.getElementById('stu_photo').files[0];
        let myFilesign = document.getElementById('stu_sign').files[0];
        if (typeof myFileimg != 'undefined') {
            formdata.append('images', myFileimg, myFileimg['name']);
        }
        if (typeof myFilesign != 'undefined') {
            formdata.append('signature', myFilesign, myFilesign['name']);
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch("http://13.233.247.133/api/student_list/", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                // return false;
                window.location.href = '/student_list'
            }).catch(error => console.log('error', error));
    }
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


// ############################################################
// ######################  getCourseTyep ######################

function onChangeGetCourseType(thistxt) {
    var couseTypeID = $(thistxt).val();
    $('#subjectName').html('');
    $('#subjectName').selectpicker('refresh');
    $.ajax({
        type: 'GET',
        url: "chainedCourses",
        data: { courseTypeId: couseTypeID},
        success: function (response) {
        console.log(response['courseList']);
        var courseStr = ' <option value="" class="d-none"> Select Course</option>'
        if (response['courseList'].length > 0){
        for (var i = 0; i < response['courseList'].length;i++){
            var data = '<option value = "' + response['courseList'][i]['id'] + '" > ' + response['courseList'][i]['courseName'] +'</option > ';
            courseStr = courseStr + data;
           
    }
    $('#courseName').html('');
    $('#courseName').html(courseStr);
    $('#courseName').selectpicker('refresh');

    }else{
    var data = '<option value="">No Course Associated with this Course Type !</option>';
    $('#baseSelectOption').show();
    $('#courseName').html('');
    $('#courseName').html(data);
    $('#courseName').selectpicker('refresh');

}
}
});

}

function onChangeCourse(thistxt) {
    var couseID = $(thistxt).val();
    var courseTypeID = $('select[name="course"]').val();
      $.ajax({
        type: 'GET',
        url: "getSlectedSubject",
        data: { 'couseID': couseID,'courseTypeID': courseTypeID},
          success: function (response) {
              $('#subjectName').html('');
               $('#subjectName').selectpicker('refresh');
              console.log(response['subjectList']);
              var courseStr = ' <option  value="" class="d-none"> Select Course</option>'
              for (var i = 0; i < response['subjectList'].length; i++) {
                var data = '<option value = "' + response['subjectList'][i]['id'] + '" > ' + response['subjectList'][i]['subjectName'] +'</option > ';
                  courseStr = courseStr + data;
              }
               if (response['subjectList']['message'] == "Subject not found") {
               var data = '<option value="">No Subject</option > ';
                courseStr = courseStr + data;
              }
              
               $('#subjectName').html('');
            $('#subjectName').html(courseStr);
            $('#subjectName').selectpicker('refresh');
            

            // subjectListing
        }
        })
    }