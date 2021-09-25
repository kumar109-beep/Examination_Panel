// import { apiBaseUrl } from '../../../../globalVariables/variable.js'
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===================================================    DEPENDENT CHAIN SELECTION     ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseName = document.getElementById("courseName");
    var subjectID = document.getElementById("subjectID");


    courseName.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        subjectID.length = 1;
        var courseName = document.getElementById("courseName");
        var selectedCourseId = courseName.value;
        $('#topicDataAppend').html('');
        $('#topicDataAppend').html('<tr><td class="text-center"><b>Please select course & subject to view topic list</b></td></tr>');
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Loading Topics</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                Swal.close();
                var subjectData = response['subjectList'];
                if (subjectData['status'] === false) {
                    var data = '<option value="" class="text-center">No Subject Associated with this Course !</option>';
                    $('#baseSelectOption').show();
                    $('#subjectID').html('');
                    $('#subjectID').append(data);
                } else {
                    var courseStr = ''
                    if (subjectData['data']['subjectNameFK'].length > 0) {
                        for (var i = 0; i < subjectData['data']['subjectNameFK'].length; i++) {
                            var data = '<option value="' + subjectData['data']['subjectNameFK'][i]['id'] + '">' + subjectData['data']['subjectNameFK'][i]['subjectName'] + '</option>';
                            courseStr = courseStr + data;
                        }

                        $('#baseSelectOption').hide();
                        $('#subjectID').html('');
                        $('#subjectID').append(courseStr);

                    } else {
                        var data = '<option value="">No Subject Associated with this Course !</option>';
                        $('#baseSelectOption').show();
                        $('#subjectID').html('');
                        $('#subjectID').append(data);

                    }
                }
            }
        });
    }
});
// ========================================================    SEARCH FOR TOPICS    ==============================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
function searchTopics(){
    var course_ID = parseInt($('#courseName').val());
    var subject_ID = parseInt($('#subjectID').val());

    console.log(course_ID,subject_ID);

    $.ajax({
        type: 'GET',
        url: "search_Topic",
        data: { courseID: course_ID, subjectID: subject_ID },
        success: function (response) {
            console.log(response['topicList']);
            var topicList = '';
            if (response['topicList'] == 'No topic available for selected course and subject!'){
                topicList = '<tr>\
                            <td class="text-center">No topic available for selected course and subject!</td>\
                            </tr>';
                $('#topicDataAppend').html('');
                $('#topicDataAppend').append(topicList);

            }else{
                for (var i = 0; i < response['topicList'].length; i++) {
                    var data = '<tr>\
                            <td class="" style="font-weight:700;"><i class="fas fa-angle-double-right"></i>'+ response['topicList'][i] + '</td>\
                            </tr>';
                    topicList = topicList + data;
                }
                $('#topicDataAppend').html('');
                $('#topicDataAppend').append(topicList);
            }
        }
    });

}



// -----------------------------------------------------------------------------------------------------------------------------------------------
