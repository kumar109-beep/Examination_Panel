function changeInputfileds(){
    var btnText = $('#resourceEditInfoBtn').text();
    console.log('btnText >> ',btnText);

    if(btnText == 'Edit'){
        $('.edit_resource_input').css('pointer-events','');
        $('.edit_resource_input').css('border',0);
        $('.edit_resource_input').css('outline',0);
        $('.edit_resource_input').css('background',0);
        $('.edit_resource_input').css('border-bottom','1px solid #28afd0');
    
        $('#resDob').attr('type','date');
        $('#resourceEditCancelBtn').css('display','');
        $('#resourceEditInfoBtn').text('Update details');
    }else{
        Swal.fire({
            title: '<small>Do you want to save the changes?</small>',
            showCancelButton: true,
            confirmButtonText: `Save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success').then(function(){
                  $('.edit_resource_input').css('pointer-events','none');
                  $('.edit_resource_input').css('border','1px solid white');
  
                  $('#resDob').attr('type','text');
                  $('#resDob').val('02-August-1988');
  
                  $('#resourceEditCancelBtn').css('display','none');
                  $('#resourceEditInfoBtn').text('Edit');
              })
            }
          })
    }



}
// ======================================================================================================
// ======================================================================================================
// ======================================================================================================
function changeInputfiledsbyCancel(){
    $('.edit_resource_input').css('pointer-events','none');
    $('.edit_resource_input').css('border','1px solid white');

    $('#resDob').attr('type','text');
    $('#resDob').val('02-August-1988');

    $('#resourceEditCancelBtn').css('display','none');
    $('#resourceEditInfoBtn').text('Edit');
}

// ======================================================================================================
// ======================================================================================================
