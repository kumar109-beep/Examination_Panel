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
function roleAjaxsearch() {
    var searchString = $('#roleAjaxsearch').val();
    $.ajax({
        type: 'GET',
        url: "roleSearch",
        data: { 'search_String': searchString, 'page': 1 },
        success: function (response) {
            console.log(response['searchResultList']);
            // return false;

            var filteredData = '';
            if (response['searchResultList'].length > 0) {
                for (var i = 0; i < response['searchResultList'].length; i++) {
                    var authLen = eval(response['searchResultList'][i]['assign_authority']).length;
                    var addStudent = '<tr>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+authLen+'</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            <a href="#" class="del ml-0" title="Remove"><i class="fa fa-trash" onclick="return confirm(Are you sure you want to delete this Role/Designation?);"></i></a>\
                                            <a href="view_resources/'+ response['searchResultList'][i]['id'] + '" class="user"  title="View Resources"><i class="fa fa-user"></i></a>\
                                            <a href="view_role_detail/'+ response['searchResultList'][i]['id'] + '" class="view" title="View detail"><i class="fa fa-eye"></i></a>\
                                            <a href="edit_roles/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="Edit Detail"><i class="fa fa-edit"></i></a>\
                                            <a href="view_assigned_authorities/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="attached Authorities"><i class="far fa-address-book"></i></a">\
                                            </td>\
                                        </tr >';

                    filteredData = filteredData + addStudent;
                }
                $
                $('#showAvailabilty').css('display','none');
                $('#roleData').html('');
                $('#roleData').append(filteredData);
            } else {
                $('#roleData').html('');
                $('#showAvailabilty').css('display','');
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

    var queryString = $('#roleAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "roleSearch",
            data: { 'search_String': queryString, 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var authLen = eval(response['searchResultList'][i]['assign_authority']).length;
                        var addStudent = '<tr>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+authLen+'</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            <a href="#" class="del ml-0" title="Remove"><i class="fa fa-trash" onclick="return confirm(Are you sure you want to delete this Role/Designation?);"></i></a>\
                                            <a href="view_resources/'+ response['searchResultList'][i]['id'] + '" class="user"  title="View Resources"><i class="fa fa-user"></i></a>\
                                            <a href="view_role_detail/'+ response['searchResultList'][i]['id'] + '" class="view" title="View detail"><i class="fa fa-eye"></i></a>\
                                            <a href="edit_roles/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="Edit Detail"><i class="fa fa-edit"></i></a>\
                                            <a href="view_assigned_authorities/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="attached Authorities"><i class="far fa-address-book"></i></a">\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#showAvailabilty').css('display','none');
                    $('#roleData').html('');
                    $('#roleData').append(filteredData);
                } else {
                    $('#roleData').html('');
                $('#showAvailabilty').css('display','');
                }



                // =================================================================================================
            }
        });

        // ---------------------------------------------------
    } else {
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "roleSearch",
            data: { 'search_String': '', 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var authLen = eval(response['searchResultList'][i]['assign_authority']).length;
                        var addStudent = '<tr>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+authLen+'</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            <a href="#" class="del ml-0" title="Remove"><i class="fa fa-trash" onclick="return confirm(Are you sure you want to delete this Role/Designation?);"></i></a>\
                                            <a href="view_resources/'+ response['searchResultList'][i]['id'] + '" class="user"  title="View Resources"><i class="fa fa-user"></i></a>\
                                            <a href="view_role_detail/'+ response['searchResultList'][i]['id'] + '" class="view" title="View detail"><i class="fa fa-eye"></i></a>\
                                            <a href="edit_roles/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="Edit Detail"><i class="fa fa-edit"></i></a>\
                                            <a href="view_assigned_authorities/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="attached Authorities"><i class="far fa-address-book"></i></a">\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#showAvailabilty').css('display','none');
                    $('#roleData').html('');
                    $('#roleData').append(filteredData);
                } else {
                    $('#roleData').html('');
                $('#showAvailabilty').css('display','');
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

    var queryString = $('#roleAjaxsearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "roleSearch",
            data: { 'search_String': queryString, 'page': newPrev },
            success: function (response) {
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var authLen = eval(response['searchResultList'][i]['assign_authority']).length;
                        var addStudent = '<tr>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+authLen+'</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            <a href="#" class="del ml-0" title="Remove"><i class="fa fa-trash" onclick="return confirm(Are you sure you want to delete this Role/Designation?);"></i></a>\
                                            <a href="view_resources/'+ response['searchResultList'][i]['id'] + '" class="user"  title="View Resources"><i class="fa fa-user"></i></a>\
                                            <a href="view_role_detail/'+ response['searchResultList'][i]['id'] + '" class="view" title="View detail"><i class="fa fa-eye"></i></a>\
                                            <a href="edit_roles/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="Edit Detail"><i class="fa fa-edit"></i></a>\
                                            <a href="view_assigned_authorities/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="attached Authorities"><i class="far fa-address-book"></i></a">\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#showAvailabilty').css('display','none');
                    $('#roleData').html('');
                    $('#roleData').append(filteredData);
                } else {
                    $('#roleData').html('');
                $('#showAvailabilty').css('display','');
                }



                // =================================================================================================
            }
        });

        // ---------------------------------------------------
    } else {
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "roleSearch",
            data: { 'search_String': '', 'page': newPrev },
            success: function (response) {

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                        var authLen = eval(response['searchResultList'][i]['assign_authority']).length;
                        var addStudent = '<tr>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleID'] + '</td>\
                                            <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['roleName'] + '</td>\
                                            <td style="background: white !important;color:black;">'+authLen+'</td>\
                                            <td style="background: white !important;color:black;" class="details-control">\
                                            <a href="#" class="del ml-0" title="Remove"><i class="fa fa-trash" onclick="return confirm(Are you sure you want to delete this Role/Designation?);"></i></a>\
                                            <a href="view_resources/'+ response['searchResultList'][i]['id'] + '" class="user"  title="View Resources"><i class="fa fa-user"></i></a>\
                                            <a href="view_role_detail/'+ response['searchResultList'][i]['id'] + '" class="view" title="View detail"><i class="fa fa-eye"></i></a>\
                                            <a href="edit_roles/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="Edit Detail"><i class="fa fa-edit"></i></a>\
                                            <a href="view_assigned_authorities/'+ response['searchResultList'][i]['id'] + '" class="edit pr-1" title="attached Authorities"><i class="far fa-address-book"></i></a">\
                                            </td>\
                                        </tr >';

                        filteredData = filteredData + addStudent;
                    }
                    $('#showAvailabilty').css('display','none');
                    $('#roleData').html('');
                    $('#roleData').append(filteredData);
                } else {
                    $('#roleData').html('');
                $('#showAvailabilty').css('display','');
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
function deleteRole(thisTxt) {
    var id = $(thisTxt).attr('roleId');
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
                url: "deleteRole/" + id,
                success: function (response) {
                    console.log(response['data']['message']);
                    Swal.close();
                    if(response['data']['message'] == 'Role Attched with Someone'){
                        Swal.fire({
                            icon: 'error',
                            title: '<small>Role Attched with Some other module</small>',
                            showConfirmButton: true,
                            // timer: 2000
                        }).then(function(){
                            return false;
                        })
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: '<small>Role deleted successfully</small>',
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