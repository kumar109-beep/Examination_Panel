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
//                                                  Search For Student Management
// =======================================================================================================================================
function sendCredentail(thistxt) {
    
    var registrationNumber = $(thistxt).parent().parent().children('#regID').children().text();
    $.ajax({
        type: 'GET',
        url: "send_credentail_to_student",
        data: { 'registration': registrationNumber },
        success: function (response) {

            // alert('A')
        }
    });
}

function studentAjaxsearch() {
    var searchString = $('#studentAjaxsearch').val();
    console.log(searchString);

    $.ajax({
        type: 'GET',
        url: "studentSearch",
        data: { 'search_String': searchString, 'page': 1 },
        success: function (response) {
            console.log(response['searchResultList']);

            var filteredData = '';
            if (response['searchResultList'].length > 0) {
                for (var i = 0; i < response['searchResultList'].length; i++) {
                    var addStudent = '<tr>\
                                        <td style="background: white !important;"><a href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="link">' + response['searchResultList'][i]['registrationNumber'] + '<i class="fa fa-caret-right"></i></a></td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['guardianName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['courseFK'] + '</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] + '" class="edit"><i class="fa fa-edit"></i></a>\
                                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="view" ><i class="fa fa-eye"></i></a>\
                                                    <a onclick="sendCredential(this)" studentId="' + response['searchResultList'][i]['registrationNumber'] + '" class="view ml-1" title="Send Login Credentials" ><i class="fas fa-key" style="color:blue;"></i></a>\
                                            </td>\
                                        </tr >';

                    filteredData = filteredData + addStudent;
                }
                $('#studentData').html('');
                $('#studentData').append(filteredData);
            } else {
                $('#studentData').html('');
                $('#studentData').html('<tr>\
                                        <td style="background: white !important;"></td>\
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

    var queryString = $('#studentAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "studentSearch",
            data: { search_String: queryString, 'page': next },
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
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['guardianName'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['courseFK'] + '</td>\
                            <td style="background: white !important;color:black;" class="details-control">\
                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] + '" class="edit"><i class="fa fa-edit"></i></a>\
                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="view" ><i class="fa fa-eye"></i></a>\
                                    <a onclick="sendCredential(this)" studentId="' + response['searchResultList'][i]['registrationNumber'] + '" class="view ml-1" title="Send Login Credentials" ><i class="fas fa-key" style="color:blue;"></i></a>\
                            </td>\
                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#studentData').html('');
                    $('#studentData').append(filteredData);
                } else {
                    $('#studentData').html('');
                    $('#studentData').html('<tr>\
                    <td style="background: white !important;"></td>\
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
            url: "studentSearch",
            data: { search_String: '', 'page': next },
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
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['guardianName'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['courseFK'] + '</td>\
                            <td style="background: white !important;color:black;" class="details-control">\
                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] + '" class="edit"><i class="fa fa-edit"></i></a>\
                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="view" ><i class="fa fa-eye"></i></a>\
                                    <a onclick="sendCredential(this)" studentId="' + response['searchResultList'][i]['registrationNumber'] + '" class="view ml-1" title="Send Login Credentials" ><i class="fas fa-key" style="color:blue;"></i></a>\
                            </td>\
                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#studentData').html('');
                    $('#studentData').append(filteredData);
                } else {
                    $('#studentData').html('');
                    $('#studentData').html('<tr>\
                    <td style="background: white !important;"></td>\
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

    var queryString = $('#studentAjaxsearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "studentSearch",
            data: { search_String: queryString, 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++){
                        var addStudent = '<tr>\
                        <td style="background: white !important;"><a href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="link">' + response['searchResultList'][i]['registrationNumber'] + '<i class="fa fa-caret-right"></i></a></td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['emailID'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['guardianName'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['courseFK'] + '</td>\
                            <td style="background: white !important;color:black;" class="details-control">\
                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] + '" class="edit"><i class="fa fa-edit"></i></a>\
                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="view" ><i class="fa fa-eye"></i></a>\
                                    <a onclick="sendCredential(this)" studentId="' + response['searchResultList'][i]['registrationNumber'] + '" class="view ml-1" title="Send Login Credentials" ><i class="fas fa-key" style="color:blue;"></i></a>\
                            </td>\
                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#studentData').html('');
                    $('#studentData').append(filteredData);
                }else {
                    $('#studentData').html('');
                    $('#studentData').html('<tr>\
                    <td style="background: white !important;"></td>\
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
            url: "studentSearch",
            data: { search_String: '', 'page': newPrev },
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
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['guardianName'] + '</td>\
                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['courseFK'] + '</td>\
                            <td style="background: white !important;color:black;" class="details-control">\
                                    <a href="/edit_student_detail/'+ response['searchResultList'][i]['id'] + '" class="edit"><i class="fa fa-edit"></i></a>\
                                    <a  href="/student_detail/'+ response['searchResultList'][i]['id'] + '" class="view" ><i class="fa fa-eye"></i></a>\
                                    <a onclick="sendCredential(this)" studentId="' + response['searchResultList'][i]['registrationNumber'] + '" class="view ml-1" title="Send Login Credentials" ><i class="fas fa-key" style="color:blue;"></i></a>\
                            </td>\
                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#studentData').html('');
                    $('#studentData').append(filteredData);
                }else {
                    $('#studentData').html('');
                    $('#studentData').html('<tr>\
                    <td style="background: white !important;"></td>\
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
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function sendCredential(thistxt) {
    var student_reg = $(thistxt).attr('studentId');
    const csrftoken = getCookie('csrftoken');
    // ================================================================
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to send login credentials?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Send Credentials'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Sending Login Credentials.</small></b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
            $.ajax({
                type: 'POST',
                url: "send_credentail_to_student",
                headers: { 'X-CSRFToken': csrftoken },
                data: { 'registration': student_reg },
                success: function (response) {
                    Swal.close();
                    console.log(response['status'])
                    if(response['status'] == 200){
                        Swal.fire({
                            icon: 'success',
                            title: '<small>Login credential send successfully.</small>',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: '<small>An error occured while sendinglogin credential.\n Try again!</small>',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                }
            });
        }
      })
    // ================================================================
}

function sendBulkCredential(){
    const csrftoken = getCookie('csrftoken');
    // ================================================================
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to send bulk login credentials?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Send Credentials'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Sending Bulk Login Credentials.</small></b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
            $.ajax({
                type: 'POST',
                url: "send_bulk_credentail_to_student",
                headers: { 'X-CSRFToken': csrftoken },
                data: { 'registration': 'all_student' },
                success: function (response) {
                    console.log(response['status'])
                    Swal.close();
                    if(response['status'] == 200){
                        Swal.fire({
                            icon: 'success',
                            title: '<small>Login credential send successfully.</small>',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: '<small>An error occured while sendinglogin credential.\n Try again!</small>',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                }
            });
        }
      })
    // ================================================================
}
