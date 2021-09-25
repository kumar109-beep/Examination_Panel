var paper_id = [];
var paper_name = [];
var paper_startTime = [];
var paper_year = [];
var paper_startDate = [];
var paper_total_time = [];
var paper_proctor = [];
var paper_subjectName = [];
var dataArray = [];
var paperDetailArray = [];

var dataDict = new Object();
var paperDetail = new Object();
// ---------------------------------------------------------------------------------------------------------------
//     "examName": "Test",
//     "examID": "ASS",
//     "examType": "Annual",
//     "examPassword": "1241",
//     "examStartDate": "10-05-1996",
//     "examEndDate": "15-04-2021",
//     "examPaperTimeTable": "[['paperID1','05-10-1996','2:00','5:00'],['paperID2','06-10-1996','2:00','5:00']]",
//     "examAssociateCourse": 7,
//     "examPapers": [
//         5
//     ]
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
// ---------------------------------------------------------------------------------------------------------------
function updateExamData() {
    // ==================================
    var examName = $('#updateExamName').val();
    var examID = $('#updateExamId').val();
    var examType = $('#examType').val();
    var examPassword = $('#txtConfirmPassword').val();
    if(examPassword.trim().length == 0){
        var examPassword = $('#examPassword').text();
    }
    var examAssociateCourse = $('#updateExanCourse').text();
    var examAssociateCourseType = $('#updateExanCourse_Type').text();
    // var examAssociateCourseType = [];
    // examAssociateCourseType.push(x);

    var y = $('#attachedBatches').val();
    var attachedBatches = [];
    attachedBatches.push(y);

    console.log('examAssociateCourse : ',examAssociateCourse)
    console.log('examAssociateCourseType : ',examAssociateCourseType)
    console.log('attachedBatches : ',attachedBatches)

    var examPapers = [];

    // ==================================
    $('.paperId').each(function () { paper_id.push($(this).text()); });
    console.log(paper_id);

    $('.paper_Name').each(function () { paper_name.push($(this).text()); });
    console.log(paper_name);
    
    $('.paper_subjectName').each(function () { paper_subjectName.push($(this).text()); });
    console.log(paper_subjectName);
    
    $('.paper_year').each(function () { paper_year.push($(this).text()); });
    console.log(paper_year);
    
    $('.paper_total_time').each(function () { paper_total_time.push($(this).text()); });
    console.log(paper_total_time);

    $('.paper_startDate').each(function () { paper_startDate.push($(this).val()); dateArray.push(new Date($(this).val()));});
    console.log(paper_startDate);
    
    $('.paper_startTime').each(function () { paper_startTime.push($(this).val()); });
    console.log(paper_startTime);
    
    $('.paper_proctor').each(function () { paper_proctor.push($(this).val()); });
    console.log(paper_proctor);
    
    var maxDate = new Date(Math.max.apply(null, dateArray));
    var minDate = new Date(Math.min.apply(null, dateArray));

    var startDate = minDate.toLocaleDateString();
    var endDate = maxDate.toLocaleDateString();

    console.log('startDate >>',startDate);
    console.log('endDate >> ',endDate);

    var dataArr = [];
    for(var i=0;i<paper_id.length;i++){
        var paperDetailDict = {};
        paperDetailDict['paperID'] = paper_id[i];
        paperDetailDict['paperStartDate'] = paper_startDate[i];
        paperDetailDict['paperStartTime'] = paper_startTime[i];

        dataArr.push(parseInt(paper_proctor[i]));
        console.log('dataArr >>',dataArr);
        
        paperDetailDict['proctor'] = dataArr;
        paperDetailArray.push(paperDetailDict);
        dataArr = [];
    }
    console.log('paperDetailArray array for updatae  : ',paperDetailArray);

    var url = window.location.href;
    var urlSplit = url.split('/');
    var id = urlSplit.pop();

    // =============================================================================
    examPapers.push(paper_id.length)
    const csrftoken = getCookie('csrftoken');
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Updating Exam Details</small></b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })

    $.ajax({
        type: 'POST',
        url: "/edit-exam/"+id,
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'examName': examName, 'examID': examID, 'examType': examType, 'examPassword': examPassword, 'examStartDate':startDate,'examEndDate':endDate,'examAssociateCourse':examAssociateCourse,'examAssociateCourse_Type':examAssociateCourseType,'examPaperTimeTable':JSON.stringify(paperDetailArray),'examPapers[]':examPapers[0],'examBatches[]':attachedBatches},
        success: function (response) {
            console.log(response);
            Swal.close();
            if(response['response'] == 'success'){
                Swal.fire({
                    icon: 'success',
                    title: '<small>Exam Updated successfully</small>',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    // alert();
                    // return false;
                    window.location.href = window.location;
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '<small>An error occured!</small>',
                    showConfirmButton: true,
                }).then(function () {
                    return false;
                })
            }
        }
    });
    return false;
}

// ------------------------------------------------------------------------------------------
// UPDATE DATA FORMAT
// ------------------------------------------------------------------------------------------
    // "examName": "bjjk", 
    // "examID": "985", 
    // "examType": "Quarterly",
    // "examPassword": "1",
    // "examStartDate": "1/11/2021",
    // "examEndDate": "1/14/2021", 
    // "examPaperTimeTable": "[
    //                         {\"paperID\":\"23\",\"paperStartDate\":\"2021-11-14\",\"paperStartTime\":\"02:03\",\"proctor\":[269]},
    //                         {\"paperID\":\"26\",\"paperStartDate\":\"2021-11-14\",\"paperStartTime\":\"02:03\",\"proctor\":[269]}
    //                     ]", 
    // "examAssociateCourse": "13", 
    // "examPapers": [2], 
    // "examStatus": "Upcoming"}
// ------------------------------------------------------------------------------------------
