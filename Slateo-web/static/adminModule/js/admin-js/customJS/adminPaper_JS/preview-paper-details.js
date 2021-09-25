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
// ==================================================================================================

$(document).ready(function () {
  var sectiondata = eval($('#sectionDetailPara').html())
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
      // dataArray.push('Subjective')
      var data = '<span style="border:1px solid white;padding:2px 4px;background-color:#D0D0D0;">Subjective</span>';
      dataArray.push(data);
    }if(dataArray[4] == '2'){
      dataArray.pop();
      // dataArray.push('Objective')
      var data = '<span style="border:1px solid white;padding:2px 4px;background-color:#D0D0D0;">Objective</span>';
      dataArray.push(data);
    }if(dataArray[4] == '1,2'){
      dataArray.pop();
      var data = '<span style="border:1px solid white;padding:2px 4px;background-color:#D0D0D0;">Subjective</span>&nbsp;<span style="border:1px solid white;padding:2px 4px;background-color:#D0D0D0;">Objective</span>';
      dataArray.push(data);
    }
    secData.push(dataArray);
  }
  console.log('secData splited array >> ',secData);
  
  var sectionRow = '';
  var counter = 0;
  for(var i=0;i<secData.length;i++){
    counter = counter + 1;
    var data = '<div class="row">\
                        <div class="col-lg-2    form-group">\
                        <p class="value">' + counter + '</p>\
                    </div>\
                        <div class="col-lg-2    form-group">\
                        <p class="value">'+secData[i][1]+'</p>\
                    </div>\
                        <div class="col-lg-2    form-group">\
                        <p class="value">'+secData[i][2]+'</p>\
                    </div> \
                    <div class="col-lg-3    form-group">\
                        <p class="value">'+secData[i][4]+'</p>\
                    </div>\
                    <div class="col-lg-3    form-group">\
                        <p class="value">'+secData[i][3]+'</p>\
                    </div> \
                </div>';
        sectionRow = sectionRow + data;
  }
  $('#sectiondataAppend').html('');
  $('#sectiondataAppend').append(sectionRow);

// =================================================================================================
// =========================   ADD QUESTION DETAIL   ===============================================
// =================================================================================================
var questionsDataDict = $('#sectionQuestiondata').html();
// console.log('questionsDataDict >>>> ',eval(questionsDataDict)[0]);
var questiondictLength = Object.keys(eval(questionsDataDict)[0]).length;
var questionString = '';
var count = 0
for(var i=0;i<questiondictLength;i++){
    var questionsStr = '';
    var data = '';
    count = i + 1
    // console.log('i value >> ',count,eval(questionsDataDict)[0]['Section_'+count]);
    var sectionHeader = '<div class="col-lg-12 mt-1 mb-0 form-group">\
    <hr style="border-top: 3px solid #8c8b8b;"><h5 class="font-weight-bold" style="text-decoration:underline;">Section '+count+' </h5>\
                        </div>';
    for(var j=0;j<eval(questionsDataDict)[0]['Section_'+count].length;j++){
        var dataArr = eval(questionsDataDict)[0]['Section_'+count]
        
        var questionData = dataArr[j]['question'].replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        console.log('================================================');
        var optionArray = dataArr[j]['optionList'].replaceAll('[','').split(']');
        // if(optionArray.length > 1){
        //   var xdata = optionArray[1].trim().replaceAll(' ','').split(',');
        //   console.log('j value >> ',dataArr[j]);
        //   console.log(xdata,typeof(xdata));
        //   var optionList = '';
        //   for(var i=1;i<xdata.length;i++){
        //     var optionsData = '<p class="ml-1"><i style=";font-size: 20px;color:black;font-weight: 800;" class="far fa-circle"></i>&nbsp;&nbsp;' + xdata[i].replaceAll("'",'') + '</p>';;
        //         optionList = optionList + optionsData;
        //   }
        // }else{
        //   var optionList = '';
        // }
        console.log('-------------------------------------------------');
        var text = questionData.replace(/(<([^>]+)>)/g, "");
        console.log(questionData);
        console.log(text);
        console.log('================================================');

        data = '<div class="col-lg-12 mt-0   pl-0  form-group  added-ques d-block">\
                        <div class="ques">\
                                <h5><span>Q.'+(j+1)+'</span>'+text+'</h5>\
                            </div>\
                    </div>';
                    questionsStr = questionsStr + data;
                }
                questionString = questionString + sectionHeader + questionsStr
}
$('#questionsApeend').html('');
$('#questionsApeend').append(questionString + '<hr style="border-top: 5px solid #8c8b8b;">');
// $('#questionsApeend').append(questionString.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));

// console.log("questionStringquestionString",questionString);
});