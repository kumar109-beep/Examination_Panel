

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
// =========================================================================================================================================
// ==============================================    ONREADY FUNCTION    ===================================================================
$(document).ready(function () {
    var questionType = $('#questionType').val();

    if (questionType == 'Objective'){
        var optionList = $('#optionList').text();
        var optionCurrentCount = $('#optionCurrentCount').text();
        // console.log(eval(optionList));
        $('#objectiveOptions').css('display','');
        $('#optionCount').val(optionCurrentCount);

        data = eval(optionList)
        console.log('data >>> ',data);
        // return false;

        var optionDataList = []
        var optionStatusList = []
        for (var i = 0; i < data.length;i++){
            // splitedData = data[i].split('~');
            optionStatusList = data[0];
            console.log('splitedData0 >> ',optionStatusList);

            optionDataList = data[1];
            console.log('splitedData1 >> ',optionDataList);

            // optionStatusList.push(splitedData[i]);
            // optionDataList.push(splitedData[i]);
        }
        console.log(optionStatusList, optionDataList);
        // return false;

        var optionString = '';

        for (var i = 0; i < optionStatusList.length; i++) {
            if (optionStatusList[i] == 'True'){
                var data = '<div class="row">\
                        <div class="col-lg-2  mt-1  form-group opt_radio" >\
                            <label><input class="topicOption" type="radio" name="trueoption" value="" checked > Option '+ (i + 1) + '</label>\
                        </div>\
                        <div class="col-lg-10 mt-1   form-group">\
                            <input  type="text" class="form-control topicDataText" placeholder="Type Options" value="'+ optionDataList[i]+'" />\
                        </div> \
                    </div >';

                optionString = optionString + data;
            }else{
                var data = '<div class="row">\
                        <div class="col-lg-2  mt-1  form-group opt_radio" >\
                            <label><input class="topicOption" type="radio" name="trueoption" value=""> Option '+ (i + 1) + '</label>\
                        </div>\
                        <div class="col-lg-10 mt-1   form-group">\
                            <input  type="text" class="form-control topicDataText" placeholder="Type Options" value="'+ optionDataList[i] +'" />\
                        </div> \
                    </div >';

                optionString = optionString + data;
            }
        }
        $('#options').show();
        $('#options').html('');
        $('#options').append(optionString);

    }else{
        $('#objectiveOptions').css('display','none');
    }
});
// =========================================================================================================================================
function editSpecificQuestion(){
    var questionType = $('#questionType').val();
    var questionData = $('.Editor-editor').html();
    var sameQuestionrefrence = $('#sameQuestionrefrence').text();

    console.log(questionType, '<<-->>', questionData, '<<-->>', sameQuestionrefrence);



    if (questionType == 'Objective') {
        var optionCount = $('#optionCount').val();
        if (optionCount.trim().length == 0) {
            swal("Select no. of options", '')
            return false;
        } else {

            var topicOptions = []
            var topic_Data = []

            var radios = document.getElementsByName('trueoption');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    topicOptions.push('true');
                } else {
                    topicOptions.push('false');
                }
            }

            $("input[class *= 'topicDataText']").each(function () {
                topic_Data.push($(this).val().trim());
            });

            console.log(topicOptions, '<<<-->>>', topic_Data);
            // return false;
            var questionOptionListData = [];
            var array1 = [];
            var masterOptionArray = [];
            var editDictData = {};
            // "question_data": [{"Question_English": "bgfnhmfhm", "option": "False|True", "optionStatement": "fbfg<<-|->>bngn"}],
            var option = '';
            var optionStatement = '';
            for (var i = 0; i < topicOptions.length; i++) {
                console.log(topicOptions[i], typeof (topicOptions[i]));
                if (topicOptions[i] == 'true'){
                    array1.push('True');
                    array1.push(topic_Data[i]);
                    if(option == ''){
                        option = option + 'True';
                    }else{
                        option = option +'|'+'True';
                    }

                    if(optionStatement == ''){
                        optionStatement = optionStatement + topic_Data[i];
                    }else{
                        optionStatement = optionStatement +'<<-|->>'+topic_Data[i];
                    }
                }else{
                    array1.push('False');
                    array1.push(topic_Data[i]);
                    if(option == ''){
                        option = option + 'False';
                    }else{
                        option = option +'|'+'False';
                    }

                    if(optionStatement == ''){
                        optionStatement = optionStatement + topic_Data[i];
                    }else{
                        optionStatement = optionStatement +'<<-|->>'+topic_Data[i];
                    }
                }

                console.log('array1 data >> ',array1);
                console.log('option data >> ',option);
                console.log('optionStatement data >> ',optionStatement);

                masterOptionArray.push(array1);
                questionOptionListData = [];
                
                // editDictData['option_' + (i + 1)] = array1;
                array1 = [];
            }
            // editDictData['questionText'] = questionData;
            var editQuestionLang = $('#editQuestionLang').val();
            editDictData['Question_'+editQuestionLang] = questionData;
            editDictData['option'] = option;
            editDictData['optionStatement'] = optionStatement;
            
            console.log('this is editDictData data : ', editDictData);
            var questiondataArray = [];
            questiondataArray.push(editDictData)
            // 'question_data': [{"Question_English": "questionData", "option": "False|True", "optionStatement": "fbfg<<-|->>bngn"}],


            // return false;
            // ==================================================================================================
            
           
            // ==================================================================================================
            // -------------------------   AJAX call  -----------------------------
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating Question</b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
                // {
                //    "selectNoOption": "3",    
                // }
                var edit_questionTypeID = $('#edit_questionTypeID').text();
                var edit_subQuestionTypeID = $('#edit_subQuestionTypeID').text();
                var edit_difficultyLevelID = $('#edit_difficultyLevelID').text();
                var edit_selectCourseID = $('#edit_selectCourseID').text();
                var edit_selectSubjectID = $('#edit_selectSubjectID').text();
                var edit_langID = $('#edit_langID').text();
                console.log('lang is >> ',edit_langID);
                var edit_topic = $('#edit_topic').val();
                var edit_correctMarks = $('#edit_correctMarks').val();
                var selectNoOption =  $('#optionCurrentCount').text();

                var existingQuestionTypeID = "NA"
                var existingQuestionID =  null

            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: window.location,
                headers: { 'X-CSRFToken': csrftoken },
                data: {'selectLanguage':editQuestionLang.trim(),'questionType':edit_questionTypeID,'subQuestionType':edit_subQuestionTypeID,'Topic':edit_topic,'difficultyLevel':edit_difficultyLevelID,'correctMarks':edit_correctMarks,'selectCourse':edit_selectCourseID,'selectSubject':edit_selectSubjectID,'questionData':JSON.stringify(questiondataArray),'sameQuestionrefrence':sameQuestionrefrence,'add_type':'objective','lang_id':edit_langID, "existingQuestionTypeID": existingQuestionTypeID, "existingQuestionID": existingQuestionID,'selectNoOption':selectNoOption,'questionTypeText':'Objective','question_Data':questionData,
                },
                success: function (response) {
                    Swal.close()
                    console.log('question bank API Objective RESPONSE :---->> ', response['questionAPI_Response']);
                    if (response['questionAPI_Response'] === 'success') {
                        Swal.fire({
                            title: '<h4>Question Updated successfully.</h4>',
                            icon: 'success',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                        }).then(function () {
                            location.reload();
                        })
                    } else if (response['questionAPI_Response'] === 'fail') {
                        Swal.fire({
                            title: '<h4>An error occured while updating question.</h4>',
                            icon: 'error',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                        }).then(function () {
                            // location.reload();
                            return false;
                        })
                    }
                }
            });
            // --------------------------------------------------------------------
        }
    } else {
        // -------------------------   AJAX call  -----------------------------
        var url = window.location.href;
            var urlSplit = url.split('/');
            var res = urlSplit.pop();
        const csrftoken = getCookie('csrftoken');
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Updating Question</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        $.ajax({
            type: 'POST',
            url: window.location,
            headers: { 'X-CSRFToken': csrftoken },
            data: { questionType: questionType,questionData: questionData,'sameQuestionrefrence':sameQuestionrefrence,'add_type':'primary','questionTypeText':'Subjective'
            },
            success: function (response) {
                console.log('question bank API Subjective RESPONSE :---->> ', response['questionAPI_Response']);
                Swal.close()
                if (response['questionAPI_Response'] === 'success') {
                    Swal.fire({
                        title: '<h4>Question Updated successfully.</h4>',
                        icon: 'success',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                    }).then(function () {
                        location.reload();
                    })
                } else if (response['questionAPI_Response'] === 'fail') {
                    Swal.fire({
                        title: '<h4>An error occured while updating question.</h4>',
                        icon: 'error',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                    }).then(function () {
                        return false;
                    })
                }
            }
        });
        // --------------------------------------------------------------------
    }

}


// ===============================================================================================================================
function renderOptions() {
    var optionCount = $('#optionCount').val();

    var optionString = '';

    for (var i = 0; i < parseInt(optionCount); i++) {
        var data = '<div class="row">\
                        <div class="col-lg-2  mt-1  form-group opt_radio" >\
                            <label><input class="topicOption" type="radio" name="trueoption" value=""> Option '+ (i + 1) + '</label>\
                        </div>\
                        <div class="col-lg-10 mt-1   form-group">\
                            <input  type="text" class="form-control topicDataText" placeholder="Type Options" value="" />\
                        </div> \
                    </div >';
        optionString = optionString + data;
    }
    $('#options').show();
    $('#options').html('');
    $('#options').append(optionString);
}


// ==================================================================================================================================================
