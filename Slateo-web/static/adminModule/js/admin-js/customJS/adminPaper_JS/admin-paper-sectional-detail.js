// ======================================================================================================================================================
// ======================================        ON-RAEDY FUNCTION FOR PREVIOUS BUTTON       ==============================================================
// ======================================================================================================================================================
$(document).ready(function () {
    var data = $('#no-of-section').val();
    localStorage.removeItem('totalMarks');
    // if(data > 0){
    //     alert(data);
    // }else{
    //     alert('blank section field!');
    // }
});

// ======================================================================================================================================================
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



function onlyNumberKey(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
}
function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}
// =====================================================================================================================================================
// var totalMarks = localStorage.getItem('total_marks');
// alert(totalMarks);
// $('#totalMarks').val(totalMarks);


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
    if (papaercredit.length == 0) {
        $('#no-of-section').prop('readonly', true);
    } else {
        $('#no-of-section').prop('readonly', false);
    }
}

function validatePaperCredit() {
    alert();
}
// ==================================     RENDERING THE SECTION DETAIL SECTION     ======================================================================
function renderSections() {
    sectionRow = '';

    var totalMarks = localStorage.getItem('total_marks');
    $('#totalMarksData').val(totalMarks);

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
            // var sectionRow = sectionRow + '<tr id="sectionRowNo_' + i + '"><td>\
            //             <span class="sno" id="sno_'+ i + '">' + i + '</span></td>\
            //             <td><input type="text" name="" id="noOfQuestion_'+ i + '" class="qno" onkeydown="validateTotalData()" onkeypress="return onlyNumberKey(event)" onkeyup="multiply(this)" onclick="checkTotalQuestion()" maxlength="3"></td>\
            //                 <td><input type="text" name="" id="marksPerQues_'+ i + '" class="marks" onkeydown="validateTotalData()" onkeyup="multiply(this)" onkeypress="return onlyNumberKey(event)" onclick="checkTotalQuestion()" maxlength="3"></td><td>\
            //                         <p>Is time limit on this section</p>\
            //                         <label><input type="radio" name="time_'+ i + '" id="set-time-limit_true_id_' + i + '" onclick="checkForTimer(this)" value="yes"> Yes</label>\
            //                             <label><input type="radio"  name="time_'+ i + '" value="no" onclick="checkForTimer(this)" checked> No</label>\
            //                                 <div class="set-time-limit" id="set-time-limit_'+ i + '">\
            //                                     <div>\
            //                                 <label>Duration</label>\
            //                                 <input type="text" name="" id="sectionDuration_'+ i + '" placeholder="hh:mm:ss">\
            //                                             </div>\
            //                                 <div>\
            //                                     <label>Time limit starts after</label>\
            //                                     <input type="text" id="sectionDurationStartAfter_'+ i + '" name="" placeholder="hh:mm:ss">\
            //                                             </div>\
            //                                 </div>\
            //                                        </td>\
            //                             <td><input type="text" id="totalMarksPerQuestion_'+ i + '" readonly="" name="" class="total_marks"></td>\
            //                                      </tr>';
            var sectionRow = sectionRow + '<tr>\
                                            <td>\
                                               <span class="sno" id="sno_'+ i + '">' + i + '</span>\
                                            </td >\
                                            <td><input type="text" name="" id="noOfQuestion_'+ i + '" class="qno" onkeydown="" onkeypress="return onlyNumberKey(event)" onkeyup="validateNoOfQuestions(this)" onclick="" maxlength="3"></td>\
                                            <td><input type="text" name="" id="madatoryQuestion_'+ i + '" class="qno" onkeydown="" onkeypress="return onlyNumberKey(event)" onkeyup="multiply(this)" onclick="" maxlength="3"></td>\
                                            <td>\
                                                <select title="Select Q-Type" class="selectpicker d-block" multiple data-live-search="false" id="questionType_'+ i + '">\
                                                    <option>Objective</option>\
                                                    <option>Subjective</option>\
                                                </select>\
                                            </td>\
                                            <td class="time_limit">\
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
                                            <td><input type="text" id="totalMarksPerSection_'+ i + '"  name="" class="total_marks" onkeypress="return onlyNumberKey(event)" onkeyup="" maxlength="3"></td>\
                                            </tr>';
                                            
        }
        $('#sectionalRows').html('');
        $('#sectionalRows').append(sectionRow);
        $('select').selectpicker();
        $('#sections').show()
        $('#totalQuestions').val('');
        localStorage.setItem('numberofSections', totalSections);


        // var totalQuestions = $('#totalQuestions').val();
        // if (totalQuestions.length == 0) {
        //     $('.qno').prop('readonly', true);
        //     $('.marks').prop('readonly', true);
        // } else {
        //     $('.qno').prop('readonly', false);
        //     $('.marks').prop('readonly', false);
        // }
    }
}

// ============================================================     CHECK FOR TIMER    ==================================================================================================
function checkForTimer(thistxt) {
    if ($(thistxt).attr('value') == "yes") {
        $(thistxt).parents('td').find('.set-time-limit').show();
    }
    else {
        $(thistxt).parents('td').find('.set-time-limit').hide();
    }
}


// ==========================================   VALIDATION ON TOTAL NUMBER OF QUESTIONS    ==============================================================
function checkTotalQuestion() {
    var totalQuestions = $('#totalQuestions').val();
    if (totalQuestions.length == 0) {
        Swal.fire('<small>Please enter total questions.</small>');
    }
    return false;
}



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
        } else {
            $('#totalQuestionsError').html('Please enter total questions.')
            $('#totalQuestions').css('border', '2px solid red');
            $('.qno').prop('readonly', true);
            $('.marks').prop('readonly', true);
            $('.qno').val('');
            $('.marks').val('');
            $('.displayPossibility').css('display', 'none');
            $('#paperSectionBtn').attr('disabled', true);

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
    }
    else {
        var totalQuestions = $('#totalQuestions').val('');
        Swal.fire("<small>Total question can't be less than total sections.</small>");
        $('.displayPossibility').css('display', 'none');
        $('#paperSectionBtn').attr('disabled', true);
        return false;
    }
}
// ============================     ALGORITHM TO VALIDATE MAX. QUES. ASSIGNMENT POSSIBILITY    ============================================

// var total_questions = parseInt(totalQuestions);
// var total_section = parseInt(sectionData);
// var remaining_section = total_section - 1;
// var remaining_question = parseInt(0);
// var total_section = parseInt(sectionData);

// var i = 1
// var total_questions = parseInt(totalQuestions);
// var remaining_section = total_section - 1;

// while(i <= total_section){
//     console.log('--------------------------------------------------------------------------',i);
//     console.log('possibility_'+i);

//     // var remaining_question = parseInt(0);
//     var assigned_question = total_questions - remaining_section;
//     var sec = total_section
//     // var remaining_question = total_questions - assigned_question;

//     console.log('AQ : ', assigned_question, 'TS : ', sec, 'RS : ', remaining_section);
//     $('#possibility_'+i).html('max ques. assign possibility : ' + assigned_question);

//     total_questions = total_questions - assigned_question;
//     sec = remaining_section - 1;
//     remaining_section = sec - 1;
//     i = i + 1
// console.log('assigned : ',assigned_question,'remaining : ',remaining_question);
// }
// ==========================================================================================================================================
// }
// =========================================    VALIDATION FOR TIMER    ===================================================================================
// if ($(thistxt).attr('value') == "yes") {
//     $(thistxt).parents('td').find('.set-time-limit').show();
// }
// else {
//     $(thistxt).parents('td').find('.set-time-limit').hide();
// }
// =========================================    VALIDATION ON QUES/SECTION & MARKS/QUESTION   =============================================================
function multiply(thistxt) {
    var sectionData = localStorage.getItem('numberofSections');
    var splited_data = thistxt['id'].split('_');
    var questionData = $('#madatoryQuestion_' + splited_data[1]).val();
    var totalQuestions = $('#totalQuestions').val();
    // -------------------   checking all rows quest sum  ----------------------------------------
    var rowCount = document.getElementsByTagName("tr").length - 1;
    totalQuest = 0
    for (var i = 1; i <= rowCount; i++) {
        var x = parseInt($('#madatoryQuestion_' + i).val());
        var y = parseInt($('#noOfQuestion_' + i).val());
        if(x > y){
            $('#noOfQuestion_' + i).css('border','1px solid red');
        }else{
            $('#noOfQuestion_' + i).css('border', '');
        }

        if (isNaN(x)) {
            x == parseInt(0);
        }
        else {
            totalQuest = totalQuest + parseInt(x);
        }
    }
    if (totalQuest > totalQuestions) {
        Swal.fire('<small>Total number of question limit exceeded.</small>');
        var questionData = $('#madatoryQuestion_' + splited_data[1]).val('');
    }
    if (parseInt(sectionData) == 1) {
        if (questionData.length == 0) {
            if (parseInt(questionData) > parseInt(totalQuestions)) {
                Swal.fire('<small>Total number of question limit exceeded.</small>');
                var questionData = $('#madatoryQuestion_' + splited_data[1]).val('');
            }
            else if (parseInt(questionData) < parseInt(totalQuestions)) {
                Swal.fire('<small>Number of question must be same as total question.</small>');
                var questionData = $('#madatoryQuestion_' + splited_data[1]).val('');
            }
        }
    }
    if (parseInt(sectionData) > 1) {
        if (parseInt(questionData) == parseInt(totalQuestions)) {
                Swal.fire('<small>Number of question must be same as total question.</small>');
                var questionData = $('#madatoryQuestion_' + splited_data[1]).val('');
            }
    }
}


// ========================================     validateNoOfQuestions    ==================================================================================
function validateNoOfQuestions(thistxt) {
    var rowCount = document.getElementsByTagName("tr").length - 1;
    for (var i = 1; i <= rowCount; i++) {
        var x = parseInt($('#madatoryQuestion_' + i).val());
        var y = parseInt($('#noOfQuestion_' + i).val());
        if (x > y) {
            $('#noOfQuestion_' + i).css('border', '1px solid red');
        } else {
            $('#noOfQuestion_' + i).css('border', '');
        }
    }
}


// ==========================================================      validateTotalMarksAndQuestion      =============================================================================
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
// ======================================================================================================================================================
// ==========================================   VALIDATION ON TOTAL NUMBER OF QUESTIONS    ==============================================================
function checkTotalQuestion() {
    var totalQuestions = $('#totalQuestions').val();
    var totalSection = $('#no-of-section').val();

    if (totalQuestions.length == 0) {
        $('#sectionalRows').css('opacity', 0.3);
        $('#sectionalRows').css('pointer-events', 'none');
        return false;
    }
    if (totalQuestions == '0') {
        var totalQuestions = $('#totalQuestions').val('');
        Swal.fire('<small>Invalid total questions.</small>');
        $('#sectionalRows').css('opacity', 0.3);
        $('#sectionalRows').css('pointer-events', 'none');
        return false;
    }
    if (totalQuestions == '00') {
        var totalQuestions = $('#totalQuestions').val('');
        Swal.fire('<small>Invalid total questions.</small>');
        $('#sectionalRows').css('opacity', 0.3);
        $('#sectionalRows').css('pointer-events', 'none');
        return false;
    }
    if (totalQuestions == '000') {
        var totalQuestions = $('#totalQuestions').val('');
        Swal.fire('<small>Invalid total questions.</small>');
        $('#sectionalRows').css('opacity', 0.3);
        $('#sectionalRows').css('pointer-events', 'none');
        return false;
    }
    if (parseInt(totalQuestions) < parseInt(totalSection)) {
        var totalQuestions = $('#totalQuestions').val('');
        Swal.fire("<small>Total question can't be less than total sections.</small>");
        $('#sectionalRows').css('opacity', 0.3);
        $('#sectionalRows').css('pointer-events', 'none');
        return false;
    }
    else{
        $('#sectionalRows').css('opacity',1);
        $('#sectionalRows').css('pointer-events', '');
    }
}
// ======================================================================================================================================================
// ==========================================   VALIDATION ON TOTAL NUMBER OF QUESTIONS    ==============================================================
function changeTotalMarks(){
    Swal.fire("<small>You can't edit marks here!\nGo back!</small>");
    return false;
}






























// document.getElementById('table_to_highlight')
//     .addEventListener('click', function (item) {

//         // To get tr tag 
//         // In the row where we click 
//         var row = item.path[1];

//         var row_value = "";

//         for (var j = 0; j < row.cells.length; j++) {

//             row_value += row.cells[j].innerHTML;
//             row_value += " | ";
//         }

//         console.log(row_value);

//         // // Toggle the highlight 
//         // if (row.classList.contains('highlight'))
//         //     row.classList.remove('highlight');
//         // else
//         //     row.classList.add('highlight');
//     });















// $('#no-of-section').on('input', function (e) {
// $('#sections').show()
// });

// $('.sections input[type=radio]').on('click', function (e) {
//     if ($(this).attr('value') == "yes") {
//         $(this).parents('td').find('.set-time-limit').show();
//     }
//     else {
//         $(this).parents('td').find('.set-time-limit').hide();
//     }
// });
// // $('#sections .marks, #sections .qno').on('input', function (e) {
// //     var qno = $('#sections .qno').val();
// //     var marks = $('#sections .marks').val();
// //     var total = parseInt(qno) * parseInt(marks);
// //     $(this).parent().parent().find('td .total_marks').val(total);
// // });
// $('.ques_type table tr td #q_type').change(function () {
//     $(this).parent().parent().find('.last').html('<span class="q_type">Objective</span>');
// });

// // $('.ques_type .add-more').click(function () {
// //     $('.ques_type table tbody').append('<tr><td> <select class="form-control"><option class="d-none">Select</option><option>Section A</option><option>Section B</option> </select></td><td> <select title="Select question" class="selectpicker d-block" multiple data-live-search="false"><option>1</option><option>2</option><option>3</option><option>4</option> </select></td><td> <select id="q_type" title="Select question type" class="selectpicker d-block" multiple data-live-search="false"><option>Objctive</option><option>fill in the Blanks</option><option>True/false</option> </select></td><td ><div class="last"></div></td></tr>');
// //     $('select').selectpicker();
// // });

// $('.set-creation input[type=radio][name=set]').on('click', function (e) {
//     if ($(this).attr('value') == "yes") {
//         $('.set-creation .set-options').show();
//     }
//     else {
//         $('.set-creation .set-options').hide();
//     }
// });