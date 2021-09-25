
document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('addMoreDeatil').addEventListener('click', AddMoreDetail);

}

function AddMoreDetail(ev) {
     ev.preventDefault();    //stop the form submitting
    var refID = $("#hiddenReferenceID").text();
    var adminFirstName = $('input[name="adminFirstName"]').val();
    // var adminLasttName = $('input[name="adminLasttName"]').val();
    var adminFullname = adminFirstName;
    
    let myHeaders = new Headers(); //create any headers we want
    hidenTokenKey = $('#hiddenTokenKey').text();
    console.log('hidenTokenKey : ', hidenTokenKey);
    const token = "Token " + hidenTokenKey + "";

    myHeaders.append("Authorization", token.trim());

    var formdata = new FormData();
    formdata.append("name", adminFullname);
    formdata.append("mobile_number", $('input[name="adminMobileNo"]').val());
    formdata.append("emailID", $('input[name="adminEmailID"]').val());
    formdata.append("birth_date", $('input[name="adminDateBirth"]').val());
    var radios = document.getElementsByName('adminGender');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
              console.log("Gender",radios[i].value);
        }
    }
    formdata.append("country", $('select[name="adminCountry"]').val());
    formdata.append("state", $('select[name="adminState"]').val());
    formdata.append("city", $('input[name="adminDistrict"]').val());
    formdata.append("address", $('textarea[name="adminAddress"]').val());
    formdata.append("pincode", $('input[name="adminPincode"]').val());
    formdata.append("refrence_user", refID);


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
    adminID = $('#hiddenAdminIDKey').text();

    fetch("http://13.233.247.133/api/adminProfile_detail/" + adminID+'/', requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert();
            return false;
            window.location.href = '/edit_profile'
        }).catch(error => console.log('error', error));
    
}