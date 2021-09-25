// ============================================================================================================================================================
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
// ============================================================================================================================================================
$(document).ready(function () {
    $('#sections').show()
    var sectionalData = $('#hiddenSectionalDetailsData').text();
    var d1 = JSON.parse(sectionalData);
    console.log('sectionalData : ', sectionalData);
    console.log('d1Data : ', d1);
    // return false;
    sectionRow = '';
    var totalSections = $('#no-of-section').val();
    if (totalSections.length == 0) {
        $('#sectionalRows').html('');
        $('#sections').hide()
        return false;
    } else if (totalSections == 0) {
        $('#no-of-section').val('');
        Swal.fire('<small>Please enter valid sections.</small>')
    } else {

        for (var i = 1; i <= totalSections; i++) {
            var sectionRow = sectionRow + '<tr id="sectionRowNo_' + i + '"><td>\
                        <span class="sno" id="sno_'+ i + '">' + i + '</span></td>\
                        <td><input type="text" name="" id="noOfQuestion_'+ i + '" class="qno" onkeydown="validateTotalData()" onkeypress="return onlyNumberKey(event)" onkeyup="multiply(this)" onclick="checkTotalQuestion()" maxlength="3" value="' + d1['nOQ'][i - 1] + '"></td>\
                            <td><input type="text" name="" id="marksPerQues_'+ i + '" class="marks" onkeydown="validateTotalData()" onkeyup="multiply(this)" onkeypress="return onlyNumberKey(event)" onclick="checkTotalQuestion()" value="' + d1['mPQ'][i - 1] + '" maxlength="3"></td><td>\
                                    <p>Is time limit on this section</p>\
                                    <label><input type="radio" name="time_'+ i + '" id="set-time-limit_true_id_' + i + '" onclick="checkForTimer(this)" value="yes"> Yes</label>\
                                        <label><input type="radio"  name="time_'+ i + '" value="no" onclick="checkForTimer(this)" checked> No</label>\
                                            <div class="set-time-limit" id="set-time-limit_'+ i + '">\
                                                <div>\
                                            <label>Duration</label>\
                                            <input type="text" name="" id="sectionDuration_'+ i + '" placeholder="hh:mm:ss">\
                                                        </div>\
                                            <div>\
                                                <label>Time limit starts after</label>\
                                                <input type="text" id="sectionDurationStartAfter_'+ i + '" name="" placeholder="hh:mm:ss">\
                                                        </div>\
                                            </div>\
                                                   </td>\
                                        <td><input type="text" id="totalMarksPerQuestion_'+ i + '" value="' + d1['mPS'][i - 1] + '" readonly="" name="" class="total_marks"></td>\
                                                 </tr>';
        }
        $('#sectionalRows').html('');
        $('#sectionalRows').append(sectionRow);
        $('#sections').show()

        localStorage.setItem('numberofSections', totalSections);

        var totalQuestions = $('#totalQuestions').val();
        if (totalQuestions.length == 0) {
            $('.qno').prop('readonly', true);
            $('.marks').prop('readonly', true);
        } else {
            $('.qno').prop('readonly', false);
            $('.marks').prop('readonly', false);
        }
    }
    // =================================================    option for question numbers    ================================================================


    sectionData = ''
    for (var i = 1; i <= totalSections; i++) {
        var questionDetailRow = '<option>Section ' + d1['sno'][i - 1] + '</option>';
        sectionData = sectionData + questionDetailRow;
    }
    questionData = 0
    var nOQ = d1['nOQ']
    for (var j = 0; j < nOQ.length; j++) {
        questionData = parseInt(questionData) + parseInt(nOQ[j])
    }
    questionDataNo = ''
    for (var i = 1; i <= parseInt(questionData); i++) {
        var questionDetailRow = '<option> Question ' + i + '</option>';
        questionDataNo = questionDataNo + questionDetailRow;
    }
    questionTypeData = ''
    for (var i = 1; i <= totalSections; i++) {
        var questionTypeDetailRow = '<option>' + d1['questionType'][i - 1] + '</option>';
        questionTypeData = questionTypeData + questionTypeDetailRow;
    }

    console.log(sectionData, questionDataNo, questionTypeData);

    // ==================================================================================================================================================
    var x = $('input[name="set"]:checked').val();
    if (x == 'yes') {
        $('.set-creation .set-options').show();
    } else {
        $('.set-creation .set-options').hide();
    }



    // ============================================   hiddenQuestionDetails   ==========================================
    // var hiddenQuestionDetails = $('#hiddenQuestionDetails').text();
    // var res = hiddenQuestionDetails.replace("[", "");
    // var res1 = res.replace("]", "");
    // // var res2 = res1.replaceAll("'", "");

    // var data = res1.split("'")

    // dataArr = []
    // for (var i = 0; i < data.length; i++) {
    //     if (i % 2 != 0) { // index is even
    //         dataArr.push(data[i]);
    //     }
    // }

    // console.log(dataArr);

    // var rowCount = $('#questdetails tr').length;
    // for (var i = 0; i < rowCount; i++) {
    //     // var sectionData = $('#section_' + i).val();
    //     var questionData = $('#questionData_' + (i+1)).val(dataArr[i]);
    //     console.log(questionData);
    //     // var questionTypeData = $('#questionType_' + i).val();
    // }
});
// ========================================================================================================================================================
// ========================================================================================================================================================
function addMoreSection() {
    var rowCount = $('#questdetails tr').length;
    var questTot = $('#totalQuestions').val();
    var sectionTot = $('#no-of-section').val();

    if (questTot == sectionTot || rowCount == questTot){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You can't add more rows!",
        })
        return false
    }else{
        var rowCount = $('#questdetails tr').length;
        var i = rowCount + 1;
        var newRow = '<tr id="questionDetail_' + i + '"><td>\
                                        <select  title="Select Section" class="selectpicker d-block" name="" id="section_'+ i + '">' + sectionData + '</select></td>\
                                        <td>\
                                            <select  title="Select question" class="selectpicker d-block" multiple data-live-search="false" id="questionData_'+ i + '">' + questionDataNo + '</select>\
                                        </td>\
                                        <td>\
                                        <select  title="Select question type" class="selectpicker d-block"  data-live-search="false" id="questionType_'+ i + '">\
                                                <option>Objective</option>\
                                                <option>Subjective</option>\
                                                <option>Fill in the Blanks</option>\
                                                <option>True/False</option>\
                                                <option>Coding</option>\
                                        </select>\
                                        </td>\
                                        <td><i id="trash_'+ i + '" class="fa fa-trash" aria-hidden="true" style="margin-top: 8px;float:right;font-size:25px;color:red;"\
                                        onclick="deleteSectionRow(this)"></i></td></tr>';
        console.log('newRow : ', newRow);
        $('#questdetails').append(newRow);
        $('select').selectpicker();
    }
}

// ========================================================================================================================================================
// ========================================================================================================================================================
function deleteSectionRow(thistxt) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this data?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            var id = thistxt['id'].split('_')
            $('#questionDetail_' + id[1]).remove();
        }
    })
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function editPaperId() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You can't edit unique paper ID!",
    })
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function editPaperName() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You can't edit unique paper name!",
    })
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function onlyNumberKey(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}
// ====================================================    VALIDATE BASIC DETAILS OF EXAM PAPER   =============================================================
// ============================================================================================================================================================
function validateAssociatedCourse() {
    var associatedCourse = $('#associatedCourse').val();

    // var regex = /^[ A-Za-z0-9_-]*$/;
    if (associatedCourse.trim().length <= 0) {
        // if (associatedCourse.match(regex)) {
        //     $('#associatedCourse').css('border', '');
        //     $('#associatedCourseError').html('');
        //     $('#basicPaperDetailBtn').attr('disabled', false);
        // } 
        // if {
        $('#associatedCourse').css('border', '2px solid red');
        // $('#associatedCourseError').html('Only alpha-numeric characters,- and _ allowed!');
        $('#basicPaperDetailBtn').attr('disabled', true);
        // }
    } else {
        $('#associatedCourse').css('border', '');
        $('#associatedCourseError').html('');
        $('#basicPaperDetailBtn').attr('disabled', false);
    }
}
// ============================================================================================================================================================
function validateTotalMarks() {
    var totalMarks = $('#totalMarks').val();
    var passingMarks = $('#passingMarks').val();
    if (parseInt(totalMarks) < parseInt(passingMarks)) {
        $('#totalMarksError').html('Total marks cant be less than passing marks!');
        $('#totalMarks').css('border', '2px solid red');
        $('#passingMarksError').html('Passing marks cant be greater than passing marks!');
        $('#passingMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
        $('#total_Marks').val(totalMarks);

    } else if (totalMarks.length == 0) {
        $('#totalMarksError').html('Please enter total marks.');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
        $('#total_Marks').val();

    } else if (totalMarks == 0) {
        $('#totalMarksError').html('Please enter valid total marks.');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
        $('#total_Marks').val();

    }
    else {
        $('#totalMarksError').html('');
        $('#total_Marks').val(totalMarks);
        $('#totalMarks').css('border', '');
        $('#passingMarksError').html('');
        $('#passingMarks').css('border', '');
        $('#basicPaperDetailBtn').attr('disabled', false);
    }
    // localStorage.setItem('total_marks', totalMarks);
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function changeTotalmarks() {
    if ($('#totalMarks').prop('readonly')) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to edit total marks?\n This will remove your total section marks and marks per section data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#totalMarks').attr('readonly', false);
            }
        })
    }
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function changePassingMarks() {
    if ($('#passingMarks').prop('readonly')) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to edit passing marks?\n This may change your total marks!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#passingMarks').attr('readonly', false);
            }
        })
    }
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function validatePassingMarks() {
    var totalMarks = $('#totalMarks').val();
    var passingMarks = $('#passingMarks').val();
    if (parseInt(totalMarks) < parseInt(passingMarks)) {
        $('#passingMarksError').html('Passing marks cant be greater than passing marks!');
        $('#passingMarks').css('border', '2px solid red');
        $('#totalMarksError').html('Total marks cant be less than passing marks!');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);

    } else if (totalMarks.length == 0) {
        $('#totalMarksError').html('Please enter total marks.');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
    }
    else {
        $('#passingMarksError').html('');
        $('#passingMarks').css('border', '');
        $('#totalMarksError').html('');
        $('#totalMarks').css('border', '');
        $('#basicPaperDetailBtn').attr('disabled', false);
    }

}
// ========================================================================================================================================================
// ========================================================================================================================================================
function validateUniquePapername() {
    var uniquePaperName = $('#uniquePaperName').val();
    // var regex = /^[ A-Za-z]*$/;
    if (uniquePaperName.trim().length <= 0) {
        // if (uniquePaperName.match(regex)) {
        //     $('#uniquePaperName').css('border', '');
        //     $('#uniquePaperNameError').html('');
        //     $('#basicPaperDetailBtn').attr('disabled', false);
        // }
        //  else {
        $('#uniquePaperName').css('border', '2px solid red');
        // $('#uniquePaperNameError').html('Only alphanumeric allowed!');
        $('#basicPaperDetailBtn').attr('disabled', true);

        // }
    } else {
        $('#uniquePaperName').css('border', '');
        $('#uniquePaperNameError').html('');
        $('#basicPaperDetailBtn').attr('disabled', false);

    }
}
// ========================================================================================================================================================
// ========================================================================================================================================================
function validateUniquePaperID() {
    // var uniquePaperId = $('#uniquePaperId').val();
    // var regex = /^[ A-Za-z0-9_-]*$/;
    // if (uniquePaperId.length > 0) {
    //     if (uniquePaperId.match(regex)) {
    //         $('#uniquePaperId').css('border', '');
    //         $('#uniquePaperIdError').html('');

    //     } else {
    //         $('#uniquePaperId').css('border', '2px solid red');
    //         $('#uniquePaperIdError').html('Only alpha-numeric characters,- and _ allowed!');
    //     }
    // } else {
    //     $('#uniquePaperId').css('border', '');
    //     $('#uniquePaperIdError').html('');
    // }
}
// ===============================================================================================================================================================
// // ============================================================================================================================================================
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
// ======================================================================================================================================================
// =======================================     VALIDATION ON PAPER CREDIT     ===========================================================================
function checkCredit() {
    var papaercredit = $('#paperCredit').val();
    if (papaercredit.length == 0) {
        Swal.fire('<small>Please enter paper credit.</small>');
    }
    return false;
}

function creditValidate() {
    var papaercredit = $('#paperCredit').val();
}
// ============================================================================================================================================================
// ============================================================================================================================================================
function validatePaperCredit() {
}
// ============================================================================================================================================================
// ============================================================================================================================================================
function changeSection() {
    if ($('#no-of-section').prop('readonly')) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to edit total section?\n This will remove all your data !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#no-of-section').attr('readonly', false);
            }
        })
    }
}
// ============================================================================================================================================================
// ============================================================================================================================================================
function changeTotalQuest() {
    if ($('#totalQuestions').prop('readonly')) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to edit total questions?\n This will remove your section question and question type details data! !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#totalQuestions').attr('readonly', false);
            }
        })
    }
}
// ============================================================================================================================================================
// ==================================     RENDERING THE SECTION DETAIL SECTION     ======================================================================
function renderSections() {
    sectionRow = '';
    var totalSections = $('#no-of-section').val();
    if (totalSections.length == 0) {
        $('#sectionalRows').html('');
        $('#totalQuestions').val('');
        $('#sections').hide()
        return false;
    } else if (totalSections == 0) {
        $('#no-of-section').val('');
        Swal.fire('<small>Please enter valid sections.</small>')
    } else {
        for (var i = 1; i <= totalSections; i++) {
            var sectionRow = sectionRow + '<tr id="sectionRowNo_' + i + '"><td>\
                        <span class="sno" id="sno_'+ i + '">' + i + '</span></td>\
                        <td><input type="text" name="" id="noOfQuestion_'+ i + '" class="qno" onkeydown="validateTotalData()" onkeypress="return onlyNumberKey(event)" onkeyup="multiply(this)" onclick="checkTotalQuestion()" maxlength="3"></td>\
                            <td><input type="text" name="" id="marksPerQues_'+ i + '" class="marks" onkeydown="validateTotalData()" onkeyup="multiply(this)" onkeypress="return onlyNumberKey(event)" onclick="checkTotalQuestion()" maxlength="3"></td><td>\
                                    <p>Is time limit on this section</p>\
                                    <label><input type="radio" name="time_'+ i + '" id="set-time-limit_true_id_' + i + '" onclick="checkForTimer(this)" value="yes"> Yes</label>\
                                        <label><input type="radio"  name="time_'+ i + '" value="no" onclick="checkForTimer(this)" checked> No</label>\
                                            <div class="set-time-limit" id="set-time-limit_'+ i + '">\
                                                <div>\
                                            <label>Duration</label>\
                                            <input type="text" name="" id="sectionDuration_'+ i + '" placeholder="hh:mm:ss">\
                                                        </div>\
                                            <div>\
                                                <label>Time limit starts after</label>\
                                                <input type="text" id="sectionDurationStartAfter_'+ i + '" name="" placeholder="hh:mm:ss">\
                                                        </div>\
                                            </div>\
                                                   </td>\
                                        <td><input type="text" id="totalMarksPerQuestion_'+ i + '" readonly="" name="" class="total_marks"></td>\
                                                 </tr>';
        }
        $('#questdetails').html('');
        $('#addMoreQuestionDetailButton').prop('disabled',true);
        $('#hideNoData').show();
        $('#sectionalRows').html('');
        $('#sectionalRows').append(sectionRow);
        $('#sections').show()
        $('#totalQuestions').prop('readonly', false);
        $('#totalQuestions').val('');
        localStorage.setItem('numberofSections', totalSections);

        var totalQuestions = $('#totalQuestions').val();
        if (totalQuestions.length == 0) {
            $('.qno').prop('readonly', true);
            $('.marks').prop('readonly', true);
        } else {
            $('.qno').prop('readonly', false);
            $('.marks').prop('readonly', false);
        }
    }
}
// ============================================================================================================================================================
// ============================================================     CHECK FOR TIMER    ========================================================================
function checkForTimer(thistxt) {
    if ($(thistxt).attr('value') == "yes") {
        $(thistxt).parents('td').find('.set-time-limit').show();
    }
    else {
        $(thistxt).parents('td').find('.set-time-limit').hide();
    }
}
// ============================================================================================================================================================
// ==========================================   VALIDATION ON TOTAL NUMBER OF QUESTIONS    ====================================================================
function checkTotalQuestion() {
    var totalQuestions = $('#totalQuestions').val();
    if (totalQuestions.length == 0) {
        Swal.fire('<small>Please enter total questions.</small>');
    }
    return false;
}
// ============================================================================================================================================================
// ============================================================================================================================================================
function checkTotalNumberOfQuestions() {
    var totalQuestions = $('#totalQuestions').val();
    var sectionData = localStorage.getItem('numberofSections');

    if (totalQuestions >= sectionData) {
        if (totalQuestions.length != 0) {
            $('#totalQuestionsError').html('')
            $('#totalQuestions').css('border', '');
            $('.qno').prop('readonly', false);
            $('.marks').prop('readonly', false);
            localStorage.setItem('totalQuestions', totalQuestions);
            $('.displayPossibility').css('display', '');
            $('#paperSectionBtn').attr('disabled', false);

            $('#hideNoData').hide();
            // ==============================================
            sectionDataString = ''
            for (var i = 1; i <= parseInt(sectionData); i++) {
                var questionDetailRow = '<option>Section ' + i + '</option>';
                sectionDataString = sectionDataString + questionDetailRow;
            }
            
            questionDataNo = ''
            for (var i = 1; i <= parseInt(totalQuestions); i++) {
                var questionDetailRow = '<option> Question ' + i + '</option>';
                questionDataNo = questionDataNo + questionDetailRow;
            }            
            questiondetailString = '';
            
            $('#questdetails').html('');
            for (var i = 1; i <= parseInt(sectionData);i++){
                questionDetailData = '<tr id="questionDetail_' + i + '"><td>\
                                                <select  title="Select section" class="selectpicker d-block" style="display:block !important;" name="" id="section_'+ i + '">' + sectionDataString + '</select></td>\
                                                <td>\
                                                    <select  title="Select question" class="selectpicker d-block" style="display:block !important;" multiple data-live-search="false" id="questionData_'+ i + '">' + questionDataNo + '</select>\
                                                </td>\
                                                <td>\
                                                <select  title="Select question type" class="selectpicker d-block" style="display:block !important;"  data-live-search="false" id="questionType_'+ i + '">\
                                                        <option>Objective</option>\
                                                        <option>Subjective</option>\
                                                        <option>Fill in the Blanks</option>\
                                                        <option>True/False</option>\
                                                        <option>Coding</option>\
                                                </select>\
                                                </td>\
                                                    <td><i id="trash_'+ i + '" class="fa fa-trash" aria-hidden="true" style="margin-top: 8px;float:right;font-size:25px;color:red;" onclick="deleteSectionRow(this)"></i></td></tr>';
                questiondetailString = questiondetailString + questionDetailData;
            }
            console.log(questiondetailString);
            
            $('#questdetails').append(questiondetailString);
            $('select').selectpicker();
            $('#addMoreQuestionDetailButton').prop('disabled', false);
            // ==============================================

        } else {
            $('#totalQuestionsError').html('Please enter total questions.')
            $('#totalQuestions').css('border', '2px solid red');
            $('.qno').prop('readonly', true);
            $('.marks').prop('readonly', true);
            $('.qno').val('');
            $('.marks').val('');
            $('.displayPossibility').css('display', 'none');
            $('#paperSectionBtn').attr('disabled', true);
            $('#hideNoData').show();
        }
    } else if (totalQuestions.length == 0) {
        $('#totalQuestionsError').html('Please enter total questions.')
        $('#totalQuestions').css('border', '2px solid red');
        $('.qno').prop('readonly', true);
        $('.marks').prop('readonly', true);
        $('.qno').val('');
        $('.marks').val('');
        $('.displayPossibility').css('display', 'none');
        $('#paperSectionBtn').attr('disabled', true);
        $('#hideNoData').show();

    }
    else {
        var totalQuestions = $('#totalQuestions').val('');
        Swal.fire("<small>Total question can't be less than total sections.</small>");
        $('.displayPossibility').css('display', 'none');
        $('#paperSectionBtn').attr('disabled', true);
        $('#hideNoData').show();

        return false;
    }
}
// ============================================================================================================================================================
// =========================================    VALIDATION ON QUES/SECTION & MARKS/QUESTION   =================================================================
function multiply(thistxt) {
    var sectionData = localStorage.getItem('numberofSections');
    var splited_data = thistxt['id'].split('_');
    var questionData = $('#noOfQuestion_' + splited_data[1]).val();
    var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val();
    // var totalMarksPerQuestion = $('#totalMarksPerQuestion_' + splited_data[1]).val();
    var totalQuestions = $('#totalQuestions').val();
    var totalMarks = $('#total_Marks').val();

    // -------------------   checking all rows quest sum  ----------------------------------------
    var rowCount = document.getElementsByTagName("tr").length - 1;
    totalQuest = 0
    for (var i = 1; i <= rowCount; i++) {
        var x = parseInt($('#noOfQuestion_' + i).val());

        if (isNaN(x)) {
            x == parseInt(0);
        }
        else {
            totalQuest = totalQuest + parseInt(x);
        }
    }
    // =================================================================================================
    total_Marks = 0
    for (var i = 1; i <= rowCount; i++) {
        var y = parseInt($('#marksPerQues_' + i).val());

        if (isNaN(y)) {
            y == parseInt(0);
        }
        else {
            total_Marks = total_Marks + parseInt(y);
        }
    }
    // =================================================================================================

    if (totalQuest > totalQuestions) {
        Swal.fire('<small>Total number of question limit exceeded.</small>');
        var questionData = $('#noOfQuestion_' + splited_data[1]).val('');
        var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val('');
    }

    if (parseInt(sectionData) > 1) {
        if (questionData.length == 0 || marksPerQuestData.length == 0) {
            $('#totalMarksPerQuestion_' + splited_data[1]).val('-');
            if (parseInt(questionData) > parseInt(totalQuestions)) {
                Swal.fire('<small>Total number of question limit exceeded.</small>');
                var questionData = $('#noOfQuestion_' + splited_data[1]).val('');
                var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val('');
                $('#totalMarksPerQuestion_' + splited_data[1]).val('');
            }
            else if (parseInt(questionData) == parseInt(totalQuestions)) {
                Swal.fire('<small>Number of question cannot be same as total question.</small>');
                var questionData = $('#noOfQuestion_' + splited_data[1]).val('');
                var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val('');
                $('#totalMarksPerQuestion_' + splited_data[1]).val('');
            }
        }
        else if (parseInt(questionData) < parseInt(totalQuestions)) {
            totalMarksPerQuest = parseInt(questionData) * parseInt(marksPerQuestData);
            console.log('totalMarksPerQuest : ', totalMarksPerQuest);
            $('#totalMarksPerQuestion_' + splited_data[1]).val(totalMarksPerQuest);
        }
        else {
            Swal.fire('<small>Total number of question limit exceeded.</small>');
            var questionData = $('#noOfQuestion_' + splited_data[1]).val('');
            var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val('');
            $('#totalMarksPerQuestion_' + splited_data[1]).val('');
        }
    }
    else if (parseInt(sectionData) == 1) {
        if (questionData.length == 0 || marksPerQuestData.length == 0) {
            $('#totalMarksPerQuestion_' + splited_data[1]).val('-');
            if (parseInt(questionData) > parseInt(totalQuestions)) {
                Swal.fire('<small>Total number of question limit exceeded.</small>');
                var questionData = $('#noOfQuestion_' + splited_data[1]).val('');
                var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val('');
                $('#totalMarksPerQuestion_' + splited_data[1]).val('');
            }
            else if (parseInt(questionData) < parseInt(totalQuestions)) {
                Swal.fire('<small>Number of question must be same as total question.</small>');
                var questionData = $('#noOfQuestion_' + splited_data[1]).val('');
                var marksPerQuestData = $('#marksPerQues_' + splited_data[1]).val('');
                $('#totalMarksPerQuestion_' + splited_data[1]).val('');
            }
        }
        else if (parseInt(questionData) == parseInt(totalQuestions)) {
            total = parseInt(questionData) * parseInt(marksPerQuestData);
            console.log('total : ', total);
            $('#totalMarksPerQuestion_' + splited_data[1]).val(total);
        }
    }
}


// ============================================================================================================================================================
// ========================================     validateTotalData    ==========================================================================================
function validateTotalData() {
    var rowCount = document.getElementsByTagName("tr").length - 1;
}

// ============================================================================================================================================================
// ==========================================================      validateTotalMarksAndQuestion      =========================================================
function validateTotalMarksAndQuestion() {
    var rowCount = document.getElementsByTagName("tr").length - 1;
    var totalQuestions = $('#totalQuestions').val();
    var totalMarks = $('#totalMarks').val();
    // TOTAL QUESTIONS
    totalQuest = 0
    for (var i = 1; i <= rowCount; i++) {
        var x = parseInt($('#noOfQuestion_' + i).val());
        if (isNaN(x)) {
            x == parseInt(0);
        }
        else {
            totalQuest = totalQuest + parseInt(x);
        }
    }
    // TOTAL MARKS
    total_Marks = 0
    for (var i = 1; i <= rowCount; i++) {
        var x = parseInt($('#totalMarksPerQuestion_' + i).val());
        if (isNaN(x)) {
            x == parseInt(0);
        }
        else {
            total_Marks = total_Marks + parseInt(x);
        }
    }
    if (parseInt(totalQuestions) > parseInt(totalQuest)) {
        Swal.fire('<small>Total section question is less than Total questions.</small>');
        return false;
    } else if (parseInt(totalQuestions) < parseInt(totalQuest)) {
        Swal.fire('<small>Total section question is greater than Total questions.</small>');
        return false;
    } else if (parseInt(totalMarks) > parseInt(total_Marks)) {
        Swal.fire('<small>Total section marks is less than Total marks.</small>');
        return false;
    } else if (parseInt(totalMarks) < parseInt(total_Marks)) {
        Swal.fire('<small>Total section marks is greater than Total marks.</small>');
        return false;
    } else {
        console.log('else part');
        var rowCount = document.getElementsByTagName("tr").length - 1;
        console.log('rowCount : ', rowCount);
        var sectionRowData = []
        for (var i = 1; i <= rowCount; i++) {

            var sno = $('#sno_' + i).html();
            var no_Of_Question = $('#noOfQuestion_' + i).val();
            var marks_per__Question = $('#marksPerQues_' + i).val();
            var marks_per_section = $('#totalMarksPerQuestion_' + i).val();
            var timeLimit = $("input[name='time_" + i + "']:checked").val();
            var sectionalTiming = []
            if (timeLimit == 'yes') {
                var seectionTime = $('#sectionDuration_' + i).val();
                var seectionTimeStartAfter = $('#sectionDurationStartAfter_' + i).val();
                sectionalTiming.push('( Duration: ' + seectionTime + ' | Time starts after: ' + seectionTimeStartAfter + ')');
            } else {
                sectionalTiming.push('');
            }

            sectionRowData.push(sno + '-' + no_Of_Question + '-' + marks_per__Question + '-' + timeLimit + '-' + sectionalTiming + '-' + marks_per_section);
        }
        console.log(sectionRowData);
        var sectionCount = document.getElementsByTagName("tr").length - 1;
        var paperCredit = $('#paperCredit').val();
        var totalQuestions = $('#totalQuestions').val();
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: "create_paper_2",
            headers: { 'X-CSRFToken': csrftoken },
            data: { sectionDetail: sectionRowData, totalQuestions: totalQuestions, noOfSection: sectionCount, paperCredit: paperCredit },
            success: function (response) {
                console.log(response);
                if (response === 'success') {
                    location.href = "/create_paper_3";
                } else {
                    alert('An error occured!');
                    return false;
                }
            }
        });
    }
}
// ============================================================================================================================================================
// ==========================================================   CHECK sets  ===================================================================================
function paperSetOptions(thistxt) {
    if ($(thistxt).attr('value') == "yes") {
        $('.set-creation .set-options').show();
    }
    else {
        $('.set-creation .set-options').hide();
    }
}
// ============================================================================================================================================================
// ============================================================================================================================================================
// ============================================================================================================================================================
// ============================================================================================================================================================
//                                                            UPDATE   EXAM   PAPER   DATA
// ============================================================================================================================================================
// required fields for updation :
// "paperID": "114851",
//     "paperName": "5468745dd",
//         "paperAssociateCourse": null,
//             "paperTotalMarks": null,
//                 "paperPassingMark": null,
//                     "paperCredit": null,
//                         "totalSection": null,
//                             "totalPaperTime": null,
//                                 "totalnumberOuestion": null,
//                                     "sectionDetails": null,
//                                         "questionTypeDetails": null,
//                                             "automatedSet": false,
//                                                 "setsTypeDetails": null
// ============================================================================================================================================================
// ============================================================================================================================================================
// ============================================================================================================================================================
function updatePaper() {

    Swal.fire({
        title: 'Are you sure?',
        text: "Changes can't be reverted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            // ---------------------------------------------------     edit basic details     ------------------------------------------------------
            var uniquePaperId = $('#uniquePaperId').val();
            var uniquePaperName = $('#uniquePaperName').val();
            var associatedCourse = $('#associatedCourse').val();
            var totalMarks = $('#totalMarks').val();
            var passingMarks = $('#passingMarks').val();

            // ----------------------------------------------------    edit paper section dtails     ------------------------------------------------
            var paperCredit = $('#paperCredit').val();
            var no_of_section = $('#no-of-section').val();
            var totalQuestions = $('#totalQuestions').val();
            // edit paper section
            var rowCount = $('#sectionalRows tr').length;
            var sectionRowData = []
            for (var i = 1; i <= rowCount; i++) {
                var sno = $('#sno_' + i).html();
                var no_Of_Question = $('#noOfQuestion_' + i).val();
                var marks_per__Question = $('#marksPerQues_' + i).val();
                var marks_per_section = $('#totalMarksPerQuestion_' + i).val();
                var timeLimit = $("input[name='time_" + i + "']:checked").val();
                var sectionalTiming = []
                if (timeLimit == 'yes') {
                    var seectionTime = $('#sectionDuration_' + i).val();
                    var seectionTimeStartAfter = $('#sectionDurationStartAfter_' + i).val();
                    sectionalTiming.push('( Duration: ' + seectionTime + ' | Time starts after: ' + seectionTimeStartAfter + ')');
                } else {
                    sectionalTiming.push('');
                }
                sectionRowData.push(sno + '-' + no_Of_Question + '-' + marks_per__Question + '-' + timeLimit + '-' + sectionalTiming + '-' + marks_per_section);
            }
            // -----------------------------------------------------    Edit Question Type Details   -------------------------------------------------
            var rowCount = $('#questdetails tr').length;
            console.log('rowCount : ', rowCount);
            var questionTypeDetail = []

            for (var i = 1; i <= rowCount; i++) {
                var sectionData = $('#section_' + i).val();
                var questionData = $('#questionData_' + i).val();
                var questionTypeData = $('#questionType_' + i).val();

                questionTypeDetail.push(sectionData + '-' + questionData + '-' + questionTypeData);
            }
            // -----------------------------------------------------     Edit Paper Set Options   ----------------------------------------------------
            var setOption = $('input[name="set"]:checked').val();
            if (setOption == 'yes') {
                setOption = true;
                var maxPossibleSets = $('#maxPossibleSets').val();
                var languageSelect = $('#languageSelect').val();
                var allowedOption = $('#allowedOption').val();
                var setData = []
                setData.push(maxPossibleSets + '-' + languageSelect + '-' + allowedOption)
                console.log(setData);
            } else {
                setOption = false;
                var maxPossibleSets = ''
                var languageSelect = ''
                var allowedOption = ''
                var setData = []
                setData.push(maxPossibleSets + '-' + languageSelect + '-' + allowedOption)
            }
            var url = window.location.href;
            var urlSplit = url.split('/');
            var id = urlSplit.pop();

            // ---------------------------------------------------------------------------------------------------------------------------------------
            sno = []
            nOQ = []
            mPQ = []
            tL = []
            mPS = []
            data = []
            for (var i = 0; i < sectionRowData.length; i++) {
                data.push(sectionRowData[i].split('-'))
            }
            console.log('data : ', data);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i][0]);
                sno.push(data[i][0])
                nOQ.push(data[i][1])
                mPQ.push(data[i][2])
                tL.push(data[i][3] + data[i][4])
                mPS.push(data[i][5])
            }
            context = {}
            context['sno'] = sno
            context['nOQ'] = nOQ
            context['mPQ'] = mPQ
            context['tL'] = tL
            context['mPS'] = mPS
            section = []
            questionNumer = []
            questionType = []
            questionDetailData = []
            splitedQuestions = []
            for (var i = 0; i < questionTypeDetail.length; i++) {
                questionDetailData.push(questionTypeDetail[i].split('-'))
            }
            for (var i = 0; i < questionDetailData.length; i++) {
                console.log(questionDetailData[i][0]);
                section.push(questionDetailData[i][0])
                questionNumer.push(questionDetailData[i][1])
                questionType.push(questionDetailData[i][2])
            }
            context['section'] = section
            context['questionNumer'] = questionNumer
            context['questionType'] = questionType
            setDataList = []
            for (var i = 0; i < setData.length; i++) {
                setDataList.push(setData[i].split('-'))
            }
            console.log('data :>>>>>>>>> ', setDataList)
            possibleSets = setDataList[0]
            languages = setDataList[1]
            allowedOptions = setDataList[2]
            dataString = JSON.stringify(context);
            // ------------------------------------------------------------------------------------------------------
            tokenKey = $('#tokenKey').text();
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Token " + tokenKey + "");
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "paperID": uniquePaperId, "paperName": uniquePaperName, "paperAssociateCourse": associatedCourse, "paperTotalMarks": totalMarks, "paperPassingMark": passingMarks, "paperCredit": paperCredit, "totalSection": no_of_section, "totalnumberOuestion": totalQuestions, "sectionDetails": sectionRowData.toString(), "questionTypeDetails": dataString, "automatedSet": setOption, "setsTypeDetails": setData.toString()
            });
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://13.233.247.133/api/paper_detail/" + id + '/', requestOptions)
                .then(response => response.text())
                .then(result => window.location.href = '/paper_list')
                .catch(error => console.log('error', error));
        }
    })
 


}




































































// $('.sections input[type=radio]').on('click', function (e) {
//     if ($(this).attr('value') == "yes") {
//         $(this).parents('td').find('.set-time-limit').show();
//     }
//     else {
//         $(this).parents('td').find('.set-time-limit').hide();
//     }
// });

// $('.set-creation input[type=radio][name=set]').on('click', function (e) {
//     if ($(this).attr('value') == "yes") {
//         $('.set-creation .set-options').show();
//     }
//     else {
//         $('.set-creation .set-options').hide();
//     }
// });