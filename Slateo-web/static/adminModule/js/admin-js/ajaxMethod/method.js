var count = 0;

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
// #########################################################################################################################
// export function gloablAjaxMethod(handleData,methodType,urlType,dataList) {
//     alert('global Ajax Called...')
   
//         const csrftoken = getCookie('csrftoken');
//         $.ajax({
//             type: methodType,
//             url: urlType,
//             headers: { 'X-CSRFToken': csrftoken },
//             data: { dataList: dataList },
//             success: function (response) {
//                 handleData(response);
//             },
//             error: function (textStatus, errorThrown) {
//                 handleData(errorThrown);
//             }
//         })
//     };
