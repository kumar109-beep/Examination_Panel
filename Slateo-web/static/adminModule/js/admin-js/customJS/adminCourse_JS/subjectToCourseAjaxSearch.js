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
function subjectToCourseAjaxsearch() {
    var searchString = $('#subjectToCourseAjaxsearch').val();
    console.log(searchString);

    $.ajax({
        type: 'GET',
        url: "subjectToCourseSearch",
        data: { 'search_String': searchString, 'page': 1 },
        success: function (response) {
            console.log(response['searchResultList']['data']);

            var filteredData = '';
            if (response['searchResultList']['data'].length > 0) {
                for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                    console.log(response['searchResultList']['data'][i]['courseFK']['courseID']);
                    var subjectStr = '';
                    for (var j = 0; j < response['searchResultList']['data'][i]['subjectNameFK'].length; j++) {
                        var dataStr = '<span>' + response['searchResultList']['data'][i]['subjectNameFK'][j]['subjectName'] + '</span>&nbsp;&nbsp;';

                        subjectStr = subjectStr + dataStr;
                    }
                    var addStudent = '<tr>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseID'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['type_of_courseFK']['courseTypeName'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseName'] + '</td>\
                         <td style="background: white !important;color:black;font-weight: 700;" class="subjects">'+ subjectStr + '\
                         </td>\
                          <td style="background: white !important;color:black;" class="details-control">\
                          <a ctsId="'+ response["searchResultList"]["data"][i]["id"] + '" class="del" onclick="deleteSubjectToCourse(this)"><i class="fa fa-trash"></i></a>\
                             <a href="edit_subjects_to_course/'+ response["searchResultList"]["data"][i]["id"] + '" class="edit"><i class="fa fa-edit"></i></a>\
                        </td>\
                    </tr>';

                    filteredData = filteredData + addStudent;
                }
                $('#subjectToCourseAppendData').html('');
                $('#subjectToCourseAppendData').append(filteredData);
            } else {
                $('#subjectToCourseAppendData').html('');
                $('#subjectToCourseAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            </td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
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

    var queryString = $('#subjectToCourseAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "subjectToCourseSearch",
            data: { search_String: queryString, 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                        console.log(response['searchResultList']['data'][i]['courseFK']['courseID']);
                        var subjectStr = '';
                        for (var j = 0; j < response['searchResultList']['data'][i]['subjectNameFK'].length; j++) {
                            var dataStr = '<span>' + response['searchResultList']['data'][i]['subjectNameFK'][j]['subjectName'] + '</span>&nbsp;&nbsp;';

                            subjectStr = subjectStr + dataStr;
                        }
                        var addStudent = '<tr>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseID'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['type_of_courseFK']['courseTypeName'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseName'] + '</td>\
                         <td style="background: white !important;color:black;font-weight: 700;" class="subjects">'+ subjectStr + '\
                         </td>\
                          <td style="background: white !important;color:black;" class="details-control">\
                          <a ctsId="'+ response["searchResultList"]["data"][i]["id"] + '" class="del" onclick="deleteSubjectToCourse(this)"><i class="fa fa-trash"></i></a>\
                             <a href="edit_subjects_to_course/'+ response["searchResultList"]["data"][i]["id"] + '" class="edit"><i class="fa fa-edit"></i></a>\
                        </td>\
                    </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').append(filteredData);
                } else {
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            </td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
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
            url: "subjectToCourseSearch",
            data: { search_String: '', 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                        console.log(response['searchResultList']['data'][i]['courseFK']['courseID']);
                        var subjectStr = '';
                        for (var j = 0; j < response['searchResultList']['data'][i]['subjectNameFK'].length; j++) {
                            var dataStr = '<span>' + response['searchResultList']['data'][i]['subjectNameFK'][j]['subjectName'] + '</span>&nbsp;&nbsp;';

                            subjectStr = subjectStr + dataStr;
                        }
                        var addStudent = '<tr>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseID'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['type_of_courseFK']['courseTypeName'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseName'] + '</td>\
                         <td style="background: white !important;color:black;font-weight: 700;" class="subjects">'+ subjectStr + '\
                         </td>\
                          <td style="background: white !important;color:black;" class="details-control">\
                          <a ctsId="'+ response["searchResultList"]["data"][i]["id"] + '" class="del" onclick="deleteSubjectToCourse(this)"><i class="fa fa-trash"></i></a>\
                             <a href="edit_subjects_to_course/'+ response["searchResultList"]["data"][i]["id"] + '" class="edit"><i class="fa fa-edit"></i></a>\
                        </td>\
                    </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').append(filteredData);
                } else {
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            </td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
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

    var queryString = $('#subjectToCourseAjaxsearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "subjectToCourseSearch",
            data: { search_String: queryString, 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']['data']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList']['data'].length > 0) {
                    for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                        console.log(response['searchResultList']['data'][i]['courseFK']['courseID']);
                        var subjectStr = '';
                        for (var j = 0; j < response['searchResultList']['data'][i]['subjectNameFK'].length; j++) {
                            var dataStr = '<span>' + response['searchResultList']['data'][i]['subjectNameFK'][j]['subjectName'] + '</span>&nbsp;&nbsp;';

                            subjectStr = subjectStr + dataStr;
                        }
                        var addStudent = '<tr>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseID'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['type_of_courseFK']['courseTypeName'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseName'] + '</td>\
                         <td style="background: white !important;color:black;font-weight: 700;" class="subjects">'+ subjectStr + '\
                         </td>\
                          <td style="background: white !important;color:black;" class="details-control">\
                          <a ctsId="'+ response["searchResultList"]["data"][i]["id"] + '" class="del" onclick="deleteSubjectToCourse(this)"><i class="fa fa-trash"></i></a>\
                             <a href="edit_subjects_to_course/'+ response["searchResultList"]["data"][i]["id"] + '" class="edit"><i class="fa fa-edit"></i></a>\
                        </td>\
                    </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').append(filteredData);
                } else {
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            </td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
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
            url: "subjectToCourseSearch",
            data: { search_String: '', 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']['data']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList']['data'].length > 0) {
                    for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                        console.log(response['searchResultList']['data'][i]['courseFK']['courseID']);
                        var subjectStr = '';
                        for (var j = 0; j < response['searchResultList']['data'][i]['subjectNameFK'].length; j++) {
                            var dataStr = '<span>' + response['searchResultList']['data'][i]['subjectNameFK'][j]['subjectName'] + '</span>&nbsp;&nbsp;';

                            subjectStr = subjectStr + dataStr;
                        }
                        var addStudent = '<tr>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseID'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['type_of_courseFK']['courseTypeName'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList']['data'][i]['courseFK']['courseName'] + '</td>\
                         <td style="background: white !important;color:black;font-weight: 700;" class="subjects">'+ subjectStr + '\
                         </td>\
                          <td style="background: white !important;color:black;" class="details-control">\
                          <a ctsId="'+ response["searchResultList"]["data"][i]["id"] + '" class="del" onclick="deleteSubjectToCourse(this)"><i class="fa fa-trash"></i></a>\
                             <a href="edit_subjects_to_course/'+ response["searchResultList"]["data"][i]["id"] + '" class="edit"><i class="fa fa-edit"></i></a>\
                        </td>\
                    </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').append(filteredData);
                } else {
                    $('#subjectToCourseAppendData').html('');
                    $('#subjectToCourseAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                        <td style="background: white !important;color:black;" class="details-control">\
                                            <td style="background: white !important;color:black;">No record available.</td>\
                                            </td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
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
// =======================================================================================================================================
// ======================================================    DELETE FUNCTIONALITY    =====================================================
function deleteSubjectToCourse(thisTxt) {
    var id = $(thisTxt).attr('ctsId');
    console.log('value >> ', id);

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to Delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>deleting ...</small></b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
            $.ajax({
                type: 'GET',
                url: "deleteSubjectToCourse/" + id,
                success: function (response) {
                    console.log(response['data']['message']);
                    Swal.close();
                    if(response['data']['message'] == 'Course  Attched with Someone'){
                        Swal.fire({
                            icon: 'error',
                            title: '<small>Subject To Course Attched with Some other module</small>',
                            showConfirmButton: true,
                            // timer: 2000
                        }).then(function(){
                            return false;
                        })
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: '<small>Subject To Course deleted successfully</small>',
                            showConfirmButton: true,
                            timer: 2000
                        }).then(function(){
                            window.location.href = window.location;
                        })
                    }

                }
            });
        }
    })
}