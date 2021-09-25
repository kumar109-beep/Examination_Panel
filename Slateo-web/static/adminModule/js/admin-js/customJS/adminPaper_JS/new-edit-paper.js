var questFullData = {};
var quesArray = {};

var selectedQuestionList = new Array(); //array to store all selected questions fro a paper
var sectionSelectedQuestionList = new Array(); //array to store all selected questions from a section
var keys = [];
var rowCount = 0;
var secData = [];
var qtYpeArray = [];

var questionDataDict = {};
var questionFinalDataDict = {};
var questionResponseArray = [];
var sectionPreviewQuestionArray = {};
var sectionQuestionList = eval($('#SectionWiseQuestionList').html());

var marksPerSectionList = [];
var selectedQuestionArray = [];
var questionsDataDict = $('#sectionQuestiondata').html();
var questionDictionary = eval(questionsDataDict)[0]
var sectiondata = [];

var totalquestionSectionArray = [];
var totalMarksSectionArray = [];
var finalQuestionIdDict = {};
var finalQuestionPreviewDict = {};
var responseQuestionData = [];
var sectionQuestioncount = Object.keys(questionDictionary).length;

// ==================================================================================================

$(document).ready(function () {
  sectiondata = eval($('#sectionDetailPara').html())
  console.log('sectiondata >>>>', sectiondata);
  // sectiondata >>>> (3) ["1-2-2-10-1", "2-2-1-5-2", "3-3-2-5-1,2"]
// =================================================================================================
// =========================   PAPER SECTIONAL DETAIL   ============================================
// =================================================================================================
  for(var i=0;i<sectiondata.length;i++){
    var dataArray = sectiondata[i].split('-');
    console.log('dataArray >> ',dataArray);
    console.log('dataArray >> ',dataArray[4],typeof(dataArray[4]));
    if(dataArray[4] == '1'){
      dataArray.pop();
      dataArray.push('Subjective')
    }if(dataArray[4] == '2'){
      dataArray.pop();
      dataArray.push('Objective')
    }if(dataArray[4] == '1,2'){
      dataArray.pop();
      dataArray.push('Subjective,Objective')
    }
    secData.push(dataArray);
  }
  
  var sectionRow = '';
  var counter = 0;
  for(var i=0;i<secData.length;i++){
    counter = counter + 1;
      sectionRow = sectionRow + '<tr style="text-align:center;">\
                                      <td style="text-align:left !important;">\
                                         <span class="sno" id="sno_'+ counter + '">' + counter + '</span>\
                                      </td >\
                                      <td >'+secData[i][1]+'</td>\
                                      <td>'+secData[i][2]+'</td>\
                                      <td>'+secData[i][4]+'</td>\
                                      </td>\
                                      <td class="time_limit">\
                                          <p>Is time limit on this section</p>\
                              <label><input type="radio" name="time_'+ counter + '" id="set-time-limit_true_id_' + counter + '" onclick="checkForTimer(this)" value="yes"> Yes</label>\
                                  <label><input type="radio"  name="time_'+ counter + '" value="no" onclick="checkForTimer(this)" checked> No</label>\
                                      <div class="set-time-limit" id="set-time-limit_'+ counter + '">\
                                          <div>\
                                      <label>Duration</label>\
                                      <input type="text" name="" id="sectionDuration_'+ counter + '" placeholder="hh:mm:ss">\
                                                  </div>\
                                      <div>\
                                          <label>Time limit starts after</label>\
                                          <input type="text" id="sectionDurationStartAfter_'+ counter + '" name="" placeholder="hh:mm:ss">\
                                                  </div>\
                                      </div>\
                                      </td>\
                                      <td>'+secData[i][3]+'</td>\
                                      </tr>';
  }
  $('#sectionalRows').html('');
  $('#sectionalRows').append(sectionRow);
  $('#sections').show()
// =================================================================================================
// =========================   ADD QUESTION DETAIL   ===============================================
// =================================================================================================
console.log('secData splited array >> ',secData);
var SectionWiseQuestionList = $('#SectionWiseQuestionList').text();
var SectionWiseQuestionDict = $('#SectionWiseQuestionDict').text();
var questionsDict = $('#questionsDict').text();

for(var i=0;i<secData.length;i++){
    marksPerSectionList.push(secData[i][3]);
}
var actualRowCount = secData.length;
console.log('marksPerSectionList > ',marksPerSectionList);
console.log('actualRowCount > ',actualRowCount);
var sectionForQuestion = '';

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

// ===================================================================================================================
console.log('sectionQuestionList >> ',sectionQuestionList,typeof(sectionQuestionList));

for(var k=1;k<=sectionQuestionList.length;k++){
    var keyValue = sectionQuestionList[k-1]['Section_'+k];
    console.log('key value >> ',keyValue);
    for(var j=0;j<keyValue.length;j++){
        selectedQuestionArray.push(keyValue[j]);
    }
}
console.log('selectedQuestionArray >> ',selectedQuestionArray);
// return false;
// ===================================================================================================================
// var questionsDataDict = $('#sectionQuestiondata').html();
// var questionDictionary = eval(questionsDataDict)[0]
var questiondictLength = Object.keys(questionDictionary).length;
var questionString = '';
var count = 0
var data = '';

// ==============================================================================================
// var topicArray = [];
// for(var i=1;i<=questiondictLength;i++){
//     if('Section_'+i in questionDictionary){
//         var sectionValue = questionDictionary['Section_'+i];
//         for(var i=0;i<sectionValue.length;i++){
//                     var data = sectionValue[i]['refrence_Questions_Type_Detail']['Topic']
//                     console.log(i,'topic data >> ',data);
//                     if (topicArray.includes(data)) {
//                         console.log('element exist');
//                     } else {
//                         topicArray.push(data);
//                     }
//         }
//     }    
//     var topicStr = '';
//     for (var j = 0; j < topicArray.length; j++) {
//         var data = '<label>  Topic ' + (j + 1) + ' <span>' + topicArray[j] + '</span></label>';
//         topicStr = topicStr + data;
//     }
// }
// ==============================================================================================

for(var i=1;i<=questiondictLength;i++){
    count = i;
    var sectionHeader = '<div class="col-lg-12 mt-1 mb-0 form-group">\
                            <h5 class="font-weight-bold">Section '+count+' </h5>\
                        </div>';

    
    var questionsStr = '';
    for(var j=0;j<eval(questionsDataDict)[0]['Section_'+count].length;j++){
        var dataArr = eval(questionsDataDict)[0]['Section_'+count]
        // -----------------------------------------------------------------------
        var questionData = dataArr[j]['question'].replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        var text = questionData.replace(/(<([^>]+)>)/g, "");
        console.log('==========================================================');
        console.log('j value >> ',dataArr[j]);
        console.log('==========================================================');
        // -----------------------------------------------------------------------
        data = '<div class="col-lg-12 mt-0   pl-0  form-group  added-ques d-block">\
                        <div class="ques">\
                                <h5><span>Q.'+(j+1)+'</span>'+text+'</h5>\
                            </div>\
                    </div>';
                    questionsStr = questionsStr + data;
                }
        questionString = questionString + sectionHeader + questionsStr

    $('#added-ques-section' + count).html('');
    $('#added-ques-topics' + count).html('');
    // $('#added-ques-topics' + count).append(topicStr);
    $('#added-ques-section' + count).append(questionsStr);
    // ==============================================================================================
    $('#collapse' + count + ' .added-ques').show();
    $("html, body").animate({ scrollTop: 0 }, 100);
}
// ==================================================================================================================
// ==================================================================================================================
});

// =============================================================================================================================================
//                                             TOGGLE VISIBILITY ON SECTIONS ON PAGE 03
// =============================================================================================================================================
function toggleSectionVisibility(txt) {
  console.log(txt['id']);
  $("#" + txt['id']).toggle('slow', function () {
  });

}
// ==========================================================================================================================================================
// ===============================================    REEST SELECTED ARRAY   ================================================================================
// ==========================================================================================================================================================
function resetQuestionList() {
}
// ==================================================================================================================
// ==================================================================================================================
function getCourse_Subject(thisTxt) {
  alert();
// ==========================================================================================================
var sectiondata = eval($('#sectionDetailPara').html())
  console.log('sectiondata >>>>', sectiondata);
  // sectiondata >>>> (3) ["1-2-2-10-1", "2-2-1-5-2", "3-3-2-5-1,2"]
//   var questionTArray = [];

//   for(var i=0;i<sectiondata.length;i++){
//     var dataArray = sectiondata[i].split('-');
//     console.log('dataArray >> ',dataArray);
//     console.log('dataArray >> ',dataArray[4],typeof(dataArray[4]));
//     if(dataArray[4] == '1'){
//       dataArray.pop();
//       dataArray.push('Subjective')
//     }if(dataArray[4] == '2'){
//       dataArray.pop();
//       dataArray.push('Objective')
//     }if(dataArray[4] == '1,2'){
//       dataArray.pop();
//       dataArray.push('Subjective,Objective')
//     }
//     secData.push(dataArray);
//   }
// // ==========================================================================================================
//   var questionTArray = localStorage.getItem('questionTypeArray');
//   var questionTypeSeparatedData = questionTArray.replaceAll(',','');
//   console.log('questionTArray >> ',questionTArray);
//   console.log('questionTypeSeparatedData >> ',questionTypeSeparatedData);
//   var dataArr = questionTypeSeparatedData.trim().split('!');
//   console.log('dataArr >> ',dataArr);


  var qtypeLisT = [];
  for (var i = 0; i < sectiondata.length; i++) {
      var item = sectiondata[i].split('-');
      console.log('item value  >> ',item);
      if (item[4] == '1') {
          qtypeLisT.push('1');
      } else if (item[4] == '2') {
          qtypeLisT.push('2');
      } if (item[4] == '1,2' | item[4] == '2,1') {
          qtypeLisT.push(['1', '2']);
      }
  }

//   alert(qtypeLisT);
  console.log('qtypeLisT >>>>', qtypeLisT);
//   return false;

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
  var associatedCourse = $('#coursenameId').text();
  var associatedSubject = $('#associatedSubject').text();
  var sectionCount = sectionKey[0].split(' ');
  var count = sectionCount[1]
  var questionTypeList = qtypeLisT[count];

  console.log('associatedCourse >> ',associatedCourse);
  console.log('associatedSubject >> ',associatedSubject);
  console.log('questionTypeList >> ',qtypeLisT);
  console.log('count >> ',count);
//   return false;


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
          url: "/questionSearch",
          data: {'year':year,'courseId': courseId, 'subjectID': subjectID, 'questionTypeList[]': questionTypeList, 'languageList[]': languageArray, 'topicArray[]': topicArray, 'defaultLanguage': defaultLanguage },
          success: function (response) {
              $('#showQuestionCount').html('');
              $('#showQuestionCount').html(response['FILTERED_data'].length);
              questionResponseArray = [];
              questionResponseArray.push(response['FILTERED_data']);
            //   marks_per_section = localStorage.getItem('marksPerSectionList').split(',');
            //   totalQuestionPerSectionList = localStorage.getItem('totalQuestionPerSectionList').split(',');
            //   mandatoryQuestionPerSectionList = localStorage.getItem('mandatoryQuestionPerSectionList').split(',');
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
// ============================================================================================================================================
// ============================================================================================================================================
function renderQuestionModal() {
  var associatedCourse = $('#coursenameId').html();
  var associatedSubject = $('#associatedSubject').html();

  var associatedCourseName = $('#associatedCourse').val();
  var associatedSubjectName = $('#subject_name').val();

  var modalData = '<div class="modal-dialog" role="document">\
                  <div class="modal-content" >\
                      <div class="modal-header">\
                          Questions List\
                      </div>\
                  <div class="modal-body  ">\
                  <div class="row">\
                  <div class="col-lg-3 mb-1 form-group no-ico  pl-2">\
                      <label style="font-weight:500;">Course</label>\
                      <input type="text" class="form-control" placeholder="'+associatedCourseName+'" value="'+associatedCourse+'" id="showCourse" readonly style="pointer-evenys:none;" />\
                  </div>\
                  <div class="col-lg-3 mb-1 form-group no-ico  pl-2">\
                      <label style="font-weight:500;">Subject</label>\
                      <input type="text" class="form-control" placeholder="'+associatedSubjectName+'" value="'+associatedSubject+'" id="showSubject" readonly style="pointer-evenys:none;" />\
                  </div>\
                  <div class="col-md-3">\
                      <label style="font-weight:500;">Topic</label>\
                      <select class="selectpicker" data-live-search="false" id="showTopic" onchange="getval(this)">\
                          <option value="">Select Topic</option>\
                      </select>\
                  </div>\
                  <div class="col-md-3">\
                      <label style="font-weight:500;">Year</label>\
                      <select class="selectpicker" data-live-search="false" id="showYear" onchange="getval(this)">\
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
                                                  <label><input type="checkbox" name="Difficulty" onclick="filter_Select(this)" value="Easy">Easy</label>\
                                                      <label><input type="checkbox" name="Difficulty" onclick="filter_Select(this)" value="Moderate">Moderate</label>\
                                                          <label><input type="checkbox" name="Difficulty" onclick="filter_Select(this)" value="Difficult">Difficult</label>\
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
// ====================================    ADD QUESTION TO SECTION QUESTION LIST    =========================================================================
// ==========================================================================================================================================================
function addQuestionToSectionList(thisTxt){
    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]
    var questionID = $(thisTxt).attr('questionID');

    console.log('sectionKey >> ',sectionKey);
    console.log('sectionCount >> ',sectionCount);
    console.log('count >> ',count);
    // =============================================================================================
    console.log("sectionQuestionList >> ",sectionQuestionList); // section wise id list
    console.log("selectedQuestionArray >> ",selectedQuestionArray); // all question id list
    console.log("questionDictionary >> ",questionDictionary); // section wise questions dictionary
    console.log("sectiondata >> ",sectiondata); // section wise section data
    console.log("responseQuestionData >> ",responseQuestionData); // section wise question modal data
    // =============================================================================================
    for(var i=0;i<sectiondata.length;i++){
        var item = sectiondata[i].split('-');
        totalquestionSectionArray.push(item[1]);
        totalMarksSectionArray.push(item[3]);
    }
    console.log('totalquestionSectionArray >> ',totalquestionSectionArray);
    console.log('totalMarksSectionArray >> ',totalMarksSectionArray);
    // =============================================================================================
    var textdata = $(thisTxt).text();
    // =============================================================================================
    if(textdata.trim() == 'Remove'){
        removeFromQuestionSectionList(thisTxt);
        return false;
    }
    // =============================================================================================
    console.log('sectionQuestioncount >> ',sectionQuestioncount);
    sectionQuestioncount = sectionQuestioncount + 1;
    // check for max question count
    if(sectionQuestioncount > totalquestionSectionArray[count-1]){
        alert('Maximum question limit exceeded in section '+count+'!');
        return false;
    }
    console.log('questionID >> ',questionID);
    // add new question in section id array : [sectionQuestionList >>  (2) [{…}, {…}]] and section question array : [questionDictionary >>  {Section_1: Array(2), Section_2: Array(1)}]
    
    for(var i=0;i<sectionQuestionList.length;i++){
        // console.log('sectionQuestionList data >> ',sectionQuestionList[i]['Section_'+count]);
        if('Section_'+count in sectionQuestionList[i]){
            var sectionIdArray = sectionQuestionList[i]['Section_'+count]
            sectionIdArray.push(questionID);
            sectionQuestionList[i]['Section_'+count] = sectionIdArray;
        }
    }

    
    // length of questionDictionary dictionary
    dictLength = Object.keys(questionDictionary).length;
    for(var i=0;i<dictLength;i++){
        var sectionQuestionsArray = questionDictionary['Section_'+count];
        // var sectionQuestionIdArray = sectionQuestionList[i]['Section_'+count]
        var questionListArray = [];
        console.log('questionListArray >> ',questionDictionary['Section_'+count][i],questionDictionary['Section_'+count].length);
        for(var k=0;k<questionDictionary['Section_'+count].length;k++){
            questionListArray.push(questionDictionary['Section_'+count][k]['id']);
        }
        console.log('questionListArray data >> ',questionListArray);
        
            for(var j=0;j<responseQuestionData.length;j++){
                if(questionID == responseQuestionData[j]['id']){
                    if(questionListArray.includes(questionID)){
                        console.log('');
                    }else{
                        sectionQuestionsArray.push(responseQuestionData[j]);
                    }
                }
            }
            questionDictionary['Section_'+count] = sectionQuestionsArray;
    }

    selectedQuestionArray.push(questionID);
    

    // =============================================================================================
    $(thisTxt).html('');
    $(thisTxt).html('<i class="fas fa-minus-circle"></i> Remove');
    $(thisTxt).css('color', 'white');
    $(thisTxt).css('background-color', 'red');
    $(thisTxt).attr('questionSelected', 'False');
    console.log('sectionQuestionList >> ',sectionQuestionList);
    console.log('questionDictionary >> ',questionDictionary);
    console.log('selectedQuestionArray >> ',selectedQuestionArray);
}
// =================================================================================================================================================
// =================================================================================================================================================
// =================================================================================================================================================
function addQuestionToPaper() {
    console.log("responseQuestionData >> ",responseQuestionData);

    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var count = sectionCount[1]

    console.log('count >> ',count);
    console.log('sectionQuestionList >> ',sectionQuestionList);
    console.log('questionDictionary >> ',questionDictionary);
    // =================================== TOPICS ===================================================
    var SectionWiseQuestionData = {};
    for(var i=0;i<sectionQuestionList.length;i++){
        if('Section_'+count in sectionQuestionList[i]){
            console.log('sectionQuestionList[i] >> ',sectionQuestionList[i]['Section_'+count]);
            var questions = [];
            for(var j=0;j<sectionQuestionList[i]['Section_'+count].length;j++){
                for(var k=0;k<responseQuestionData.length;k++){
                    if(sectionQuestionList[i]['Section_'+count][j] == responseQuestionData[k]['id']){
                        console.log('id number >> ',responseQuestionData[k]['id']);
                        if (typeof(responseQuestionData[k]) != "undefined"){
                            questions.push(responseQuestionData[k]);
                            SectionWiseQuestionData['Section_'+count] = questions
                        }
                    }
                }
            }
        }else{
            var questions = [];
            for(var j=0;j<sectionQuestionList[i]['Section_'+(i+1)].length;j++){
                for(var k=0;k<responseQuestionData.length;k++){
                    if(sectionQuestionList[i]['Section_'+(i+1)][j] == responseQuestionData[k]['id']){
                        console.log('id number >> ',responseQuestionData[k]['id']);
                        questions.push(responseQuestionData[k]);
                        SectionWiseQuestionData['Section_'+(i+1)] = questions
                    }
                }
            }
            if (typeof(responseQuestionData[k]) != "undefined"){
                questions.push(responseQuestionData[k]);
                SectionWiseQuestionData['Section_'+(i+1)] = questions
            }
        }
    }
    console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    // return false;

    // ==============================================================================================
    var topicArray = [];
    if('Section_'+count in SectionWiseQuestionData){
        var sectionValue = SectionWiseQuestionData['Section_'+count];
        for(var i=0;i<sectionValue.length;i++){
            console.log('sectionValue >> ',sectionValue,sectionValue.length);
            for(var j=0;j<responseQuestionData.length;j++){
                if(sectionValue[i]['id'] == responseQuestionData[j]['id']){
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
                if(sectionValue[i]['id'] == responseQuestionData[j]['id']){
                    // -----------------------------------------------------------------------
                    var text = responseQuestionData[j]['question'].replace(/(<([^>]+)>)/g, "");
                    // -----------------------------------------------------------------------
                    var dataDisplay = '<h5 class="mt-2"> <span>Q.' + (i + 1) + '</span> ' + text + ' ?</h5><hr>';
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
// ==========================================================================================================================================================
// ==========================================================================================================================================================
function removeFromQuestionSectionList(thisTxt){
    var sectionKey = localStorage.getItem('sectionKey');
    var sectionCount = sectionKey.split(' ');
    var section_count = sectionCount[1]
    var questionID = $(thisTxt).attr('questionID');
    var sectionCounts = Object.keys(sectionQuestionList).length;
    if (confirm("Do you want to remove this question?")) {
        // for(var x=0;x<sectionCounts;x++){
            // var counter = x+1;
            console.log('sectionQuestionList[x] >> ',sectionQuestionList[section_count-1]);
            var keyData = sectionQuestionList[section_count-1]['Section_'+section_count];
            console.log('keyData >> ',keyData);

            for(var i=0;i<sectionQuestionList.length;i++){
                console.log('hgshgchvsajcvjasvhjvb >>> ',sectionQuestionList[section_count-1]['Section_'+section_count]);

                if(sectionQuestionList[section_count-1]['Section_'+section_count].includes(questionID)){
                    var sectionIdArray = sectionQuestionList[section_count-1]['Section_'+section_count]
                    const index = keyData.indexOf(questionID);
                    if (index > -1) {
                        keyData.splice(index, 1);
                    }
                    console.log('keyData data >> ',keyData);
                    console.log('questionID data >> ',questionID);

                    // sectionIdArray.push(questionID);
                    sectionQuestionList[section_count-1]['Section_'+section_count] = keyData;
                }
                // else{
                //     alert('This question is not from this section!');
                //     return false;
                // }
            }

            sectionQuestioncount = parseInt(sectionQuestioncount) - 1;
            console.log('sectionQuestioncount ====>> ',sectionQuestioncount);
        // if('Section_'+counter in questionDictionary){
        //     var keyData = questionDictionary['Section_'+counter];
    
        //     const index = keyData.indexOf(questionID);
        //     if (index > -1) {
        //     keyData.splice(index, 1);
        //     }
        //     const index1 = selectedQuestionArray.indexOf(questionID);
        //     if (index1 > -1) {
        //     selectedQuestionArray.splice(index1, 1);
        //     }
        //     // -------------------------------------------------------------------------
        //     for(var i=0;i<responseQuestionData.length;i++){
        //         for(var j=0;j<keyData.length;j++){
        //             if(parseInt(keyData[j]) == responseQuestionData[i]['id']){
        //                 var dataId = [];
        //                 dataId.push(responseQuestionData[i])
        //                 finalQuestionPreviewDict['Section_'+count] = dataId;
        //             }
        //         }
    
        //     }
            
    
            // for(var i=0;i<sectionQuestionList.length;i++){
            //     // console.log('sectionQuestionList data >> ',sectionQuestionList[i]['Section_'+count]);
            //     if('Section_'+count in sectionQuestionList[i]){
            //         var sectionIdArray = sectionQuestionList[i]['Section_'+count]
            //         sectionIdArray.push(questionID);
            //         sectionQuestionList[i]['Section_'+count] = sectionIdArray;
            //     }
            // }
            // -------------------------------------------------------------------------
    
            $(thisTxt).html('');
            $(thisTxt).html('<i class="fas fa-plus-circle"></i> Add');
            $(thisTxt).css('color', 'white');
            $(thisTxt).css('background-color', '#28afd0;');
            $(thisTxt).attr('questionSelected', 'True');

            const index = selectedQuestionArray.indexOf(questionID);
                if (index > -1) {
                    selectedQuestionArray.splice(index, 1);
            }

            
        // }
        // }
      } else {
        txt = "You pressed Cancel!";
      }
    
    console.log('questionDictionary >> ',questionDictionary);
    console.log('finalQuestionPreviewDict >> ',finalQuestionPreviewDict);
    console.log('sectionQuestionList >> ',sectionQuestionList);
}
// ==========================================================================================================================================================
// ==========================================================================================================================================================

// ========================================  SUBMIT PAPER DATA  ====================================================
// =================================================================================================================
function updatePaper() {
    // --------------------------------------------------------------------------
    console.log('sectionQuestionList >> ',sectionQuestionList);
    console.log("sectiondata >> ",sectiondata); // section wise section data
    // var sectionTotalQuestionArray = [];
    for(var i=0;i<sectiondata.length;i++){
        var data = sectiondata[i].split('-');
        // sectionTotalQuestionArray.push(data[1]);


        console.log('section_'+(i+1)+' length >> ',sectionQuestionList[i]['Section_'+(i+1)].length);
        console.log('section_'+(i+1)+' data array >> ',sectionQuestionList[i]['Section_'+(i+1)].length);
        if(parseInt(data[1]) ==  sectionQuestionList[i]['Section_'+(i+1)].length){
            console.log('length is correct!');
        }else{
            alert('Total question in Section '+(i+1)+' is not equal to '+parseInt(data[1]));
            return false;
        }
    }
    // console.log('sectionTotalQuestionArray >>> ',sectionTotalQuestionArray);

    // return false;


    // --------------------------------------------------------------------------
    var paperID = $('#uniquePaperId').val().trim();
    var paperName = $('#uniquePaperName').val().trim();
    var paperPassingMark = $('#passingMarks').val().trim();
    var paperGuideLines = $('#guidelines').val().trim();
    // ---------------------------------------------------------------------------
    // var dataLanguage = localStorage.getItem('sectionRowData');
    // var sectionRowData = dataLanguage.split(',');
    // var SectionWiseQuestionList = "[{'section A':[1,2,3,4]},{'section B':[4,5,6,7]},{'section C':[8,9,10,11]},{'section D':[12,13,14,15]}]";
    console.log('paperID=====>>>', paperID);
    console.log('paperName=====>>>', paperName);
    console.log('paperPassingMark=====>>>', paperPassingMark);
    console.log('paperGuideLines=====>>>', paperGuideLines);
    // ---------------------------------------------------------------------------
    
    var questionData = questionFinalDataDict;
    var SectionWiseQuestionList = [];
        
        var ele = document.getElementsByName('set');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                var data = ele[i].value;
            }
        }
    //     var automatedSet = data;
    //     $('#autoSetGenerat').text(data);
    //     if (data == 'no') {
    //         $('#autoSetGenerat').attr('readonly',true);
    //         var noOfSets = 1;
    //         var automatedSetStatus = false;
    //     } else {
    //         var noOfSets = $('#maxPossible_Set').val().trim();
    //         var automatedSetStatus = true;
    //     }
    // console.log('automatedSet=====>>>', automatedSetStatus);
    // console.log('noOfSets=====>>>', noOfSets);

    // =============================================================================================================
    // console.log('SectionWiseQuestionData >> ',SectionWiseQuestionData);
    // // "SectionWiseQuestionList": "[{'section A':[1,2,3,4]},{'section B':[4,5,6,7]},{'section C':[8,9,10,11]},{'section D':[12,13,14,15]}]",
    // var SectionWiseQuestionList = [];
    // var dictLength = Object.keys(SectionWiseQuestionData).length;
    // var counter = 0;
    // for(var i=0;i<dictLength;i++){
    //     var secDict = {};
    //     counter = counter + 1;
    //     secDict['Section_'+counter] = SectionWiseQuestionData['Section_'+counter];
    //     SectionWiseQuestionList.push(secDict);
    // }
    console.log('sectionQuestionList >> ',sectionQuestionList);
    // =============================================================================================================
    $('#alert').modal('hide');
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating Paper</b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
            
    url = window.location.href.split('/');
    len = url.length;
    console.log(url[len-1])
    // return false;
            // ------------------------  AJAX CALL --------------------------------------
        const csrftoken = getCookie('csrftoken');
        $.ajax({
        type: 'POST',
        url: "/edit_paper_detail/"+url[len-1],
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'paperID': paperID, 'paperName': paperName, 'paperPassingMark': paperPassingMark, 'paperGuideLines': paperGuideLines, 'SectionWiseQuestionList': JSON.stringify(sectionQuestionList ),'automatedSet': false, 'noOfSets': 1 },

        success: function (response) {
            console.log(response);
            Swal.close()
            if (response['data'] === 'success') {
                console.log('Success');
                Swal.fire({
                    icon: 'success',
                    title: 'Paper updated successfully',
                  }).then(function(){
                    //   location.href = "/paper_list";
                    location.reload();
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
}