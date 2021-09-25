// alert('page called!');
// =======================================================================================================================================
//                                                  Local Storage Value
// =======================================================================================================================================
$(document).ready(function () {
    localStorage.setItem('nextpage', 1);
    localStorage.setItem('previouspage', 0);
    // next = 1, prev = 0
    // on next click =>> prev = nextBtn & next = nextBtn + 1
    // on prev. click =>> next = nextBtn - 1 & prev = nextBtn - 1
});
// =======================================================================================================================================
//                                                  Search For Question Bank Management
// =======================================================================================================================================
function questionAjaxsearch() {
   
    var searchString = $('#questionAjaxsearch').val();
    // =======================================================
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();

    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []

    console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
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

    var search_String =  searchString;
    var page = 1;
    // =======================================================
     Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Searching...</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
    getSearchQuestion(year, courseId, subjectID, topic, array1, array2, array3, array4,search_String,page)

}
// =======================================================================================================================================
//                                                  Paginator For Student Management
// =======================================================================================================================================
// --------------------------------------------------------    Next Button   -------------------------------------------------------------
function studentpaginatorNextButton() {
    var nextClick = localStorage.getItem('nextpage');
    // var prevClick = localStorage.getItem('previouspage');
    if (parseInt(nextClick) >= 1) {
        $('#prevButton').show();
        $('#prevButton').css('background-color', '');
        $('#prevButton').css('color', '#007dc6');

        $('#nextButton').css('background-color', '#007dc6');
        $('#nextButton').css('color', 'white');

        var next = parseInt(nextClick) + 1;
        var prev = parseInt(nextClick);

        localStorage.setItem('nextpage', next);
        localStorage.setItem('previouspage', prev);
    } else {
        return false;
    }

    var queryString = $('#questionAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
       // =======================================================
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();

    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []
    
    console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
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

    var search_String =  queryString;
    var page = next;
    // =======================================================
     Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Loading...</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
    getSearchQuestion(year, courseId, subjectID, topic, array1, array2, array3, array4,search_String,page)

        // ---------------------------------------------------
    } else {
       // =======================================================
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();

    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []
    
    console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
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

    var search_String =  '';
    var page = next;
    // =======================================================
     Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Loading...</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
    getSearchQuestion(year, courseId, subjectID, topic, array1, array2, array3, array4,search_String,page)

    }




    // -----------------------------------------------------------------------------------------------------------------
}
// --------------------------------------------------------    Previous Button   -------------------------------------------------------------
function studentpaginatorPreviousButton() {
    var nextClick = localStorage.getItem('nextpage');
    var prevClick = localStorage.getItem('previouspage');

    if (parseInt(prevClick) >= 1) {
        $('#prevButton').css('background-color', '#007dc6');
        $('#prevButton').css('color', 'white');

        $('#nextButton').css('background-color', '');
        $('#nextButton').css('color', '#007dc6');

        var next = parseInt(nextClick) - 1;
        var prev = parseInt(prevClick) - 1;

        localStorage.setItem('nextpage', parseInt(nextClick) - 1);
        localStorage.setItem('previouspage', parseInt(prevClick) - 1);

        if (prev === 0) {
            newPrev = 1;
        } else {
            newPrev = prev;
        }
    } else {
        $('#prevButton').hide();
        return false;
    }

    var queryString = $('#questionAjaxsearch').val();

    if (queryString.trim().length != 0) {
       // =======================================================
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();

    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []
    
    console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
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

    var search_String =  queryString;
    var page = newPrev;
    // =======================================================
     Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Loading...</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
    getSearchQuestion(year, courseId, subjectID, topic, array1, array2, array3, array4,search_String,page)

    }else {
        // =======================================================
    var year = $('#questionYear').val();
    var courseId = $('#courseName').val();
    var subjectID = $('#subjectID').val();
    var topic = $('#topicID').val();

    var array1 = []
    var array2 = []
    var array3 = []
    var array4 = []
    
    console.log(year, '<=>', courseId, '<=>', subjectID, '<=>', topic);
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

    var search_String =  '';
    var page = newPrev;
    // =======================================================
    Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Loading...</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
    getSearchQuestion(year, courseId, subjectID, topic, array1, array2, array3, array4,search_String,page)

    }
}
// =======================================================================================================================================
function onlyNumberKey(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
}
// =======================================================================================================================================
// ---------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------

function getSearchQuestion(year, courseId, subjectID, topic, array1, array2, array3, array4,search_String,page){
    console.log('parameters :>','year >',year,'courseId >', courseId,'subjectID >', subjectID,'topic >', topic,'difficultyList >', array1,'questionTypeList >', array2,'marksList >', array3,'languageList >', array4,'search_String >',search_String,'page >',page);
    $.ajax({
        type: 'GET',
        url: "question_Search",
        data: { 'year': year, 'courseId': courseId, 'subjectID': subjectID, 'topic': topic, 'difficultyList[]': array1, 'questionTypeList[]': array2, 'marksList[]': array3, 'languageList[]': array4 ,'search_String':search_String,'page':page},
        success: function (response) {
            console.log('this is response for side filter : ',response['FILTERED_data']);
            $('#totalCount').html('');
            $('#totalCount').html(response['FILTERED_data'].length);

            if (response['FILTERED_data'].length <= 0 || 'detail' in response['FILTERED_data']) {
                $('#questionListBody').html('');
                $('#noQuestionData').show();
                Swal.close()
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
                Swal.close()
                $('#noQuestionData').hide();
                $('#questionListBody').html('');
                $('#questionListBody').append(dataString);
            }

        }
    });
}