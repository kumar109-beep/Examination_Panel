// =========================================================================================================================
//                                         Render Selected Sectional Questions
// =========================================================================================================================
function renderSelectedQuestion(thisTxt){
    var questionId = $(thisTxt).attr('quesID');
    // -------------------------------------------------------------
    //                       AJAX CALL
    // -------------------------------------------------------------
    $.ajax({
        type: 'GET',
        url: '/getQuestion',
        data: {'questionID':questionId},
        success: function (response) {
            console.log('question API Objective RESPONSE :---->> ', response['questionAPI_Response']);
            var questionData = response['questionAPI_Response']['question'].replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            var optionArray = response['questionAPI_Response']['optionList'].replaceAll('[','').split(']');
            $('#appendQuestion').html('');
            var text = questionData.replace(/(<([^>]+)>)/g, "");
            $('#appendQuestion').append('<strong>'+text+'</strong>');

            if(optionArray.length > 1){
              var xdata = optionArray[1].trim().replaceAll(' ',' ').split(',');
              var optionList = '';
              for(var i=1;i<xdata.length;i++){
                var optionsData = '<div class="col-md-6"> \
                <label><input type="radio" name="opt"><div><span>'+i+' <i class="fa fa-check"></i> </span> ' + xdata[i].replaceAll("'",'') + ' </div> </label>\
              </div>';
                    optionList = optionList + optionsData;
              }
            }else{
              var optionList = '';
            }

            $('#optionAppend').html('');
            $('#optionAppend').append(optionList);
            $('#questionOptionBody').css('display','');


            $('#sectionCount').html('');
            $('#sectionCount').html($(thisTxt).attr('sectionCount'));
            
            $('#questionCount').html('');
            $('#questionCount').append($(thisTxt).attr('questionNumber'));

            $('#questionmarks').html('');
            $('#questionmarks').append(response['questionAPI_Response']['refrence_Questions_Type_Detail']['correctMarks'] + ' Marks <a href="javascript:;"> <i class="fa fa-bookmark-o"></i></a>');
        }
    });
    // -------------------------------------------------------------
}
// =========================================================================================================================



// =========================================================================================================================

