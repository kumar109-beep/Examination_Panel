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
// ====================================================    VALIDATE BASIC DETAILS OF EXAM PAPER   =============================================================
// ============================================================================================================================================================
function validateAssociatedCourse() {
    var associatedCourse = $('#associatedCourse').val();

    // var regex = /^[ A-Za-z0-9_-]*$/;
    if (associatedCourse.trim().length <= 0) {
        // if (associatedCourse.match(regex)) {
        //     $('#associatedCourse').css('border', '');
        //     $('#associatedCourseError').html('');
        //     $('#basicPaperDetailBtn').attr('disabled', false);
        // } 
        // if {
            $('#associatedCourse').css('border', '2px solid red');
            // $('#associatedCourseError').html('Only alpha-numeric characters,- and _ allowed!');
            $('#basicPaperDetailBtn').attr('disabled',true);
        // }
    } else {
        $('#associatedCourse').css('border', '');
        $('#associatedCourseError').html('');
        $('#basicPaperDetailBtn').attr('disabled', false);
    }
}
// ============================================================================================================================================================
function validateTotalMarks() {
    var totalMarks = $('#totalMarks').val();
    var passingMarks = $('#passingMarks').val();
    if (parseInt(totalMarks) < parseInt(passingMarks)) {
        $('#totalMarksError').html('Total marks cant be less than passing marks!');
        $('#totalMarks').css('border', '2px solid red');
        $('#passingMarksError').html('Passing marks cant be greater than passing marks!');
        $('#passingMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
    } else if (totalMarks.length == 0) {
        $('#totalMarksError').html('Please enter total marks.');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
    } else if (totalMarks == 0) {
        $('#totalMarksError').html('Please enter valid total marks.');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
    }
    else {
        $('#totalMarksError').html('');
        $('#totalMarks').css('border', '');
        $('#passingMarksError').html('');
        $('#passingMarks').css('border', '');
        $('#basicPaperDetailBtn').attr('disabled', false);
    }
    localStorage.setItem('total_marks', totalMarks);
}
// ============================================================================================================================================================
function validatePassingMarks() {
    var totalMarks = $('#totalMarks').val();
    var passingMarks = $('#passingMarks').val();
    if (parseInt(totalMarks) < parseInt(passingMarks)) {
        $('#passingMarksError').html('Passing marks cant be greater than passing marks!');
        $('#passingMarks').css('border', '2px solid red');
        $('#totalMarksError').html('Total marks cant be less than passing marks!');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);

    } else if (totalMarks.length == 0) {
        $('#totalMarksError').html('Please enter total marks.');
        $('#totalMarks').css('border', '2px solid red');
        $('#basicPaperDetailBtn').attr('disabled', true);
    }
    else {
        $('#passingMarksError').html('');
        $('#passingMarks').css('border', '');
        $('#totalMarksError').html('');
        $('#totalMarks').css('border', '');
        $('#basicPaperDetailBtn').attr('disabled', false);
    }

}
// ============================================================================================================================================================
function validateUniquePapername() {
    var uniquePaperName = $('#uniquePaperName').val();
    // var regex = /^[ A-Za-z]*$/;
    if (uniquePaperName.trim().length <= 0) {
        // if (uniquePaperName.match(regex)) {
        //     $('#uniquePaperName').css('border', '');
        //     $('#uniquePaperNameError').html('');
        //     $('#basicPaperDetailBtn').attr('disabled', false);


        // }
        //  else {
            $('#uniquePaperName').css('border', '2px solid red');
            // $('#uniquePaperNameError').html('Only alphanumeric allowed!');
            $('#basicPaperDetailBtn').attr('disabled', true);

        // }
    } else {
        $('#uniquePaperName').css('border', '');
        $('#uniquePaperNameError').html('');
        $('#basicPaperDetailBtn').attr('disabled', false);

    }
}
// ============================================================================================================================================================
function validateUniquePaperID() {
    // var uniquePaperId = $('#uniquePaperId').val();
    // var regex = /^[ A-Za-z0-9_-]*$/;
    // if (uniquePaperId.length > 0) {
    //     if (uniquePaperId.match(regex)) {
    //         $('#uniquePaperId').css('border', '');
    //         $('#uniquePaperIdError').html('');

    //     } else {
    //         $('#uniquePaperId').css('border', '2px solid red');
    //         $('#uniquePaperIdError').html('Only alpha-numeric characters,- and _ allowed!');
    //     }
    // } else {
    //     $('#uniquePaperId').css('border', '');
    //     $('#uniquePaperIdError').html('');
    // }
}
// ============================================================================================================================================================