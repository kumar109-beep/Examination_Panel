function checkExistence(thisTxt) {
    var data = $(thisTxt).attr('id');
    var valiadteString = $(thisTxt).val();

    if (data.trim() == 'examUniqueName') {
        console.log('data :>> ', data);
    }else if(data.trim() == 'examUniqueCode'){
        console.log('data :>> ', data);
    }

    // ===============   AJAX call   =================================
    $.ajax({
        type: 'GET',
        url: "checkExistence",
        data: { 'check': data, 'valiadteString': valiadteString },
        success: function (response) {
            console.log(response['resultData']);
            if(response['resultData'].length > 0 && data.trim() == 'examUniqueName'){
                $('#examNameAlreadyExist').show();
                $('#examUniqueCode').attr('readonly',true);
                $('#examUniqueCode').val('');


            }else{
                $('#examNameAlreadyExist').hide();
                $('#examUniqueCode').attr('readonly',false);


            }
            
            if(response['resultData'].length > 0 && data.trim() == 'examUniqueCode'){
                $('#examIdAlreadyExist').show();
                $('#examNxtBtn').attr('disabled',true);

            }else{
                $('#examIdAlreadyExist').hide();
                $('#examNxtBtn').attr('disabled',false);

            }
        }
    });
    // ===============================================================
}



// ========================================================================================================================================
// ========================================================================================================================================
function checkUpdateExistence(thisTxt) {
    var data = $(thisTxt).attr('id');
    var inputValue = $(thisTxt).attr('value');

    var valiadteString = $(thisTxt).val();

    if(data.trim() == 'updateExamName'){
        console.log('data :>> ', data);
    }

    // ===============   AJAX call   =================================
    $.ajax({
        type: 'GET',
        url: "/checkExistence",
        data: { 'check': data, 'valiadteString': valiadteString },
        success: function (response) {
            console.log(response['resultData']);

            if(response['resultData'].length > 0 && data.trim() == 'updateExamName' && valiadteString.trim() != inputValue.trim()){
                $('#updateExamNameAlreadyExist').show();
                $('#updateExamBtn').attr('disabled',true);
                $('#updateExamBtn').css('cursor','not-allowed');
            }else{
                $('#updateExamNameAlreadyExist').hide();
                $('#updateExamBtn').attr('disabled',false);
                $('#updateExamBtn').css('cursor','');
            }
        }
    });
    // ===============================================================
}