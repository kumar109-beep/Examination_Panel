import { apiBaseUrl } from '../../../../globalVariables/variable.js'

$(document).ready(function () {    
    var tokenKey = $('#dashTokenKey').text();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + tokenKey + "");
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    fetch(apiBaseUrl +"dashStudentCount/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result),
        $('#totalStudent').text(JSON.parse(result)['student_count']),
        $('#totalResources').text(JSON.parse(result)['resource_count']),
        $('#totalBatches').text(JSON.parse(result)['exam_count']))
        // .catch(error => console.log('error', error))
    )
    
});







