import { apiBaseUrl } from '../../../../globalVariables/variable.js'



document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('updateStudentData').addEventListener('click', updateStudent);

}

function isSame_Current_Adrr(thisTxt) {
    var x = $('select[name="temp_state"]').val();
    $('select[name="perm_state"]').val(x);
    $('select[name="perm_state"]').selectpicker('refresh');

}

function updateStudent(ev) {

    if ($('input[name="registrationNumber"]').val().trim().length == 0) {
        Swal.fire("<small>Registration fields can't be blank</small>.")
        return false;
    }
    if ($('input[name="StudentFname"]').val().trim().length == 0) {
        Swal.fire("<small>First name fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="dateOfBirth"]').val().trim().length == 0) {
        Swal.fire("<small>DOB fields can't be blank.</small>")
        return false;
    }
    if ($('select[name="gender"]').val().trim().length == 0) {
        Swal.fire("<small>Gender fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="guardianName"]').val().trim().length == 0) {
        Swal.fire("<small>Parent fields can't be blank.</small>")
        return false;
    }
    if ($('select[name="relationwithGuardian"]').val().trim().length == 0) {
        Swal.fire("<small>Relation fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="emailID"]').val().trim().length == 0) {
        Swal.fire("<small>Student email fields can't be blank</small>.")
        return false;
    }
    if ($('input[name="mobileNumber"]').val().trim().length == 0) {
        Swal.fire("<small>Student mobile fields can't be blank</small>.")
        return false;
    }
    // -----------------------------------------------------------------------
    if ($('input[name="guardianEmail"]').val().trim().length == 0) {
        Swal.fire("<small>Parent email fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="guardianMobile"]').val().trim().length == 0) {
        Swal.fire("<small>Parent mobile fields can't be blank.</small>")
        return false;
    }
    // ===================== address fields ========================
    if ($('textarea[name="temp_address"]').val().trim().length == 0) {
        Swal.fire("<small>Current address fields can't be blank.</small>")
        return false;
    }
    if ($('select[name="temp_country"]').val().trim().length == 0) {
        Swal.fire("<small>Current country fields can't be blank.</small>")
        return false;
    }
    if ($('select[name="temp_state"]').val().trim().length == 0) {
        Swal.fire("<small>Current state fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="temp_district"]').val().trim().length == 0) {
        Swal.fire("<small>Current district fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="temp_pincode"]').val().trim().length == 0) {
        Swal.fire("<small>Current pincode fields can't be blank.</small>")
        return false;
    }
    // ===================================================================
    if ($('textarea[name="perm_address"]').val().trim().length == 0) {
        Swal.fire("<small>Permanent address fields can't be blank.</small>")
        return false;
    }
    if ($('select[name="perm_country"]').val().trim().length == 0) {
        Swal.fire("<small>Permanent country fields can't be blank.</small>")
        return false;
    }
    if ($('select[name="perm_state"]').val().trim().length == 0) {
        Swal.fire("<small>Permanent state fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="perm_district"]').val().trim().length == 0) {
        Swal.fire("<small>Permanent district fields can't be blank.</small>")
        return false;
    }
    if ($('input[name="perm_pincode"]').val().trim().length == 0) {
        Swal.fire("<small>Permanent pincode fields can't be blank.</small>")
        return false;
    }
    // ===================================================================

    // -----------------------------------------------------------------------
    if ($('#course').val().length == 0) {
        Swal.fire('<small>Please select CourseType</small>');
        return false;
    }
    if ($('#courseName').val().length == 0) {
        Swal.fire('<small>Please select Course</small>');
        return false;
    }
    if ($('#subjectName').val().length == 0) {
        Swal.fire('<small>Please select Subject</small>');
        return false;
    }
    var url = window.location.href;
    var urlSplit = url.split('/');
    var res1 = urlSplit[urlSplit.length - 1];

    console.log($('input[name="registrationNumber"]').val(), res1);
    var Fname = $('input[name="StudentFname"]').val();
    var Lname = $('input[name="StudentLname"]').val();
    var Fullname = Fname + "-" + Lname;
    ev.preventDefault();    //stop the form submitting
   
    let myHeaders = new Headers(); //create any headers we want
    var hidenTokenKey = $('#hiddenTokenKey').text();
    myHeaders.append("Authorization", "Token " + hidenTokenKey + "");
    myHeaders.append('Accept', 'application/json'); //what we expect back
    //bundle the files and data we want to send to the server
    var formdata = new FormData();
    formdata.append("registrationNumber", $('input[name="registrationNumber"]').val());
    formdata.append("fullName", Fullname);
    formdata.append("mobileNumber", $('input[name="mobileNumber"]').val());
    formdata.append("emailID", $('input[name="emailID"]').val());
    formdata.append("dateOfBirth", $('input[name="dateOfBirth"]').val());
    formdata.append("gender", $('select[name="gender"]').val());
    formdata.append("guardianName", $('input[name="guardianName"]').val());
    formdata.append("relationwithGuardian", $('select[name="relationwithGuardian"]').val());
    formdata.append("guardianEmail", $('input[name="guardianEmail"]').val());
    formdata.append("guardianMobile", $('input[name="guardianMobile"]').val());
    formdata.append("course", $('select[name="course"]').val());
    formdata.append("handy", $("input[name='handy']:checked").val());
    formdata.append("disability", $("input[name='disable']:checked").val());
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
    formdata.append("courseTypeFK", $('#course').val());
    formdata.append("courseFK", $('#courseName').val());
    console.log('subjectList >> ',JSON.stringify($('#subjectName').val()));

    if(eval($('#subjectName').val())[0] == 'No Subject'){
        Swal.fire('<small>Please select a valid Subject</small>');
        return false;
    }
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Updating Student Details</small></b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
    formdata.append("suject", JSON.stringify($('#subjectName').val()));

    let myFileimg = document.getElementById('stu_photo').files[0];
    let myFilesign = document.getElementById('stu_sign').files[0];
    if (typeof myFileimg != 'undefined') {
        formdata.append('images', myFileimg, myFileimg['name']);
    }
    if (typeof myFilesign != 'undefined') {
        formdata.append('signature', myFilesign, myFilesign['name']);
    }
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://13.233.247.133/api/student_detail/" + res1 + "/", requestOptions)
    .then((response) => {
        Swal.close();
        // var res = response.json();
        return response.json();
        
        // if (response.status >= 200 && response.status <= 299) {
        //     return response.json();
        // } else {
        //     // throw Error(response.statusText);
        //     return response.json();
        // }
    })
    .then((jsonResponse) => {
        console.log('this is or response.....>>',jsonResponse);
        if('username' in jsonResponse){
            Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username already exist!',
                    })
            return false;
        }
        if('email' in jsonResponse){
            Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already exist!',
                    })
            return false;
        }
        Swal.fire({
            icon: 'success',
            title: '<small>Student Detail Updated Successfully</small>',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location.href = window.location;
        })
    })
}
