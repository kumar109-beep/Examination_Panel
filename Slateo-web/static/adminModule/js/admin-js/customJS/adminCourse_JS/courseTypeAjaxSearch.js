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
function courseTypeAjaxsearch() {
    var searchString = $('#courseTypeAjaxsearch').val();
    console.log(searchString);

    $.ajax({
        type: 'GET',
        url: "courseTypeSearch",
        data: { 'search_String': searchString, 'page': 1 },
        success: function (response) {
            console.log(response['searchResultList']['data']);

            var filteredData = '';
            if (response['searchResultList']['data'].length > 0) {
                for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                    var addStudent = '<tr class="in-queue">\
                        <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeName']+'</td>\
                    <td style="background-color:white;" class="details-control">\
                    <a href="#" class="del ml-0" ctId="'+response['searchResultList']['data'][i]['id']+'" title="Remove" onclick="deleteCourseType(this)"><i class="fa fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                         <a href="edit-course-type/'+response['searchResultList']['data'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                    filteredData = filteredData + addStudent;
                }
                $('#CourseTypeAppendData').html('');
                $('#CourseTypeAppendData').append(filteredData);
            } else {
                $('#CourseTypeAppendData').html('');
                $('#CourseTypeAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
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

    var queryString = $('#courseTypeAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "courseTypeSearch",
            data: { search_String: queryString, 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr class="in-queue">\
                        <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeName']+'</td>\
                    <td style="background-color:white;" class="details-control">\
                    <a href="#" class="del ml-0" ctId="'+response['searchResultList']['data'][i]['id']+'" title="Remove" onclick="deleteCourseType(this)"><i class="fa fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                         <a href="edit-course-type/'+response['searchResultList']['data'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').append(filteredData);
                } else {
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
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
            url: "courseTypeSearch",
            data: { search_String: '', 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr class="in-queue">\
                        <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeName']+'</td>\
                    <td style="background-color:white;" class="details-control">\
                    <a href="#" class="del ml-0" ctId="'+response['searchResultList']['data'][i]['id']+'" title="Remove" onclick="deleteCourseType(this)"><i class="fa fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                         <a href="edit-course-type/'+response['searchResultList']['data'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').append(filteredData);
                } else {
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
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

    var queryString = $('#courseTypeAjaxsearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "courseTypeSearch",
            data: { search_String: queryString, 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']['data']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList']['data'].length > 0) {
                    for (var i = 0; i < response['searchResultList']['data'].length; i++){
                        var addStudent = '<tr class="in-queue">\
                        <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeName']+'</td>\
                    <td style="background-color:white;" class="details-control">\
                    <a href="#" class="del ml-0" ctId="'+response['searchResultList']['data'][i]['id']+'" title="Remove" onclick="deleteCourseType(this)"><i class="fa fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                         <a href="edit-course-type/'+response['searchResultList']['data'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').append(filteredData);
                }else {
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
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
            url: "courseTypeSearch",
            data: { search_String: '', 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']['data']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList']['data'].length > 0) {
                    for (var i = 0; i < response['searchResultList']['data'].length; i++) {
                        var addStudent = '<tr class="in-queue">\
                        <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeID']+'</td>\
                    <td style="background-color:white;">'+response['searchResultList']['data'][i]['courseTypeName']+'</td>\
                    <td style="background-color:white;" class="details-control">\
                    <a href="#" class="del ml-0" ctId="'+response['searchResultList']['data'][i]['id']+'" title="Remove" onclick="deleteCourseType(this)"><i class="fa fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                         <a href="edit-course-type/'+response['searchResultList']['data'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                    </td>\
                </tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').append(filteredData);
                }else {
                    $('#CourseTypeAppendData').html('');
                    $('#CourseTypeAppendData').html('<tr>\
                                        <td style="background: white !important;"></td>\
                                            <td style="background: white !important;color:black;">No record available.</td>\
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
// ======================================================    DELETE FUNCTIONALITY    =====================================================
function deleteCourseType(thisTxt){
    var id = $(thisTxt).attr('ctId');
    console.log('value >> ',id);
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
                url: "deleteCourseType/"+id,
                success: function (response) {
                    console.log(response['data']);
                    Swal.close();
                    if(response['data']['message'] == 'Course Type Attched with Someone'){
                        Swal.fire({
                            icon: 'error',
                            title: '<small>Course type Attched with Some other module</small>',
                            showConfirmButton: true,
                            // timer: 2000
                        }).then(function(){
                            return false;
                        })
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: '<small>Course type deleted successfully</small>',
                            showConfirmButton: false,
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