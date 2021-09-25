var selectedQuestionList = new Array(); //array to store all selected questions fro a paper
var sectionSelectedQuestionList = new Array(); //array to store all selected questions from a section
var sectionQuestionList = []
var keys = [];
var rowCount = 0;
var totalQuesEachMarks = 0;


var questionDataDict = {};
var questionFinalDataDict = {};
var questionResponseArray = [];
var sectionPreviewQuestionArray = {};
var universalDict = {};
var universalList = [];
var responseQuestionData = [];
// ===============================  FRESH VARIABLES  =================================================================================================
var SectionWiseQuestionData = {};
var SectionQuestionList = [];
var selectedQuestionArray = [];
var finalQuestionPreviewDict = {}; // final list of questions according to the sections
var sectionRowsDataArray = [];
// ===================================================================================================================================================
// ==================================================   RENDER & VALIDATE PAGE 01   ==================================================================
function paperBasicDetailPage() {
    $("#paperBasicdetail").css('display', '');
    $('#paperSectionaldetail').css('display', 'none');
    $('#paperQuestiondetail').css('display', 'none');
    $('#papersetCreationDetail').css('display', 'none');
    $('#paperPreviewDetail').css('display', 'none');
}

// ==================================================   RENDER PAGE 02   ==================================================================
function paperSectionDetailPage() {
    var uniquePaperId = $('#uniquePaperId').val();
    var uniquePaperName = $('#uniquePaperName').val();
    localStorage.setItem('uniquePaperName', uniquePaperName);

    var associatedCourse = $('#coursenameId').val();
    var associatedSubject = $('#associatedSubject').val();
    var totalExamTime = $('#totalExamTime').val();

    if ("totalmarks" in localStorage) {
        var tmarks = localStorage.getItem('totalmarks');
        $('#totalMarksData').val(tmarks);
        var totalMarks = $('#totalMarksData').val();
        $('#totalMarksReadOnly').val(tmarks);

    } else {
        var totalMarks = $('#totalMarksData').val();
        localStorage.setItem('totalmarks', totalMarks);
    }

    var passingMarks = $('#passingMarks').val();
    var language = $('#language').val();
    var guidelines = $('#guidelines').val();

    // -----------------------------------------------
    if (uniquePaperId.trim().length <= 0) {
        Swal.fire('<small>Invalid uniquePaperId</small>');
        return false;
    } if (uniquePaperName.trim().length <= 0) {
        Swal.fire('<small>Invalid uniquePaperName</small>');
        return false;
    } if (associatedCourse.trim().length <= 0) {
        Swal.fire('<small>Invalid associatedCourse</small>');
        return false;
    } if (associatedSubject.trim().length <= 0) {
        Swal.fire('<small>Invalid associatedSubject</small>');
        return false;
    } if (totalExamTime.trim().length <= 0) {
        Swal.fire('<small>Invalid totalExamTime</small>');
        return false;
    }
    if (totalMarks.trim().length <= 0) {
        Swal.fire('<small>Invalid totalMarks</small>');
        return false;
    }
    if (passingMarks.trim().length <= 0) {
        Swal.fire('<small>Invalid passingMarks</small>');
        return false;
    }
    if (parseInt(passingMarks) > parseInt(totalMarks)) {
        Swal.fire("<small><b>Passing marks</b> can't be greater than <b>Total marks</b>!</small>");
        return false;
    }
    if ($('#language').val().length <= 0) {
        Swal.fire("<small>Please select paper language!</small>");
        return false;
    }
    if ($('#defaultLanguage').val().trim().length <= 0) {
        Swal.fire("<small>Please select paper default language!</small>");
        return false;
    }
    // } if (language.trim().length <= 0) {
    //     Swal.fire('<small>Invalid language</small>');
    //     return false;
    if (guidelines.trim().length <= 0) {
        Swal.fire('<small>Invalid guidelines</small>');
        return false;
    } else {
        $('#totalMarksReadOnly').val(totalMarks);

        $('#paperBasicdetail').css('display', 'none');
        $('#paperSectionaldetail').css('display', '');
        $('#paperQuestiondetail').css('display', 'none');
        $('#papersetCreationDetail').css('display', 'none');
        $('#paperPreviewDetail').css('display', 'none');
    }
    universalDict['uniquePaperId'] = $('#uniquePaperId').val();
    universalDict['uniquePaperName'] = $('#uniquePaperName').val();
    universalDict['associatedCourse'] = $('#coursenameId').val();
    universalDict['associatedSubject'] = $('#associatedSubject').val();
    universalDict['totalExamTime'] = $('#totalExamTime').val();
    universalDict['defaultLanguage'] = $('#defaultLanguage').val().trim();
    universalDict['passingMarks'] = $('#passingMarks').val();
    universalDict['language'] = $('#language').val();
    universalDict['guidelines'] = $('#guidelines').val();
    universalDict['totalMarksData'] = $('#totalMarksData').val();
    universalList.push(universalDict);
}

// ==================================================   RENDER PAGE 03   ==================================================================
function paperQuestionDetailPage() {
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
    // ----------------------   SCREEN 03 DATA   --------------------------------------------
    var tmarks = localStorage.getItem('totalmarks');
    var uniquepaperName = localStorage.getItem('uniquePaperName');

    $('#showTotalMarks').html(tmarks);
    $('#showUniquePaperName').html(uniquepaperName);
    // -----------------------   SAVE SCREEN 02 DATA   --------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------
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

    sectionDataDict = {}
    sectionDataList = []
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
        questionTypeArray.push('!');


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
    console.log(sectionRowData);
    sectionRowsDataArray = sectionRowData
    localStorage.setItem('sectionRowData', sectionRowData);
    localStorage.setItem('questionTypeArray', questionTypeArray);
    localStorage.setItem('marksPerSectionList', marksPerSectionList);
    localStorage.setItem('totalQuestionPerSectionList', totalQuestionPerSectionList);
    localStorage.setItem('mandatoryQuestionPerSectionList', mandatoryQuestionPerSectionList);

    // return false;

    // -------------------------  RENDERING SECTION TO ADD QUESTION   -----------------------------------------
    // --------------------------------------------------------------------------------------------------------
    var sectionForQuestion = '';
    console.log('marksPerSectionList > ',marksPerSectionList);
    console.log('actualRowCount > ',actualRowCount);


    for (var i = 1; i <= actualRowCount; i++) {
        // var stringData = returnHTMLForSections(marksPerSectionList, i)
        console.log('data >> ',marksPerSectionList[i-1],i);
        var stringData = '<div class="accordion">\
                            <div class="card mb-0">\
                            <div class="card-header"  href="#collapse'+ i + '">\
                                <a class="card-title" onclick="toggleSectionVisibility(collapse'+ i + ')" id="collapseSectionId_' + i + '">\
                                    Section '+ i + '<span class="float-right">Max. Marks: ' + marksPerSectionList[i - 1] + '</span>\
                                </a>\
                            </div>\
                            <div id="collapse'+ i + '" class="card-body">\
                                <div class="added-ques" id="added-ques'+ i + '">\
                                    <div class="row">\
                                    <div class="col-md-4 pl-0" class="hello">\
                                        <div class="card ques_sidebar mt-0">\
                                            <div class="card-content">\
                                                <div class="card-body   pl-1 pr-1">\
                                                    <div class="head">Topics Covered\
                                                    </div>\
                                                    <div class="filter">\
                                                        <div class="options" id="added-ques-topics'+ i + '">\
                                                        <label>  Topic 1 <span>5</span></label>\
                                                        <label>  Topic 2 <span>5</span></label>\
                                                        <label>  Topic 3 <span>5</span></label>\
                                                        </div>\
                                                    </div>\
                                                    </div>\
                                            </div>\
                                            </div> \
                                    </div>\
                                    <div class="col-md-8 pt-1">\
                                    <div class="ques" id="added-ques-section'+ i + '">\
                    <h5> <span>Q.1</span> What is Capital of India ? <a href="javascript:;" class="float-right del"><i class="fa fa-trash"></i></a></h5>\
                    <div class="options">\
                    <label><input checked="" type="radio" name="">\
                    Option A\
                    </label>\
                    <label><input type="radio" name="">\
                        Option B\
                        </label>\
                        <label><input type="radio" name="">\
                            Option C\
                        </label>\
                            <label><input type="radio" name="">\
                                Option D\
                        </label>\
                                                </div>\
                                                </div>\
                                    </div>\
                                </div>\
                            </div>\
                                <a data-toggle="modal" data-target="#questions" href="javascript:;" class="add-ques-btn" data-keyboard="false" dataRender="False" data-backdrop="static" id="addQuestiomModal_'+ i + '" onclick="getCourse_Subject(this)">+ Add Questions</a>\
                        </div>';
        sectionForQuestion = sectionForQuestion + stringData;
    }
    $('#addQuestionInSections').html('');
    $('#addQuestionInSections').append(sectionForQuestion);
    $('#paperBasicdetail').css('display', 'none');
    $('#paperSectionaldetail').css('display', 'none');
    $('#paperQuestiondetail').css('display', '');
    $('#papersetCreationDetail').css('display', 'none');
    $('#paperPreviewDetail').css('display', 'none');
    universalDict['totalMarks'] = $('#totalMarksReadOnly').val();
    universalDict['totalQuestions'] = $('#totalQuestions').val();
    universalDict['section_data'] = sectionDataList
    universalList.push(universalDict);


}

// ==================================================   RENDER PAGE 04   ==================================================================
function paperSetDetailPage() {
    marks_per_section = localStorage.getItem('marksPerSectionList').split(',');
    totalQuestionPerSectionList = localStorage.getItem('totalQuestionPerSectionList').split(',');
    mandatoryQuestionPerSectionList = localStorage.getItem('mandatoryQuestionPerSectionList').split(',');
    console.log('===================================================================');
    console.log('marks_per_section >> ',marks_per_section);
    console.log('totalQuestionPerSectionList >> ',totalQuestionPerSectionList);
    console.log('mandatoryQuestionPerSectionList >> ',mandatoryQuestionPerSectionList);
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    console.log('selectedQuestionArray >> ',selectedQuestionArray);
    console.log('===================================================================');
    var length = Object.keys(SectionWiseQuestionData).length
    for(var i=0;i<length;i++){
        console.log('section_'+(i+1)+' length >> ',SectionWiseQuestionData['Section_'+(i+1)].length);
        console.log('section_'+(i+1)+' data array >> ',SectionWiseQuestionData['Section_'+(i+1)]);
        if(parseInt(totalQuestionPerSectionList[i]) ==  SectionWiseQuestionData['Section_'+(i+1)].length){
            console.log('length is correct!');
        }else{
            alert('Total question in Section '+(i+1)+' is not equal to '+parseInt(totalQuestionPerSectionList[i]));
            return false;
        }
    }

    // return false;

    console.log("responseQuestionData >> ",responseQuestionData);
    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]
    console.log('count >> ',count);
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    console.log('selectedQuestionArray >> ',selectedQuestionArray);

    var dataLanguage = localStorage.getItem('sectionRowData');
    var sectionRowData = dataLanguage.split(',');
    console.log('sectionRowData >> ',sectionRowData);


    var questionTypeArray = [];
    for (var i = 0; i < sectionRowData.length; i++) {
        var data = sectionRowData[i].split('-');
        console.log('data array : ', data)
        if (data.length <= 1) {
            console.log('..')
        } else {
            questionTypeArray.push(data);
        }
    }
    console.log('questionTypeArray >> ',questionTypeArray);
    // return false;

    // for (var i = 0; i < questionTypeArray.length; i++){
    //     for(var j=0;sectionPreviewQuestionArray['section '+(i+1)].length;j++){
    //         console.log('this is for question data : ',sectionPreviewQuestionArray['section '+(i+1)][0]);
    //     }
    // }

    // ====================================================================================================================================
    // ====================================================================================================================================
    $('#paperBasicdetail').css('display', 'none');
    $('#paperSectionaldetail').css('display', 'none');
    $('#paperQuestiondetail').css('display', 'none');
    $('#papersetCreationDetail').css('display', '');
    $('#paperPreviewDetail').css('display', 'none');


}
// ==================================================   RENDER PAGE 05   ==================================================================
function paperPreviewDetailPage() {
    // ============================================================================
    $('#UID').text($('#uniquePaperId').val());
    $('#UNAME').text($('#uniquePaperName').val());
    $('#assoCourse').text($('#coursenameId').val());
    $('#subjectName').text($('#associatedSubject').val());
    $('#tPTime').text($('#totalExamTime').val());
    $('#tPmarks').text($('#totalMarksReadOnly').val());
    $('#tPPmarks').text($('#passingMarks').val());
    $('#paperLang').text($('#language').val());
    $('#paperDefaultLang').text($('#defaultLanguage').val());
    $('#paperGuide').text($('#guidelines').val());

    $('#paperSec').text($('#no-of-section').val());
    $('#paperTQues').text($('#totalQuestions').val());
    $('#modalPaperName').text($('#uniquePaperName').val());

    // -------------   ADD ROWS TO THE PREVIEW DETAIL PAGE  -------------------------
    console.log("responseQuestionData >> ",responseQuestionData);
    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]
    console.log('count >> ',count);
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    console.log('selectedQuestionArray >> ',selectedQuestionArray);

    var dataLanguage = localStorage.getItem('sectionRowData');
    var sectionRowData = dataLanguage.split(',');
    console.log('sectionRowData >> ',sectionRowData);

// ==========================================================================================
    var headerString = '<div class="row">\
                            <div class="col-lg-2    form-group">\
                            <label>Section </label>\
                        </div>\
                            <div class="col-lg-2   form-group">\
                            <label>No. of Questions </label>\
                        </div>\
                            <div class="col-lg-2  form-group">\
                            <label>Mandatory   Questions </label>\
                        </div> \
                        <div class="col-lg-3    form-group">\
                            <label>Question  Type </label>\
                        </div>\
                        <div class="col-lg-3   form-group">\
                            <label>Total Marks Per Section </label>\
                        </div> \
                        </div>';
// ==========================================================================================
    var questionTypeArray = [];
        for (var i = 0; i < sectionRowData.length; i++) {
            var data = sectionRowData[i].split('-');
            console.log('data array : ', data)
            if (data.length <= 1) {
                console.log('..')
            } else {
                questionTypeArray.push(data);
            }
        }

    console.log('questionTypeArray>>>>', questionTypeArray);
    var sectionString = '';
    for (var i = 0; i < questionTypeArray.length; i++) {
        var str = '  <div class="row">\
                        <div class="col-lg-2    form-group">\
                        <p class="value">'+ (i + 1) + '</p>\
                    </div>\
                        <div class="col-lg-2    form-group">\
                        <p class="value">'+ questionTypeArray[i][1] + '</p>\
                    </div>\
                        <div class="col-lg-2    form-group">\
                        <p class="value">'+ questionTypeArray[i][2] + '</p>\
                    </div> \
                    <div class="col-lg-3    form-group">\
                        <p class="value">'+ questionTypeArray[i][4] + '</p>\
                    </div>\
                    <div class="col-lg-3    form-group">\
                        <p class="value">'+ questionTypeArray[i][3] + '</p>\
                    </div> \
                </div>';
        sectionString = sectionString + str;
    }

    $('#sectionPaperRows').html('');
    $('#sectionPaperRows').append(headerString + sectionString);
// ==========================================================================================
// ---------------------   APPEND QUESTION TEXT ON THE PREVIEW PAGE  ------------------------
    console.log('finalQuestionPreviewDict .......>>>>>', finalQuestionPreviewDict);
// ==========================================================================================
    var dataString = '';
    var dictLength = Object.keys(finalQuestionPreviewDict).length
    console.log('dictLength >> ',dictLength);
    for (var i = 0; i < dictLength; i++) {
        var counter = i+1;
        var question_Data = finalQuestionPreviewDict['Section_'+counter];
        console.log('question_Data under loop >> ',question_Data,question_Data.length);
        var header = '<div class="col-lg-12 mt-1 mb-0 form-group">\
        <h5 class="font-weight-bold" style="text-decoration:underline;">Section '+ (i + 1) + ' </h5>\
        </div>'
        var question_String = '';
        
        for (var j = 0; j < question_Data.length; j++) {
            var optionString = '';
            if (question_Data[j]['refrence_Questions_Type_Detail']['questionType']['questio_type_name'] == 'Objective') {
                console.log('obj data >> ',question_Data[j]['optionList']);
                var objectiveData = eval(question_Data[j]['optionList']);
                console.log('this is option list data for qustion ::>> ',objectiveData,typeof(objectiveData));
                for (var k = 0; k < objectiveData[0].length; k++) {
                    if (objectiveData[0][k] == 'True') {
                        var data = '<p class="ml-1"><i style="color: grey;font-size: 20px;font-weight: 800;" class="far fa-circle"></i>&nbsp;&nbsp;' + objectiveData[1][k] + '</p>';
                        optionString = optionString + data;
                    } else {
                        var data = '<p class="ml-1"><i style="color: grey;font-size: 20px;font-weight: 800;" class="far fa-circle"></i>&nbsp;&nbsp;' + objectiveData[1][k] + '</p>';
                        optionString = optionString + data;
                    }

                }
            }
            var strippedHtml = question_Data[j]['question'].replace(/<[^>]+>/g, '');

            var questionString = '<div class="col-lg-12 mt-0   pl-0  form-group  added-ques d-block">\
            <div class="ques">\
            <h5><span>Q.'+ (j + 1) + '</span> ' + strippedHtml + '? </h5>\
            </div>\
            </div>';
            question_String = question_String + questionString + optionString;
        }
        var finalString = '';
        finalString = header + finalString + question_String;
        dataString = dataString + finalString;
    }

    // console.log('finalString : ', dataString);

    $('#paperQuestionAppendDiv').html('');
    $('#paperQuestionAppendDiv').append(dataString);
    // ============================================================================
    var ele = document.getElementsByName('set');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            var data = ele[i].value;
        }
    }

    $('#autoSetGenerat').text(data);
    if (data == 'no') {
        $('#maxSet').text('1');
    } else {
        $('#maxSet').text($('#maxPossibleSet').val());
    }


    $('#paperBasicdetail').css('display', 'none');
    $('#paperSectionaldetail').css('display', 'none');
    $('#paperQuestiondetail').css('display', 'none');
    $('#papersetCreationDetail').css('display', 'none');
    $('#paperPreviewDetail').css('display', '');


}
// =============================================================================================================================================
//                                             TOGGLE VISIBILITY ON SECTIONS ON PAGE 03
// =============================================================================================================================================
function toggleSectionVisibility(txt) {
    console.log(txt['id']);
    $("#" + txt['id']).toggle('slow', function () {
    });
}
// =============================================================================================================================================
//                                  GET TOPICS of specific CourseId & SubjectID ON ADD QUESTION MODAL
// =============================================================================================================================================
function getCourse_Subject(thisTxt) {
    // alert();
    var questionTArray = localStorage.getItem('questionTypeArray');
    var questionTypeSeparatedData = questionTArray.replaceAll(',','');
    console.log('questionTArray >> ',questionTArray);
    console.log('questionTypeSeparatedData >> ',questionTypeSeparatedData);
    var dataArr = questionTypeSeparatedData.trim().split('!');
    console.log('dataArr >> ',dataArr);


    qtypeLisT = [];
    for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i] == '1') {
            qtypeLisT.push('1');
        } else if (dataArr[i] == '2') {
            qtypeLisT.push('2');
        } if (dataArr[i] == '12' | dataArr[i] == '21') {
            qtypeLisT.push(['1', '2']);
        }
    }
    var data = $(thisTxt).parent().parent().children().children().attr('id');
    var sectionKey = $('#' + data).html().trim().split('<');
    localStorage.setItem('sectionKey', sectionKey[0])
    var modalData = renderQuestionModal();
    $('#questions').html('');
    $('#questions').append(modalData);
    $('#showYear').html('');
    $('#showYear').append('<option value="">Select Year</option>\
                                <option value="2025">2025</option>\
                                <option value="2024">2024</option>\
                                <option value="2023">2023</option>\
                                <option value="2022">2022</option>\
                                <option value="2021">2021</option>\
                                <option value="2020">2020 </option>\
                                <option value="2019">2019</option>');
    $('#showYear').selectpicker('refresh');
    $('#showCourse').val($("#coursenameId :selected").text());
    $('#showSubject').val($("#associatedSubject :selected").text());
    var associatedCourse = $('#coursenameId').val();
    var associatedSubject = $('#associatedSubject').val();
    var sectionCount = sectionKey[0].split(' ');
    var count = sectionCount[1]
    var questionTypeList = qtypeLisT[count];

    console.log('questionTypeList >>>',questionTypeList,count,qtypeLisT);

    var languageArray = $('#language').val();

    $.ajax({
        type: 'GET',
        url: "searchTopic",
        data: { courseID: associatedCourse, subjectID: associatedSubject },
        success: function (response) {
            console.log(response['topicList']);
            var topicList = '';
            if (response['topicList'][0] === '<b>- No topic available for selected course and subject!</b>') {
                topicList = '<option value="No topic available for selected course and subject!">No topic available!</option>';
                $('#showTopic').html('');
                $('#showTopic').append(topicList);
                $('#showTopic').selectpicker('refresh');

                $('#questionListBody').html('');
                $('#noQuestionData').show();
                $('#noQuestionData').css('border', '1px solid grey');
                $('#noQuestionData').css('background-color', 'white');

                $('#addQuestiontoPaperButton').prop('disabled', true);

            } else {
                for (var i = 0; i < response['topicList'].length; i++) {
                    var base = '<option value="">Select Topic</option>';
                    var data = '<option unchecked value="' + response['topicList'][i] + '">' + response['topicList'][i] + '</option>';
                    topicList = topicList + data;
                }
                $('#showTopic').html('');
                $('#showTopic').append(base + topicList);
                $('#showTopic').selectpicker('refresh');

                $('#showFilter').css('opacity', 1);
                $('#showQuestions').css('opacity', 1);
                $('#showFilter').css('pointer-events', '');
                $('#showQuestions').css('pointer-events', '');
                $('#addQuestiontoPaperButton').css('pointer-events', '');
                $('#addQuestiontoPaperButton').prop('disabled', false);
            }
        }
    }).then(function () {
        var d = new Date();
        var n = d.getFullYear();
        var yearData = $('#showYear').val();
        if (yearData.length == 0) {
            var year = n;
        } else {
            var year = yearData;
        }

        var courseId = associatedCourse.trim();
        var subjectID = associatedSubject.trim();
        // var topic = '';

        var topicArray = [];
 
        var defaultLanguage = $('#defaultLanguage').val();

        $.ajax({
            type: 'GET',
            url: "questionSearch",
            data: {'year':year,'courseId': courseId, 'subjectID': subjectID, 'questionTypeList[]': questionTypeList, 'languageList[]': languageArray, 'topicArray[]': topicArray, 'defaultLanguage': defaultLanguage },
            success: function (response) {
                $('#showQuestionCount').html('');
                $('#showQuestionCount').html(response['FILTERED_data'].length);
                questionResponseArray = [];
                questionResponseArray.push(response['FILTERED_data']);
                marks_per_section = localStorage.getItem('marksPerSectionList').split(',');
                totalQuestionPerSectionList = localStorage.getItem('totalQuestionPerSectionList').split(',');
                mandatoryQuestionPerSectionList = localStorage.getItem('mandatoryQuestionPerSectionList').split(',');
                localStorage.setItem('sectionKey', sectionKey[0])
                var sectionCount = sectionKey[0].split(' ');
                var count = sectionCount[1]
                var dataString = '';
                console.log("response['FILTERED_data'] >> ",response['FILTERED_data']);
                // ===============================================================================================================================
                responseQuestionData = [];
                responseQuestionData = response['FILTERED_data'];
                console.log("responseQuestionData >> ",responseQuestionData);
                // ===============================================================================================================================
                // if('Section_'+count in SectionWiseQuestionData){
                //     alert('key hai!');
                //     var keyData = SectionWiseQuestionData['Section_'+count];
                //     console.log('keyData >> ',keyData);
                //     keyData.push(questionID);
                //     SectionWiseQuestionData['Section_'+count] = keyData
                // }else{
                //     alert('key nhi hai!');
                //     SectionQuestionList = [];
                //     SectionQuestionList.push(questionID);
                //     SectionWiseQuestionData['Section_'+count] = SectionQuestionList
                // }
                // if questionId in 
                // ================================================================================================================================
                // ================================================================================================================================
                for (var j = 0; j < response['FILTERED_data'].length; j++) {
                    var questionID = response['FILTERED_data'][j].id.toString();

                    if(selectedQuestionArray.includes(questionID)){
                        console.log('hello world!',questionID);
                        var data = '<tr class="questionRows">\
                    <td><p><span style="color:#1eb6e9;">Question.</span> '+
                        response['FILTERED_data'][j].question +
                        '<a href="javascript:;" questionID="'+ response['FILTERED_data'][j].id +'" questionMarks="' + response['FILTERED_data'][j].correctMarks +
                        '" questionSelected="False" class="edit float-right ml-1" \
                        onclick = "removeFromQuestionSectionList(this)" style = "color:white;background-color:red;" >\
                        <i class="fas fa-minus-circle"></i> Remove</a ></p >\
                                    <div class="q_info">\
                                       <ul>\
                                       <li><span>QType</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['questionType']['questio_type_name'] + '</li>\
                                        <li><span>Difficulty</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['difficultyLevel']['questio_level_type_name'] + '</li>\
                                         <li><span>Marks</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['correctMarks'] + '</li>\
                                        <li class=""><span>Subject</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['selectSubject']['subjectName'] + '</li>\
                                        <li class=""><span>Topic</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['Topic'] + '</li>\
                                        <li><span>Language</span>'+ response['FILTERED_data'][j]['selectLanguage']['languageName'] + '</li>\
                                        <li><span>Year</span>'+ response['FILTERED_data'][j].year + '</li>\
                                   </ul>\
                                    </div>\
                                  </td >\
                              </tr >\
                            <tr> ';
                            dataString = dataString + data;
                    
                    }else{
                        var data = '<tr class="questionRows">\
                    <td><p><span style="color:#1eb6e9;">Question.</span> '+
                        response['FILTERED_data'][j].question +
                        '<a href="javascript:;" questionID="'+ response['FILTERED_data'][j].id +'" questionMarks="' + response['FILTERED_data'][j].correctMarks +
                        '" questionSelected="False" class="edit float-right ml-1" \
                        onclick = "addQuestionToSectionList(this)" style = "color:white;background-color:#28afd0;" >\
                        <i class="fas fa-plus-circle"></i> Add</a ></p >\
                                    <div class="q_info">\
                                       <ul>\
                                       <li><span>QType</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['questionType']['questio_type_name'] + '</li>\
                                        <li><span>Difficulty</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['difficultyLevel']['questio_level_type_name'] + '</li>\
                                         <li><span>Marks</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['correctMarks'] + '</li>\
                                        <li class=""><span>Subject</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['selectSubject']['subjectName'] + '</li>\
                                        <li class=""><span>Topic</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['Topic'] + '</li>\
                                        <li><span>Language</span>'+ response['FILTERED_data'][j]['selectLanguage']['languageName'] + '</li>\
                                        <li><span>Year</span>'+ response['FILTERED_data'][j].year + '</li>\
                                   </ul>\
                                    </div>\
                                  </td >\
                              </tr >\
                            <tr> ';
                            dataString = dataString + data;
                    } 
                        }
                    // }
                    $('#noQuestionData').hide();
                    $('#questionListBody').html('');
                    $('#questionListBody').append(dataString);
                

            }
        });
    });
    //  }


}




// ==========================================================================================================================================================
// ====================================    ADD QUESTION TO SECTION QUESTION LIST    =========================================================================
// ==========================================================================================================================================================
function addQuestionToSectionList(thisTxt) {
    marks_per_section = localStorage.getItem('marksPerSectionList').split(',');
    totalQuestionPerSectionList = localStorage.getItem('totalQuestionPerSectionList').split(',');
    mandatoryQuestionPerSectionList = localStorage.getItem('mandatoryQuestionPerSectionList').split(',');
    console.log('===================================================================');
    console.log('marks_per_section >> ',marks_per_section);
    console.log('totalQuestionPerSectionList >> ',totalQuestionPerSectionList);
    console.log('mandatoryQuestionPerSectionList >> ',mandatoryQuestionPerSectionList);
    console.log('===================================================================');


    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]
    var questionID = $(thisTxt).attr('questionID');
    var questionMarks = $(thisTxt).attr('questionMarks');
    var sectionData = universalDict['section_data'];
    var addQuestion_to_SectionDict = {};
    var sectionWiseData = {};
    var addQuestion_to_SectionList = [];
    // addQuestion_to_SectionDict['Question_id'] = questionID;
    // addQuestion_to_SectionDict['Question_id'] = questionMarks;
    // sectionWiseData["Section_" + sectionData[k]['section']] = addQuestion_to_SectionDict
    // addQuestion_to_SectionDict = {}
    console.log('sectionKey >> ',sectionKey);
    console.log('sectionCount >> ',sectionCount);
    console.log('count >> ',count);
    console.log('questionID >> ',questionID);
    console.log('sectionData >> ',sectionData);

    console.log("responseQuestionData >> ",responseQuestionData);
    // var SectionWiseQuestionData = {};
    // var SectionQuestionList = []

    // =============================================================================================
    var textdata = $(thisTxt).text();
    console.log('textdata >> ',textdata);

    if(textdata.trim() == 'Remove'){
        alert('remove questions!');
        removeFromQuestionSectionList(thisTxt);
        return false;
    }
    
    
    
    if('Section_'+count in SectionWiseQuestionData){
        var keyData = SectionWiseQuestionData['Section_'+count];
        if(keyData.length < totalQuestionPerSectionList[count-1]){
            SectionWiseQuestionData['Section_'+count] = keyData
            if(keyData.includes(questionID)){
                console.log('data id exists!');
            }else{
                console.log('keyData >> ',keyData);
                keyData.push(questionID);
            }
        }else{
            alert('Cant add more question in this section!');
            return false;
        }
        

        selectedQuestionArray.push(questionID);
        // -------------------------------------------------------------------------
        for(var i=0;i<responseQuestionData.length;i++){
            for(var j=0;j<keyData.length;j++){
                if(parseInt(keyData[j]) == responseQuestionData[i]['id']){
                    console.log('SectionQuestionList data >> ',keyData[j],responseQuestionData[i]['id'],typeof(keyData[j]),typeof(responseQuestionData[i]['id']));
                    var dataId = finalQuestionPreviewDict['Section_'+count];
                    var idArray = [];
                    for(var k=0;k<dataId.length;k++){
                        idArray.push(dataId[k]['id'])
                    }
                    console.log('idArray >> ',idArray);
                    if(idArray.includes(responseQuestionData[i]['id'])){
                        console.log('question id exist!');
                    }else{
                        dataId.push(responseQuestionData[i]);
                        finalQuestionPreviewDict['Section_'+count] = dataId;
                    }
                }
            }

        }
        // -------------------------------------------------------------------------
        $(thisTxt).html('');
        $(thisTxt).html('<i class="fas fa-minus-circle"></i> Remove');
        $(thisTxt).css('color', 'white');
        $(thisTxt).css('background-color', 'red');
        $(thisTxt).attr('questionSelected', 'False');
    }else{
        SectionQuestionList = [];
        SectionQuestionList.push(questionID);
        SectionWiseQuestionData['Section_'+count] = SectionQuestionList
        if(SectionQuestionList.length <= totalQuestionPerSectionList[count-1]){
            selectedQuestionArray.push(questionID);
        }else{
            alert('Cant add more question in this section!');
            return false;
        }
        // -------------------------------------------------------------------------
        for(var i=0;i<responseQuestionData.length;i++){
            for(var j=0;j<SectionQuestionList.length;j++){
                if(parseInt(SectionQuestionList[j]) == responseQuestionData[i]['id']){
                    console.log('SectionQuestionList data >> ',SectionQuestionList[j],responseQuestionData[i]['id'],typeof(SectionQuestionList[j]),typeof(responseQuestionData[i]['id']));
                    var dataId = [];
                    dataId.push(responseQuestionData[i]);
                    finalQuestionPreviewDict['Section_'+count] = dataId;
                }
            }

        }
        // -------------------------------------------------------------------------
        $(thisTxt).html('');
        $(thisTxt).html('<i class="fas fa-minus-circle"></i> Remove');
        $(thisTxt).css('color', 'white');
        $(thisTxt).css('background-color', 'red');
        $(thisTxt).attr('questionSelected', 'False');
    }
    
    
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    console.log('finalQuestionPreviewDict >> ',finalQuestionPreviewDict);
}
// ==========================================================================================================================================================
// ==========================================================================================================================================================
function removeFromQuestionSectionList(thisTxt){
    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]
    var questionID = $(thisTxt).attr('questionID');

    if('Section_'+count in SectionWiseQuestionData){
        var keyData = SectionWiseQuestionData['Section_'+count];
        if(keyData.includes(questionID)){
            console.log('remove question!');
        }else{
            alert('Cant remove this question for this section!');
            return false;
        }

        console.log('remove Section_'+count+' >>>> ','Section_'+count);
        console.log('remove key data >>>> ',keyData);

        const index = keyData.indexOf(questionID);
        if (index > -1) {
        keyData.splice(index, 1);
        }

        const index1 = selectedQuestionArray.indexOf(questionID);
        if (index1 > -1) {
        selectedQuestionArray.splice(index1, 1);
        }

        console.log('keyData >>> ',keyData);
        console.log('selectedQuestionArray >>> ',selectedQuestionArray);
        // -------------------------------------------------------------------------
        for(var i=0;i<responseQuestionData.length;i++){
            for(var j=0;j<keyData.length;j++){
                if(parseInt(keyData[j]) == responseQuestionData[i]['id']){
                    var dataId = [];
                    dataId.push(responseQuestionData[i])
                    finalQuestionPreviewDict['Section_'+count] = dataId;
                }
            }

        }
        // -------------------------------------------------------------------------

        $(thisTxt).html('');
        $(thisTxt).html('<i class="fas fa-plus-circle"></i> Add');
        $(thisTxt).css('color', 'white');
        $(thisTxt).css('background-color', '#28afd0;');
        $(thisTxt).attr('questionSelected', 'True');
    }
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    console.log('finalQuestionPreviewDict >> ',finalQuestionPreviewDict);
}
// ==========================================================================================================================================================
// ==========================================================================================================================================================
// ===============================================    REEST SELECTED ARRAY   ================================================================================
// ==========================================================================================================================================================
function resetQuestionList() {
}
// ==========================================================================================================================================================
// ==========================================================================================================================================================
function renderQuestionModal() {
    var modalData = '<div class="modal-dialog" role="document">\
                        <div class="modal-content" >\
                            <div class="modal-header">\
                                Questions List\
                            </div>\
                        <div class="modal-body  ">\
                        <div class="row">\
                        <div class="col-lg-3 mb-1 form-group no-ico  pl-2">\
                            <label style="font-weight:500;">Course</label>\
                            <input type="text" class="form-control" placeholder="Course" value="" id="showCourse" readonly style="pointer-evenys:none;" />\
                        </div>\
                        <div class="col-lg-3 mb-1 form-group no-ico  pl-2">\
                            <label style="font-weight:500;">Subject</label>\
                            <input type="text" class="form-control" placeholder="Subject" value="" id="showSubject" readonly style="pointer-evenys:none;" />\
                        </div>\
                        <div class="col-md-3">\
                            <label style="font-weight:500;">Topic</label>\
                            <select class="selectpicker" data-live-search="false" id="showTopic" onchange="getval()">\
                                <option value="">Select Topic</option>\
                            </select>\
                        </div>\
                        <div class="col-md-3">\
                            <label style="font-weight:500;">Year</label>\
                            <select class="selectpicker" data-live-search="false" id="showYear" onchange="getval()">\
                            </select>\
                        </div>\
                        <div class="col-md-3" id="showFilter">\
                            <div class="card ques_sidebar">\
                                <div class="card-content  ">\
                                    <div class="card-body pt-1 pl-1 pr-1" id="resetCard">\
                                        <div style="display:inline;padding: 0px 0 5px; font-size: 18px; font-weight: 600; color: #333;margin-bottom: 25px;">Filter<a style="float: right; font-size: 12px;  background: #007dc6; color: #fff; font-weight: 500; padding: 2px 10px 3px;" onclick="resetFilter()" class="check" title="Reset filter"><i id="resetFilter" class="fas fa-sync-alt"></i></a>\
                                        </div>\
                                        <hr>\
                                            <div id="filterDiv">\
                                                <div class="filter mt-2">\
                                                    <h5>By Difficulty</h5>\
                                                    <div class="options">\
                                                        <label><input type="checkbox" name="Difficulty" onclick="filter_Select(this)" value="1">Easy</label>\
                                                            <label><input type="checkbox" name="Difficulty" onclick="filter_Select(this)" value="3">Moderate</label>\
                                                                <label><input type="checkbox" name="Difficulty" onclick="filter_Select(this)" value="2">Hard</label>\
                                                            </div>\
                                                        </div>\
                                                                    <div class="filter">\
                                                                        <h5>By Marks</h5>\
                                                                        <div class="options">\
                                                                            <label><input type="checkbox" name="marks" onclick="filter_Select(this)" value="1"> 1</label>\
                                                                                <label><input type="checkbox" name="marks" onclick="filter_Select(this)" value="2"> 2</label>\
                                                                                    <label><input type="checkbox" name="marks" onclick="filter_Select(this)" value="3">3</label>\
                                                                                        <label><input type="checkbox" name="marks" onclick="filter_Select(this)" value=">3">>3</label>\
                                                                                    </div>\
                                                                                </div>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>\
                                                                    </div>\
                                                                </div>\
                                                                <div class="col-md-9 mt-2" id="showQuestions">\
                                                                    <div class="Ques-top-opt" id="filtersOption">Applied filters : <a id="allFilter" href="javascript:;" style="background: #fff; padding: 3px 10px; border:solid 1px #ccc;  font-size: 13px; font-weight: 600;">All</a>\
                                                                        <div class="sel_filters">\
                                                                        </div>\
                                                                        <span class="total_ques">Total Count : <strong id="showQuestionCount"></strong></span>\
                                                                    </div>\
                                                                    <div class="table-responsive ques_list " id="style-5">\
                                                                        <table id="example1" class="display one-col table data-table dataTable">\
                                                                            <tbody id="questionListBody">\
                                                                            </tbody>\
                                                                        </table>\
                                                                        <h3 class="text-center m-2 p-2" id="noQuestionData" style="display:none;border:0px solid grey;background-color:white;">No Record available!</h3>\
                                                                    </div>\
                                                                </div>\
                                                                <div class="col-md-12 mt-2 text-right"><a href="#" data-dismiss="modal" class="btn btn-secondary" onclick="resetQuestionList()">\
                                                                        Cancel</a>\
                                                                    <a href="#" data-dismiss="modal" class="btn btn-primary add-to-paper" onclick="addQuestionToPaper()">Add to Paper\
                                                                    </a>\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    </div>';
    return modalData;
}
// ==========================================================================================================================================================
//                                                           ADD QUESTION TO PAPER SECTION
// ==========================================================================================================================================================
function addQuestionToPaper() {
    console.log("responseQuestionData >> ",responseQuestionData);

    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]

    console.log('count >> ',count);
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    console.log('selectedQuestionArray >> ',selectedQuestionArray);
    // =================================== TOPICS ===================================================
    var topicArray = [];
    if('Section_'+count in SectionWiseQuestionData){
        var sectionValue = SectionWiseQuestionData['Section_'+count];
        for(var i=0;i<sectionValue.length;i++){
            for(var j=0;j<responseQuestionData.length;j++){
                if(sectionValue[i] == responseQuestionData[j]['id']){
                    var data = responseQuestionData[j]['refrence_Questions_Type_Detail']['Topic']
                    console.log(j,'topic data >> ',data);
                    if (topicArray.includes(data)) {
                        console.log('element exist');
                    } else {
                        topicArray.push(data);
                    }
                }
            }
        }
    }
    console.log('topicArray >>> ',topicArray);
    console.log('finalQuestionPreviewDict >>> ',finalQuestionPreviewDict);

    var topicStr = '';
    for (var i = 0; i < topicArray.length; i++) {
        var data = '<label>  Topic ' + (i + 1) + ' <span>' + topicArray[i] + '</span></label>';
        topicStr = topicStr + data;
    }
    // ==============================================================================================
    var questionStr = '';
    var optionString = '';

    if('Section_'+count in SectionWiseQuestionData){
        var sectionValue = SectionWiseQuestionData['Section_'+count];
        for(var i=0;i<sectionValue.length;i++){
            for(var j=0;j<responseQuestionData.length;j++){
                if(sectionValue[i] == responseQuestionData[j]['id']){
                    var dataDisplay = '<h5 class="mt-2"> <span>Q.' + (i + 1) + '</span> ' + responseQuestionData[j]['question'] + ' ?</h5><hr>';
                    questionStr = questionStr + dataDisplay + optionString;
                }
            }
        }
    }

    $('#added-ques-section' + count.trim()).html('');
    $('#added-ques-topics' + count.trim()).html('');
    $('#added-ques-topics' + count.trim()).append(topicStr);
    $('#added-ques-section' + count.trim()).append(questionStr);
    // ==============================================================================================
    $('#collapse' + count.trim() + ' .added-ques').show();
    $("html, body").animate({ scrollTop: 0 }, 100);
}
// =================================================================================================================
// =================================================================================================================
// ========================================  SUBMIT PAPER DATA  ====================================================
// =================================================================================================================
function submitPaperData() {
    // --------------------------------------------------------------------------
    var paperID = $('#uniquePaperId').val().trim();
    var paperName = $('#uniquePaperName').val().trim();
    var paperAssociateCourse = $('#coursenameId').val().trim();
    var paperAssociateSubject = $('#associatedSubject').val().trim();
    var totalPaperTime = $('#totalExamTime').val().trim();
    var paperTotalMarks = $('#totalMarksReadOnly').val().trim();
    var paperPassingMark = $('#passingMarks').val().trim();
    var paperStatus = true;
    var paperLanguage = $('#language').val();
    var paperDefaultLanguage = $('#defaultLanguage').val();
    var paperGuideLines = $('#guidelines').val().trim();

    var totalSection = $('#no-of-section').val().trim();
    var totalnumberOuestion = $('#totalQuestions').val().trim();

    // ---------------------------------------------------------------------------
    var dataLanguage = localStorage.getItem('sectionRowData');
    var sectionRowData = dataLanguage.split(',');
    var questionTypeArray = [];
    if(sectionRowData.length < 1){
        for (var i = 0; i < sectionRowData.length; i++) {
            var data = sectionRowData[i].split('-');
            console.log('data array : ', data)
            questionTypeArray.push(data);
        }
    }
    // var sectionDetails = "[["A",20,10,"Objective",20],["B",20,10,"Objective",20],["C",20,10,"Objective",20],["D",20,10,"Objective",20]]";
    // var SectionWiseQuestionList = "[{'section A':[1,2,3,4]},{'section B':[4,5,6,7]},{'section C':[8,9,10,11]},{'section D':[12,13,14,15]}]";
    var sectionDetails = questionTypeArray;
    console.log('paperID=====>>>', paperID);
    console.log('paperName=====>>>', paperName);
    console.log('paperAssociateCourse=====>>>', paperAssociateCourse);
    console.log('paperAssociateSubject=====>>>', paperAssociateSubject);
    console.log('totalPaperTime=====>>>', totalPaperTime);
    console.log('paperTotalMarks=====>>>', paperTotalMarks);
    console.log('paperPassingMark=====>>>', paperPassingMark);
    console.log('paperStatus=====>>>', paperStatus);
    console.log('paperLanguage=====>>>', paperLanguage);
    console.log('paperDefaultLanguage=====>>>', paperDefaultLanguage);
    console.log('paperGuideLines=====>>>', paperGuideLines);
    console.log('totalSection=====>>>', totalSection);
    console.log('totalnumberOuestion=====>>>', totalnumberOuestion);
    console.log('sectionDetails=====>>>', sectionDetails);
    // ---------------------------------------------------------------------------
    
    var questionData = questionFinalDataDict;
    var SectionWiseQuestionList = [];
    // // questionFinalDataDict['sectional_Question_Data'][parseInt(indexForallLists) - 1]['key']
    // for (var i = 0; i < questionFinalDataDict['sectional_Question_Data'].length; i++) {
    //     var questionListDict = {}
    //     var KeyData = questionFinalDataDict['sectional_Question_Data'][i]['key'];
    //     var valueData = [];
    //     for (var j = 0; j < questionFinalDataDict['sectional_Question_Data'][i]['value'].length; j++) {
        //         console.log("questionFinalDataDict['sectional_Question_Data'][i]['value'][j] :====>", questionFinalDataDict['sectional_Question_Data'][i]['value'][j]);
        //         valueData.push(questionFinalDataDict['sectional_Question_Data'][i]['value'][j]);
        //     }
        //     questionListDict[KeyData] = valueData;
        //     SectionWiseQuestionList.push(questionListDict);
        
        // }
        // console.log('SectionWiseQuestionList this is section wise questions =====>>>', SectionWiseQuestionList);
        // ---------------------------------------------------------------------------
        
        var ele = document.getElementsByName('set');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                var data = ele[i].value;
            }
        }
        var automatedSet = data;
        $('#autoSetGenerat').text(data);
        if (data == 'no') {
            var noOfSets = 1;
            var automatedSetStatus = false;
        } else {
            var noOfSets = $('#maxPossibleSet').val().trim();
            var automatedSetStatus = true;
        }
    console.log('automatedSet=====>>>', automatedSetStatus);
    console.log('noOfSets=====>>>', noOfSets);

    // =============================================================================================================
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    // "SectionWiseQuestionList": "[{'section A':[1,2,3,4]},{'section B':[4,5,6,7]},{'section C':[8,9,10,11]},{'section D':[12,13,14,15]}]",
    var SectionWiseQuestionList = [];
    var dictLength = Object.keys(SectionWiseQuestionData).length;
    var counter = 0;
    for(var i=0;i<dictLength;i++){
        var secDict = {};
        counter = counter + 1;
        secDict['Section_'+counter] = SectionWiseQuestionData['Section_'+counter];
        SectionWiseQuestionList.push(secDict);
    }
    console.log('SectionWiseQuestionList >> ',SectionWiseQuestionList);
    console.log('sectionRowsDataArray >> ',sectionRowsDataArray);

    // =============================================================================================================
    $('#alert').modal('hide');
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Creating Paper</b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
            
    // return false;
            // ------------------------  AJAX CALL --------------------------------------
        const csrftoken = getCookie('csrftoken');
        $.ajax({
        type: 'POST',
        url: "submitPaper",
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'paperID': paperID, 'paperName': paperName, 'paperAssociateCourse': paperAssociateCourse, 'paperAssociateSubject': paperAssociateSubject, 'paperTotalMarks': paperTotalMarks, 'paperPassingMark': paperPassingMark, 'paperStatus': paperStatus, 'paperLanguage': paperLanguage,'paperDefaultLanguage': paperDefaultLanguage, 'paperGuideLines': paperGuideLines, 'totalPaperTime': totalPaperTime, 'totalSection': totalSection, 'totalnumberOuestion': totalnumberOuestion, 'sectionDetails[]': sectionRowsDataArray, 'SectionWiseQuestionList': JSON.stringify(SectionWiseQuestionList), 'automatedSet': automatedSetStatus, 'noOfSets': noOfSets },

        success: function (response) {
            console.log(response);
            Swal.close()
            if (response['data'] === 'success') {
                console.log('Success');
                Swal.fire({
                    icon: 'success',
                    title: 'Paper created successfully',
                  }).then(function(){
                      location.href = "/paper_list";
                  })
            }else if('paperID' in response['data']){
                console.log('paper management with this Paper ID already exists!');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '<small>Paper with this Paper ID already exists!</small>',
                  }).then(function(){
                    return false;
                })
            }else if('paperName' in response['data']){
                console.log('paper management with this Paper Name already exists!');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '<small>Paper with this Paper Name already exists!</small>',
                  }).then(function(){
                      return false;
                })
            }
        }
    });

    // --------------------------------------------------------------------------
    // Swal.fire({
    //     title: 'Please Wait !',
    //     html: 'data uploading',// add html attribute if you want or remove
    //     allowOutsideClick: false,
    //     onBeforeOpen: () => {
    //         Swal.showLoading()
    //     },
    // });
    // swal.close();
}
// =================================================================================================================
// {
//     "paperID": "4456",  ====>>>>>  data exist
//     "paperName": "lkjkllknl",  ====>>>>>  data exist
//     "paperAssociateCourse": 1,  ====>>>>>  data exist
//     "paperAssociateSubject": 1,  ====>>>>>  data exist
//     "paperTotalMarks": "150",  ====>>>>>  data exist
//     "paperPassingMark": "50",  ====>>>>>  data exist
//     "paperStatus": "AAAAA",  ====>>>>>  data exist
//     "paperLanguage": "['English']",  ====>>>>>  data exist
//     "paperGuideLines": "Cline Page No Rough",  ====>>>>>  data exist
//     "totalPaperTime": "3:30",  ====>>>>>  data exist
//     "totalSection": "1",  ====>>>>>  data exist
//     "totalnumberOuestion": "150",  ====>>>>>  data exist
//     "automatedSet": no,  ====>>>>>  data exist
//     "noOfSets": "3",  ====>>>>>  data exist
//     "SectionWiseQuestionList": "[{'section A':[1,2,3,4]},{'section B':[4,5,6,7]},{'section C':[8,9,10,11]},{'section D':[12,13,14,15]}]",  ====>>>>>  data exist
//     "paperDeafaultLanguage":"Hindi",  ====>>>>>  data exist

//     "sectionDetails": "[[\"A\",20,10,\"Objective\",20],[\"B\",20,10,\"Objective\",20],[\"C\",20,10,\"Objective\",20],[\"D\",20,10,\"Objective\",20]]",
// }
// =================================================================================================================

function returnHTMLForSections(marksPerSectionList,i) {
    console.log('data >> ',marksPerSectionList[i-1],i);
    return '<div class="accordion">\
                                <div class="card mb-0">\
                                <div class="card-header"  href="#collapse'+ i + '">\
                                    <a class="card-title" onclick="toggleSectionVisibility(collapse'+ i + ')" id="collapseSectionId_' + i + '">\
                                        Section '+ i + '<span class="float-right">Max. Marks: ' + marksPerSectionList[i - 1] + '</span>\
                                    </a>\
                                </div>\
                                <div id="collapse'+ i + '" class="card-body">\
                                    <div class="added-ques" id="added-ques'+ i + '">\
                                        <div class="row">\
                                        <div class="col-md-4 pl-0" class="hello">\
                                            <div class="card ques_sidebar mt-0">\
                                                <div class="card-content">\
                                                    <div class="card-body   pl-1 pr-1">\
                                                        <div class="head">Topics Covered\
                                                        </div>\
                                                        <div class="filter">\
                                                            <div class="options" id="added-ques-topics'+ i + '">\
                                                            <label>  Topic 1 <span>5</span></label>\
                                                            <label>  Topic 2 <span>5</span></label>\
                                                            <label>  Topic 3 <span>5</span></label>\
                                                            </div>\
                                                        </div>\
                                                        </div>\
                                                </div>\
                                                </div> \
                                        </div>\
                                        <div class="col-md-8 pt-1">\
                                         <div class="ques" id="added-ques-section'+ i + '">\
            <h5> <span>Q.1</span> What is Capital of India ? <a href="javascript:;" class="float-right del"><i class="fa fa-trash"></i></a></h5>\
                <div class="options">\
                    <label><input checked="" type="radio" name="">\
                        Option A\
                    </label>\
                        <label><input type="radio" name="">\
                            Option B\
                            </label>\
                            <label><input type="radio" name="">\
                                Option C\
                            </label>\
                                <label><input type="radio" name="">\
                                    Option D\
                            </label>\
                                                      </div>\
                                                    </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                    <a data-toggle="modal" data-target="#questions" href="javascript:;" class="add-ques-btn" data-keyboard="false" dataRender="False" data-backdrop="static" id="addQuestiomModal_'+ i + '" onclick="getCourse_Subject(this)">+ Add Questions</a>\
                            </div>';
}




// ================================================================================================================================
// ================================================================================================================================
function getval(){
    var topic_value = $('#showTopic').val();
    var year_value = $('#showTopic').val();

    // alert(value);
    var associatedCourse = $('#coursenameId').val();
    var associatedSubject = $('#associatedSubject').val();
    var courseId = associatedCourse.trim();
    var subjectID = associatedSubject.trim();

    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey[0].split(' ');
    var count = sectionCount[1]
    var questionTypeList = qtypeLisT[count];

    // console.log('questionTypeList >>>',questionTypeList,count,qtypeLisT);

    var languageArray = $('#language').val();
        // var topic = '';

        var topicArray = [];
        topicArray.push(topic_value);
 
        var defaultLanguage = $('#defaultLanguage').val();

        $.ajax({
            type: 'GET',
            url: "filter_paper_question_Data",
            data: {'year':year_value,'courseId': courseId, 'subjectID': subjectID, 'questionTypeList[]': questionTypeList, 'languageList[]': languageArray, 'topicArray[]': topicArray, 'defaultLanguage': defaultLanguage },
            success: function (response) {
                $('#showQuestionCount').html('');
                $('#showQuestionCount').html(response['FILTERED_data'].length);
                questionResponseArray = [];
                questionResponseArray.push(response['FILTERED_data']);
                marks_per_section = localStorage.getItem('marksPerSectionList').split(',');
                totalQuestionPerSectionList = localStorage.getItem('totalQuestionPerSectionList').split(',');
                mandatoryQuestionPerSectionList = localStorage.getItem('mandatoryQuestionPerSectionList').split(',');
                localStorage.setItem('sectionKey', sectionKey[0])
                var sectionCount = sectionKey[0].split(' ');
                var count = sectionCount[1]
                var dataString = '';
                console.log("response['FILTERED_data'] >> ",response['FILTERED_data']);
                // ===============================================================================================================================
                responseQuestionData = [];
                responseQuestionData = response['FILTERED_data'];
                console.log("responseQuestionData >> ",responseQuestionData);
                // ===============================================================================================================================
                // if('Section_'+count in SectionWiseQuestionData){
                //     alert('key hai!');
                //     var keyData = SectionWiseQuestionData['Section_'+count];
                //     console.log('keyData >> ',keyData);
                //     keyData.push(questionID);
                //     SectionWiseQuestionData['Section_'+count] = keyData
                // }else{
                //     alert('key nhi hai!');
                //     SectionQuestionList = [];
                //     SectionQuestionList.push(questionID);
                //     SectionWiseQuestionData['Section_'+count] = SectionQuestionList
                // }
                // if questionId in 
                // ================================================================================================================================
                // ================================================================================================================================
                for (var j = 0; j < response['FILTERED_data'].length; j++) {
                    var questionID = response['FILTERED_data'][j].id.toString();

                    if(selectedQuestionArray.includes(questionID)){
                        console.log('hello world!',questionID);
                        var data = '<tr class="questionRows">\
                    <td><p><span style="color:#1eb6e9;">Question.</span> '+
                        response['FILTERED_data'][j].question +
                        '<a href="javascript:;" questionID="'+ response['FILTERED_data'][j].id +'" questionMarks="' + response['FILTERED_data'][j].correctMarks +
                        '" questionSelected="False" class="edit float-right ml-1" \
                        onclick = "removeFromQuestionSectionList(this)" style = "color:white;background-color:red;" >\
                        <i class="fas fa-minus-circle"></i> Remove</a ></p >\
                                    <div class="q_info">\
                                       <ul>\
                                       <li><span>QType</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['questionType']['questio_type_name'] + '</li>\
                                        <li><span>Difficulty</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['difficultyLevel']['questio_level_type_name'] + '</li>\
                                         <li><span>Marks</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['correctMarks'] + '</li>\
                                        <li class=""><span>Subject</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['selectSubject']['subjectName'] + '</li>\
                                        <li class=""><span>Topic</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['Topic'] + '</li>\
                                        <li><span>Language</span>'+ response['FILTERED_data'][j]['selectLanguage']['languageName'] + '</li>\
                                        <li><span>Year</span>'+ response['FILTERED_data'][j].year + '</li>\
                                   </ul>\
                                    </div>\
                                  </td >\
                              </tr >\
                            <tr> ';
                            dataString = dataString + data;
                    
                    }else{
                        var data = '<tr class="questionRows">\
                    <td><p><span style="color:#1eb6e9;">Question.</span> '+
                        response['FILTERED_data'][j].question +
                        '<a href="javascript:;" questionID="'+ response['FILTERED_data'][j].id +'" questionMarks="' + response['FILTERED_data'][j].correctMarks +
                        '" questionSelected="False" class="edit float-right ml-1" \
                        onclick = "addQuestionToSectionList(this)" style = "color:white;background-color:#28afd0;" >\
                        <i class="fas fa-plus-circle"></i> Add</a ></p >\
                                    <div class="q_info">\
                                       <ul>\
                                       <li><span>QType</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['questionType']['questio_type_name'] + '</li>\
                                        <li><span>Difficulty</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['difficultyLevel']['questio_level_type_name'] + '</li>\
                                         <li><span>Marks</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['correctMarks'] + '</li>\
                                        <li class=""><span>Subject</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['selectSubject']['subjectName'] + '</li>\
                                        <li class=""><span>Topic</span>'+ response['FILTERED_data'][j]['refrence_Questions_Type_Detail']['Topic'] + '</li>\
                                        <li><span>Language</span>'+ response['FILTERED_data'][j]['selectLanguage']['languageName'] + '</li>\
                                        <li><span>Year</span>'+ response['FILTERED_data'][j].year + '</li>\
                                   </ul>\
                                    </div>\
                                  </td >\
                              </tr >\
                            <tr> ';
                            dataString = dataString + data;
                    } 
                        }
                    // }
                    $('#noQuestionData').hide();
                    $('#questionListBody').html('');
                    $('#questionListBody').append(dataString);
                

            }
        });
}