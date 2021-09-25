export function spaceNotAllow(ID='') {
    // alert($('#' + ID).val());
    $('#'+ID).on('keypress', function (e) {
            if (e.which == 32) {
                alert('Space Detected');
                return false;
            }
        });
}


