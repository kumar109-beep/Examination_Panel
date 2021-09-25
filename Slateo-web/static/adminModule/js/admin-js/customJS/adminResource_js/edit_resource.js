import { apiBaseUrl } from '../../../../globalVariables/variable.js'


document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('UpdateResourceData').addEventListener('click', update);

}

function update(ev) {
    console.log(apiBaseUrl + "resource_list/");
    // return false;
    var employeeCode = $('#employeeCode').val();
    var resourceFName = $('#resourceFName').val();
    var resourceLName = $('#resourceLName').val();
    var resourceDOB = $('#resourceDOB').val();
    var resourceGender = $('#resourceGender').val();
    var resourceRole = $('#resource_Role').val();
   


    // var resourceDepartment = $('#resourceDepartment').val();

    var resourceSubjectSpeciality = $('#resourceSubjectSpeciality').val();
    var resourceEmailID = $('#resourceEmailID').val();
    var mobileNumber = $('#phone1').val();
    var country = $('#country').val();
    var state = $('#state').val();
    var address = $('#address').val();
    var district = $('#district').val();
    var pincode = $('#pincode').val();

    console.log(employeeCode, resourceFName, resourceLName, resourceDOB, resourceGender, resourceRole, resourceSubjectSpeciality, resourceEmailID, mobileNumber, country,state,address,district,pincode);
  

    if (employeeCode.trim().length == 0) {
        Swal.fire("<small>Resource Employee Code fields can't be blank.</small>")
        return false;
    } else if (resourceFName.trim().length == 0) {
        Swal.fire("<small>Resource first name fields can't be blank.</small>")
        return false;
    } else if (resourceLName.trim().length == 0) {
        Swal.fire("<small>Resource last name fields can't be blank.</small>")
        return false;
    } else if (resourceDOB.trim().length == 0) {
        Swal.fire("<small>Resource DOB fields can't be blank.</small>")
        return false;
    } else if (resourceGender.trim().length == 0) {
        Swal.fire("<small>Resource Gender fields can't be blank.</small>")
        return false;
    }
        else if (resourceSubjectSpeciality.trim().length == 0) {
            Swal.fire("<small>Subject Speciality fields can't be blank.</small>")
            return false;
        }else if (resourceRole.length == 0) {
            Swal.fire("<small>Role fields can't be blank.</small>")
            return false;
        }
     else if (resourceEmailID.trim().length == 0) {
        Swal.fire("<small>Resource email fields can't be blank.</small>")
        return false;
    } else if (mobileNumber.trim().length == 0) {
        Swal.fire("<small>Resource mobile fields can't be blank.</small>")
        return false;
    } else if (address.trim().length == 0) {
        Swal.fire("<small>Resource address fields can't be blank.</small>")
        return false;
    } else if (district.trim().length == 0) {
        Swal.fire("<small>Resource district fields can't be blank.</small>")
        return false;
    } else if (pincode.trim().length == 0) {
        Swal.fire("<small>Resource pincode fields can't be blank.</small>")
        return false;
    }
    else {
        var Fname = resourceFName;
        var Lname = resourceLName;
        var Fullname = Fname + "-" + Lname;
        
        ev.preventDefault();    //stop the form submitting
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Updating Resource</small></b>",
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
        formdata.append("employeeCode", employeeCode);
        formdata.append("fullName", Fullname);

        // condition ? exprIfTrue : exprIfFalse

        formdata.append("mobileNumber", mobileNumber);
        formdata.append("emailID", resourceEmailID);
        // return false;
        formdata.append("dateOfBirth", resourceDOB);
        formdata.append("gender", resourceGender);
        formdata.append("role_designation", JSON.stringify(resourceRole));
        formdata.append("subject_speciality", resourceSubjectSpeciality);
        formdata.append("country", country);
        formdata.append("state", state);
        formdata.append("address", address);
        formdata.append("district", district);
        formdata.append("pincode", pincode);
        formdata.append("education", $('textarea[name="resourceEducation"]').val());
        formdata.append("experience", $('textarea[name="resourceExperience"]').val());

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
        var url = window.location.href;
        var urlData = url.split('/');
        var id = urlData[urlData.length - 1];
        console.log('url >> ',apiBaseUrl);
        
        fetch(apiBaseUrl + "resource_detail/" +id.toString()+'/', requestOptions).then((response) => {
                return response.json();
        }).then((jsonResponse) => {
            Swal.close()
            console.log('this is or response.....>>', jsonResponse);
            if(jsonResponse.hasOwnProperty("username")){
                Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '<small>Username already exist!</small>',
                        })
                return false;
            }
            if(jsonResponse.hasOwnProperty("email")){
                Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '<small>Email already exist!</small>',
                        })
                return false;
            }
            Swal.fire({
                icon: 'success',
                title: 'Resource Updated successfully.',
                showConfirmButton: false,
                timer: 2000
            }).then(function () {
                window.location.href = window.location;
            })
               })
    }
}