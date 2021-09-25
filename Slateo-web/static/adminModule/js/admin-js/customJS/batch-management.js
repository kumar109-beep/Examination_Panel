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
    $('#createBatch').css('display', 'none');
    $('#studentSelection').css('display', '');
    var batchID = $('#batchID').val();
    $('#newBatchId').html(batchID);
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
    var predec_batch = $('#predec_batch').val();
    var succec_batch = $('#succec_batch').val();
    var batchSupervisorID = $('#batchSupervisorID').val();
    var batchSupervisorName = $('#batchSupervisorName').val();

    var listofStudentIDs = []
    $("#students tbody tr").each(function () {
        listofStudentIDs.push($(this).find("td:first-child").html())
    });

    listofStudentIDs.shift();
    const csrftoken = getCookie('csrftoken');
    swal.showLoading();
    $.ajax({
        type: 'POST',
        url: "create_batch",
        headers: { 'X-CSRFToken': csrftoken },
        data: {
            batchID: batchID, batchName: batchName, batchDescription: batchDescription,
            predec_batch: predec_batch, succec_batch: succec_batch,
            batchSupervisorID: batchSupervisorID,
            batchSupervisorName: batchSupervisorName, batchStudentFK: listofStudentIDs
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
