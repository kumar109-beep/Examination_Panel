import { apiBaseUrl } from '../../../../globalVariables/variable.js'

document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('submitCourseToSubject').addEventListener('click', upload);

}

function upload(ev) {
    var courseType = $('#courseTypeId').val();
    var courseName = $('#coursenameId').val();
    var subjectId = $('#subjectId').val();

    if (courseType.trim().length == 0) {
        Swal.fire("<small>Please select course type.</small>")
        return false;
    } else if (courseName.trim().length == 0) {
        Swal.fire("<small>Please select course name.</small>")
        return false;
    } else if (subjectId.length == 0) {
        Swal.fire("<small>Please select subject.</small>")
        return false;
    }

    ev.preventDefault();     
    var tokenKey = $('#hiddenTokenKey').text();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + tokenKey + "");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "type_of_courseFK": courseType, "courseFK": courseName, "subjectNameFK": subjectId});
    console.log(raw);
    // return false;
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Attaching Subjects</b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
    fetch(apiBaseUrl + "assignCourse_list/", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            Swal.close();
            if (data['status'] === true) {
                //  $('#showErrorMessage').css('display', 'none');
                // $('#showSuccesMessage').css('display', '');
                Swal.fire({
                    icon: 'success',
                    title: '<small>Subject Added Successfully</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    window.location.href = window.location;
                })

            } else {
                //  $('#showSuccesMessage').css('display', 'none');
                // $('#showErrorMessage').css('display', '');
                Swal.fire({
                    icon: 'error',
                    title: '<small>Course-Type & Course Pair alredy exist.</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    return false;
                })
            }
        })
        .catch(error => {return false;});
}


// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===================================================    DEPENDENT CHAIN SELECTION     ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseTypeId = document.getElementById("courseTypeId");
    var coursenameId = document.getElementById("coursenameId");

    courseTypeId.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        coursenameId.length = 1;
        var courseTypeId = document.getElementById("courseTypeId");
        var selectedCourseTypeId = courseTypeId.value;

        $.ajax({
            type: 'GET',
            url: "chainedCourses",
            data: { courseTypeId: selectedCourseTypeId},
            success: function (response) {
                console.log(response['courseList']);
                var courseStr = ''
                if (response['courseList'].length > 0){
                    for (var i = 0; i < response['courseList'].length;i++){
                        var data = '<option value="' + response['courseList'][i]['id'] + '">' + response['courseList'][i]['courseName'] +'</option>';
                        courseStr = courseStr + data;
                    }
                    console.log(courseStr);

                    $('#baseSelectOption').hide();
                    $('#coursenameId').html('');
                    $('#coursenameId').append(courseStr);
                    
                }else{
                    var data = '<option value="">No Course Associated with this Course Type !</option>';
                    $('#baseSelectOption').show();
                    $('#coursenameId').html('');
                    $('#coursenameId').append(data);

                }
            }
        });
    }
});


// -----------------------------------------------------------------------------------------------------------------------------------------------


{/* <option value='' class="d-none"> Select Course first</option>
<option value="{{i.id}}">{{ i.courseName }}</option> */}
