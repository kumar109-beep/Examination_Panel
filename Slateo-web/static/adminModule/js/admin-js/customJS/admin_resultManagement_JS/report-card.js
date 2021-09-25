function reportCardFilterAjax(){
    var reportCardYear = $('#reportCardYearFilter').val().trim();
    var reportCardSemester = $('#reportCardSemesterFilter').val().trim();
    var reportCardCourseType = $('#reportCardCourseTypeFilter').val().trim();
    var reportCardCourse = $('#reportCardCourseFilter').val().trim();
    var reportCardStatus = $('#reportCardStatusFilter').val().trim();
    // =============================================================================
    console.log('reportCardYear :> ',reportCardYear);
    console.log('reportCardSemester :> ',reportCardSemester);
    console.log('reportCardCourseType :> ',reportCardCourseType);
    console.log('reportCardCourse :> ',reportCardCourse);
    console.log('reportCardStatus :> ',reportCardStatus);
    // =============================================================================
    // ----------------   AJax Call   --------------------
    $.ajax({
        type: 'GET',
        url: "reportCardFilter",
        data: {'reportCardYear':reportCardYear,'reportCardSemester':reportCardSemester,'reportCardCourseType':reportCardCourseType, 'reportCardCourse': reportCardCourse,'reportCardStatus':reportCardStatus},
        success: function (response) {
            console.log(response['searchResultList']);
            Swal.close()
            // -------------------------------------------------------------------------------------------------
            // var filteredData = '';
            // if (response['searchResultList'].length > 0) {
            //     for (var i = 0; i < response['searchResultList'].length; i++) {
            //         var roleStr = '';
            //         for (var j = 0; j < response['searchResultList'][i]['role_designation'].length; j++) {
            //             var data = '<span style="font-weight: 700;padding-legt:3px;">' + response['searchResultList'][i]['role_designation'][j]['roleName'] + '</span>&nbsp;&nbsp;'
            //             roleStr = roleStr + data;
            //         }
            //         var addStudent = '<tr>\
            //             <td style = "background: white !important;color:#28afd0;" > '+ response['searchResultList'][i]['referUser']['username'] + '</td >\
            //             <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['fullName'] + '</td>\
            //             <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['mobileNumber'] + '</td>\
            //             <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['referUser']['email'] + '</td>\
            //             <td style="background: white !important;color:black;" class="subjects">'+ roleStr + '</td>\
            //             <td style="background: white !important;color:black;">'+ response['searchResultList'][i]['subject_speciality']['subjectName'] + '</td>\
            //             <td style="background: white !important;color:black;" class="details-control">\
            //             <a  href="/delete_resource/'+ response['searchResultList'][i]['id'] + '" class="del"><i class="fa fa-trash"></i></a>\
            //             <a href="edit_resource_detail/'+ response['searchResultList'][i]['id'] + '" class="edit"><i class="fa fa-edit"></i></a>\
            //             <a href="/preview_resource_data/'+ response['searchResultList'][i]['id'] + '" class="view"><i class="fa fa-eye"></i></a>\
            //             </td>\
            //         </tr >';

            //         filteredData = filteredData + addStudent;
            //     }
            //     $('#resourceData').html('');
            //     $('#resourceData').append(filteredData);
            // } else {
            //     $('#resourceData').html('');
            //     $('#resourceData').html('<tr>\
            //     <td style="background: white !important;"></td>\
            //         <td style="background: white !important;color:black;"></td>\
            //         <td style="background: white !important;color:black;"></td>\
            //         <td style="background: white !important;color:black;">No record available.</td>\
            //         <td style="background: white !important;color:black;"></td>\
            //         <td style="background: white !important;color:black;"></td>\
            //         <td style="background: white !important;color:black;" class="details-control">\
            //         </td>\
            //     </tr >');
            // }
        }
    });
    // =================================================================================================
}