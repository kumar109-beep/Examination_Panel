var array1 = []
var array2 = []
var array3 = []
var array4 = []
// ---------------------------------------------------------------------------------------------------------------------------------------------
//                                                        RESET FILTER
// ---------------------------------------------------------------------------------------------------------------------------------------------
function resetFilter() {
    $('#filterDiv').css('opacity', 0.3);

    $('#tableDiv').css('opacity', 0.1);
    $('#loader').css('display','');
    
    array = []
    $("#resetFilter").removeClass("fas fa-sync-alt");
    $("#resetFilter").addClass("spinner-grow spinner-grow-sm");

    setTimeout(function () {

        $("#resetFilter").removeClass("spinner-grow spinner-grow-sm");
        $("#resetFilter").addClass("fas fa-sync-alt");

        $("input[name='Difficulty']").prop('checked', false);
        $("input[name='questionType']").prop('checked', false);
        $("input[name='language']").prop('checked', false);
        $("input[name='marks']").prop('checked', false);


        $('.sel_filters').html('');
        $('#filterDiv').css('opacity', 1);
        $('#allFilter').show();

    }, 1000);

    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();


    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []

    filterAjaxCall(year, courseId, subjectID, topic, array1, array2, array3, array4)

    $('#tableDiv').css('opacity', 1);
    $('#loader').css('display', 'none');
    
}
// ---------------------------------------------------------------------------------------------------------------------------------------------
//                                                        FILTER SELECTION
// ---------------------------------------------------------------------------------------------------------------------------------------------
// var array = []
// function filterSelect(thisTxt) {

//     $('#allFilter').hide();
//     var data = $(thisTxt).val();

//     if (array.includes(data)) {
//         var index = array.indexOf(data);
//         if (index > -1) {
//             array.splice(index, 1);
//         }
//         var dataStr = '';
//         if (array.length != 0) {
//             for (var i = 0; i < array.length; i++) {
//                 var dataString = '<a href="javascript:;" class="filterData">' + array[i] + '</a>&nbsp;';

//                 dataStr = dataStr + dataString;
//                 $('.sel_filters').html('');
//                 $('.sel_filters').append(dataStr);
//             }
//         } else {
//             $('.sel_filters').html('');
//             $('.sel_filters').append('<a href="javascript:;" class="filterData">All</a>&nbsp;');
//         }
//     } else {
//         $('.sel_filters').append('<a href="javascript:;" class="filterData">' + data + '</a>&nbsp;');
//         array.push(data)
//     }
//     // ############################################################################################################
//     //                                   render data on selected filter
//     // ============================================================================================================
//     var year = $('#questionYear').val();
//     var courseId = $('#courseName').val();
//     var subjectID = $('#subjectID').val();
//     var topic = $('#topicID').val();

//     console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
//     // --------------------------------------------------------------------------------

//     $("input:checkbox[name=Difficulty]:checked").each(function () {
//         if (array1.includes($(this).val())) {
//             var index = array1.indexOf($(this).val());
//             if (index > -1) {
//                 array1.splice(index, 1);
//             }
//         } else {
//             array1.push($(this).val());
//         }
//     });

//     $("input:checkbox[name=questionType]:checked").each(function () {
//         if (array2.includes($(this).val())) {
//             var index = array2.indexOf($(this).val());
//             if (index > -1) {
//                 array2.splice(index, 1);
//             }
//         } else {
//             array2.push($(this).val());
//         }
//     });

//     $("input:checkbox[name=language]:checked").each(function () {
//         if (array3.includes($(this).val())) {
//             var index = array3.indexOf($(this).val());
//             if (index > -1) {
//                 array3.splice(index, 1);
//             }
//         } else {
//             array3.push($(this).val());
//         }
//     });

//     $("input:checkbox[name=marks]:checked").each(function () {
//         if (array4.includes($(this).val())) {
//             var index = array4.indexOf($(this).val());
//             if (index > -1) {
//                 array4.splice(index, 1);
//             }
//         } else {
//             array4.push($(this).val());
//         }
//     });

//             // --------------------------------------------------------------------------------


//     $.ajax({
//         type: 'GET',
//         url: "filterData",
//         data: { year: year, courseId: courseId, subjectID: subjectID, topic: topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]': array4 },
//         success: function (response) {
//             console.log(response['FILTERED_data']);

//             if (response['FILTERED_data'].length <= 0) {
//                 $('#questionListBody').html('');
//                 $('#noQuestionData').show();
//             } else {
//                 var dataString = '';
//                 for (var i = 0; i < response['FILTERED_data'].length; i++) {
//                     var data = '<tr>\
//                                <td><p><span style="color:#1eb6e9;">Question.</span> '+ response['FILTERED_data'][i].question + '<a href="/edit_question/' + response['FILTERED_data'][i].id + '" class="edit float-right ml-1" title="View/Edit question"><i class="fa fa-edit"></i></a></p>\
//                                 <div class="q_info">\
//                                    <ul>\
//                                        <li><span>QType</span>'+ response['FILTERED_data'][i].questionType + '</li>\
//                                         <li><span>Difficulty</span>'+ response['FILTERED_data'][i].difficultyLevel + '</li>\
//                                          <li><span>Marks</span>'+ response['FILTERED_data'][i].correctMarks + '</li>\
//                                         <li class="subj"><span>Subject</span>'+ response['FILTERED_data'][i].subject + '</li>\
//                                         <li class="topic"><span>Topic</span>'+ response['FILTERED_data'][i].topic + '</li>\
//                                         <li><span>Year</span>'+ response['FILTERED_data'][i].year + '</li>\
//                                    </ul>\
//                                 </div>\
//                               </td >\
//                           </tr >\
//                         <tr> ';
//                     dataString = dataString + data;
//                 }
//                 $('#noQuestionData').hide();
//                 $('#questionListBody').html('');
//                 $('#questionListBody').append(dataString);
//             }

//         }
//     });

//     // ############################################################################################################
// }
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------




// ---------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------





// ---------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

