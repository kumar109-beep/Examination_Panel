function validateEditBatchID() {
    var batchId = $('#batchID').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (batchId.length > 0) {
        if (batchId.match(regx)) {
            $('#batchID').css('border', '');
            $('#batchUpdateButton').prop('disabled', false);
        } else {
            $('#batchID').css('border', '2px solid red');
            $('#batchUpdateButton').prop('disabled', true);
        }
    } else {
        $('#batchID').css('border', '');
        $('#batchUpdateButton').prop('disabled', true);
    }
}



function validateEditBatchName() {
    var batchName = $('#batchName').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (batchName.length > 0) {
        if (batchName.match(regx)) {
            $('#batchName').css('border', '');
            $('#batchUpdateButton').prop('disabled', false);
        } else {
            $('#batchName').css('border', '2px solid red');
            $('#batchUpdateButton').prop('disabled', true);
        }
    } else {
        $('#batchName').css('border', '');
        $('#batchUpdateButton').prop('disabled', true);
    }

}