// alert();
$(function() {
    $('#user-password').on('keypress', function(e) {
        if (e.which == 32){
            console.log('Space Detected');
            return false;
                
        }
    });
 });

 // $('input[name="managerEmail"]').on('keypress', function (e) {
//     if (e.which == 32) {
//         console.log('Space Detected');
//         return false;
//     }
// })