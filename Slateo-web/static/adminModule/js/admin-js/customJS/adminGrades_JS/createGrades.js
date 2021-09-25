function hideIndividual(){
    $('#individualBlock').hide();
    $('#collectiveBlock').show();

}


function hideCollective(){
    $('#collectiveBlock').hide();
    $('#individualBlock').show();

}




// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===================================================    DEPENDENT CHAIN SELECTION     ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseTypeId = document.getElementById("courseTypeID");
    var coursenameId = document.getElementById("courseName");

    courseTypeId.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        coursenameId.length = 1;
        var courseTypeId = document.getElementById("courseTypeID");
        var selectedCourseTypeId = courseTypeId.value;

        console.log('courdeTypeId value = ',selectedCourseTypeId);

        $.ajax({
            type: 'GET',
            url: "chainedGradeCourses",
            data: { 'courseTypeId': selectedCourseTypeId.trim()},
            success: function (response) {
                console.log(response['courseList']);
                var courseStr = ''
                if (response['courseList'].length > 0){
                    for (var i = 0; i < response['courseList'].length;i++){
                        var data = '<option value="' + response['courseList'][i]['id'] + '">' + response['courseList'][i]['courseName'] +'</option>';
                        courseStr = courseStr + data;
                    }
                    console.log(courseStr);

                    // $('#baseSelectOption').hide();
                    $('#courseName').html('');
                    $('#courseName').append(courseStr);
                    
                }else{
                    var data = '<option value="">No Course Associated with this Course Type !</option>';
                    // $('#baseSelectOption').show();
                    $('#courseName').html('');
                    $('#courseName').append(data);

                }
            }
        });
    }
});


// -----------------------------------------------------------------------------------------------------------------------------------------------
$('input.float').on('input', function() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
  });