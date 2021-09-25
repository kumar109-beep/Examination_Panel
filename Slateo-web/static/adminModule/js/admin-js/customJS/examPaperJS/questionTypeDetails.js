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

var numberofSections = localStorage.getItem('numberofSections');
var numberOfQuestions = localStorage.getItem('totalQuestions');
// =================================================================================    ONLOAD DATA    ====================================================================================================
sectionData = ''
for (var i = 1; i <= parseInt(numberofSections); i++) {
    var questionDetailRow = '<option>Section ' + i + '</option>';
    sectionData = sectionData + questionDetailRow;
}

questionData = ''
for (var i = 1; i <= parseInt(numberOfQuestions); i++) {
    var questionDetailRow = '<option>Question ' + i + '</option>';
    questionData = questionData + questionDetailRow;
}

rowData = ''
for (var i = 1; i <= parseInt(numberofSections); i++) {
    var questionDetailRow = ''
    var Data = '<tr id="questionDetail_'+ i + '">\
                <td>\
                <select  title="Select section" class="selectpicker d-block" id="section_'+ i + '">\
                        '+ sectionData + '\
                    </select>\
                </td>\
                <td>\
                    <select  title="Select question" class="selectpicker d-block" multiple data-live-search="false" id="questionData_'+ i + '">\
                        '+ questionData + '\
                    </select>\
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
                <td class="last"> </td>\
                </tr>';
    rowData = rowData + Data;
}
$('#questionDetails').append(rowData);


// ==================================================================     add_More_Question_Section    ===============================================
function addMoreSection() {
    var rowCount = document.getElementsByTagName("tr").length - 1;
    var i = rowCount+1;
    $('.ques_type table tbody').append('<tr id="questionDetail_'+ i + '"><td>\
                                                <select  title="Select section" class="selectpicker d-block" id="section_'+ i + '">'+ sectionData + '</select></td>\
                                                <td>\
                                                    <select  title="Select question" class="selectpicker d-block" multiple data-live-search="false" id="questionData_'+ i + '">'+ questionData + '</select>\
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
                                                    <td class="last"> </td>\
                                                </tr>');
    $('select').selectpicker();
}

// ========================================================================================================================================================
function checkQuestionDetails(){
    alert();
    var rowCount = document.getElementsByTagName("tr").length - 1;
    console.log(rowCount);
    var questionTypeDetail = []

    for(var i=1;i<=rowCount;i++){
        var sectionData = $('#section_'+i).val();
        var questionData = $('#questionData_'+i).val();
        var questionTypeData = $('#questionType_'+i).val();

        questionTypeDetail.push(sectionData+'-'+questionData+'-'+questionTypeData)

    }
    console.log(questionTypeDetail);
    const csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: "create_paper_3",
        headers: { 'X-CSRFToken': csrftoken },
        data: { questionTypeDetail : questionTypeDetail },
        success: function (response) {
            console.log(response);
            if(response === 'success'){
                location.href = "/create_paper_4";
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
}