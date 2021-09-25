import { apiBaseUrl } from '../../../../globalVariables/variable.js'

document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('addMoreDeatil').addEventListener('click', AddMoreDetail);

}

function AddMoreDetail(ev) {
     ev.preventDefault();    //stop the form submitting
     Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating Profile</b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
    var refID = $("#hiddenReferenceID").text();
    var adminFirstName = $('input[name="adminFirstName"]').val();
    var adminFullname = adminFirstName;
    
    let myHeaders = new Headers(); //create any headers we want
    var hidenTokenKey = $('#hiddenTokenKey').text();
    console.log('hidenTokenKey : ', hidenTokenKey);
    const token = "Token " + hidenTokenKey + "";

    myHeaders.append("Authorization", token.trim());

    var formdata = new FormData();
    formdata.append("name", adminFullname);
    formdata.append("mobile_number", $('input[name="adminMobileNo"]').val());
    formdata.append("emailID", $('input[name="adminEmailID"]').val());
    formdata.append("birth_date", $('#start').val());
    var radios = document.getElementsByName('adminGender');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
              console.log("Gender",radios[i].value);
            var genderData = radios[i].value
            //   return false;
        }
    }
    formdata.append("gender", genderData.trim());
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
    let adminID = $('#hiddenAdminIDKey').text();

    fetch(apiBaseUrl+"adminProfile_detail/" + adminID+'/', requestOptions)
        .then((response) => {
            Swal.close()
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated Successfully..',
                showConfirmButton: false,
                timer: 1500
            }).then(function(){
                window.location.href = '/edit_profile'
            })
        }).catch((error) => {
            // Handle the error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
            return false;
        });

        // .then(response => response.text())
        // .then(result => {
        //     console.log(result);
        //     window.location.href = '/edit_profile'
        // }).catch(error => console.log('error', error));
    
}