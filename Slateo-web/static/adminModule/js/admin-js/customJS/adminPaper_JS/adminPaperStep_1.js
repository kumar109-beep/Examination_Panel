var universalDict = {};
var universalList = [];
var sectionDataDict = {};
var sectionDataList = [];

$(document).ready(function () {
    localStorage.setItem('paperStep',1);
    var courseName = document.getElementById("coursenameId");
    courseName.onchange = function () {
        associatedSubject.length = 1;
        var courseName = document.getElementById("coursenameId");
        var selectedCourseId = courseName.value;
        var data = '';
        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                console.log(response['subjectList']);
                if (response['subjectList'] === 'error')
                {
                    data = data + '<option value="">No Subject Associated to this Course !</option>';
                    hideStep_1_Input(data);

                }
                else
                {
                    if (response['subjectList']['data']['subjectNameFK'].length > 0)
                    {
                        for (var i = 0; i < response['subjectList']['data']['subjectNameFK'].length; i++) {
                            data = data + '<option value="' + response['subjectList']['data']['subjectNameFK'][i]['id'] + '">' + response['subjectList']['data']['subjectNameFK'][i]['subjectName'] + '</option>';
                        }
                        showStep_1_Input(data);

                    }
                    else
                    {
                        data = data + '<option value="">No Subject Associated to this Course !</option>'
                        hideStep_1_Input(data);

                    }
                }
            }
        });
    }
});



function showStep_1_Input(data) {
    $('#associatedSubject').html('');
    $('#associatedSubject').append(data);
    $('#associatedSubject').selectpicker('refresh');
    $('#totalExamTime').prop('readonly', false);
    $('#totalMarksData').prop('readonly', false);
    $('#passingMarks').prop('readonly', false);
    $('#language').prop('readonly', false);
    $('#guidelines').prop('readonly', false);
    $('#page_1_nextButton').prop('disabled', false);
}

function hideStep_1_Input(data) {
    $('#associatedSubject').html('');
    $('#associatedSubject').append(data);
    $('#associatedSubject').selectpicker('refresh');
    $('#totalExamTime').prop('readonly', true);
    $('#totalMarksData').prop('readonly', true);
    $('#passingMarks').prop('readonly', true);
    $('#language').prop('readonly', true);
    $('#guidelines').prop('readonly', true);
    $('#page_1_nextButton').prop('disabled', true);
}


function renderDependentLanguage(thistxt) {
    var optionString = '';
    $("#language :selected").each(function () {
        // var data = '<option value="' + this.value + '" selected="">' + this.text + '</option>';
        // optionString = optionString + data;
        $('#defaultLanguage').val(this.text);
        });
    // $('#defaultLanguage').append(optionString);
    // $('#defaultLanguage').selectpicker('refresh');
}


function NextButton() {
    var stepData = localStorage.getItem('paperStep');
    if (parseInt(stepData) === 1) {
        stepsHideShow(parseInt(stepData))
        universalDict['uniquePaperId'] = $('#uniquePaperId').val();
        universalDict['uniquePaperName'] = $('#uniquePaperName').val();
        universalDict['associatedCourse'] = $('#coursenameId').val();
        universalDict['associatedSubject'] = $('#associatedSubject').val();
        universalDict['totalExamTime'] = $('#totalExamTime').val();
        universalDict['defaultLanguage'] = $('#defaultLanguage').val();
        universalDict['passingMarks'] = $('#passingMarks').val();
        universalDict['language'] = $('#language').val();
        universalDict['guidelines'] = $('#guidelines').val();
        universalDict['totalMarksData'] = $('#totalMarksData').val();
        // universalList.push(universalDict);
        localStorage.setItem('paperStep', parseInt(stepData) + 1);
        $('#totalMarksReadOnly').val($('#totalMarksData').val());
        stepsHideShow(parseInt(stepData) + 1);

    }
    else if (parseInt(stepData) === 2) {
        var totalMarks = $('#totalMarksReadOnly').val();
        var totalQuestions = $('#totalQuestions').val();
        rowCount = document.getElementsByTagName("tr").length - 1;
        if (rowCount == 0) {
            Swal.fire('<small>Enter no. of Sections</small>');
            return false;
        }
        if (totalQuestions.length == 0) {
            Swal.fire('<small>Enter no. of Questions</small>');
            return false;
        }
        totalQuestioSum = 0
        totalSectionMarks = 0
        for (var i = 1; i <= rowCount; i++) {
            var x = parseInt($('#madatoryQuestion_' + i).val());
            var y = parseInt($('#totalMarksPerSection_' + i).val());

            if (isNaN(x)) {
                x == parseInt(0);
            }
            if (isNaN(y)) {
                y == parseInt(0);
            }
            else {
                totalQuestioSum = totalQuestioSum + parseInt(x);
                totalSectionMarks = totalSectionMarks + parseInt(y);
            }
        }
        if (parseInt(totalQuestioSum) != parseInt(totalQuestions)) {
            Swal.fire('<small>Section total madatory question must be equal to the Total Questions.</small>');
            return false;
        }
        if (parseInt(totalSectionMarks) != parseInt(totalMarks)) {
            Swal.fire('<small>Section total marks must be equal to the Total Marks.</small>');
            return false;
        }
     
        
        // // -----------------------   SAVE SCREEN 02 DATA   --------------------------------------------------------
        // // --------------------------------------------------------------------------------------------------------
        rowCount = $('#no-of-section').val();

        console.log('rowCount :>> ', rowCount);

        var sectionRowData = []
        var questionTypeArray = []
        var questionTypeList = []
        var marksPerSectionList = []
        var totalQuestionPerSectionList = []
        var mandatoryQuestionPerSectionList = []

        if (rowCount == 1) {
            var actualRowCount = Math.abs(1);
        } else {
            var actualRowCount = Math.abs(rowCount);
        }
        localStorage.setItem('actualRowCount', actualRowCount)

      
        for (var i = 1; i <= actualRowCount; i++) {
            var sno = $('#sno_' + i).html();
            var total_no_Of_Question = $('#noOfQuestion_' + i).val();
            var mandatory_per__section = $('#madatoryQuestion_' + i).val();
            var marks_per_section = $('#totalMarksPerSection_' + i).val();
            var questionType = $("#questionType_" + i).val();
            if (questionType.length == 0) {
                Swal.fire('<small>Select question type.</small>');
                return false;
            }
            questionTypeList.push(questionType);
            marksPerSectionList.push(marks_per_section);
            totalQuestionPerSectionList.push(total_no_Of_Question);
            mandatoryQuestionPerSectionList.push(mandatory_per__section);

            sectionRowData.push(sno + '-' + total_no_Of_Question + '-' + mandatory_per__section + '-' + marks_per_section + '-' + questionTypeList.toString());
            questionTypeArray.push(questionTypeList);
            // questionTypeArray.push('!');


            sectionDataDict['section'] = $('#sno_' + i).html();
            sectionDataDict['no_of_ques'] = $('#noOfQuestion_' + i).val();
            sectionDataDict['no_of_mandatory'] = $('#madatoryQuestion_' + i).val();
            sectionDataDict['total_marks'] = $('#totalMarksPerSection_' + i).val();
            sectionDataDict['questionType'] =  $("#questionType_" + i).val();
            sectionDataList.push(sectionDataDict)
            sectionDataDict = {};
            questionTypeList = [];

        }
        // screen 02 sectional data 
        // console.log(sectionRowData);
        localStorage.setItem('sectionRowData', sectionRowData);
        localStorage.setItem('questionTypeArray', questionTypeArray);
        localStorage.setItem('marksPerSectionList', marksPerSectionList);
        localStorage.setItem('totalQuestionPerSectionList', totalQuestionPerSectionList);
        localStorage.setItem('mandatoryQuestionPerSectionList', mandatoryQuestionPerSectionList);


        
        universalDict['totalMarks'] = $('#totalMarksReadOnly').val();
        universalDict['totalQuestions'] = $('#totalQuestions').val();
        universalDict['section_data'] = sectionDataList
        // universalList.push(universalDict);



        var sectionForQuestion = '';
        for (var i = 1; i <= actualRowCount; i++) {
            var questionType = $("#questionType_" + i).val();
            var stringData = returnHTMLForSections(marksPerSectionList,questionType, i)
            sectionForQuestion = sectionForQuestion + stringData;
        }


        $('#addQuestionInSections').html('');
        $('#addQuestionInSections').append(sectionForQuestion);
        $('#paperBasicdetail').css('display', 'none');
        $('#paperSectionaldetail').css('display', 'none');
        $('#paperQuestiondetail').css('display', '');
        $('#papersetCreationDetail').css('display', 'none');
        $('#paperPreviewDetail').css('display', 'none');


        
        localStorage.setItem('paperStep', parseInt(stepData) + 1);
        $('#showTotalMarks').html(totalMarks);
        $('#showUniquePaperName').html($('#uniquePaperName').val());
        stepsHideShow(parseInt(stepData) + 1);
        console.log(universalDict);
    }
    else if (parseInt(stepData) === 3) {
        console.log(universalDict);
         localStorage.setItem('paperStep', parseInt(stepData) + 1);
        stepsHideShow(parseInt(stepData) + 1);
    }
     else if (parseInt(stepData) === 4) {
         localStorage.setItem('paperStep', parseInt(stepData) + 1);
        stepsHideShow(parseInt(stepData) + 1);
    }
}



function PreviousButton() {
    var stepData = localStorage.getItem('paperStep');
    if (parseInt(stepData) === 1) {
        localStorage.setItem('paperStep', 1);
        stepsHideShow(1);
    }
    else if (parseInt(stepData) === 3) {
        delete universalDict['totalMarks'];
        delete universalDict['totalQuestions'];
        delete universalDict['section_data'];
        localStorage.setItem('paperStep', parseInt(stepData) - 1);
        stepsHideShow(parseInt(stepData) - 1);
    }
    else{
        localStorage.setItem('paperStep', parseInt(stepData) - 1);
        stepsHideShow(parseInt(stepData) - 1);
    }
}


function stepsHideShow(step = 1) {
    if (step == 1) {
        $("#paperBasicdetail").css('display', '');
        $('#paperSectionaldetail').css('display', 'none');
        $('#paperQuestiondetail').css('display', 'none');
        $('#papersetCreationDetail').css('display', 'none');
        $('#paperPreviewDetail').css('display', 'none');
    }
    else if (step == 2) {
        console.log('Calling 2');
        $("#paperBasicdetail").css('display', 'none');
        $('#paperSectionaldetail').css('display', '');
        $('#paperQuestiondetail').css('display', 'none');
        $('#papersetCreationDetail').css('display', 'none');
        $('#paperPreviewDetail').css('display', 'none');
     }
    else if (step == 3) {
        $("#paperBasicdetail").css('display', 'none');
        $('#paperSectionaldetail').css('display', 'none');
        $('#paperQuestiondetail').css('display', '');
        $('#papersetCreationDetail').css('display', 'none');
        $('#paperPreviewDetail').css('display', 'none');
     }
    else if (step == 4) {
        $("#paperBasicdetail").css('display', 'none');
        $('#paperSectionaldetail').css('display', 'none'); 
        $('#paperQuestiondetail').css('display', 'none');
        $('#papersetCreationDetail').css('display', '');
        $('#paperPreviewDetail').css('display', 'none');
     }
    else if (step == 5) {
        $("#paperBasicdetail").css('display', 'none');
        $('#paperSectionaldetail').css('display', 'none'); 
        $('#paperQuestiondetail').css('display', 'none');
        $('#papersetCreationDetail').css('display', 'none');
        $('#paperPreviewDetail').css('display', '');
     }
}



function renderSections() {
    var str_option = '';
    $.ajax({
        type: 'GET',
        url: "getAllquestionType",
        success: function (response)
        {
            for (var i = 0; i < response['questionType'].length; i++) {
                if (str_option == '') {
                    str_option = '<option value='+response['questionType'][i]['id']+'>'+response['questionType'][i]['questio_type_name']+'</option>';
                } else {
                    str_option = str_option + '<option value='+response['questionType'][i]['id']+'>'+response['questionType'][i]['questio_type_name']+'</option>';
                  }
               
            }
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
            var sectionRow = sectionRow + '<tr>\
                                            <td>\
                                               <span class="sno" id="sno_'+ i + '">' + i + '</span>\
                                            </td >\
                                            <td><input type="text" name="" id="noOfQuestion_'+ i + '" class="qno" onkeydown="" onkeypress="return onlyNumberKey(event)" onkeyup="validateNoOfQuestions(this)" onclick="" maxlength="3"></td>\
                                            <td><input type="text" name="" id="madatoryQuestion_'+ i + '" class="qno" onkeydown="" onkeypress="return onlyNumberKey(event)" onkeyup="multiply(this)" onclick="" maxlength="3"></td>\
                                            <td>\
                                                <select title="Select Q-Type" class="selectpicker d-block" multiple data-live-search="false" id="questionType_'+ i + '">'+str_option+'</select>\
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
        $('#questionType_'+ i).selectpicker('refresh');                                    
        }
        $('#sectionalRows').html('');
        $('#sectionalRows').append(sectionRow);
        $('select').selectpicker();
        $('#sections').show()
        $('#totalQuestions').val('');
        localStorage.setItem('numberofSections', totalSections);
         
    }
        }
        });
    
}

// function returnHTMLForSections(marksPerSectionList,questionTypeArray, i) {
//     return '<div class="accordion">\
//             <div class="card mb-0">\
//             <div class="card-header"  href="#collapse'+ i + '">\
//                                     <a class="card-title" onclick="toggleSectionVisibility(collapse'+ i + ')" id="collapseSectionId_' + i + '">\
//                                         Section '+ i + '<span class="float-right">Max. Marks: ' + marksPerSectionList[i - 1] + '</span>\
//                                     </a>\
//                                 </div>\
//                                 <div id="collapse'+ i + '" class="card-body">\
//                                     <div class="added-ques" id="added-ques'+ i + '">\
//                                         <div class="row">\
//                                         <div class="col-md-4 pl-0" class="hello">\
//                                             <div class="card ques_sidebar mt-0">\
//                                                 <div class="card-content">\
//                                                     <div class="card-body   pl-1 pr-1">\
//                                                         <div class="head">Topics Covered\
//                                                         </div>\
//                                                         <div class="filter">\
//                                                             <div class="options" id="added-ques-topics'+ i + '">\
//                                                             <label>  Topic 1 <span>5</span></label>\
//                                                             <label>  Topic 2 <span>5</span></label>\
//                                                             <label>  Topic 3 <span>5</span></label>\
//                                                             </div>\
//                                                         </div>\
//                                                         </div>\
//                                                 </div>\
//                                                 </div> \
//                                         </div>\
//                                         <div class="col-md-8 pt-1">\
//                                          <div class="ques" id="added-ques-section'+ i + '">\
//             <h5> <span>Q.1</span> What is Capital of India ? <a href="javascript:;" class="float-right del"><i class="fa fa-trash"></i></a></h5>\
//                 <div class="options">\
//                     <label><input checked="" type="radio" name="">\
//                         Option A\
//                     </label>\
//                         <label><input type="radio" name="">\
//                             Option B\
//                             </label>\
//                             <label><input type="radio" name="">\
//                                 Option C\
//                             </label>\
//                                 <label><input type="radio" name="">\
//                                     Option D\
//                             </label>\
//                                                       </div>\
//                                                     </div>\
//                                         </div>\
//                                     </div>\
//                                 </div>\
//                                     <a data-toggle="modal" data-target="#questions" href="javascript:;" class="add-ques-btn" data-keyboard="false"  sectionNo='+i+' dataRender="False" typeOfQuestion='+questionTypeArray+' data-backdrop="static" id="addQuestiomModal_'+ i + '" onclick="getCourse_Subject(this)">+ Add Questions</a>\
//                             </div>';
// }




// function getCourse_Subject(thisTxt,topicArray='All') {
//     var questionTArray = $(thisTxt).attr('typeOfQuestion');
//     var questionLang = $('#language').val();
//     var questionCourse  = $('#coursenameId').val();
//     var questionSubject = $('#associatedSubject').val();
//     var defaultLanguage = $('#defaultLanguage').val();
//           $.ajax({
//             type: 'GET',
//             url: "questionSearch",
//               data: {
//                   'courseId': questionCourse,
//                   'subjectID': questionSubject,
//                   'questionTypeList': questionTArray,
//                   'languageList': questionLang,
//                   'topicArray': topicArray,
//                   'defaultLanguage': defaultLanguage
//               },
//               success: function (response) {
//                   console.log(response)
//               },
//           });
//     };

               






    // var questionTArray = localStorage.getItem('questionTypeArray');
    // var dataArr = questionTArray.trim().split(',');
    // qtypeLisT = [];
    // for (var i = 0; i < dataArr.length; i++) {
    //     if (dataArr[i] == ',Subjective,' | dataArr[i] == 'Subjective,') {
    //         qtypeLisT.push('Subjective');
    //     } else if (dataArr[i] == ',Objective,' | dataArr[i] == 'Objective,') {
    //         qtypeLisT.push('Objective');
    //     } if (dataArr[i] == ',Objective,Subjective,' | dataArr[i] == 'Objective,Subjective,') {
    //         qtypeLisT.push(['Subjective', 'Objective']);
    //     }
    // }
    // var data = $(thisTxt).parent().parent().children().children().attr('id');
    // var sectionKey = $('#' + data).html().trim().split('<');
    // localStorage.setItem('sectionKey', sectionKey[0])
    // var modalData = renderQuestionModal();
    // $('#questions').html('');
    // $('#questions').append(modalData);
    // $('#showYear').html('');
    // $('#showYear').append('<option value="">Select Year</option>\
    //                             <option value="2025">2025</option>\
    //                             <option value="2024">2024</option>\
    //                             <option value="2023">2023</option>\
    //                             <option value="2022">2022</option>\
    //                             <option value="2021">2021</option>\
    //                             <option value="2020">2020 </option>\
    //                             <option value="2019">2019</option>');
    // $('#showYear').selectpicker('refresh');
    // $('#showCourse').val($("#coursenameId :selected").text());
    // $('#showSubject').val($("#associatedSubject :selected").text());
    // var associatedCourse = $('#coursenameId').val();
    // var associatedSubject = $('#associatedSubject').val();
    // var sectionCount = sectionKey[0].split(' ');
    // var count = sectionCount[1]
    // var questionTypeList = qtypeLisT[count];
    // var languageArray = $('#language').val();
    // $.ajax({
    //     type: 'GET',
    //     url: "searchTopic",
    //     data: { courseID: associatedCourse, subjectID: associatedSubject },
    //     success: function (response) {
    //         console.log(response['topicList']);
    //         var topicList = '';
    //         if (response['topicList'][0] === '<b>- No topic available for selected course and subject!</b>') {
    //             topicList = '<option value="No topic available for selected course and subject!">No topic available!</option>';
    //             $('#showTopic').html('');
    //             $('#showTopic').append(topicList);
    //             $('#showTopic').selectpicker('refresh');

    //             $('#questionListBody').html('');
    //             $('#noQuestionData').show();
    //             $('#noQuestionData').css('border', '1px solid grey');
    //             $('#noQuestionData').css('background-color', 'white');

    //             $('#addQuestiontoPaperButton').prop('disabled', true);

    //         } else {
    //             for (var i = 0; i < response['topicList'].length; i++) {
    //                 var base = '<option value="">Select Topic</option>';
    //                 var data = '<option unchecked value="' + response['topicList'][i] + '">' + response['topicList'][i] + '</option>';
    //                 topicList = topicList + data;
    //             }
    //             $('#showTopic').html('');
    //             $('#showTopic').append(base + topicList);
    //             $('#showTopic').selectpicker('refresh');

    //             $('#showFilter').css('opacity', 1);
    //             $('#showQuestions').css('opacity', 1);
    //             $('#showFilter').css('pointer-events', '');
    //             $('#showQuestions').css('pointer-events', '');
    //             $('#addQuestiontoPaperButton').css('pointer-events', '');
    //             $('#addQuestiontoPaperButton').prop('disabled', false);
    //         }
    //     }
    // }).then(function () {
    //     var d = new Date();
    //     var n = d.getFullYear();
    //     var yearData = $('#showYear').val();
    //     if (yearData.length == 0) {
    //         var year = n;
    //     } else {
    //         var year = yearData;
    //     }

    //     var courseId = associatedCourse.trim();
    //     var subjectID = associatedSubject.trim();
    //     // var topic = '';

    //     var topicArray = [];
 
    //     var defaultLanguage = $('#defaultLanguage').val();
    //     $.ajax({
    //         type: 'GET',
    //         url: "questionSearch",
    //         data: { 'courseId': courseId, 'subjectID': subjectID, 'questionTypeList[]': questionTypeList, 'languageList[]': languageArray, 'topicArray[]': topicArray, 'defaultLanguage': defaultLanguage },
    //         success: function (response) {
    //             $('#showQuestionCount').html('');
    //             $('#showQuestionCount').html(response['FILTERED_data'].length);
    //             questionResponseArray = [];
    //             questionResponseArray.push(response['FILTERED_data']);
    //             marks_per_section = localStorage.getItem('marksPerSectionList').split(',');
    //             totalQuestionPerSectionList = localStorage.getItem('totalQuestionPerSectionList').split(',');
    //             mandatoryQuestionPerSectionList = localStorage.getItem('mandatoryQuestionPerSectionList').split(',');
    //             localStorage.setItem('sectionKey', sectionKey[0])
    //             var sectionCount = sectionKey[0].split(' ');
    //             var count = sectionCount[1]
    //             var dataString = '';
    //             for (var j = 0; j < response['FILTERED_data'].length; j++) {
    //                 var questionID = response['FILTERED_data'][j].id_piar.toString();
    //                 var data = '<tr class="questionRows">\
    //                 <td><p><span style="color:#1eb6e9;">Question.</span> '+
    //                     response['FILTERED_data'][j].question +
    //                     '<a href="javascript:;" questionID="'+ response['FILTERED_data'][j].id_piar +'" questionMarks="' + response['FILTERED_data'][j].correctMarks +
    //                     '" questionSelected="False" class="edit float-right ml-1" \
    //                     onclick = "addQuestionToSectionList(this)" style = "color:white;background-color:#76B947;" >\
    //                 + Added</a ></p >\
    //                                 <div class="q_info">\
    //                                    <ul>\
    //                                        <li><span>QType</span>'+ response['FILTERED_data'][j].questionType + '</li>\
    //                                         <li><span>Difficulty</span>'+ response['FILTERED_data'][j].difficultyLevel + '</li>\
    //                                          <li class=""><span>Marks</span>'+ response['FILTERED_data'][j].correctMarks + '</li>\
    //                                         <li class=""><span>Subject</span>'+ response['FILTERED_data'][j].subject + '</li>\
    //                                         <li class=""><span>Topic</span>'+ response['FILTERED_data'][j].topic + '</li>\
    //                                         <li><span>Year</span>'+ response['FILTERED_data'][j].year + '</li>\
    //                                    </ul>\
    //                                 </div>\
    //                               </td >\
    //                           </tr >\
    //                         <tr> ';
    //                         dataString = dataString + data;
                        
    //                 }
    //                 // }
    //                 $('#noQuestionData').hide();
    //                 $('#questionListBody').html('');
    //                 $('#questionListBody').append(dataString);
                

    //         }
    //     });
    // });
    //  }


// }