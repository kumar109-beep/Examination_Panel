function validateEditClusterID() {
    var clusterId = $('#clusterID').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (clusterId.length > 0) {
        if (clusterId.match(regx)) {
            $('#clusterID').css('border', '');
            $('#clusterUpdateButton').prop('disabled', false);
        } else {
            $('#clusterID').css('border', '2px solid red');
            $('#clusterUpdateButton').prop('disabled', true);
        }
    } else {
        $('#clusterID').css('border', '');
        $('#clusterUpdateButton').prop('disabled', true);
    }
}



function validateEditClusterName() {
    var clusterName = $('#clusterName').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (clusterName.length > 0) {
        if (clusterName.match(regx)) {
            $('#clusterName').css('border', '');
            $('#clusterUpdateButton').prop('disabled', false);
        } else {
            $('#clusterName').css('border', '2px solid red');
            $('#clusterUpdateButton').prop('disabled', true);
        }
    } else {
        $('#clusterName').css('border', '');
        $('#clusterUpdateButton').prop('disabled', true);
    }

}