// GLOVAL VARIABLES
// -----------------------------------------------------------------------------------------------------------------------------------------------
var resourceIdArray = [];
var finarSaveResourceArray = [];
var paperId = 0;

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

// ===================================================================================================================================================
//                                            Get_Evaluators_List according to Paper Subject
// ===================================================================================================================================================
function getEvaluatorsList(thisTxt) {
    var PaperId = $(thisTxt).attr('id');
    paperId = PaperId;
    console.log('paper id >> ', paperId);
    if(resourceIdArray.length == 0){
        resourceIdArray = [];
    }
    $('#appendResourceList').html('');
    $('#selectEvaluatorSpinner').show();

    var subjectId = $(thisTxt).attr('subjectID');
    console.log('subjectID >> ', subjectId);

    $.ajax({
        type: 'GET',
        url: "/getFilteredResources/" + subjectId,
        success: function (response) {
            console.log('data >> ', response['result']);
            if (response['result'].length == 0) {
                $('#selectEvaluatorSpinner').hide();
                $('#resourceNoContentAvailable').show();
            } else {
                var dataString = '';
                var roleString = '';

                // for (var i = 0; i < response['result'].length; i++) {
                //     for (var j = 0; j < response['result'][i]['role_designation'].length; j++) {
                //         console.log('data >> ', i, j, response['result'][i]['role_designation'][j]);
                //         var data = '' + response['result'][i]['role_designation'][j]['roleName'] + '';
                //         roleString = roleString + data;

                //     }
                // }

                for (var i = 0; i < response['result'].length; i++) {
                    for (var j = 0; j < response['result'][i]['role_designation'].length; j++) {
                        console.log('data >> ', i, j, response['result'][i]['role_designation'][j]);
                        var data = '' + response['result'][i]['role_designation'][j]['roleName'] + '';
                        roleString = roleString + data;
                    }
                    var selectString = '';
                    if(resourceIdArray.includes( response['result'][i]['id'])){
                        selectString = '<a href="#" resourceId='+ response['result'][i]['id'] + ' onclick="selectResource(this)" class="addEva btn btn-sm" style="color:white;background-color:green;">Selected</a>'
                    }else{
                        selectString = '<a href="#" resourceId='+ response['result'][i]['id'] + ' onclick="selectResource(this)" class="addEva btn btn-secondary btn-sm">Select +</a>'
                    }
                    var data = '<tr id="row1">\
                                    <td>'+ response['result'][i]['fullName'] + '</td>\
                                    <td>'+ roleString + '</td>\
                                    <td>'+ response['result'][i]['subject_speciality']['subjectName'] + '</td>\
                                    <td>'+selectString+'</td>\
                                </tr>';
                    dataString = dataString + data;
                    roleString = '';
                }
                $('#selectEvaluatorSpinner').hide();
                $('#resourceNoContentAvailable').hide();
                $('#appendResourceList').html('');
                $('#appendResourceList').append(dataString);
            }
        }
    });


}
// result
// =============================================================================================================================================================================
//                                                                   SELECT RESOURCES AS PAPER EVALUATOR
// =============================================================================================================================================================================
function selectResource(thisTxt) {
    var resourceId = $(thisTxt).attr('resourceId');

    console.log('resourceId >> ', typeof(resourceId));
    console.log('resourceIdArray before >> ', typeof(resourceIdArray));


    if (resourceIdArray.includes(parseInt(resourceId))) {
        const index = resourceIdArray.indexOf(parseInt(resourceId));
        if (index > -1) {
            resourceIdArray.splice(index, 1);
        }
        $(thisTxt).text('Select +');
        $(thisTxt).css('color', 'white');
        $(thisTxt).css('background-color', 'grey');
    } else {
        resourceIdArray.push(parseInt(resourceId));
        $(thisTxt).text('Selected');
        $(thisTxt).css('color', 'white');
        $(thisTxt).css('background-color', 'green');
    }



    console.log('resourceIdArray after >>> ', resourceIdArray);
}


// =============================================================================================================================================================================
//                                                                          SAVE RESOURSE ARRAY
// =============================================================================================================================================================================
function saveResourceArray() {
    finarSaveResourceArray = resourceIdArray;
    console.log('finarSaveResourceArray >>>>>>>>>> ', finarSaveResourceArray);

    if (finarSaveResourceArray.length > 0) {
        $('#'+paperId).css('color', '#28afd0');
        $('#' + paperId).text('Selected (' + finarSaveResourceArray.length + ')');
        $('#btn_' + paperId).attr('disabled', false);
    } else {
        alert('Select atleast 1 Resource!');
        $('#btn_' + paperId).attr('disabled', true);
        return false;
    }

}

// =============================================================================================================================================================================
//                                                                 ALLOCATE AND SAVE RESOURCES FOR A PAPER
// =============================================================================================================================================================================
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function allocateEvaluator(thisTxt) {

    var data = $(thisTxt).parent().text();
    console.log(data.trim());
    if (data.trim() == 'Save') {
        var PaperId = $(thisTxt).attr('completedExamID');
        paperId = PaperId;
        var startdate = $('#startDate_' + paperId).val();
        var enddate = $('#endDate_' + paperId).val();

        if (startdate.trim().length == 0) {
            alert('please select start date!');
            $(thisTxt).css('color', 'white');
            $(thisTxt).css('background-color', '#28afd0');
            $(thisTxt).text('Save');
            return false;
        } if (enddate.trim().length == 0) {
            alert('please select end date!');
            $(thisTxt).css('color', 'white');
            $(thisTxt).css('background-color', '#28afd0');
            $(thisTxt).text('Save');
            return false;
        } if (finarSaveResourceArray.length == 0) {
            alert('please select atleast 1 resource!');
            $(thisTxt).css('color', 'white');
            $(thisTxt).css('background-color', '#28afd0');
            $(thisTxt).text('Save');
            return false;
        } else {
            var start_date = startdate;
            var end_date = enddate;
            var paperID = PaperId;
            var assign_evaluator = finarSaveResourceArray;

            console.log('start_date >> ', start_date, '\nend_date >> ', end_date, '\npaperID >> ', paperID, '\nassign_evaluator list >>', assign_evaluator);
            $(thisTxt).hide();
            $('#sending_' + paperID).show();
            // ==============================  ALLOCATE RESOURCES FOR EVALUATION OF PAPERS   ===================================
            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "/allocateEvaluaters",
                headers: { 'X-CSRFToken': csrftoken },
                data: {
                    'start_date': start_date, 'end_date': end_date, 'paperID': paperID,
                    'assigned_evaluator_Array[]': assign_evaluator
                },
                success: function (response) {
                    console.log('assign evaluators post data response', response['result']['status']);

                    if (response['result']['status'] === true) {
                        $('#sending_' + paperID).hide();
                        $('#btn_' + paperID).show();

                        Swal.fire({
                            icon: 'success',
                            title: '<small>Evaluator Assigned Successfully</small>',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function(){
                            // location.reload;
                            window.location.reload(true);
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'An error occured.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function () {
                            return false;
                        })

                    }
                }
            });
            // ===================================================================================================================
        }
    } else if (data.trim() == 'Update') {
        var PaperId = $(thisTxt).attr('completedExamID');
        paperId = PaperId;
        console.log('paperID >>> ', paperId);
        $('#startDateText_' + paperId).prop('type', 'text');
        $('#endDateText_' + paperId).prop('type', 'text');


        $('#startDateText_' + paperId).attr('readonly', true);
        $('#endDateText_' + paperId).attr('readonly', true);

        $('#startDateText_' + paperId).css('border', '1px solid white');
        $('#endDateText_' + paperId).css('border', '1px solid white');
        $('#selectedText_' + paperId).css('color', 'green');

        $(thisTxt).text('Edit');
        $(thisTxt).css('background-color', 'grey');
        $('#'+paperId).css('color', 'green');

        $('#'+PaperId).css('pointer-events', 'none');
        // =======================================================================================================================
        // =======================================================================================================================
        var PaperId = $(thisTxt).attr('completedExamID');
        paperId = PaperId;
        var startdate = $('#startDateText_' + paperId).val();
        var enddate = $('#endDateText_' + paperId).val();

        if (startdate.trim().length == 0) {
            alert('please select start date!');
            $(thisTxt).css('color', 'white');
            $(thisTxt).css('background-color', '#28afd0');
            $(thisTxt).text('Save');
            return false;
        } if (enddate.trim().length == 0) {
            alert('please select end date!');
            $(thisTxt).css('color', 'white');
            $(thisTxt).css('background-color', '#28afd0');
            $(thisTxt).text('Save');
            return false;
        } if (finarSaveResourceArray.length == 0) {
            finarSaveResourceArray = resourceIdArray;
            // alert('please select atleast 1 resource!');
            // $(thisTxt).css('color', 'white');
            // $(thisTxt).css('background-color', '#28afd0');
            // $(thisTxt).text('Save');
            // return false;
        } else {
            var start_date = startdate;
            var end_date = enddate;
            var paperID = PaperId;
            var assign_evaluator = finarSaveResourceArray;
            finarSaveResourceArray = [];

            console.log('data >> ', start_date, '\n', end_date, '\n', paperID, '\n', assign_evaluator);
            $(thisTxt).hide();
            $('#sending_' + paperID).show();
            // ==============================  ALLOCATE RESOURCES FOR EVALUATION OF PAPERS   ===================================
            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "/allocateEvaluaters",
                headers: { 'X-CSRFToken': csrftoken },
                data: {
                    'start_date': start_date, 'end_date': end_date, 'paperID': paperID,
                    'assigned_evaluator_Array[]': assign_evaluator
                },
                success: function (response) {
                    console.log('assign evaluators post data response', response['result']['status']);

                    if (response['result']['status'] === true) {
                        $('#sending_' + paperID).hide();
                        $('#btn_' + paperID).show();

                        Swal.fire({
                            icon: 'success',
                            title: '<small>Evaluator Updated Successfully</small>',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function(){
                            window.location.reload(true);
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'An error occured.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function () {
                            return false;
                        })

                    }
                }
            });
            // ===================================================================================================================
        }

        // =======================================================================================================================
        // =======================================================================================================================
    }
    else if (data.trim() == 'Edit') {
        var PaperId = $(thisTxt).attr('completedExamID');
        paperId = PaperId;
        console.log('paperID >>> ', paperId);
        $('#startDateText_' + paperId).prop('type', 'date');
        $('#endDateText_' + paperId).prop('type', 'date');


        $('#startDateText_' + paperId).attr('readonly', false);
        $('#endDateText_' + paperId).attr('readonly', false);

        $('#startDateText_' + paperId).css('border', '1px solid black');
        $('#endDateText_' + paperId).css('border', '1px solid black');
        
        $(thisTxt).text('Update');
        $(thisTxt).css('background-color', 'green');

        $('#'+paperId).css('color', '#28afd0');
        $('#'+PaperId).css('pointer-events', 'auto');
    }
//     outline: 0;
//   border-width: 0 0 2px;
//   border-color: blue
}

function renderSelectedResource(thisTxt) {
    var selectedResourceArray = $(thisTxt).attr('resourceIdList');
    console.log('selectedResourceArray >> ', selectedResourceArray);

    var selectedResId = selectedResourceArray;
    resourceIdArray = eval(selectedResId);
    console.log('selectedResId >> ', selectedResId);
    console.log('resourceIdArray >> ', resourceIdArray);


    var PaperId = $(thisTxt).attr('id');
    paperId = PaperId;
    console.log('paper id >> ', paperId);
    // resourceIdArray = [];

    $('#appendResourceList').html('');
    $('#selectEvaluatorSpinner').show();

    var subjectId = $(thisTxt).attr('subjectID');
    console.log('subjectID >> ', subjectId);

    $.ajax({
        type: 'GET',
        url: "/getFilteredResources/" + subjectId,
        success: function (response) {
            console.log('data >> ', response['result']);
            if (response['result'].length == 0) {
                $('#selectEvaluatorSpinner').hide();
                $('#resourceNoContentAvailable').show();
            } else {
                var dataString = '';
                var roleString = '';

        //         $(thisTxt).text('Selected');
        // $(thisTxt).css('color', 'white');
        // $(thisTxt).css('background-color', 'green');

                for (var i = 0; i < response['result'].length; i++) {
                    for (var j = 0; j < response['result'][i]['role_designation'].length; j++) {
                        var data = '<span>' + response['result'][i]['role_designation'][j]['roleName'] + '</span>&nbsp;&nbsp;';
                        roleString = roleString + data;
                    }
                    var selectString = '';
                    if(resourceIdArray.includes( response['result'][i]['id'])){
                        selectString = '<a href="#" resourceId='+ response['result'][i]['id'] + ' onclick="selectResource(this)" class="addEva btn btn-sm" style="color:white;background-color:green;">Selected</a>'
                    }else{
                        selectString = '<a href="#" resourceId='+ response['result'][i]['id'] + ' onclick="selectResource(this)" class="addEva btn btn-secondary btn-sm">Select +</a>'
                    }
                    var data = '<tr id="row1">\
                                        <td>'+ response['result'][i]['fullName'] + '</td>\
                                        <td class="subjects">'+ roleString + '</td>\
                                        <td>'+ response['result'][i]['subject_speciality']['subjectName'] + '</td>\
                                        <td>'+selectString+'</td>\
                                    </tr>';
                    dataString = dataString + data;
                    roleString = '';
                }
                $('#selectEvaluatorSpinner').hide();
                $('#resourceNoContentAvailable').hide();
                $('#appendResourceList').html('');
                $('#appendResourceList').append(dataString);
            }
        }
    }).then(function () {
        console.log('data appended successfully!');
    })

}
// {
//     "start_date": "Runw",
//     "end_date": "jnkj",
//     "paperID": 2,
//     "assign_evaluator": [
//         1,
//         3
//     ]
// }