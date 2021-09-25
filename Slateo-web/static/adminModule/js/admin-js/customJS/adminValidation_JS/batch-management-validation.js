// =============================================    BATCH MANAGEMENT : CREATE BATCH    ===============================================================
function validateBatchId(){
    var data = $('#batchID').val();
    console.log(data);
    var regx = /^[A-Za-z0-9]+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#batchID').css('border', '');
            $('#nextBatchButton').prop('disabled', false);
        } else {
            $('#batchID').css('border', '2px solid red');
            $('#nextBatchButton').prop('disabled', true);
        }
    } else {
        $('#batchID').css('border', '');
        $('#nextBatchButton').prop('disabled', true);
    }
}

function validateBatchName(){
    var data = $('#batchName').val();
    console.log(data);
    var regx = /^[A-Za-z0-9]+$/;
    if (data.length > 0) {
        if (data.match(regx)) {
            $('#batchName').css('border', '');
            $('#nextBatchButton').prop('disabled', false);
        } else {
            $('#batchName').css('border', '2px solid red');
            $('#nextBatchButton').prop('disabled', true);
        }
    } else {
        $('#batchName').css('border', '');
        $('#nextBatchButton').prop('disabled', true);
    }
}




// =============================================    BATCH MANAGEMENT : CREATE GROUP    ===============================================================
function validateGroupID() {
    var groupId = $('#groupID').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (groupId.length > 0) {
        if (groupId.match(regx)) {
            $('#groupID').css('border', '');
            $('#nextGroupButton').prop('disabled', false);
        } else {
            $('#groupID').css('border', '2px solid red');
            $('#nextGroupButton').prop('disabled', true);
        }
    } else {
        $('#groupID').css('border', '');
        $('#nextGroupButton').prop('disabled', true);
    }
}

function validateGroupName() {
    var groupName = $('#groupName').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (groupName.length > 0) {
        if (groupName.match(regx)) {
            $('#groupName').css('border', '');
            $('#nextGroupButton').prop('disabled', false);
        } else {
            $('#groupName').css('border', '2px solid red');
            $('#nextGroupButton').prop('disabled', true);
        }
    } else {
        $('#groupName').css('border', '');
        $('#nextGroupButton').prop('disabled', true);
    }

}




// =============================================    BATCH MANAGEMENT : CREATE CLUSTER    ===============================================================
function validateClusterID() {
    var clusterId = $('#clusterID').val();
    console.log(clusterId);
    var regx = /^[A-Za-z0-9]+$/;
    if (clusterId.length > 0) {
        if (clusterId.match(regx)) {
            $('#clusterID').css('border', '');
            $('#nextClusterButton').prop('disabled', false);
        } else {
            $('#clusterID').css('border', '2px solid red');
            $('#nextClusterButton').prop('disabled', true);
        }
    } else {
        $('#clusterID').css('border', '');
        $('#nextClusterButton').prop('disabled', true);
    }
}

function validateClusterName() {
    var clusterName = $('#clusterName').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (clusterName.length > 0) {
        if (clusterName.match(regx)) {
            $('#clusterName').css('border', '');
            $('#nextClusterButton').prop('disabled', false);
        } else {
            $('#clusterName').css('border', '2px solid red');
            $('#nextClusterButton').prop('disabled', true);
        }
    } else {
        $('#clusterName').css('border', '');
        $('#nextClusterButton').prop('disabled', true);
    }

}