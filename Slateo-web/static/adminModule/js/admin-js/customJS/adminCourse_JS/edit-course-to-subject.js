import { apiBaseUrl } from '../../../../globalVariables/variable.js'

document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('submitCourseToSubject').addEventListener('click', upload);

}

function upload(ev) {
    var subjectId = $('#subjectId').val();
    if (subjectId.length == 0) {
        Swal.fire("<small>Please select subject.</small>")
        return false;
    }

    ev.preventDefault();
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating Subjects</b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
    var tokenKey = $('#hiddenTokenKey').text();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + tokenKey + "");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "subjectNameFK": subjectId
    });

    var url = window.location.href;
    var urlSplit = url.split('/');
    var id = urlSplit.pop();

    console.log(raw, id);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(apiBaseUrl + "assignCourse_detail/" + id + '/', requestOptions)
        .then(response => response.text())
        .then(result => {
            Swal.close()
            var data = JSON.parse(result);
            if (data['status'] === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Subjects Updated Successfully.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    window.location.href = window.location;
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'An error occured.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    return false;
                })

            }
        })
        .catch(error => console.log('error', error));
}
