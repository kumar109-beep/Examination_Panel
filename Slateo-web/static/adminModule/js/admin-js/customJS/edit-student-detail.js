document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('updateStudentData').addEventListener('click', updateStudent);

}

function updateStudent(ev) {

    // var id = window.location.href;
    // var data = id.substring(id.lastIndexOf('/') - 1);
    // var res = data.replace("/", "");
    var url = window.location.href;
    var urlSplit = url.split('/');
    var res = urlSplit.pop();
    var res1 = urlSplit.pop();

    console.log($('input[name="registrationNumber"]').val(), res1);
    var Fname = $('input[name="StudentFname"]').val();
    var Lname = $('input[name="StudentLname"]').val();
    var Fullname = Fname + "-" + Lname;
    ev.preventDefault();    //stop the form submitting
    let myHeaders = new Headers(); //create any headers we want
    hidenTokenKey = $('#hiddenTokenKey').text();
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
    console.log('formdata : ', formdata)
    
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
        .then(response => response.text())
        .then(result => {
            console.log(result);
            window.location.href = '/student_list'

        }).catch(error => console.log('error', error));
}
