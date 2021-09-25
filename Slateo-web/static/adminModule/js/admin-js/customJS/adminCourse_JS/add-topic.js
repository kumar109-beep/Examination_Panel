import { apiBaseUrl } from '../../../../globalVariables/variable.js'



document.addEventListener('DOMContentLoaded', init);
function init() {
    document.getElementById('submitTopicToSubject').addEventListener('click', upload);

}

function upload(ev) {

    var courseId = $('#coursenameId').val();
    var subjectId = $('#subjectnameId').val();

    if (courseId.length == 0) {
        Swal.fire("<small>Please select course</small>.")
        return false;
    } else if (subjectId.length == 0) {
        Swal.fire("<small>Please select subject</small>.")
        return false;
    }
    ev.preventDefault();
    
    var dataList = []
    $("input[class *= 'topicData']").each(function () {
        dataList.push($(this).val().trim());
    });

    var array1 = []
    var array2 = []

    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i] == '') {
            Swal.fire("<small>Blank topic not accepted</small>.");
            return false;
        } else {
            array1.push(dataList[i]);
            array2.push(array1);
        }
        array1 = [];
    }
    console.log(courseId, subjectId, array2);
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Adding new Topics</b>",
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
        "topicsList": array2.toString(), "select_courseFK": parseInt(courseId), "selectsubjectFK": parseInt(subjectId)
    });

    console.log('raw >> ',raw);
    // return false;
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log('apiBaseUrl >> ',apiBaseUrl);
    fetch(apiBaseUrl + "assignSubjectTotopic_list/", requestOptions)
        .then(response => response.text())
        .then(result => {
            Swal.close();
            var data = JSON.parse(result);
            if (data['status'] === true) {
                //  $('#showErrorMessage').css('display', 'none');
                // $('#showSuccesMessage').css('display', '');
                Swal.fire({
                    icon: 'success',
                    title: '<small>Topics added successfully.</small>',
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
                    title: '<small>An error occured.</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    return false;
                })
            }
        })
        .catch(error => console.log('error', error));
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===================================================    DEPENDENT CHAIN SELECTION     ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseName = document.getElementById("coursenameId");
    var subjectID = document.getElementById("subjectnameId");
    var sheetCourseName = document.getElementById("sheetCoursenameId");
    var sheetSubjectID = document.getElementById("sheetSubjectNameID");




    courseName.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        subjectnameId.length = 1;
        var courseName = document.getElementById("coursenameId");
        var selectedCourseId = courseName.value;
        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                var subjectData = response['subjectList'];
                $('#submitTopicToSubject').prop('disabled', false);
                $('#submitTopicToSubject').css('cursor', '');

                $('.hideTopicBar').css('opacity', 1);
                $('.hideTopicBar').css('pointer-events', '');


                if (subjectData['status'] === false) {
                    var data = '<option value="">No Subject Associated with this Course !</option>';
                    $('#baseSelectOption').show();
                    $('#subjectnameId').html('');
                    $('#subjectnameId').append(data);

                    $('.hideTopicBar').css('opacity', 0.3);
                    $('.hideTopicBar').css('pointer-events', 'none');

                } else {
                    console.log(subjectData['data']['subjectNameFK']);
                    var courseStr = ''
                    if (subjectData['data']['subjectNameFK'].length > 0) {
                        for (var i = 0; i < subjectData['data']['subjectNameFK'].length; i++) {
                            var data = '<option value="' + subjectData['data']['subjectNameFK'][i]['id'] + '">' + subjectData['data']['subjectNameFK'][i]['subjectName'] + '</option>';
                            courseStr = courseStr + data;
                        }

                        $('#baseSelectOption').hide();
                        $('#subjectnameId').html('');
                        $('#subjectnameId').append(courseStr);

                    } else {
                        var data = '<option value="">No Subject Associated with this Course !</option>';
                        $('#baseSelectOption').show();
                        $('#subjectnameId').html('');
                        $('#subjectnameId').append(data);

                    }
                }
            }
        });
    }

    sheetCourseName.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        subjectnameId.length = 1;
        var sheetCourseName = document.getElementById("sheetCoursenameId");
        var selectedCourseId = sheetCourseName.value;

        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                var subjectData = response['subjectList'];
                if (subjectData['status'] === false) {
                    var data = '<option value="">No Subject Associated with this Course !</option>';
                    $('#baseSheetSelectOption').show();
                    $('#sheetSubjectNameID').html('');
                    $('#sheetSubjectNameID').append(data);
                } else {
                    console.log(response['subjectList']);
                    // return false;
                    var courseStr = ''
                    if (subjectData['data']['subjectNameFK'].length > 0) {
                        for (var i = 0; i < subjectData['data']['subjectNameFK'].length; i++) {
                            var data = '<option value="' + subjectData['data']['subjectNameFK'][i]['id'] + '">' + subjectData['data']['subjectNameFK'][i]['subjectName']  + '</option>';
                            courseStr = courseStr + data;
                        }

                        $('#baseSheetSelectOption').hide();
                        $('#sheetSubjectNameID').html('');
                        $('#sheetSubjectNameID').append(courseStr);

                    } else {
                        var data = '<option value="">No Subject Associated with this Course !</option>';
                        $('#baseSheetSelectOption').show();
                        $('#sheetSubjectNameID').html('');
                        $('#sheetSubjectNameID').append(data);

                    }
                }
            }
        });
    }
});


// -----------------------------------------------------------------------------------------------------------------------------------------------