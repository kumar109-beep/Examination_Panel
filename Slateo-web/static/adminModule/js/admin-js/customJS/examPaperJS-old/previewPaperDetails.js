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
// ==================================================   editPaperBasicDetail    ===============================================================================
// ============================================================================================================================================================
function editPaperBasicDetail(){
    $('#editBasicDetailBtn').hide();
    $('#basicDetailOkBtn').show();
    $('#paperSubmitBtn').prop('disabled',true);

    var paperUniqueID = $('#paperUniqueID').text();
    var paperUniqueName = $('#paperUniqueName').text();
    var paperAssociatedCourse = $('#paperAssociatedCourse').text();
    // var paperTotalMarks = $('#paperTotalMarks').text();
    // var paperPassingMarks = $('#paperPassingMarks').text();

    $('#paperUniqueID').html('');
    $('#paperUniqueID').html('<input id="paperUID" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperUniqueID +'">');

    $('#paperUniqueName').html('');
    $('#paperUniqueName').html('<input id="paperUName" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperUniqueName + '">');

    $('#paperAssociatedCourse').html('');
    $('#paperAssociatedCourse').html('<input id="paperAssocCourse" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperAssociatedCourse + '">');

    // $('#paperTotalMarks').html('');
    // $('#paperTotalMarks').html('<input id="paperTMarks" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperTotalMarks + '">');

    // $('#paperPassingMarks').html('');
    // $('#paperPassingMarks').html('<input id="paperPassMarks" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperPassingMarks + '">');

}

function donePaperBasicDetail(){
    $('#basicDetailOkBtn').hide();
    $('#editBasicDetailBtn').show();
    $('#paperSubmitBtn').prop('disabled', false);

    var paperUniqueID = $('#paperUID').val();
    var paperUniqueName = $('#paperUName').val();
    var paperAssociatedCourse = $('#paperAssocCourse').val();
    // var paperTotalMarks = $('#paperTMarks').val();
    // var paperPassingMarks = $('#paperPassMarks').val();

    $('#paperUniqueID').html('');
    $('#paperUniqueID').html('<p id="paperUniqueID" class="value" >' + paperUniqueID +'</p>');

    $('#paperUniqueName').html('');
    $('#paperUniqueName').html('<p id="paperUniqueName" class="value">' + paperUniqueName +'</p>');

    $('#paperAssociatedCourse').html('');
    $('#paperAssociatedCourse').html('<p id="paperAssociatedCourse" class="value">' + paperAssociatedCourse +'</p>');

    // $('#paperTotalMarks').html('');
    // $('#paperTotalMarks').html('<p id="paperTotalMarks" class="value">' + paperTotalMarks +'</p>');

    // $('#paperPassingMarks').html('');
    // $('#paperPassingMarks').html('<p id="paperPassingMarks" class="value">' + paperPassingMarks +'</p>');

}
// ============================================================================================================================================================
// =======================================     editPaperSectionDetail    ======================================================================================
// ============================================================================================================================================================
function editPaperSectionDetail() {
    $('#editSectionDetailBtn').hide();
    $('#donePaperSectionDetail').show();
    $('#paperSubmitBtn').prop('disabled',true);

    var paperCredit = $('#paperCredit').text();
    // var paperSection = $('#paperSection').text();
    // var paperTotQuestion = $('#paperTotQuestion').text();
    // var paperTotMarks = $('#paperTotMarks').text();

    $('#paperCredit').html('');
    $('#paperCredit').html('<input id="paperCred" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperCredit +'">');

    // $('#paperSection').html('');
    // $('#paperSection').html('<input id="paperSec" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperSection + '">');

    // $('#paperTotQuestion').html('');
    // $('#paperTotQuestion').html('<input id="paperTotQue" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperTotQuestion + '">');

    // $('#paperTotMarks').html('');
    // $('#paperTotMarks').html('<input id="paperTotMark" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperTotMarks + '">');
}

function donePaperSectionDetail() {
    $('#donePaperSectionDetail').hide();
    $('#editSectionDetailBtn').show();
    $('#paperSubmitBtn').prop('disabled', false);

    var paperCred = $('#paperCred').val();
    // var paperSec = $('#paperSec').val();
    // var paperTotQue = $('#paperTotQue').val();
    // var paperTotMark = $('#paperTotMark').val();

    $('#paperCredit').html('');
    $('#paperCredit').html('<p id="paperCredit" class="value" >' + paperCred + '</p>');

    // $('#paperSection').html('');
    // $('#paperSection').html('<p id="paperSection" class="value">' + paperSec + '</p>');

    // $('#paperTotQuestion').html('');
    // $('#paperTotQuestion').html('<p id="paperTotQuestion" class="value">' + paperTotQue + '</p>');

    // $('#paperTotMarks').html('');
    // $('#paperTotMarks').html('<p id="paperTotMarks" class="value">' + paperTotMark + '</p>');


}
// ============================================================================================================================================================
// ===================================       editQuestionTypeDetail      ======================================================================================
// ============================================================================================================================================================
function editQuestionTypeDetail() {
    
}
// ============================================================================================================================================================
// ===========================================     editPaperSetOption     =====================================================================================
// ============================================================================================================================================================

function editPaperSetOption() {
    $('#editPaperSetDetailBtn').hide();
    $('#donePaperSetDetail').show();
    $('#paperSubmitBtn').prop('disabled', true);

    var paperPossibleSets = $('#paperPossibleSets').text();
    // var paperLanguages = $('#paperLanguages').text();
    // var paperAllowedOptions = $('#paperAllowedOptions').text();

    $('#paperPossibleSets').html('');
    $('#paperPossibleSets').html('<input id="paperPossSets" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperPossibleSets + '">');

    // $('#paperLanguages').html('');
    // $('#paperLanguages').html('<input id="paperLang" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperLanguages + '" readonly>');

    // $('#paperAllowedOptions').html('');
    // $('#paperAllowedOptions').html('<input id="paperAllowedOpt" style="border: 0;outline: 0;background: transparent;border-bottom: 1px solid black;" class="value" value="' + paperAllowedOptions + '" readonly>');
}

function donePaperSetDetail() {
    $('#donePaperSetDetail').hide();
    $('#editPaperSetDetailBtn').show();
    $('#paperSubmitBtn').prop('disabled', false);

    var paperPossSets = $('#paperPossSets').val();
    // var paperLang = $('#paperLang').val();
    // var paperAllowedOpt = $('#paperAllowedOpt').val();

    $('#paperPossibleSets').html('');
    $('#paperPossibleSets').html('<p id="paperCredit" class="value" >' + paperPossSets + '</p>');

    // $('#paperLanguages').html('');
    // $('#paperLanguages').html('<p id="paperSection" class="value">' + paperLang + '</p>');

    // $('#paperAllowedOptions').html('');
    // $('#paperAllowedOptions').html('<p id="paperTotQuestion" class="value">' + paperAllowedOpt + '</p>');

}
// ============================================================================================================================================================
// ====================================================    SUBMIT PAPER DATA USING AJAX    ====================================================================
// ============================================================================================================================================================
function submitPaperData(){
    var paperID = $('#paperUniqueID').text();
    var paperName = $('#paperUniqueName').text();
    var paperAssociateCourse = $('#paperAssociatedCourse').text();
    var paperTotalMarks = $('#paperTotalMarks').text();
    var paperPassingMark = $('#paperPassingMarks').text();

    var paperCredit = $('#paperCredit').text();
    var totalSection = $('#paperSection').text();
    var totalnumberOuestion = $('#paperTotQuestion').text();
    var sectionDetails = $('#hiddenSectionDetailPara').text();

    var questionTypeDetails = $('#hiddenQuestionDetailPara').text();

    var automatedSet = $('#automatedSet').text();
    var flag = false

    if (automatedSet =='Yes'){
        flag = true;
    }

    var paperPossibleSets = $('#paperPossibleSets').text();
    var paperLanguages = $('#paperLanguages').text();
    var paperAllowedOptions = $('#paperAllowedOptions').text();
    
    var setsTypeDetails = paperPossibleSets + '-' + paperLanguages + '-' + paperAllowedOptions

    console.log(paperID, paperName, paperAssociateCourse, paperTotalMarks, paperPassingMark);
    console.log(paperCredit, totalSection, totalnumberOuestion, sectionDetails);
    console.log(questionTypeDetails);
    console.log(automatedSet, setsTypeDetails);

    const csrftoken = getCookie('csrftoken');
    swal.showLoading();
    $.ajax({
        type: 'POST',
        url: "preview_paper_data",
        headers: { 'X-CSRFToken': csrftoken },
        data: { paperID: paperID, paperName: paperName, paperAssociateCourse: paperAssociateCourse, paperTotalMarks: paperTotalMarks, paperPassingMark: paperPassingMark, paperCredit: paperCredit, totalSection: totalSection, totalnumberOuestion: totalnumberOuestion, sectionDetails: sectionDetails, questionTypeDetails: questionTypeDetails, automatedSet: flag, setsTypeDetails: setsTypeDetails },
        success: function (response) {
            console.log('This is the response : ',response['response']);
            if (response['response'] == 'success') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Paper created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    location.href = "/paper_list";
                    });
            } else if (response['response'] == 'Fail'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Paper with this ID or Name already exist!',
                })
                
                return false;
            }
        }
    }); 
}