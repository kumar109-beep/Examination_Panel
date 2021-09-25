var questionList = [];
var questionEvaluationDict = {};
var evaluatedSheetData = {};
// =================================================================================
function submitAnswerSheet(){
    var sum = 0;
    var correctFlag = true;
    //iterate through each textboxes and add the values
    var questionCount = 0;
    $(".marks_ob").each(function() {
        //add only if the value is number
        if(!isNaN(this.value) && this.value.length!=0) {
            sum += parseFloat(this.value);
            questionCount = questionCount + 1;
        }
    });

    $(".marks_ob").each(function() {
        if(this.value == '' || this.value == '.'){
            $(this).css('border','2px solid red');
            correctFlag = false;
            return false;
        }else{
            $(this).css('border','');
        }
    });
    var totalPaperMarks = $('#totalPaperMarks').text();
    if(parseFloat(totalPaperMarks) < parseFloat(sum)){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "<small>Total marks can't be less than obtained marks!</small>",
            showConfirmButton: true,
            // timer: 1500
        })
    }else if(correctFlag == true){
        var paper_passing_marks = $('#paper_passing_marks').text();
        if(parseFloat(paper_passing_marks) <= parseFloat(sum)){
            var passStatus = 'Passed';
            var color = 'green';
        }else{
            var passStatus = 'Failed';
            var color = 'red';
        }
        Swal.fire({
            title: "<small>Obtained marks : <strong>"+sum+"/"+totalPaperMarks+"</strong><br>Pass status : <strong style='color:"+color+";'>"+passStatus+"</strong></small>",
            // text: ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                for(var i=1;i<=questionCount;i++){
                    var question_marks = $('#questionActualMarks_'+i).text();
                    var obtained_marks = $('#questionObtainedMarks_'+i).val();
                    // -------------------------------------------------------------------
                    questionEvaluationDict['questionNo'] = i
                    questionEvaluationDict['question_marks'] = question_marks;
                    questionEvaluationDict['obtained_marks'] = obtained_marks;

                    questionList.push(questionEvaluationDict);
                    questionEvaluationDict = {}
                }
                // console.log('questionList >> ',questionList);
                // ========================================================================
                // <p id='examid' style="display: none;">EP001545</p>
                // <p id='paper_Name' style="display: none;">B.Sc. 1st year Maths</p>
                // <p id='paper_passing_marks' style="display: none;">30</p>
                var examid = $('#examid').text();
                var paper_Name = $('#paper_Name').text();
                var student_registration_no = $('#studentRegistrationNumber').text();
                var paper_passing_marks = $('#paper_passing_marks').text();
                var total_paper_marks = $('#totalPaperMarks').text();
                // var total_obtained_marks = $('#totalPaperMarks').text();
                // ========================================================================
                // {
                //     "exan_ID" : "EP001545",
                //     "paper_Name" : "B.Sc. 1st year Maths",
                //     "student_registration_no":"454800102",
                //     "question_marks":"[{'questionNo : 01,question_marks : 4,obtained_marks : 2},{'questionNo : 02,question_marks : 3,obtained_marks : 3}]",
                //     "total_paper_marks":7,
                //     "total_obtained_marks":5,
                //     "paper_passing_marks":4,
                //     "passing_status":"Passed",
                //     "evaluation_status":"Evaluated",
                // }
                // ========================================================================
                evaluatedSheetData['exam_ID'] = examid
                evaluatedSheetData['paper_Name'] = paper_Name
                evaluatedSheetData['student_registration_no'] = student_registration_no
                evaluatedSheetData['total_paper_marks'] = total_paper_marks
                evaluatedSheetData['total_obtained_marks'] = sum
                evaluatedSheetData['paper_passing_marks'] = paper_passing_marks
                evaluatedSheetData['question_marks'] = questionList
                evaluatedSheetData['passing_status'] = passStatus
                evaluatedSheetData['evaluation_status'] = 'Evaluated'
                // ========================================================================
                console.log('evaluatedSheetData ::>> ',evaluatedSheetData);
                // ========================================================================
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "<small>Student sheet evaluated successfully</small>",
                    showConfirmButton: true,
                    // timer: 1500
                  }).then(function(){
                      location.href = '/response';
                  })
            }
          })
    }
}