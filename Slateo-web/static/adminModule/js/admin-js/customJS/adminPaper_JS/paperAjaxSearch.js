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
//                                                  Search For Paper Management
// =======================================================================================================================================
function paperAjaxsearch() {
    var searchString = $('#paperAjaxsearch').val();
    console.log(searchString);

    $.ajax({
        type: 'GET',
        url: "paperSearch",
        data: { 'search_String': searchString, 'page': 1 },
        success: function (response) {
            console.log(response['searchResultList']);

            var filteredData = '';
            if (response['searchResultList'].length > 0) {
                for (var i = 0; i < response['searchResultList'].length; i++) {
                    // ===============  REMARKS  =================
                    console.log('bvhbsdjv >>> ',response['searchResultList'][i]);
                    if(response['searchResultList'][i]['paperStatus'] == 'Approved'){
                        var remark = '<td><span class="status" style="border:1px solid green;color:green;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                     <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal"\
                                            style="color:#6f42c1;"><i class="fa fa-info"></i></a></td>\
                                     <td class="details-control">\
                                        <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                class="fa fa-trash"></i></a>\
                                        <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                            style="color:grey;pointer-events:none;"><i class="fa fa-edit"></i></a>\
                                        <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                     </td>';
                    }else if(response['searchResultList'][i]['paperStatus'] == 'Completed'){
                        var remark = '<td><span class="status" style="border:1px solid #007dc6;color:#007dc6;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                        <td style="color:#fa626b;">Not Evaluated</td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }else{
                        var remark = '<td><span class="status" style="border:1px solid red;color:red;">'+response['searchResultList'][i]['paperStatus']+'</span>\
                                        </td>\
                                        <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal1"\
                                                style="color:#6f42c1;" paperremark="'+response['searchResultList'][i]['paperStatus']+'"\
                                                onclick="renderRejectModal(this)"><i class="fa fa-info"></i></a></td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                                style="color:;pointer-events:;"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }
                    // ===========================================
                    var addStudent = '<tr>\
                    <td> <a href="#" class="link">'+response['searchResultList'][i]['paperID']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td>'+response['searchResultList'][i]['paperName']+'</td>\
                    <td>'+response['searchResultList'][i]['paperTotalMarks']+'</td>\
                    <td>'+response['searchResultList'][i]['paperPassingMark']+'</td>\
                    <td>'+response['searchResultList'][i]['totalNoSection']+'</td>\
                    '+remark+'</tr>';

                    filteredData = filteredData + addStudent;
                }
                $('#paperData').html('');
                $('#paperData').append(filteredData);
            } else {
                $('#paperData').html('');
                $('#paperData').html('<tr>\
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

    var queryString = $('#paperAjaxsearch').val();
    // ---------------------------  next [search + pagination]   ---------------------------------------------------------
    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "paperSearch",
            data: { search_String: queryString, 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                         // ===============  REMARKS  =================
                    console.log('bvhbsdjv >>> ',response['searchResultList'][i]);
                    if(response['searchResultList'][i]['paperStatus'] == 'Approved'){
                        var remark = '<td><span class="status" style="border:1px solid green;color:green;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                     <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal"\
                                            style="color:#6f42c1;"><i class="fa fa-info"></i></a></td>\
                                     <td class="details-control">\
                                        <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                class="fa fa-trash"></i></a>\
                                        <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                            style="color:grey;pointer-events:none;"><i class="fa fa-edit"></i></a>\
                                        <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                     </td>';
                    }else if(response['searchResultList'][i]['paperStatus'] == 'Completed'){
                        var remark = '<td><span class="status" style="border:1px solid #007dc6;color:#007dc6;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                        <td style="color:#fa626b;">Not Evaluated</td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }else{
                        var remark = '<td><span class="status" style="border:1px solid red;color:red;">'+response['searchResultList'][i]['paperStatus']+'</span>\
                                        </td>\
                                        <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal1"\
                                                style="color:#6f42c1;" paperremark="'+response['searchResultList'][i]['paperStatus']+'"\
                                                onclick="renderRejectModal(this)"><i class="fa fa-info"></i></a></td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                                style="color:;pointer-events:;"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }
                    // ===========================================
                    var addStudent = '<tr>\
                    <td> <a href="#" class="link">'+response['searchResultList'][i]['paperID']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td>'+response['searchResultList'][i]['paperName']+'</td>\
                    <td>'+response['searchResultList'][i]['paperTotalMarks']+'</td>\
                    <td>'+response['searchResultList'][i]['paperPassingMark']+'</td>\
                    <td>'+response['searchResultList'][i]['totalNoSection']+'</td>\
                    '+remark+'</tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#paperData').html('');
                    $('#paperData').append(filteredData);
                } else {
                    $('#paperData').html('');
                    $('#paperData').html('<tr>\
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
            url: "paperSearch",
            data: { search_String: '', 'page': next },
            success: function (response) {
                console.log(response['searchResultList']);

                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                         // ===============  REMARKS  =================
                    console.log('bvhbsdjv >>> ',response['searchResultList'][i]);
                    if(response['searchResultList'][i]['paperStatus'] == 'Approved'){
                        var remark = '<td><span class="status" style="border:1px solid green;color:green;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                     <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal"\
                                            style="color:#6f42c1;"><i class="fa fa-info"></i></a></td>\
                                     <td class="details-control">\
                                        <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                class="fa fa-trash"></i></a>\
                                        <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                            style="color:grey;pointer-events:none;"><i class="fa fa-edit"></i></a>\
                                        <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                     </td>';
                    }else if(response['searchResultList'][i]['paperStatus'] == 'Completed'){
                        var remark = '<td><span class="status" style="border:1px solid #007dc6;color:#007dc6;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                        <td style="color:#fa626b;">Not Evaluated</td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }else{
                        var remark = '<td><span class="status" style="border:1px solid red;color:red;">'+response['searchResultList'][i]['paperStatus']+'</span>\
                                        </td>\
                                        <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal1"\
                                                style="color:#6f42c1;" paperremark="'+response['searchResultList'][i]['paperStatus']+'"\
                                                onclick="renderRejectModal(this)"><i class="fa fa-info"></i></a></td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                                style="color:;pointer-events:;"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }
                    // ===========================================
                    var addStudent = '<tr>\
                    <td> <a href="#" class="link">'+response['searchResultList'][i]['paperID']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td>'+response['searchResultList'][i]['paperName']+'</td>\
                    <td>'+response['searchResultList'][i]['paperTotalMarks']+'</td>\
                    <td>'+response['searchResultList'][i]['paperPassingMark']+'</td>\
                    <td>'+response['searchResultList'][i]['totalNoSection']+'</td>\
                    '+remark+'</tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#paperData').html('');
                    $('#paperData').append(filteredData);
                } else {
                    $('#paperData').html('');
                    $('#paperData').html('<tr>\
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

    var queryString = $('#paperAjaxsearch').val();

    if (queryString.trim().length != 0) {
        // alert(queryString);
        // ----------------   AJax Call   --------------------
        $.ajax({
            type: 'GET',
            url: "paperSearch",
            data: { search_String: queryString, 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++){
                         // ===============  REMARKS  =================
                    console.log('bvhbsdjv >>> ',response['searchResultList'][i]);
                    if(response['searchResultList'][i]['paperStatus'] == 'Approved'){
                        var remark = '<td><span class="status" style="border:1px solid green;color:green;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                     <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal"\
                                            style="color:#6f42c1;"><i class="fa fa-info"></i></a></td>\
                                     <td class="details-control">\
                                        <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                class="fa fa-trash"></i></a>\
                                        <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                            style="color:grey;pointer-events:none;"><i class="fa fa-edit"></i></a>\
                                        <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                     </td>';
                    }else if(response['searchResultList'][i]['paperStatus'] == 'Completed'){
                        var remark = '<td><span class="status" style="border:1px solid #007dc6;color:#007dc6;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                        <td style="color:#fa626b;">Not Evaluated</td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }else{
                        var remark = '<td><span class="status" style="border:1px solid red;color:red;">'+response['searchResultList'][i]['paperStatus']+'</span>\
                                        </td>\
                                        <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal1"\
                                                style="color:#6f42c1;" paperremark="'+response['searchResultList'][i]['paperStatus']+'"\
                                                onclick="renderRejectModal(this)"><i class="fa fa-info"></i></a></td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                                style="color:;pointer-events:;"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }
                    // ===========================================
                    var addStudent = '<tr>\
                    <td> <a href="#" class="link">'+response['searchResultList'][i]['paperID']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td>'+response['searchResultList'][i]['paperName']+'</td>\
                    <td>'+response['searchResultList'][i]['paperTotalMarks']+'</td>\
                    <td>'+response['searchResultList'][i]['paperPassingMark']+'</td>\
                    <td>'+response['searchResultList'][i]['totalNoSection']+'</td>\
                    '+remark+'</tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#paperData').html('');
                    $('#paperData').append(filteredData);
                }else {
                    $('#paperData').html('');
                    $('#paperData').html('<tr>\
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
    }else {
        // alert('blank query string!')
        $.ajax({
            type: 'GET',
            url: "paperSearch",
            data: { search_String: '', 'page': newPrev },
            success: function (response) {
                console.log(response['searchResultList']);
                // -------------------------------------------------------------------------------------------------
                var filteredData = '';
                if (response['searchResultList'].length > 0) {
                    for (var i = 0; i < response['searchResultList'].length; i++) {
                         // ===============  REMARKS  =================
                    console.log('bvhbsdjv >>> ',response['searchResultList'][i]);
                    if(response['searchResultList'][i]['paperStatus'] == 'Approved'){
                        var remark = '<td><span class="status" style="border:1px solid green;color:green;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                     <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal"\
                                            style="color:#6f42c1;"><i class="fa fa-info"></i></a></td>\
                                     <td class="details-control">\
                                        <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                class="fa fa-trash"></i></a>\
                                        <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                            style="color:grey;pointer-events:none;"><i class="fa fa-edit"></i></a>\
                                        <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                     </td>';
                    }else if(response['searchResultList'][i]['paperStatus'] == 'Completed'){
                        var remark = '<td><span class="status" style="border:1px solid #007dc6;color:#007dc6;">'+response['searchResultList'][i]['paperStatus']+'</span></td>\
                                        <td style="color:#fa626b;">Not Evaluated</td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }else{
                        var remark = '<td><span class="status" style="border:1px solid red;color:red;">'+response['searchResultList'][i]['paperStatus']+'</span>\
                                        </td>\
                                        <td><a class="view" href="#" data-toggle="modal" data-target="#exampleModal1"\
                                                style="color:#6f42c1;" paperremark="'+response['searchResultList'][i]['paperStatus']+'"\
                                                onclick="renderRejectModal(this)"><i class="fa fa-info"></i></a></td>\
                                        <td class="details-control">\
                                            <a cId="'+response['searchResultList'][i]['id']+'" class="del" onclick="deletePaper(this)"><i\
                                                    class="fa fa-trash"></i></a>\
                                            <a href="edit_paper_detail/'+response['searchResultList'][i]['id']+'" class="edit"\
                                                style="color:;pointer-events:;"><i class="fa fa-edit"></i></a>\
                                            <a href="view_paper_detail/'+response['searchResultList'][i]['id']+'" class="view"><i class="fa fa-eye"></i></a>\
                                        </td>';
                    }
                    // ===========================================
                    var addStudent = '<tr>\
                    <td> <a href="#" class="link">'+response['searchResultList'][i]['paperID']+'<i class="fa fa-caret-right"></i></a></td>\
                    <td>'+response['searchResultList'][i]['paperName']+'</td>\
                    <td>'+response['searchResultList'][i]['paperTotalMarks']+'</td>\
                    <td>'+response['searchResultList'][i]['paperPassingMark']+'</td>\
                    <td>'+response['searchResultList'][i]['totalNoSection']+'</td>\
                    '+remark+'</tr>';

                        filteredData = filteredData + addStudent;
                    }
                    $('#paperData').html('');
                    $('#paperData').append(filteredData);
                }else {
                    $('#paperData').html('');
                    $('#paperData').html('<tr>\
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

