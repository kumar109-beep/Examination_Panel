$(document).ready(function () {

    if ("totalmarks" in localStorage) {
        localStorage.removeItem('totalmarks');
    }
    var courseName = document.getElementById("coursenameId");
    var subjectID = document.getElementById("associatedSubject");

    courseName.onchange = function () {
        associatedSubject.length = 1;
        var courseName = document.getElementById("coursenameId");
        var selectedCourseId = courseName.value;
        var data = '';
        localStorage.setItem('subJectString',data);

        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                console.log(response['subjectList']);
                if (response['subjectList'] === 'error') {
                    data = data + '<option value="">No Subject Associated to this Course !</option>';
                    $('#associatedSubject').html('');
                    $('#associatedSubject').append(data);
                    $('#associatedSubject').selectpicker('refresh');
                    localStorage.setItem('subJectString', data);

                    $('#totalExamTime').prop('readonly',true);
                    $('#totalMarksData').prop('readonly',true);
                    $('#passingMarks').prop('readonly',true);
                    $('#language').prop('readonly',true);
                    $('#guidelines').prop('readonly',true);
                    $('#page_1_nextButton').prop('disabled',true);

                } else {
                    if (response['subjectList']['subjectNameFK'].length > 0) {
                        $('#associatedSubject').html('');
                        for (var i = 0; i < response['subjectList']['subjectNameFK'].length; i++) {
                            data = data + '<option value="' + response['subjectList']['subjectNameFK'][i] + '">' + response['subjectList']['subjectsList'][i] + '</option>';
                        }
                        $('#associatedSubject').append(data);
                        $('#associatedSubject').selectpicker('refresh');
                        localStorage.setItem('subJectString', data);
                        
                        $('#totalExamTime').prop('readonly', false);
                        $('#totalMarksData').prop('readonly', false);
                        $('#passingMarks').prop('readonly', false);
                        $('#language').prop('readonly', false);
                        $('#guidelines').prop('readonly', false);
                        $('#page_1_nextButton').prop('disabled', false);

                    } else {
                        $('#associatedSubject').html('');
                        data = data + '<option value="">No Subject Associated to this Course !</option>'
                        $('#associatedSubject').append(data);
                        $('#associatedSubject').selectpicker('refresh');
                        localStorage.setItem('subJectString', data);

                        $('#totalExamTime').prop('readonly', true);
                        $('#totalMarksData').prop('readonly', true);
                        $('#passingMarks').prop('readonly', true);
                        $('#language').prop('readonly', true);
                        $('#guidelines').prop('readonly', true);
                        $('#page_1_nextButton').prop('disabled', true);

                    }
                }
            }
        });
    }
});


// =====================================================================
function checkTotakMarks() {
    var totalMarks = $('#totalMarksData').val();
    var passMarks = $('#passingMarks').val();
    if (parseInt(totalMarks) < parseInt(passMarks)) {
        Swal.fire("<small>Total marks can't be less than passing marks!</small>");
        $('#totalMarksData').val('');
        $('#passingMarks').val('');
        return false;
    }

}
// ==============================================================================================
// ==============================================================================================
function checkPassMarks() {
    var totalMarks = $('#totalMarksData').val();
    var passMarks = $('#passingMarks').val();

    if (parseInt(totalMarks) < parseInt(passMarks)) {
        Swal.fire("<small>Total marks can't be less than passing marks!</small>");
        $('#passingMarks').val('');
        return false;
    }
}
// ==============================================================================================
// ==============================================================================================
function renderDependentLanguage(){
    var languageArray = $('#language').val();
    var optionString = '';
    for(var i=0;i<languageArray.length;i++){
        var data = '<option value="' + languageArray[i] +'">' + languageArray[i]+'</option>';
        optionString = optionString + data;
    }
    $('#defaultLanguage').html('');
    $('#defaultLanguage').append(optionString);
    $('#defaultLanguage').selectpicker('refresh');
}