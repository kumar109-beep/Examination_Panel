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
//                                                  Search For EXAM Management
// =======================================================================================================================================
function examAjaxsearch() {
    var searchString = $('#examAjaxsearch').val();
    console.log(searchString);

    $.ajax({
        type: 'GET',
        url: "examSearch",
        data: { 'search_String': searchString, 'page': 1 },
        success: function (response) {
            console.log(response['searchResultList']);

            var filteredData = '';
            if (response['searchResultList'].length > 0) {
                for (var i = 0; i < response['searchResultList'].length; i++) {
                    var addStudent = '<tr class="in-queue">\
                    <td style="background-color:white;"><a href="exam-details/'+response['searchResultList'][i]['id']+'" class="link">'+response['searchResultList'][i]['examName']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examAssociateCourse']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalPaper']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalStudent']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examStartDate']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examEndDate']+'</td>\
                   <td style="background-color:white;" class="details-control">\
                         <a href="exam-details/'+response['searchResultList'][i]['id']+'" class="view ml-1"><i class="fa fa-eye"></i></a>\
                         <a href="edit-exam/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                    filteredData = filteredData + addStudent;
                }
                $('#examAppendData').html('');
                $('#examAppendData').append(filteredData);
            } else {
                $('#examAppendData').html('');
                $('#examAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            </td>\
                                        </tr >');
            }
        }
    });
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

    var queryString = $('#examAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "examSearch",
            data: { search_String: queryString, 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr class="in-queue">\
                    <td style="background-color:white;"><a href="exam-details/'+response['searchResultList'][i]['id']+'" class="link">'+response['searchResultList'][i]['examName']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examAssociateCourse']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalPaper']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalStudent']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examStartDate']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examEndDate']+'</td>\
                   <td style="background-color:white;" class="details-control">\
                         <a href="exam-details/'+response['searchResultList'][i]['id']+'" class="view ml-1"><i class="fa fa-eye"></i></a>\
                         <a href="edit-exam/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#examAppendData').html('');
                    $('#examAppendData').append(filteredData);
                } else {
                    $('#examAppendData').html('');
                    $('#examAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            </td>\
                                        </tr >');
                }



                // =================================================================================================
            }
        });

        // ---------------------------------------------------
    } else {
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "examSearch",
            data: { search_String: '', 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr class="in-queue">\
                    <td style="background-color:white;"><a href="exam-details/'+response['searchResultList'][i]['id']+'" class="link">'+response['searchResultList'][i]['examName']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examAssociateCourse']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalPaper']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalStudent']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examStartDate']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examEndDate']+'</td>\
                   <td style="background-color:white;" class="details-control">\
                         <a href="exam-details/'+response['searchResultList'][i]['id']+'" class="view ml-1"><i class="fa fa-eye"></i></a>\
                         <a href="edit-exam/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#examAppendData').html('');
                    $('#examAppendData').append(filteredData);
                } else {
                    $('#examAppendData').html('');
                    $('#examAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            </td>\
                                        </tr >');
                }
            }
        });
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

    var queryString = $('#examAjaxsearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "examSearch",
            data: { search_String: queryString, 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++){
                        var addStudent = '<tr class="in-queue">\
                    <td style="background-color:white;"><a href="exam-details/'+response['searchResultList'][i]['id']+'" class="link">'+response['searchResultList'][i]['examName']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examAssociateCourse']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalPaper']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalStudent']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examStartDate']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examEndDate']+'</td>\
                   <td style="background-color:white;" class="details-control">\
                         <a href="exam-details/'+response['searchResultList'][i]['id']+'" class="view ml-1"><i class="fa fa-eye"></i></a>\
                         <a href="edit-exam/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#examAppendData').html('');
                    $('#examAppendData').append(filteredData);
                }else {
                    $('#examAppendData').html('');
                    $('#examAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            </td>\
                                        </tr >');
                }



                // =================================================================================================
            }
        });

        // ---------------------------------------------------
    }else {
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "examSearch",
            data: { search_String: '', 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr class="in-queue">\
                    <td style="background-color:white;"><a href="exam-details/'+response['searchResultList'][i]['id']+'" class="link">'+response['searchResultList'][i]['examName']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examAssociateCourse']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalPaper']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examTotalStudent']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examStartDate']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList'][i]['examEndDate']+'</td>\
                   <td style="background-color:white;" class="details-control">\
                         <a href="exam-details/'+response['searchResultList'][i]['id']+'" class="view ml-1"><i class="fa fa-eye"></i></a>\
                         <a href="edit-exam/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#examAppendData').html('');
                    $('#examAppendData').append(filteredData);
                }else {
                    $('#examAppendData').html('');
                    $('#examAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;"></td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            </td>\
                                        </tr >');
                }
            }
        });
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
function examFilter(thisTxt){
    var filterString = $('#examFilterID').val().trim();
    console.log('exam filter :>> ',filterString);
    $.ajax({
        type: 'GET',
        url: "exam_Filter",
        data: { 'filterString': filterString},
        success: function (response) {
            console.log(response['searchResultList']);
            return false;
            // -------------------------------------------------------------------------------------------------
            var filteredData = '';
            if (response['searchResultList'].length > 0) {
                for (var i = 0; i < response['searchResultList'].length; i++) {
                    var addStudent = '<tr class="in-queue">\
                <td style="background-color:white;"><a href="exam-details/" class="link">'+response['searchResultList'][i]['examName']+'<i class="fa fa-caret-right"></i></a></td>\
                <td style="background-color:white;">'+response['searchResultList'][i]['examID']+'</td>\
                <td style="background-color:white;">'+response['searchResultList'][i]['examAssociateCourse']+'</td>\
                <td style="background-color:white;">'+response['searchResultList'][i]['examTotalPaper']+'</td>\
                <td style="background-color:white;">'+response['searchResultList'][i]['examTotalStudent']+'</td>\
                <td style="background-color:white;">'+response['searchResultList'][i]['examStartDate']+'</td>\
                <td style="background-color:white;">'+response['searchResultList'][i]['examEndDate']+'</td>\
                <td style="background-color:white;"><span class="status ">Upcoming</span></td>\
                <td style="background-color:white;" class="details-control">\
                     <a href="exam-details/'+response['searchResultList'][i]['id']+'" class="view ml-1"><i class="fa fa-eye"></i></a>\
                     <a href="edit-exam/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                </td>\
            </tr>';

                    filteredData = filteredData + addStudent;
                }
                $('#examAppendData').html('');
                $('#examAppendData').append(filteredData);
            }else {
                $('#examAppendData').html('');
                $('#examAppendData').html('<tr>\
                                    <td style="background: white !important;"></td>\
                                        <td style="background: white !important;color:black;"></td>\
                                        <td style="background: white !important;color:black;"></td>\
                                        <td style="background: white !important;color:black;"></td>\
                                        <td style="background: white !important;color:black;">No record available.</td>\
                                        <td style="background: white !important;color:black;"></td>\
                                        <td style="background: white !important;color:black;"></td>\
                                        <td style="background: white !important;color:black;"></td>\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                        </td>\
                                    </tr >');
            }
        }
    });
}

// 