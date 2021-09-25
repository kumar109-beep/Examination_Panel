function updateNotificationStatus(thisTxt){


    notifyID = $(thisTxt).attr('notifyID');
    requestID = $(thisTxt).attr('requestID');
    authorName = $('#userName').text();
    request_view_status = "True";

    console.log('notifyID>> ',notifyID);
    console.log('requestID>> ',requestID);
    console.log('authorName>> ',authorName);
    console.log('request_view_status>> ',request_view_status);

    

    return false;

}


// {
//     "id": 38,
//     "requestID": "Resource",
//     "request_author": "admin_web",
//     "request_view_status": "True"
// }