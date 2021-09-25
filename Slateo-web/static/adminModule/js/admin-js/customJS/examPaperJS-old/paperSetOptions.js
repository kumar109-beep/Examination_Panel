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


function onlyNumberKey(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
}


function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}

// ====================================================================================================================================
function paperSetOptions(thistxt){
    if ($(thistxt).attr('value') == "yes") {
        $('.set-creation .set-options').show();
    }
    else {
        $('.set-creation .set-options').hide();
    }
}

// ====================================================================================================================================
function previewPaperData(){
    alert();
    var maxPossibleSets = $('#maxPossibleSets').val();
    var languageSelect = $('#languageSelect').val();
    var allowedOption = $('#allowedOption').val();

    var setData = []
    setData.push(maxPossibleSets+'-'+languageSelect+'-'+allowedOption)
    console.log(setData);

    const csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: "create_paper_4",
        headers: { 'X-CSRFToken': csrftoken },
        data: { setData : setData },
        success: function (response) {
            console.log(response);
            if(response === 'success'){
                location.href = "/preview_paper_data";
            }else{
                alert('An error occured!');
                return false;
            }
        }
    });
}


