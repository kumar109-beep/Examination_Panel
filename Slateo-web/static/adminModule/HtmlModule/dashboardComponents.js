import { infoCard } from '../utils/infoCard.js';
import { card1, card2, card3, defaultStaticPath } from '../globalVariables/variable.js'
import { HtmlList } from '../utils/htmlList.js';
import { notificationList } from '../utils/notificationList.js';
//import { showGraph } from '../utils/showGraph.js';
//import { dashboardHtmlList } from '../utils/dashboardHtmlList.js';





// #############################################################################################
// ############################### Code Render Html Cards ######################################
// #############################################################################################
var cardFormField = '';
var attrCarddata = [card1];
console.log(attrCarddata);
for (var i = 0; i < attrCarddata.length; i++) {
var CardField = infoCard(attrCarddata[i][0], attrCarddata[i][1], attrCarddata[i][3], defaultStaticPath + attrCarddata[i][4], attrCarddata[i][5]);
cardFormField = cardFormField + CardField

$(attrCarddata[i][2]).html(cardFormField);
}

// Card 2
var cardFormField = '';
var attrCarddata = [card2];
console.log(attrCarddata);
for (var i = 0; i < attrCarddata.length; i++) {
var CardField = infoCard(attrCarddata[i][0], attrCarddata[i][1], attrCarddata[i][3], defaultStaticPath + attrCarddata[i][4], attrCarddata[i][5]);
cardFormField = cardFormField + CardField
$(attrCarddata[i][2]).html(cardFormField);
}

// Card 3
var cardFormField = '';
var attrCarddata = [card3];
console.log(attrCarddata);
for (var i = 0; i < attrCarddata.length; i++) {
var CardField = infoCard(attrCarddata[i][0], attrCarddata[i][1], attrCarddata[i][3], defaultStaticPath + attrCarddata[i][4], attrCarddata[i][5]);
cardFormField = cardFormField + CardField
$(attrCarddata[i][2]).html(cardFormField);
}

//HtmlList
var htmlDataList = HtmlList('./static/adminModule/images/dashboard/preview.png','./static/adminModule/images/dashboard/edit.png');
console.log('Hi',htmlDataList)
$('.renderHTML').html(htmlDataList);

//notificationListHTML
var notificationDataList = notificationList();
console.log('Hello',notificationDataList)
$('.renderNotificationHTML').html(notificationDataList);

//showGraph
// var showDataGraph = showGraph();
// console.log('Hello',showDataGraph)
// $('.rendershowGraphHTML').html(showDataGraph);

//dashboardHtml
// var dashboardDataHtml = dashboardHtmlList();
// console.log('Hello',dashboardDataHtml)
// $('.renderdashboardHtmlList').html(dashboardDataHtml);