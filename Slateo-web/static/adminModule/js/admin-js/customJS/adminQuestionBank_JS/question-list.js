// ==========================================    SEARCH FOR SUBJECTS ACCORDING TO SELECTED COURSE    =============================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {



    // $('#questionYear').val(n);
    // var d = new Date();
    // var n = d.getFullYear();


    var courseName = document.getElementById("courseName");
    var subjectID = document.getElementById("subjectID");
    courseName.onchange = function () {
        var courseName = document.getElementById("courseName");
        var selectedCourseId = courseName.value;


        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                console.log(response['subjectList']['data']);
                if (response['subjectList'] === 'error') {
                    var data = '<option value="" class="text-center">No Subject with this Course !</option>';
                    $('#baseSelectOption').show();
                    $('#subjectID').html('');
                    $('#subjectID').append(data);

                } else {
                    // return false;
                    var courseStr = ''
                    
                    if (response['subjectList']['data']['subjectNameFK'].length > 0) {
                        for (var i = 0; i < response['subjectList']['data']['subjectNameFK'].length; i++) {
                            console.log('===========================================');
                            console.log('data >> ',response['subjectList']['data']['subjectNameFK'][i]);
                            console.log('===========================================');
                            var data = '<option value="' + response['subjectList']['data']['subjectNameFK'][i]['id'] + '">' + response['subjectList']['data']['subjectNameFK'][i]['subjectName'] + '</option>';
                            courseStr = courseStr + data;
                        }

                        $('#baseSelectOption').hide();
                        $('#subjectID').html('');
                        $('#subjectID').append('<option value="">Select Subject</option>' + courseStr);
                        $('#topicID').html('');
                        $('#topicID').append('<option value="">Select Topic</option>');

                    } else {
                        var data = '<option value="">No Subject Associated with this Course !</option>';
                        $('#baseSelectOption').show();
                        $('#subjectID').html('');
                        $('#subjectID').append(data);

                    }
                }
            }
        }).then(function () {
            // =====================================================================================================
            var year = $('#questionYear').val();
            var courseId = $('#courseName').val();
            var subjectID = $('#subjectID').val();
            var topic = $('#topicID').val();

            var array1 = []
            var array2 = []
            var array3 = []
            var array4 = []


            console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);

            // difficultyList = request.GET.getlist('difficultyList[]')
            // questionTypeList = request.GET.getlist('questionTypeList[]')
            // marksList = request.GET.getlist('marksList[]')
            // languageList = request.GET.getlist('languageList[]')
            // --------------------------------------------------------------------------------

            $("input:checkbox[name=Difficulty]:checked").each(function () {

                if (array1.includes($(this).val())) {
                    var index = array1.indexOf($(this).val());
                    if (index > -1) {
                        array1.splice(index, 1);
                    }
                } else {
                    array1.push($(this).val());
                }
            });

            $("input:checkbox[name=questionType]:checked").each(function () {

                if (array2.includes($(this).val())) {
                    var index = array2.indexOf($(this).val());
                    if (index > -1) {
                        array2.splice(index, 1);
                    }
                } else {
                    array2.push($(this).val());
                }
            });

            $("input:checkbox[name=language]:checked").each(function () {

                if (array3.includes($(this).val())) {
                    var index = array3.indexOf($(this).val());
                    if (index > -1) {
                        array3.splice(index, 1);
                    }
                } else {
                    array3.push($(this).val());
                }
            });

            $("input:checkbox[name=marks]:checked").each(function () {

                if (array4.includes($(this).val())) {
                    var index = array4.indexOf($(this).val());
                    if (index > -1) {
                        array4.splice(index, 1);
                    }
                } else {
                    array4.push($(this).val());
                }
            });

            // --------------------------------------------------------------------------------
            filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4);
            // $.ajax({
            //     type: 'GET',
            //     url: "filterData",
            //     data: { year: year, courseId: courseId, subjectID: subjectID, topic: topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]':array4 },
            //     success: function (response) {
            //         console.log(response['FILTERED_data']);
            //         $('#totalCount').html('');
            //         $('#totalCount').html(response['FILTERED_data'].length);

            //         if (response['FILTERED_data'].length <= 0) {
            //             $('#questionListBody').html('');
            //             $('#noQuestionData').show();
            //         } else {
            //             var dataString = '';
            //             for (var i = 0; i < response['FILTERED_data'].length; i++) {
            //                 var data = '<tr>\
            //                    <td><p><span style="color:#1eb6e9;">Question.</span> '+ response['FILTERED_data'][i].question + '<a href="/edit_question/' + response['FILTERED_data'][i].id + '" class="edit float-right ml-1" title="View/Edit question"><i class="fa fa-edit"></i></a></p>\
            //                     <div class="q_info">\
            //                        <ul>\
            //                            <li><span>QType</span>'+ response['FILTERED_data'][i].questionType + '</li>\
            //                             <li><span>Difficulty</span>'+ response['FILTERED_data'][i].difficultyLevel + '</li>\
            //                              <li><span>Marks</span>'+ response['FILTERED_data'][i].correctMarks + '</li>\
            //                             <li class="subj"><span>Subject</span>'+ response['FILTERED_data'][i].subject + '</li>\
            //                             <li class="topic"><span>Topic</span>'+ response['FILTERED_data'][i].topic + '</li>\
            //                             <li><span>Year</span>'+ response['FILTERED_data'][i].year + '</li>\
            //                        </ul>\
            //                     </div>\
            //                   </td >\
            //               </tr >\
            //             <tr> ';
            //                 dataString = dataString + data;
            //             }
            //             $('#noQuestionData').hide();
            //             $('#questionListBody').html('');
            //             $('#questionListBody').append(dataString);
            //         }

            //     }
            // });
            // =====================================================================================================
        })

    }
});
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ============================================    SEARCH FOR TOPICS ACCORDING TO SELECTED SUBJECT   =============================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
function available_TOPIC() {
    var course_ID = parseInt($('#courseName').val());
    var subject_ID = parseInt($('#subjectID').val());

    console.log(course_ID, subject_ID);

    $.ajax({
        type: 'GET',
        url: "searchTopic",
        data: { courseID: course_ID, subjectID: subject_ID },
        success: function (response) {
            console.log(response['topicList'], typeof (response['topicList'][0]));
            var topicList = '';
            if (response['topicList'][0] === '<b>- No topic available for selected course and subject!</b>') {
                topicList = '<option value="No topic available!">No topic available!</option>';
                $('#topicID').html('');
                $('#topicID').append(topicList);
                // $('#questionSearchButton').prop('disabled',true);

            } else {
                for (var i = 0; i < response['topicList'].length; i++) {
                    var data = '<option unchecked value="' + response['topicList'][i] + '">' + response['topicList'][i] + '</option>';
                    topicList = topicList + data;
                }
                $('#topicID').html('');
                $('#topicID').append('<option value="">All</option>' + topicList);
                // $('#questionSearchButton').prop('disabled',false);


                $('#questionDetailDiv').css('opacity', 1);
                $('#questionButtons').css('opacity', 1);
                $('#questionDetailDiv').css('pointer-events', '');
                $('#questionButtons').css('pointer-events', '');

            }
        }
    }).then(function () {
        // =====================================================================================================
        var year = $('#questionYear').val();
        var courseId = $('#courseName').val();
        var subjectID = $('#subjectID').val();
        var topic = $('#topicID').val();

        var array1 = []
        var array2 = []
        var array3 = []
        var array4 = []


        console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
        // --------------------------------------------------------------------------------

        $("input:checkbox[name=Difficulty]:checked").each(function () {

            if (array1.includes($(this).val())) {
                var index = array1.indexOf($(this).val());
                if (index > -1) {
                    array1.splice(index, 1);
                }
            } else {
                array1.push($(this).val());
            }
        });

        $("input:checkbox[name=questionType]:checked").each(function () {

            if (array2.includes($(this).val())) {
                var index = array2.indexOf($(this).val());
                if (index > -1) {
                    array2.splice(index, 1);
                }
            } else {
                array2.push($(this).val());
            }
        });

        $("input:checkbox[name=language]:checked").each(function () {

            if (array3.includes($(this).val())) {
                var index = array3.indexOf($(this).val());
                if (index > -1) {
                    array3.splice(index, 1);
                }
            } else {
                array3.push($(this).val());
            }
        });

        $("input:checkbox[name=marks]:checked").each(function () {

            if (array4.includes($(this).val())) {
                var index = array4.indexOf($(this).val());
                if (index > -1) {
                    array4.splice(index, 1);
                }
            } else {
                array4.push($(this).val());
            }
        });

        // --------------------------------------------------------------------------------
        filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4);

        // $.ajax({
        //     type: 'GET',
        //     url: "filterData",
        //     data: { year: year, courseId: courseId, subjectID: subjectID, topic: topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]': array4},
        //     success: function (response) {
        //         console.log(response['FILTERED_data']);
        //         $('#totalCount').html('');
        //         $('#totalCount').html(response['FILTERED_data'].length);

        //         if (response['FILTERED_data'].length <= 0) {
        //             $('#questionListBody').html('');
        //             $('#noQuestionData').show();
        //         } else {
        //             var dataString = '';
        //             for (var i = 0; i < response['FILTERED_data'].length; i++) {
        //                 var data = '<tr>\
        //                        <td><p><span style="color:#1eb6e9;">Question.</span> '+ response['FILTERED_data'][i].question + '<a href="/edit_question/' + response['FILTERED_data'][i].id + '" class="edit float-right ml-1" title="View/Edit question"><i class="fa fa-edit"></i></a></p>\
        //                         <div class="q_info">\
        //                            <ul>\
        //                                <li><span>QType</span>'+ response['FILTERED_data'][i].questionType + '</li>\
        //                                 <li><span>Difficulty</span>'+ response['FILTERED_data'][i].difficultyLevel + '</li>\
        //                                  <li><span>Marks</span>'+ response['FILTERED_data'][i].correctMarks + '</li>\
        //                                 <li class="subj"><span>Subject</span>'+ response['FILTERED_data'][i].subject + '</li>\
        //                                 <li class="topic"><span>Topic</span>'+ response['FILTERED_data'][i].topic + '</li>\
        //                                 <li><span>Year</span>'+ response['FILTERED_data'][i].year + '</li>\
        //                            </ul>\
        //                         </div>\
        //                       </td >\
        //                   </tr >\
        //                 <tr> ';
        //                 dataString = dataString + data;
        //             }

        //             $('#noQuestionData').hide();
        //             $('#questionListBody').html('');

        //             $('#questionListBody').append(dataString);
        //         }

        //     }
        // });
        // =====================================================================================================
    })



}
// -----------------------------------------------------------------------------------------------------------------------------------------------
function searchQuestionButton() {
    var year = $('#questionYear').val();
    if (year.trim().length == 0) {
        alert('please select year of question!');
        return false;
    }
}
// ==================================================================================================
function onChangeGetFilteredData() {
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();

    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []


    console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
    // --------------------------------------------------------------------------------

    $("input:checkbox[name=Difficulty]:checked").each(function () {

        if (array1.includes($(this).val())) {
            var index = array1.indexOf($(this).val());
            if (index > -1) {
                array1.splice(index, 1);
            }
        } else {
            array1.push($(this).val());
        }
    });

    $("input:checkbox[name=questionType]:checked").each(function () {

        if (array2.includes($(this).val())) {
            var index = array2.indexOf($(this).val());
            if (index > -1) {
                array2.splice(index, 1);
            }
        } else {
            array2.push($(this).val());
        }
    });

    $("input:checkbox[name=language]:checked").each(function () {

        if (array3.includes($(this).val())) {
            var index = array3.indexOf($(this).val());
            if (index > -1) {
                array3.splice(index, 1);
            }
        } else {
            array3.push($(this).val());
        }
    });

    $("input:checkbox[name=marks]:checked").each(function () {

        if (array4.includes($(this).val())) {
            var index = array4.indexOf($(this).val());
            if (index > -1) {
                array4.splice(index, 1);
            }
        } else {
            array4.push($(this).val());
        }
    });

    // --------------------------------------------------------------------------------
    filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4);
    // $.ajax({
    //     type: 'GET',
    //     url: "filterData",
    //     data: { year: year, courseId: courseId, subjectID: subjectID, topic: topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]': array4},
    //     success: function (response) {
    //         console.log(response['FILTERED_data']);
    //         $('#totalCount').html('');
    //         $('#totalCount').html(response['FILTERED_data'].length);

    //         if (response['FILTERED_data'].length <= 0){
    //             $('#questionListBody').html('');
    //             $('#noQuestionData').show();
    //         }else{
    //             var dataString = '';
    //             for (var i = 0; i < response['FILTERED_data'].length;i++){
    //                 var data = '<tr>\
    //                            <td><p><span style="color:#1eb6e9;">Question.</span> '+response['FILTERED_data'][i].question+'<a href="/edit_question/'+response['FILTERED_data'][i].id+'" class="edit float-right ml-1" title="View/Edit question"><i class="fa fa-edit"></i></a></p>\
    //                             <div class="q_info">\
    //                                <ul>\
    //                                    <li><span>QType</span>'+ response['FILTERED_data'][i].questionType+'</li>\
    //                                     <li><span>Difficulty</span>'+ response['FILTERED_data'][i].difficultyLevel+'</li>\
    //                                      <li><span>Marks</span>'+ response['FILTERED_data'][i].correctMarks+'</li>\
    //                                     <li class="subj"><span>Subject</span>'+ response['FILTERED_data'][i].subject+'</li>\
    //                                     <li class="topic"><span>Topic</span>'+response['FILTERED_data'][i].topic+'</li>\
    //                                     <li><span>Year</span>'+response['FILTERED_data'][i].year+'</li>\
    //                                </ul>\
    //                             </div>\
    //                           </td >\
    //                       </tr >\
    //                     <tr> ';
    //                 dataString = dataString + data;
    //             }
    //             $('#noQuestionData').hide();
    //             $('#questionListBody').html('');
    //             $('#questionListBody').append(dataString);
    //         }

    //     }
    // });
}

// // ---------------------------------------------------------------------------------------------------------------------------------------------
// //                                                        RESET FILTER
// // ---------------------------------------------------------------------------------------------------------------------------------------------
// function resetFilter() {
//     $('#filterDiv').css('opacity', 0.3);

//     $('#tableDiv').css('opacity', 0.1);
//     $('#loader').css('display', '');

//     array = []
//     $("#resetFilter").removeClass("fas fa-sync-alt");
//     $("#resetFilter").addClass("spinner-grow spinner-grow-sm");

//     setTimeout(function () {

//         $("#resetFilter").removeClass("spinner-grow spinner-grow-sm");
//         $("#resetFilter").addClass("fas fa-sync-alt");

//         $("input[name='Difficulty']").prop('checked', false);
//         $("input[name='questionType']").prop('checked', false);
//         $("input[name='language']").prop('checked', false);
//         $("input[name='marks']").prop('checked', false);


//         $('.sel_filters').html('');
//         $('#filterDiv').css('opacity', 1);
//         $('#allFilter').show();

//     }, 1000);

//     var year = $('#questionYear').val();
//     var courseId = $('#courseName').val();
//     var subjectID = $('#subjectID').val();
//     var topic = $('#topicID').val();


//     var array1 = []
//     var array2 = []
//     var array3 = []
//     var array4 = []

//     filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4).then(function(){
//         $('#tableDiv').css('opacity', 1);
//         $('#loader').css('display', 'none');
//     })



// }
// ---------------------------------------------------------------------------------------------------------------------------------------------
//                                                        FILTER SELECTION
// ---------------------------------------------------------------------------------------------------------------------------------------------
var array = []
var filterName = [];
function filterSelect(thisTxt) {

    $('#allFilter').hide();
    var data = $(thisTxt).val();
    var filterlabel = $(thisTxt).attr('labelName')

    console.log('labelName >> ',filterlabel);

    if (array.includes(data) && filterName.includes(filterlabel)) {
        var index = array.indexOf(data);
        var index1 = filterName.indexOf(filterlabel);

        if (index > -1) {
            array.splice(index, 1);
        }
        if (index1 > -1) {
            filterName.splice(index1, 1);
        }
        var dataStr = '';
        if (array.length != 0 && filterName.length != 0) {
            for (var i = 0; i < array.length; i++) {
                var dataString = '<a href="javascript:;" class="filterData">' + filterName[i] + '</a>&nbsp;';

                dataStr = dataStr + dataString;
                $('.sel_filters').html('');
                $('.sel_filters').append(dataStr);
            }
        } else {
            $('.sel_filters').html('');
            $('.sel_filters').append('<a href="javascript:;" class="filterData">All</a>&nbsp;');
        }
    } 
    else {
        $('.sel_filters').append('<a href="javascript:;" class="filterData">' + filterlabel + '</a>&nbsp;');
        array.push(data);
        filterName.push(filterlabel);
    }
    // ############################################################################################################
    //                                   render data on selected filter
    // ============================================================================================================
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();
    


    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []


    console.log(year, '<=>', courseId,typeof(courseId) ,'<=>', subjectID, '<=>', topic);
    // --------------------------------------------------------------------------------
    $("input:checkbox[name=Difficulty]:checked").each(function () {

        if (array1.includes($(this).val())) {
            var index = array1.indexOf($(this).val());
            if (index > -1) {
                array1.splice(index, 1);
            }
        } else {
            array1.push($(this).val());
        }
    });

    $("input:checkbox[name=questionType]:checked").each(function () {

        if (array2.includes($(this).val())) {
            var index = array2.indexOf($(this).val());
            if (index > -1) {
                array2.splice(index, 1);
            }
        } else {
            array2.push($(this).val());
        }
    });

    $("input:checkbox[name=language]:checked").each(function () {

        if (array3.includes($(this).val())) {
            var index = array3.indexOf($(this).val());
            if (index > -1) {
                array3.splice(index, 1);
            }
        } else {
            array3.push($(this).val());
        }
    });

    $("input:checkbox[name=marks]:checked").each(function () {

        if (array4.includes($(this).val())) {
            var index = array4.indexOf($(this).val());
            if (index > -1) {
                array4.splice(index, 1);
            }
        } else {
            array4.push($(this).val());
        }
    });

    // --------------------------------------------------------------------------------
    filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4);

    // $.ajax({
    //     type: 'GET',
    //     url: "filterData",
    //     data: { year: year, courseId: courseId, subjectID: subjectID, topic: topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]': array4 },
    //     success: function (response) {
    //         console.log(response['FILTERED_data']);

    //         $('#totalCount').html('');
    //         $('#totalCount').html(response['FILTERED_data'].length);

    //         if (response['FILTERED_data'].length <= 0) {
    //             $('#questionListBody').html('');
    //             $('#noQuestionData').show();
    //         } else {
    //             var dataString = '';
    //             for (var i = 0; i < response['FILTERED_data'].length; i++) {
    //                 var data = '<tr>\
    //                            <td><p><span style="color:#1eb6e9;">Question.</span> '+ response['FILTERED_data'][i].question + '<a href="/edit_question/' + response['FILTERED_data'][i].id + '" class="edit float-right ml-1" title="View/Edit question"><i class="fa fa-edit"></i></a></p>\
    //                             <div class="q_info">\
    //                                <ul>\
    //                                    <li><span>QType</span>'+ response['FILTERED_data'][i].questionType + '</li>\
    //                                     <li><span>Difficulty</span>'+ response['FILTERED_data'][i].difficultyLevel + '</li>\
    //                                      <li><span>Marks</span>'+ response['FILTERED_data'][i].correctMarks + '</li>\
    //                                     <li class="subj"><span>Subject</span>'+ response['FILTERED_data'][i].subject + '</li>\
    //                                     <li class="topic"><span>Topic</span>'+ response['FILTERED_data'][i].topic + '</li>\
    //                                     <li><span>Year</span>'+ response['FILTERED_data'][i].year + '</li>\
    //                                </ul>\
    //                             </div>\
    //                           </td >\
    //                       </tr >\
    //                     <tr> ';
    //                 dataString = dataString + data;
    //             }
    //             $('#noQuestionData').hide();
    //             $('#questionListBody').html('');
    //             $('#questionListBody').append(dataString);
    //         }

    //     }
    // });

    // ############################################################################################################
}
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------




// ---------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------





// ---------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

function filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4) {
    if (courseId == '') {
        courseId = 0;
    }
    if (subjectID == '') {
        subjectID = 0;
    }
    console.log('difficultyList >', typeof(array1),array1);
    console.log('questionTypeList >', typeof(array2),array2)
    console.log('marksList >', typeof(array4),array4)
    console.log('languageList >', typeof(array3),array3)
    console.log('courseId >', courseId,'subjectID >', subjectID,'topic >', topic);
    // return false;

    var labelOFFilter = '';
    if(courseId != 0 && array1.length == 0 && array2.length == 0 && array3.length == 0 && array4.length == 0){
        labelOFFilter = 'MainFilter';
    }
    if(courseId == 0 && (array1.length != 0 || array2.length != 0 || array3.length != 0 || array4.length != 0)){
        labelOFFilter = 'SubFilter';
        // if(array1.length != 0 && (array2.length == 0 && array3.length == 0 && array4.length == 0)){

        // }
        // if(array2.length != 0 && (array1.length == 0 && array3.length == 0 && array4.length == 0)){
            
        // }
        // if(array3.length != 0 && (array2.length == 0 && array1.length == 0 && array4.length == 0)){
            
        // }
        // if(array4.length != 0 && (array2.length == 0 && array3.length == 0 && array1.length == 0)){
            
        // }


        // Double Condition
        // if(array1.length != 0 && array2.length != 0 && (array3.length != 0 || array4.length != 0)){
            
        // }
        // if(array1.length != 0 && array3.length != 0 && (array2.length != 0 || array4.length != 0){
            
        // }
        // if(array1.length != 0 && array4.length != 0 && (array3.length != 0 || array2.length != 0){
            
        // }
        // if(array1.length != 0 && array2.length != 0 && (array3.length != 0 || array4.length != 0){
            
        // }
        
    }
    if(courseId != 0 && (array1.length != 0 || array2.length != 0 || array3.length != 0 || array4.length != 0)){
        labelOFFilter = 'MixFilter';
    }
    console.log('jk',labelOFFilter);
    // return false;
   
    console.log('parameters :>','year >',year,'courseId >', courseId,'subjectID >', subjectID,'topic >', topic,'difficultyList >', array1,'questionTypeList >', array2,'marksList >', array3,'languageList >', array4);
    $.ajax({
        type: 'GET',
        url: "filterData",
        data: { 'year': year, 'courseId': courseId, 'subjectID': subjectID, 'topic': topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]': array4,'label':labelOFFilter },
        success: function (response) {
            console.log('this is response for side filter : ', response['FILTERED_data']);
            $('#totalCount').html('');
            $('#totalCount').html(response['FILTERED_data'].length);

            if (response['FILTERED_data'].length <= 0) {
                $('#questionListBody').html('');
                $('#noQuestionData').show();
            } else {
                var dataString = '';
                for (var i = 0; i < response['FILTERED_data'].length; i++) {
                    var data = '<tr>\
                               <td><p><span style="color:#1eb6e9;">Question.</span> '+ response['FILTERED_data'][i].question + '<a href="/edit_question/' + response['FILTERED_data'][i].id + '" class="edit float-right ml-1" title="View/Edit question"><i class="fa fa-edit"></i></a><a class="edit float-right ml-1" id="' + response['FILTERED_data'][i].id + '" onclick="customer_detailed_info(this)"><i class="fas fa-eye"></i></a></p>\
                                <div class="q_info">\
                                   <ul>\
                                       <li><span>QType</span>'+ response['FILTERED_data'][i]['refrence_Questions_Type_Detail']['questionType']['questio_type_name'] + '</li>\
                                        <li><span>Difficulty</span>'+ response['FILTERED_data'][i]['refrence_Questions_Type_Detail']['difficultyLevel']['questio_level_type_name'] + '</li>\
                                         <li><span>Marks</span>'+ response['FILTERED_data'][i]['refrence_Questions_Type_Detail']['correctMarks'] + '</li>\
                                        <li class=""><span>Subject</span>'+ response['FILTERED_data'][i]['refrence_Questions_Type_Detail']['selectSubject']['subjectName'] + '</li>\
                                        <li class=""><span>Topic</span>'+ response['FILTERED_data'][i]['refrence_Questions_Type_Detail']['Topic'] + '</li>\
                                        <li><span>Language</span>'+ response['FILTERED_data'][i]['selectLanguage']['languageName'] + '</li>\
                                        <li><span>Year</span>'+ response['FILTERED_data'][i].year + '</li>\
                                   </ul>\
                                </div>\
                              </td >\
                          </tr >\
                        <tr> ';
                    dataString = dataString + data;
                }
                $('#noQuestionData').hide();
                $('#questionListBody').html('');
                $('#questionListBody').append(dataString);
            }

        }
    });
}



function onClickEditQuestion(thistxt) {
    var questionID = $(thistxt).attr('questionID');
        $.ajax({
        type: 'GET',
        url: "question_show",
        data: {'questionID': questionID},
            success: function (response)
            {
                $('#hideQuestionOnClickEdit').hide();
                $('#questionTopic').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['Topic']);
                $('#questionSubject').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['selectSubject']['subjectName']);
                $('#questionCourse').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['selectCourse']['courseName']);
                $('#editquestionType').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['questionType']['questio_type_name']);
                $('#editsubQuestionType').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['subQuestionType']['questio_sub_type_name']);
                $('#editQuestionCorrectMarks').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['correctMarks']);
                $('#editQuestionDifficultyLevel').val(response['searchResultList'][0]['refrence_Questions_Type_Detail']['difficultyLevel']['questio_level_type_name']);
                
            
               
                
                 var html = '<ul class="donate-now">';
                var endHtml = '</ul>';
                var innerHtml = '';
                var renderTextEditor = '';
                var idDiv = '';
                var optionListHtml = '';
                var nameID = 1;
                var count = 1;
                var optionString = '';
                for (var i = 0; i < response['searchResultList'].length; i++) {
                   var data  = '<option value='+response['searchResultList'][i]['selectLanguage']['id']+' selected="selected">'+response['searchResultList'][i]['selectLanguage']['languageName']+'</option>'
                   $('#editQuestionLanguage').append(data);
                }

                  // ========================================================================================
                for (var i = 0; i < response['searchResultList'].length; i++) {
                // ===============================================================================================
        var optionString = '';
        // for (var j = 0; j < parseInt(optionCount); j++) {
        //     if (optionString == '') {
        //         optionString = '<div class="row objectivePart">\
        // <div class="col-lg-2  mt-1  form-group opt_radio" >\
        // <label><input class="topicOption" type="radio" name="trueoption_'+ count + '" value="" checked="checked" > Option ' + (j + 1) + '</label>\
        // </div>\
        // <div class="col-lg-10 mt-1   form-group">\
        // <input  type="text" class="form-control topicData"  placeholder="Type Options" value="" />\
        // </div> \
        // </div >';
        //     } else {
        //         optionString = optionString + '<div class="row objectivePart">\
        // <div class="col-lg-2  mt-1  form-group opt_radio">\
        // <label><input class="topicOption" type="radio" name="trueoption_'+ count + '" value="" checked="checked" > Option ' + (j + 1) + '</label>\
        // </div>\
        // <div class="col-lg-10 mt-1   form-group">\
        // <input  type="text" class="form-control topicData"  placeholder="Type Options" value="" />\
        // </div> \
        // </div >';
        //     }
        // }
                    count = count + 1;
                    var q = 'A';
                    var qe = 'B';
        if (innerHtml == '') {
            innerHtml = '<li><input type="radio" style="text-align: center;"  onclick="onClickGetLang(this)" id="' + response['searchResultList'][i]['selectLanguage']['languageName'] + '" name="language" checked="checked"/><label for="' + response['searchResultList'][i]['selectLanguage']['languageName'] + '">' + response['searchResultList'][i]['selectLanguage']['languageName'] + '</label></li>';
        }
        else {
            innerHtml = innerHtml + '<li><input type="radio" style="text-align: center;"  onclick="onClickGetLang(this)" id="' + response['searchResultList'][i]['selectLanguage']['languageName'] + '" name="language" /><label for="' + response['searchResultList'][i]['selectLanguage']['languageName'] + '">' + response['searchResultList'][i]['selectLanguage']['languageName'] + '</label></li>';
        }
        if (renderTextEditor == '') {
            idDiv = 'div_' + response['searchResultList'][i]['selectLanguage']['languageName'];
            renderTextEditor = '<div id="div_' + response['searchResultList'][i]['selectLanguage']['languageName'] + '"><label> Type Question in <b>' + response['searchResultList'][i]['selectLanguage']['languageName'] + '</b> here..</label>\
    <textarea class="form-control" id="txtEditor_'+ response['searchResultList'][i]['selectLanguage']['languageName'] + '" style="height: 200px" placeholder="Type Question in ' + response['searchResultList'][i]['selectLanguage']['languageName'] + ' here.."></textarea>\
             <script>$("#txtEditor_'+ response['searchResultList'][i]['selectLanguage']['languageName'] + '").Editor();\
            $(".Editor-editor").html("' + response['searchResultList'][i]['question'] +'");\
             </script > ' + optionString + '</div >\
             ';
        }
        else {
            idDiv = idDiv + '||' + 'div_' + response['searchResultList'][i]['selectLanguage']['languageName'];
            renderTextEditor = renderTextEditor + '<div id="div_' + response['searchResultList'][i]['selectLanguage']['languageName'] + '"  style="display:none;"><label> Type Question in <b>' + response['searchResultList'][i]['selectLanguage']['languageName'] + '</b> here..</label>\
    <textarea class="form-control" id="txtEditor_'+ response['searchResultList'][i]['selectLanguage']['languageName'] + '" style="height: 200px" placeholder="Type Question in ' + response['searchResultList'][i]['selectLanguage']['languageName'] + ' here.."></textarea>\
             <script>$("#txtEditor_'+ response['searchResultList'][i]['selectLanguage']['languageName'] + '").Editor();\
            $(".Editor-editor").html("'+ response['searchResultList'][i]['question'] +'");\
             </script > ' + optionString + '</div >\
             ';
        }
 
                }
                var addHtml = html + innerHtml + endHtml;
                console.log('ASSS',renderTextEditor);
                $('#labelForLangugae').html(addHtml);
                 localStorage.setItem('idDiv', idDiv)
                $('#renderEditor').html();
                $('#renderEditor').html(renderTextEditor);
                $('#editQuestionLanguage').selectpicker('refresh');
                $('#editQuestionShow').show();
            }
    });    
}


function onClickGetLang(thistxt) {
    var textLang = $(thistxt).attr('id');
    var ids = localStorage.getItem('idDiv');
    var IdsList = ids.split("||");
    for (var i = 0; i < IdsList.length; i++) {
        if ("div_" + textLang.trim() == IdsList[i].trim()) {
            $('#' + IdsList[i].trim()).show();
        } else {
            $('#' + IdsList[i].trim()).hide();
        }
    }
}