var listofStudentIDs = [];

$(document).ready(function () {
    localStorage.removeItem("studentIDList");
    $('.group').show();
    $('.batch').show();

});

function showGroupsOnly() {
    $('.batch').hide();
    $('.group').show();
    $('#batchIDHearder').html('Group ID');
    $('#batchNameHearder').html('Group Name');
    $('#batchSupervisorHearder').html('Group Supervisor');
}

function showBoth() {
    $('.group').show();
    $('.batch').show();
    $('#batchIDHearder').html('Batch/Group ID');
    $('#batchNameHearder').html('Batch/Group Name');
    $('#batchSupervisorHearder').html('Batch/Group Supervisor');

}

function showBatchOnly() {
    $('.group').hide();
    $('.batch').show();
    $('#batchIDHearder').html('Batch ID');
    $('#batchNameHearder').html('Batch Name');
    $('#batchSupervisorHearder').html('Batch Supervisor');
}

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

//  ##############################################################################################################################################################
//                                                                 BATCH MANAGEMENT : BATCHES
//  ##############################################################################################################################################################
// ================================================   HIDE & SHOW FUNCTION FOR BATCH AND STUDENT SELECTION   ===================================================
function batchStudentSelection() {
    if($('#batchID').val().trim().length == 0){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "Batch ID field can't be blank!",
          }).then(function(){
              return false;
          })
    }if($('#batchName').val().trim().length == 0){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "Batch Name field can't be blank!",
          }).then(function(){
              return false;
          })
    }if($('#batchDescription').val().trim().length == 0){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "Batch Description field can't be blank!",
          }).then(function(){
              return false;
          })
    }if($('#courseTypeId').val().trim().length == 0){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "Course Type field can't be blank!",
          }).then(function(){
              return false;
          })
    }if($('#coursenameId').val().trim().length == 0){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "Course Name field can't be blank!",
          }).then(function(){
              return false;
          })
    }
    // if($('#batchSupervisorID').val().trim().length == 0){
    //     Swal.fire({
    //         icon: 'info',
    //         title: 'Oops...',
    //         text: "Batch SupervisorID field can't be blank!",
    //       }).then(function(){
    //           return false;
    //       })
    // }if($('#batchSupervisorName').val().trim().length == 0){
    //     Swal.fire({
    //         icon: 'info',
    //         title: 'Oops...',
    //         text: "Batch SupervisorName field can't be blank!",
    //       }).then(function(){
    //           return false;
    //       })
    // }
    else{
        $('#CourseIDFilter').html("");
        $('#CourseTypeIdFilter').html("");
        $('#createBatch').css('display', 'none');
        $('#studentSelection').css('display', '');
        var batchID = $('#batchID').val();
        $('#newBatchId').html(batchID);
        var courseTypeId = $('#courseTypeId').find(":selected").text();
        var courseId = $('#coursenameId').find(":selected").text();
        var courseTypeAtrr = $('#courseTypeId').find(":selected").val();
        var courseNameAtrr = $('#coursenameId').find(":selected").val();
        $('#CourseTypeIdFilter').val(courseTypeId);
        $('#CourseIDFilter').val(courseId);
        $('#CourseTypeIdFilter').attr("attrID",courseTypeAtrr);
        $('#CourseIDFilter').attr("attrID",courseNameAtrr);
    }
}
// ================================================ ADD STUDENT TO THE CREATED BATCH =============================================================================
function addStudent() {
    var studentID = $('#default-select').val();
    var listIDs = []
    $("#students tbody tr").each(function () {
        listIDs.push($(this).find("td:first-child").html())
    });
    listIDs.shift();

    for (var i = 0; i <= listIDs.length; i++) {
        if (parseInt(studentID) == parseInt(listIDs[i])) {
            Swal.fire('Student already exist!');
            return false;
        }
    }

    $.ajax({
        type: 'GET',
        url: "select_batch_student",
        data: { studentID: studentID },
        success: function (response) {
            var addStudent = '<tr class="not-added" >\
                                <td style="display:none;">'+ response['data']['id'] + '</td>\
                                <td>'+ response['data']['fullName'] + '</td>\
                                <td>'+ response['data']['registrationNumber'] + '</td>\
                                <td>'+ response['data']['emailID'] + '</td>\
                                <td>'+ response['data']['mobileNumber'] + '</td>\
                                <td>'+ response['data']['gender'] + '</td>\
                                <td class="details-control">\
                                <a href="#" class="del"><i class="fa fa-trash"></i></a>\
                                </td>\
                                </tr>';
            $('#noStudentData').hide();
            $('#studentData').append(addStudent);
        }
    });
}

function createBatch() {
    var batchID = $('#batchID').val();
    var batchName = $('#batchName').val();
    var batchDescription = $('#batchDescription').val();
    var predec_batch = $('#courseTypeId').val();
    var succec_batch = $('#coursenameId').val();
    var batchSupervisorID = $('#batchSupervisorID').val();
    var batchSupervisorName = $('#batchSupervisorName').val();
    var year = $('#yearFilter').val();


    if(listofStudentIDs.length == 0){
        listofStudentIDs = []
    }
    // $("#students tbody tr").each(function () {
    //     listofStudentIDs.push($(this).find("td:first-child").html())
    // });

    // listofStudentIDs.shift();
    const csrftoken = getCookie('csrftoken');
    // swal.showLoading();
    $.ajax({
        type: 'POST',
        url: "create_batch",
        headers: { 'X-CSRFToken': csrftoken },
        data: {
            batchID: batchID, batchName: batchName, batchDescription: batchDescription,
            batchCourseType: predec_batch, batchCourseName: succec_batch,
            batchSupervisorID: batchSupervisorID,
            batchSupervisorName: batchSupervisorName, batchStudentFK: listofStudentIDs,'batchYear':year,
        },
        success: function (response) {
            console.log('student data response', response);
            window.location.href = "/batch_list";
        }
    });

}
// Add new students to existing batches
function addNewStudentsToBatch() {
    var studentID = $('#default-select').val();
    var listIDs = []
    $("#example1 tbody tr").each(function () {
        data = $(this).find("td:first-child").html();
        if (data.length <= 6) {
            listIDs.push(data);
        }
    });
    
    for (var i = 0; i <= listIDs.length; i++) {
        if (parseInt(studentID) == parseInt(listIDs[i])) {
            Swal.fire('Student already exist!');
            return false;
        }
    }
    
    listIDs.push(studentID);
    // listIDs.shift();
    console.log('IDLists : ===>', listIDs);
    
    var batchId_Url = window.location.href.split('/');
    var batchId = batchId_Url[batchId_Url.length - 1];

    var batchIDLabel = $('#batchIDLabel').html();
    var batchNameLabel = $('#batchNameLabel').html();

    console.log('IDLists after : ===>', batchIDLabel, batchNameLabel);

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "add_more_batch_student",
        headers: { 'X-CSRFToken': csrftoken },
        data: { listIDs: listIDs, batchId: batchId, batchIDLabel: batchIDLabel, batchNameLabel: batchNameLabel },
        success: function (response) {
            console.log(response);
            location.reload();
        }
    });
}

// #######################################################################################################################################################################
// ================================================   BATCH MANAGEMENT : GROUPS  =========================================================================================
// #######################################################################################################################################################################
function groupStudentSelection() {
    $('#createGroup').css('display', 'none');
    $('#studentGroupSelection').css('display', '');
    var batchID = $('#groupID').val();
    $('#newGroupId').html(batchID);
}

// ===================================================================================================================================================================================
//                                                                CREATE NEW GROUP
// ===================================================================================================================================================================================
function createGroup() {
    var groupID = $('#groupID').val();
    var groupName = $('#groupName').val();
    var groupDescription = $('#groupDescription').val();
    var predec_group = $('#predec_group').val();
    var succec_group = $('#succec_group').val();
    var groupSupervisorID = $('#groupSupervisorID').val();
    var groupSupervisorName = $('#groupSupervisorName').val();
    var listofStudentIDs = []
    $("#students tbody tr").each(function () {
        listofStudentIDs.push($(this).find("td:first-child").html())
    });
    listofStudentIDs.shift();
    const csrftoken = getCookie('csrftoken');
    swal.showLoading();
    $.ajax({
        type: 'POST',
        url: "create_group",
        headers: { 'X-CSRFToken': csrftoken },
        data: { groupID: groupID, groupName: groupName, groupDescription: groupDescription, predec_group: predec_group, succec_group: succec_group, groupSupervisorID: groupSupervisorID, groupSupervisorName: groupSupervisorName, groupStudentFK: listofStudentIDs },
        success: function (response) {
            console.log('student data response', response);
            window.location.href = "/batch_list";
        }
    });
}
// ===================================================================================================================================================================================
//                                                           ADD NEW STUDENTS TO SPECIFIC GROUP
// ===================================================================================================================================================================================
function addNewStudentsToGroup() {
    var studentID = $('#default-select').val();
    var listIDs = []
    $("#example1 tbody tr").each(function () {
        data = $(this).find("td:first-child").html();
        if(data.length <= 6){
            listIDs.push(data);
        }
    });
    // listIDs.shift();
    for (var i = 0; i <= listIDs.length; i++) {
        if (parseInt(studentID) == parseInt(listIDs[i])) {
            Swal.fire('Student already exist!');
            return false;
        }
    }
    listIDs.push(studentID);
    var batchId_Url = window.location.href.split('/');
    var groupId = batchId_Url[batchId_Url.length - 1];
    var groupIDLabel = $('#groupIDLabel').html();
    var groupNameLabel = $('#groupNameLabel').html();
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "add_more_group_student",
        headers: { 'X-CSRFToken': csrftoken },
        data: { listIDs: listIDs, groupId: groupId, groupIDLabel: groupIDLabel, groupNameLabel: groupNameLabel },
        success: function (response) {
            console.log(response);
            location.reload();
        }
    });
}

// ===========================================================================================================================================================
//                                                           BACTH MANAGEMENT : CLUSTERS
// ===========================================================================================================================================================
function clusterStudentSelection() {
    $('#createCluster').css('display', 'none');
    $('#batchSelection').css('display', '');
    var batchID = $('#clusterID').val();
    $('#newClusterId').html(batchID);
}

// ===================================================================================================================================================================================
//                                                           CREATE NEW CLUSTER
// ===================================================================================================================================================================================
function createCluster() {
    var clusterID = $('#clusterID').val();
    var clusterName = $('#clusterName').val();
    var clusterDescription = $('#clusterDescription').val();
    var clusterSupervisorID = $('#clusterSupervisorID').val();
    var clusterSupervisorName = $('#clusterSupervisorName').val();
    var listofBatchIDs = []
    $("#batches tbody tr").each(function () {
        listofBatchIDs.push($(this).find("td:first-child").html())
    });

    listofBatchIDs.shift();
    const csrftoken = getCookie('csrftoken');
    swal.showLoading();
    $.ajax({
        type: 'POST',
        url: "create_cluster_batch",
        headers: { 'X-CSRFToken': csrftoken },
        data: { clusterID: clusterID, clusterName: clusterName, clusterDescription: clusterDescription, clusterSupervisorID: clusterSupervisorID, clusterSupervisorName: clusterSupervisorName, clusterStudentFK: listofBatchIDs },
        success: function (response) {
            console.log('student data response', response);
            window.location.href = "/cluster_batch_list";
        }
    });
}

//                                                                     ADD BATCH 
// ===================================================================================================================================================================================
function addBatch() {
    var batchID = $('#default-select').val();
    var listIDs = []
    $("#batches tbody tr").each(function () {
        data = $(this).find("td:first-child").html();
        if (data.length <= 6) {
            listIDs.push();
        }
    });
    listIDs.shift();
    for (var i = 0; i <= listIDs.length; i++) {
        if (parseInt(batchID) == parseInt(listIDs[i])) {
            Swal.fire('Batch already exist!');
            return false;
        }
    }
    $.ajax({
        type: 'GET',
        url: "select_batch",
        data: { batchID: batchID },
        success: function (response) {
            console.log(response);
            var addBatch = '<tr class="not-added" >\
                                <td style="display:none;">'+ response['data']['id'] + '</td>\
                                <td>'+ response['data']['batchID'] + '</td>\
                                <td>'+ response['data']['batchName'] + '</td>\
                                <td>'+ response['data']['batchSuperVisorID'] + '</td>\
                                <td>'+ response['data']['batchStudentFK'].length + '</td>\
                                <td class="details-control">\
                                <a href="#" class="del"><i class="fa fa-trash"></i></a>\
                                </td>\
                                </tr>';
            $('#noStudentData').hide();
            $('.addedbatches').append(addBatch);
        }
    });
}

// ===================================================================================================================================================================================
//                                                           ADD NEW BATCH TO SPECIFIC CLUSTER
// ===================================================================================================================================================================================
function addNewBatchToCluster() {
    var batchID = document.getElementById('#default-Select').value;
    var listIDs = [];
    $("#clusterTable tbody tr").each(function () {
        data = $(this).find("td:first-child").html();
        if (data.length <= 6) {
            listIDs.push(data);
        }
    });
    // listIDs.shift();
    for (var i = 0; i <= listIDs.length; i++) {
        if (parseInt(batchID) == parseInt(listIDs[i])) {
            Swal.fire('Batch already exist!');
            return false;
        }
    }
    listIDs.push(batchID);
    var clusterId_Url = window.location.href.split('/');
    var clusterId = clusterId_Url[clusterId_Url.length - 1];
    var clusterIDLabel = $('#clusterLabelID').html();
    var clusterNameLabel = $('#clusterLabelName').html();
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "add_more_batch",
        headers: { 'X-CSRFToken': csrftoken },
        data: { listIDs: listIDs, clusterId: clusterId, clusterIDLabel: clusterIDLabel, clusterNameLabel: clusterNameLabel},
        success: function (response) {
            console.log(response);
            location.reload();
        }
    });
}

// ===================================================================================================================================================================================
//                                                           DELETE STUDENT FROM SPECIFIC BATCH
// ===================================================================================================================================================================================
function deleteStudentsFromBatch(thisTxt){
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this Student?\nYou can add it again.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            var studentID = $(thisTxt).parent().parent().parent().children('#studentID').text();
            var listIDs = []
            $("#example1 tbody tr").each(function () {
                data = $(this).find("td:first-child").html();
                if (data.length <= 6) {
                    listIDs.push(data);
                }
            });
            // listIDs.shift();
            var array = listIDs;
            var filtered = array.filter(function (value, index, arr) {
                return value != studentID;
            });            
            var batchId_Url = window.location.href.split('/');
            var batchId = batchId_Url[batchId_Url.length - 1];
            var batchIDLabel = $('#batchIDLabel').html();
            var batchNameLabel = $('#batchNameLabel').html();
            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "add_more_batch_student",
                headers: { 'X-CSRFToken': csrftoken },
                data: { listIDs: filtered, batchId: batchId, batchIDLabel: batchIDLabel, batchNameLabel: batchNameLabel },
                success: function (response) {
                    console.log(response);
                    location.reload();
                }
            });
        }
    })
}

// ===================================================================================================================================================================================
//                                                           DELETE STUDENT FROM SPECIFIC GROUP
// ===================================================================================================================================================================================
function deleteStudentsFromGroup(thisTxt) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this Student?\nYou can add it again.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            var studentID = $(thisTxt).parent().parent().parent().children('#studentID').text();
            var listIDs = []
            $("#example1 tbody tr").each(function () {
                data = $(this).find("td:first-child").html();
                if (data.length <= 6) {
                    listIDs.push(data);
                }
            });
            // listIDs.shift();
            var array = listIDs;
            var filtered = array.filter(function (value, index, arr) {
                return value != studentID;
            });
            var groupId_Url = window.location.href.split('/');
            var groupId = groupId_Url[groupId_Url.length - 1];
            var groupIDLabel = $('#groupIDLabel').html();
            var groupNameLabel = $('#groupNameLabel').html();
            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "add_more_group_student",
                headers: { 'X-CSRFToken': csrftoken },
                data: { listIDs: filtered, groupId: groupId, groupIDLabel: groupIDLabel, groupNameLabel: groupNameLabel },
                success: function (response) {
                    console.log(response);
                    location.reload();
                }
            });
        }
    })
}

// ===================================================================================================================================================================================
//                                                           DELETE BATCH FROM SPECIFIC CLUSTER
// ===================================================================================================================================================================================
function deleteBatchFromCluster(thisTxt) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this Student?\nYou can add it again.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            var studentID = $(thisTxt).parent().parent().parent().children('#batchID').text();
            console.log('data : ', studentID);
            var listIDs = [];
            $("#clusterTable tbody tr").each(function () {
                data = $(this).find("td:first-child").html();
                if (data.length <= 6) {
                    listIDs.push(data);
                }
            });

            var array = listIDs;
            var filtered = array.filter(function (value, index, arr) {
                return value != studentID;
            });

            var clusterId_Url = window.location.href.split('/');
            var clusterId = clusterId_Url[clusterId_Url.length - 1];

            var clusterIDLabel = $('#clusterLabelID').html();
            var clusterNameLabel = $('#clusterLabelName').html();

            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "add_more_batch",
                headers: { 'X-CSRFToken': csrftoken },
                data: { listIDs: filtered, clusterId: clusterId, clusterIDLabel: clusterIDLabel, clusterNameLabel: clusterNameLabel },
                success: function (response) {
                    console.log(response);
                    location.reload();
                }
            });
        }
    })
}
// ===================================================================================================================================================================================
// ===================================================================================================================================================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===============================================================================================================================================
// ===================================================    STUDENT FILTERS     ====================================================================
// ===============================================================================================================================================
function filterStudents(){
    var courseTypeId = $('#courseTypeId').val();
    var courseId = $('#coursenameId').val();
    var year = $('#yearFilter').val();

    console.log('courseTypeId  >> ',courseTypeId);
    console.log('courseId >> ',courseId);
    console.log('year >> ',year);
    // ======== AJAX CALL==========================
    $.ajax({
            type: 'GET',
            url: "filterStudents",
            data: { 'courseTypeId': courseTypeId,'courseId': courseId,'year': year},
            success: function (response) {
                console.log(response['responseList']);
                var tableString = '';
                for(var i=0;i<response['responseList'].length;i++){
                  var data = '<tr>\
                              <td style="color:black;background-color:white;"><input class="studentSelect" onclick="selectStudent(this)" type="checkbox" value="'+response['responseList'][i]['id']+'"></td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['fullName']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['referUser']['username']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['referUser']['email']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['mobileNumber']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['gender']+'</td>\
                            </tr>'
                            tableString = tableString +data;
                }
                $('#studentData').html('');
                if(response['responseList'].length > 0){
                  $('#studentData').append(tableString);
                  $('#studentLoadMoreBtn').show();

                }else{
                  $('#studentData').append('<tr>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;">No Student Available!</td>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;"></td>\
                            </tr>');
                $('#studentLoadMoreBtn').hide();
                }

                
            }
        });
    // ============================================
}


var studentRegistrationList = [];
document.getElementById('select-all').onclick = function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    studentRegistrationList = [];
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }


  const cb = document.getElementById('select-all');
  console.log(cb.checked);
    if(cb.checked){
    $(".studentSelect").each(function(){
        var data = $(this).val();
        studentRegistrationList.push(data);
    });
    }else{
    studentRegistrationList = [];
    }
    listofStudentIDs = studentRegistrationList;
    console.log('studentRegistrationList >> ',studentRegistrationList);
}


function selectStudent(thisTxt){
  var data = $(thisTxt).val();
  if(studentRegistrationList.includes(data)){
      const index = studentRegistrationList.indexOf(data);
      if (index > -1) {
        studentRegistrationList.splice(index, 1);
      }
  }else{
    studentRegistrationList.push(data);
  }
  listofStudentIDs = studentRegistrationList;
  console.log('studentRegistrationList >> ',studentRegistrationList);

}


var page = 1;
localStorage.setItem('studentpageNo',page);
function studentLoadMoreBtn(){
    $('#studentLoadMoreBtn').hide();
    $('#studentLoadMoreBtn1').show();

    var courseTypeId = $('#courseTypeId').val();
    var courseId = $('#coursenameId').val();
    var year = $('#yearFilter').val();

    var pageNo = localStorage.getItem('studentpageNo');
    pageNo = parseInt(pageNo) + 1;
    localStorage.setItem('studentpageNo',pageNo);

    console.log('courseTypeId  >> ',courseTypeId);
    console.log('courseId >> ',courseId);
    console.log('year >> ',year);
    console.log('pageNo >> ',pageNo);

    // ======== AJAX CALL==========================
    $.ajax({
            type: 'GET',
            url: "loadMoreStudents",
            data: { 'courseTypeId': courseTypeId,'courseId': courseId,'year': year,'page' : pageNo},
            success: function (response) {
                console.log(response['responseList']);
                var tableString = '';
                for(var i=0;i<response['responseList'].length;i++){
                  var data = '<tr>\
                              <td style="color:black;background-color:white;"><input class="studentSelect" onclick="selectStudent(this)" type="checkbox" value="'+response['responseList'][i]['id']+'"></td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['fullName']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['referUser']['username']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['referUser']['email']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['mobileNumber']+'</td>\
                              <td style="color:black;background-color:white;">'+response['responseList'][i]['gender']+'</td>\
                            </tr>'
                            tableString = tableString +data;
                }
                // $('#studentData').html('');
                if(response['responseList'].length > 0){
                  $('#studentData').append(tableString);
                  $('#studentLoadMoreBtn1').hide();
                  $('#studentLoadMoreBtn').show();

                }else{
                  $('#studentData').append('<tr>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;">No Student Available!</td>\
                              <td style="color:black;background-color:white;"></td>\
                              <td style="color:black;background-color:white;"></td>\
                            </tr>');
                $('#studentLoadMoreBtn').hide();
                $('#studentLoadMoreBtn1').hide();
                }

                
            }
        });


}
// =================================================================================
// =================================================================================
function showpage1() {
    $('#createBatch').css('display', '');
    $('#studentSelection').css('display', 'none');
}
// =================================================================================
// =================================================================================
function filter_Students() {
    $('#addnewStudentBar').css('display', '');
    $('#addnewStudentBtn').css('display', '');
}
// =================================================================================
// =================================================================================
var filterStringsForNewStudents = '';
function getfilterName(thisTxt){
    filterStringsForNewStudents = $(thisTxt).val();
    console.log('modal filterStringsForNewStudents >> ',filterStringsForNewStudents);
    if(filterStringsForNewStudents == 'contact'){
      $('#myInput').attr('placeholder','Search by mobile no.');
      $('#myInput').val('');
    }else{
      $('#myInput').attr('placeholder','Search by registration no.');
      $('#myInput').val('');
    }
  }
// =================================================================================
// =================================================================================
function searchNewStudents(thisTxt) {
    listofStudentIDs = [];
    var courseTypeId = $('#courseTypeId').text();
    var courseId = $('#courseId').text();
    var year = $('#yearData').text();
    var type_of_search = '';
    if(filterStringsForNewStudents == 'contact'){
        console.log('contact string >> ',$(thisTxt).val());
        type_of_search = 'mobile_search';
        console.log('parameters data >> ',courseTypeId,courseId,year);
    }else{
        console.log('registration string >> ',$(thisTxt).val());
        type_of_search = 'registration_serach';
        console.log('parameters data >> ',courseTypeId,courseId,year);
    }

    // var studentID = $('#default-select').val();
    $("#example1 tbody tr").each(function () {
        data = $(this).find("td:first-child").html();
        if (data.length <= 6) {
            listofStudentIDs.push(data);
        }
    });
    // listofStudentIDs.push(studentID);
    console.log('IDLists : ===>', listofStudentIDs);
    // --------------------------------------------------------------
    $.ajax({
        type: 'GET',
        url: "/searchNewStudents",
        data: { 'searchString': $(thisTxt).val(),'courseTypeId':courseTypeId,'courseId':courseId,'type_of_search':type_of_search},
        success: function (response) {
            console.log(response['responseList']);
            // location.reload();
            var tableString = '';
            for(var i=0;i<response['responseList'].length;i++){
                console.log(listofStudentIDs);
                if(listofStudentIDs.includes(response['responseList'][i]['id'].toString())){
                    $('#myInput').css('border','2px solid red');
                    $('#hidenMsg').show();
                    console.log('data exist!');
                    var data = '<tr style="pointer-events:none;opacity:0.7;">\
                                <th scope="row"><input type="checkbox" class="student_Ids" onclick="addStudent(this)" value="'+response['responseList'][i]['id']+'"></th>\
                                <td>'+response['responseList'][i]['fullName']+'</td>\
                                <td>'+response['responseList'][i]['referUser']['username']+'</td>\
                            </tr>';
                    tableString = tableString + data;
                }else{
                    $('#myInput').css('border','');
                    $('#hidenMsg').hide();
                    console.log('data not exist!');
                    var data = '<tr>\
                                <th scope="row"><input type="checkbox" class="student_Ids" onclick="addStudent(this)" value="'+response['responseList'][i]['id']+'"></th>\
                                <td>'+response['responseList'][i]['fullName']+'</td>\
                                <td>'+response['responseList'][i]['referUser']['username']+'</td>\
                            </tr>';
                    tableString = tableString + data;
                }
            }
            if(response['responseList'].length > 0){
                $('#newStudentAppend').html('');
                $('#newStudentAppend').append(tableString);
            }else{
                $('#myInput').css('border','');
                $('#hidenMsg').hide();
                $('#newStudentAppend').html('');
                $('#newStudentAppend').append('<tr><th scope="row">-</th><td>-</td><td>-</td></tr>');
            }
        }
    });
    // ------------------------------------------------------------
}
// =================================================================================
var newIdArray = [];
function addStudent(thisTxt){
    console.log('new student data >> ',$(thisTxt).val());
    if(listofStudentIDs.includes($(thisTxt).val())){
        const index = listofStudentIDs.indexOf($(thisTxt).val());
        if (index > -1) {
          listofStudentIDs.splice(index, 1);
        }
    }else{
      listofStudentIDs.push($(thisTxt).val());
    }
    console.log('IDLists : ===>', listofStudentIDs);
    if(listofStudentIDs.length > 0){
        $('#addmorestudentsbtn').attr('disabled',false);
    }else{
        $('#addmorestudentsbtn').attr('disabled',true);
    }
}
// =================================================================================
// var studentRegistrationList = [];
// function addAllStudent(thisTxt){
//     listofStudentIDs = [];
//     $("#example1 tbody tr").each(function () {
//         data = $(this).find("td:first-child").html();
//         if (data.length <= 6) {
//             listofStudentIDs.push(data);
//         }
//     });

//     // if(listofStudentIDs.includes($(thisTxt).val())){
//     //     const index = listofStudentIDs.indexOf($(thisTxt).val());
//     //     if (index > -1) {
//     //       listofStudentIDs.splice(index, 1);
//     //     }
//     // }else{
//     //   listofStudentIDs.push($(thisTxt).val());
//     // }
//     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     studentRegistrationList = [];
//     for (var checkbox of checkboxes) {
//         checkbox.checked = this.checked;
//     }


// //   const cb = document.getElementById('sel-all-students');
// //   console.log(cb.checked);
// //     if(cb.checked){
// //     $(".student_Ids").each(function(){
// //         var data = $(this).val();
// //         studentRegistrationList.push(data);
// //     });
// //     }else{
// //         studentRegistrationList = [];
// //     }
// //     listofStudentIDs = studentRegistrationList;
// //     console.log('studentRegistrationList >> ',studentRegistrationList);






//     console.log('IDLists : ===>', listofStudentIDs);
// }
// =================================================================================
function cancelBtn(){
    listofStudentIDs = [];
    console.log('IDLists : ===>', listofStudentIDs);
    location.reload();
  }
// =================================================================================
// =================================================================================
function addNewStudents(){
    console.log('IDLists : ===>', listofStudentIDs);
    $('#successHeader').css('color','green');
    $('#successHeader').text('Student added successfully!');

    var batchId_Url = window.location.href.split('/');
    var batchId = batchId_Url[batchId_Url.length - 1];

    var batchIDLabel = $('#batchIDLabel').html();
    var batchNameLabel = $('#batchNameLabel').html();

    console.log('IDLists after : ===>', batchIDLabel, batchNameLabel);

    const csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: "add_more_batch_student",
        headers: { 'X-CSRFToken': csrftoken },
        data: { listIDs: listofStudentIDs, batchId: batchId, batchIDLabel: batchIDLabel, batchNameLabel: batchNameLabel },
        success: function (response) {
            console.log(response);
            location.reload();
        }
    });
}
// =================================================================================
// =================================================================================
