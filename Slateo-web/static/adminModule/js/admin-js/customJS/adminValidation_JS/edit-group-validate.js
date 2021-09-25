function validateEditGroupID() {
    var groupId = $('#groupID').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (groupId.length > 0) {
        if (groupId.match(regx)) {
            $('#groupID').css('border', '');
            $('#groupUpdateButton').prop('disabled', false);
        } else {
            $('#groupID').css('border', '2px solid red');
            $('#groupUpdateButton').prop('disabled', true);
        }
    } else {
        $('#groupID').css('border', '');
        $('#groupUpdateButton').prop('disabled', true);
    }
}



function validateEditGroupName() {
    var groupName = $('#groupName').val();
    var regx = /^[A-Za-z0-9]+$/;
    if (groupName.length > 0) {
        if (groupName.match(regx)) {
            $('#groupName').css('border', '');
            $('#groupUpdateButton').prop('disabled', false);
        } else {
            $('#groupName').css('border', '2px solid red');
            $('#groupUpdateButton').prop('disabled', true);
        }
    } else {
        $('#groupName').css('border', '');
        $('#groupUpdateButton').prop('disabled', true);
    }

}