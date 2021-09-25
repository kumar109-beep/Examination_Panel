// import { apiBaseUrl } from '../../../../globalVariables/variable.js'



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
    var registrationData = $('#registrationNumber').val().toString();
    var mobileData = $('#phone1').val();
    var emailData = $('#emailID').val();

    if (registrationData.trim().length == 0) {
        Swal.fire("<small>Registration fields can't be blank.</small>")
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
    if (emailData.trim().length == 0) {
        Swal.fire("<small>Student email fields can't be blank.</small>")
        return false;
    }
    if (mobileData.trim().length == 0) {
        Swal.fire("<small>Student mobile fields can't be blank.</small>")
        return false;
    }
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
    if ($('#course').val().length == 0) {
        Swal.fire("<small>Please select CourseType</small>");
        return false;
    }
    if ($("#courseName").val().length == 0) {
        Swal.fire("<small>Please select course</small>");
        return false;
    }
    if ($("#subjectName").val().length == 0) {
        Swal.fire("<small>Please select Subject</small>");
        return false;
    }
    else {
        var Fname = $('input[name="StudentFname"]').val();
        var Lname = $('input[name="StudentLname"]').val();
        var Fullname = Fname + "-" + Lname;

        ev.preventDefault();    //stop the form submitting.
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Adding New Student Details</small></b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        let myHeaders = new Headers(); //create any headers we want
        var hidenTokenKey = $('#hiddenTokenKey').text();
        console.log('hidenTokenKey : ', hidenTokenKey);
        const token = "Token " + hidenTokenKey + "";
        myHeaders.append("Authorization", token.trim());


        // myHeaders.append('Accept', 'application/json'); //what we expect back
        //bundle the files and data we want to send to the server
        var formdata = new FormData();
        formdata.append("registrationNumber", registrationData);
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
        // formdata.append("handy", $('input[name="handy:checked"]').val());
        // formdata.append("disability", $('input[name="disability:checked"]').val());
        formdata.append("handy", $("input[name='handy']:checked").val());
        formdata.append("disability", $("input[name='disability']:checked").val());
        formdata.append("temp_countryfk", $('select[name="temp_country"]').val());
        formdata.append("temp_statefk", $('select[name="temp_state"]').val());
        formdata.append("temp_district", $('input[name="temp_district"]').val());
        formdata.append("temp_address", $('textarea[name="temp_address"]').val());
        formdata.append("temp_pincode", $('input[name="temp_pincode"]').val());
        formdata.append("temp_vs_perm", $('input[name="temp_vs_perm"]').val());
        formdata.append("perm_countryfk", $('select[name="perm_country"]').val());
        formdata.append("perm_statefk", $('select[name="perm_state"]').val());
        formdata.append("perm_district", $('input[name="perm_district"]').val());
        formdata.append("perm_address", $('textarea[name="perm_address"]').val());
        formdata.append("perm_pincode", $('input[name="perm_pincode"]').val());

        formdata.append("courseTypeFK", $('#course').val());
        formdata.append("courseFK", $('#courseName').val());
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
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch('http://13.233.247.133/api/' + "student_list/", requestOptions)
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
                console.log('this is or response.....>>', jsonResponse['data']);
                if ('username' in jsonResponse['data']) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username already exist!',
                    })
                    return false;
                }
                if ('email' in jsonResponse['data']) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already exist!',
                    })
                    return false;
                }
                Swal.fire({
                    icon: 'success',
                    title: 'New Student Added successfully.',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    window.location.href = '/add_student_detail'
                })
            })
        // .catch((error) => {
        //     console.log('error response :>>> ',res);
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Something went wrong!',
        //     })
        //     return false;
        // });
    }
}

