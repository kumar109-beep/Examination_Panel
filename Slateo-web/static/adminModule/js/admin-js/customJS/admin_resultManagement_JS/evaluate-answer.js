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
                            var data = '<option value="' + subjectData['data']['subjectNameFK'][i]['id'] + '">' + subjectData['data']['subjectNameFK'][i]['subjectName'] + '</option>';
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

// =================================================================================================================
//                                  FILTER EVALUATE ANSWERS LIST
// =================================================================================================================
function filterEvaluateAnswerList(){
    var courseID = $('#coursenameId').val().trim();
    var subjectID = $('#subjectnameId').val().trim();
    var year = $('#year').val().trim();
    // =============================================================================
    console.log('courseID :> ',courseID);
    console.log('subjectID :> ',subjectID);
    console.log('year :> ',year);
    // =============================================================================
    if(courseID.length == 0){
        Swal.fire({
            icon: 'info',
            title: '<small>Select course/class</small>',
            showConfirmButton: true,
            // timer: 1500
        }).then(function(){
            return false;
        })
    }if(subjectID.length == 0){
        Swal.fire({
            icon: 'info',
            title: '<small>Select subject</small>',
            showConfirmButton: true,
            // timer: 1500
        }).then(function(){
            return false;
        })
    }if(year.length == 0){
        Swal.fire({
            icon: 'info',
            title: '<small>Select year</small>',
            showConfirmButton: true,
            // timer: 1500
        }).then(function(){
            return false;
        })
    }
    else{
        Swal.fire({
            position: 'center',
            // title:"<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Loading records</small></b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        });
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "SearchPapers",
            data: {'courseID':courseID,'SubjectID':subjectID,'year':year},
            success: function (response) {
                console.log(response['searchResultList']);
                Swal.close()
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr>\
                            <td style = "background: white !important;color:black;" > '+ response['searchResultList'][i]['examPapers']['paperID'] + '</td >\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['examPapers']['paperName'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['examPapers']['paperAssociateSubject']['subjectName'] + '</td>\
                            <td style="background: white !important;color:black;" class="subjects">2021</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['examPapers']['paperTotalMarks'] + '</td>\
                            <td style="background: white !important;color:black;" class="details-control">\
                            <td style="background: white !important;color:black;" class="details-control">\
                            <a href="/response/'+response['searchResultList'][i]['id']+'" class="select"   >View Response</a>\
                            </td>\
                        </tr >';
    
                        filteredData = filteredData + addStudent;
                    }
                    $('#filteredPaperData').html('');
                    $('#filteredPaperData').append(filteredData);
                } else {
                    $('#filteredPaperData').html('');
                    $('#filteredPaperData').html('<tr>\
                    <td style="background: white !important;"></td>\
                        <td style="background: white !important;color:black;"></td>\
                        <td style="background: white !important;color:black;"></td>\
                        <td style="background: white !important;color:black;">No record available.</td>\
                        <td style="background: white !important;color:black;"></td>\
                        <td style="background: white !important;color:black;"></td>\
                        <td style="background: white !important;color:black;" class="details-control">\
                        </td>\
                    </tr >');
                }
            }
        });
        // =================================================================================================
    }
}