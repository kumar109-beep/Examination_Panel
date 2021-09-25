// =======================================================================================================================================
//                                                  Local Storage Value
// =======================================================================================================================================
$(document).ready(function () {
    localStorage.setItem('nextpage',1);
    localStorage.setItem('previouspage', 0);
    // next = 1, prev = 0
    // on next click =>> prev = nextBtn & next = nextBtn + 1
    // on prev. click =>> next = nextBtn - 1 & prev = nextBtn - 1
});
// =======================================================================================================================================
//                                                  Search For Student Management
// =======================================================================================================================================
function resourceAjaxSearch(){
    var searchString = $('#resourceajaxSearch').val();
    $.ajax({
        type: 'GET',
        url: "resourceSearch",
        data: { search_String: searchString, next_page: 1  },
        success: function (response) {
            console.log(response['searchResultList']);
            var filteredData = '';
            if (response['searchResultList'].length > 0){
                for (var i = 0; i < response['searchResultList'].length;i++){
                    var addStudent = '<tr>\
                        <td style = "background: white !important;color:black;" > '+ response['searchResultList'][i]['employeeCode'] + '</td >\
                        <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                        <td style = "background: white !important;color:black;" >AAAAA</td >\
                        <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['department'] + '</td>\
                        <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['subject_speciality'] + '</td>\
                        <td style="background: white !important;color:black;" class="details-control">\
                                <a href="/preview_resource_data/'+ response['searchResultList'][i]['id'] +'" class="edit"><i class="fa fa-edit"></i></a>\
                                <a  href="/delete_resource/'+ response['searchResultList'][i]['id'] +'" class="view" ><i class="fa fa-eye"></i></a>\
                        </td>\
                    </tr >';
    
                    filteredData = filteredData + addStudent;
                    }
                $('#resourceData').html('');
                $('#resourceData').append(filteredData);
            }else{
                $('#resourceData').html('');
                $('#resourceData').html('<tr>\
                                        <td style="background: white !important;"></td>\
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
// =======================================================================================================================================
//                                                  Paginator For Student Management
// =======================================================================================================================================
// --------------------------------------------------------    Next Button   -------------------------------------------------------------
function studentpaginatorNextButton(){
    var nextClick = localStorage.getItem('nextpage');
    // var prevClick = localStorage.getItem('previouspage');
    if (parseInt(nextClick) >= 1){
        $('#prevButton').show();
        $('#prevButton').css('background-color', '');
        $('#prevButton').css('color', '#007dc6');
        $('#nextButton').css('background-color', '#007dc6');
        $('#nextButton').css('color', 'white');

        var next = parseInt(nextClick) + 1;
        var prev = parseInt(nextClick);

        localStorage.setItem('nextpage', next);
        localStorage.setItem('previouspage', prev);
    }else{
        return false;
    }

    var queryString = $('#resourceajaxSearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length !=0){
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "batchSearch",
            data: { search_String: queryString, next_page: next},
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr>\
                                        <td style="background: white !important;"><a href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="link">' + response['searchResultList'][i]['registrationNumber'] + '<i class="fa fa-caret-right"></i></a></td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['course'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['branch'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['year'] + '</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] +'" class="edit"><i class="fa fa-edit"></i></a>\
                                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] +'" class="view" ><i class="fa fa-eye"></i></a>\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#resourceData').html('');
                    $('#resourceData').append(filteredData);
                } else {
                    $('#resourceData').html('');
                    $('#resourceData').html('<tr>\
                                        <td style="background: white !important;"></td>\
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



                // =================================================================================================
            }
        });

        // ---------------------------------------------------
    }else{
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "batchSearch",
            data: { search_String: '', next_page: next },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr>\
                                        <td style="background: white !important;"><a href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="link">' + response['searchResultList'][i]['registrationNumber'] + '<i class="fa fa-caret-right"></i></a></td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['course'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['branch'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['year'] + '</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] +'" class="edit"><i class="fa fa-edit"></i></a>\
                                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] +'" class="view" ><i class="fa fa-eye"></i></a>\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#resourceData').html('');
                    $('#resourceData').append(filteredData);
                } else {
                    $('#resourceData').html('');
                    $('#resourceData').html('<tr>\
                                        <td style="background: white !important;"></td>\
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




    // -----------------------------------------------------------------------------------------------------------------
}
// --------------------------------------------------------    Previous Button   -------------------------------------------------------------
function studentpaginatorPreviousButton() {
    var nextClick = localStorage.getItem('nextpage');
    var prevClick = localStorage.getItem('previouspage');

    if (parseInt(prevClick) >= 1) {
        $('#prevButton').css('background-color','#007dc6');
        $('#prevButton').css('color', 'white');

        $('#nextButton').css('background-color', '');
        $('#nextButton').css('color', '#007dc6');

        var next = parseInt(nextClick) - 1;
        var prev = parseInt(prevClick) - 1;

        localStorage.setItem('nextpage', parseInt(nextClick) - 1);
        localStorage.setItem('previouspage', parseInt(prevClick) - 1);

        if (prev === 0){
            newPrev = 1;
        }else{
            newPrev = prev;
        }
    } else {
        $('#prevButton').hide();
        return false;
    }

    var queryString = $('#resourceajaxSearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "batchSearch",
            data: { search_String: queryString, next_page: newPrev },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr>\
                                        <td style="background: white !important;"><a href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="link">' + response['searchResultList'][i]['registrationNumber'] + '<i class="fa fa-caret-right"></i></a></td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['course'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['branch'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['year'] + '</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] +'" class="edit"><i class="fa fa-edit"></i></a>\
                                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] +'" class="view" ><i class="fa fa-eye"></i></a>\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#resourceData').html('');
                    $('#resourceData').append(filteredData);
                } else {
                    $('#resourceData').html('');
                    $('#resourceData').html('<tr>\
                                        <td style="background: white !important;"></td>\
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



                // =================================================================================================
            }
        });

        // ---------------------------------------------------
    } else {
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "batchSearch",
            data: { search_String: '', next_page: newPrev },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var addStudent = '<tr>\
                                        <td style="background: white !important;"><a href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="link">' + response['searchResultList'][i]['registrationNumber'] + '<i class="fa fa-caret-right"></i></a></td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['course'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['branch'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['year'] + '</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] +'" class="edit"><i class="fa fa-edit"></i></a>\
                                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] +'" class="view" ><i class="fa fa-eye"></i></a>\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#resourceData').html('');
                    $('#resourceData').append(filteredData);
                } else {
                    $('#resourceData').html('');
                    $('#resourceData').html('<tr>\
                                        <td style="background: white !important;"></td>\
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
