import { notificationList } from '../utils/notificationList.js';


//notificationListHTML
var notificationDataList = notificationList('False','#');
console.log('Hello',notificationDataList)
$('.renderNotificationHTML').html(notificationDataList);

