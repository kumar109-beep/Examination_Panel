// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===================================================    DEPENDENT CHAIN SELECTION     ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseTypeId = document.getElementById("courseTypeId");
    var coursenameId = document.getElementById("coursenameId");



    courseTypeId.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        coursenameId.length = 1;
        var courseTypeId = document.getElementById("courseTypeId");
        var selectedCourseTypeId = courseTypeId.value;

        $.ajax({
            type: 'GET',
            url: "chainedCourses",
            data: { courseTypeId: selectedCourseTypeId},
            success: function (response) {
                console.log(response['courseList']);
                var courseStr = ''
                if (response['courseList'].length > 0){
                    for (var i = 0; i < response['courseList'].length;i++){
                        var data = '<option value="' + response['courseList'][i]['id'] + '">' + response['courseList'][i]['courseName'] +'</option>';
                        courseStr = courseStr + data;
                    }
                    console.log(courseStr);

                    $('#baseSelectOption').hide();
                    $('#coursenameId').html('');
                    $('#coursenameId').append(courseStr);

                    
                }else{
                    var data = '<option value="">No Course Associated with this Course Type !</option>';
                    $('#baseSelectOption').show();
                    $('#coursenameId').html('');
                    $('#coursenameId').append(data);
                    
                }
            }
        });
        
    }
});






var coursenameId = document.getElementById("coursenameId");

coursenameId.onchange = function () {
    //empty Chapters- and Topics- dropdowns
    // coursenameId.length = 1;
    var courseTypeId = document.getElementById("courseTypeId");
    var selectedCourseTypeId = courseTypeId.value;

    var coursenameId = document.getElementById("coursenameId");
    var selectedCourseId = coursenameId.value;

    $.ajax({
        type: 'GET',
        url: "/filterBatches",
        data: { 'courseTypeId': selectedCourseTypeId,'coursenameId':selectedCourseId},
        success: function (response) {
            console.log(response['batchList']);

            var batchStr = ''
            if (response['batchList'].length > 0){
                for (var i = 0; i < response['batchList'].length;i++){
                    var data = '<option value="' + response['batchList'][i]['id'] + '">' + response['batchList'][i]['batchName'] +'</option>';
                    batchStr = batchStr + data;
                }
                console.log(batchStr);

                $('#baseSelectBatchOption').hide();
                $('#batchesId').html('');
                $('#batchesId').append(batchStr);

                
            }else{
                var data = '<option value="">No Batch Associated with this Course Type and Course!</option>';
                $('#baseSelectBatchOption').show();
                $('#batchesId').html('');
                $('#batchesId').append(data);
                
            }
        }
    });
    
}
