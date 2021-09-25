var dataDict = new Object();
var paperDetail = new Object();


var paperID = [];
var paper_id = [];
var paper_name = [];
var paper_subject = [];
var paper_year = [];
var paper_total_marks = [];
var paper_total_time = [];
var dateArray = [];
var exampaperCount = [];

var paperDetailArray = [];
var searchArray = [];


// ============================================================================================================================
//                                                      PASSWORD METER JS
// ============================================================================================================================
const myPassMeter = passwordStrengthMeter({
    containerElement: '#pswmeter',
    passwordInput: '#psw-input',
    showMessage: true,
    messageContainer: '#pswmeter-message',
    messagesList: [
        '  ',
        'Easy!',
        'Simple',
        'Better',
        'Strong'
    ],
    height: 6,
    borderRadius: 0,
    pswMinLength: 8,
    colorScore1: '#ff2e4c',
    colorScore2: '#ffc153',
    colorScore3: 'lightblue',
    colorScore4: '#49deb2'
});

// ============================================================================================================================
function passwordStrengthMeter(opts) {

    // Add styles inside body
    const customStyles = document.createElement('style')


    document.body.prepend(customStyles)
    customStyles.innerHTML = `
		${opts.containerElement} {
			height: ${opts.height || 4}px;
			background-color: #eee;
			position: relative;
			overflow: hidden;
			border-radius: ${opts.borderRadius.toString() || 2}px;
		}
    ${opts.containerElement} .password-strength-meter-score {
      height: inherit;
      width: 0%;
      transition: .3s ease-in-out;
      background: ${opts.colorScore1 || '#ff7700'};
    }
    ${opts.containerElement} .password-strength-meter-score.psms-25 {width: 25%; background: ${opts.colorScore1 || '#ff7700'};}
    ${opts.containerElement} .password-strength-meter-score.psms-50 {width: 50%; background: ${opts.colorScore2 || '#ffff00'};}
    ${opts.containerElement} .password-strength-meter-score.psms-75 {width: 75%; background: ${opts.colorScore3 || '#aeff00'};}
    ${opts.containerElement} .password-strength-meter-score.psms-100 {width: 100%; background: ${opts.colorScore4 || '#00ff00'};}`

    // Container Element
    const containerElement = document.getElementById(opts.containerElement.slice(1))
    containerElement.classList.add('password-strength-meter')

    // Score Bar
    let scoreBar = document.createElement('div')
    scoreBar.classList.add('password-strength-meter-score')

    // Append score bar to container element
    containerElement.appendChild(scoreBar)

    // Password input
    const passwordInput = document.getElementById(opts.passwordInput.slice(1))
    let passwordInputValue = ''
    passwordInput.addEventListener('keyup', function () {
        passwordInputValue = this.value
        checkPassword()
    })

    // Chosen Min Length
    let pswMinLength = opts.pswMinLength || 8

    // Score Message
    let scoreMessage = opts.showMessage ? document.getElementById(opts.messageContainer.slice(1)) : null
    let messagesList = opts.messagesList === undefined ? ['No data', 'Too simple', 'Simple', 'That\'s OK', 'Great password!'] : opts.messagesList
    if (scoreMessage) { scoreMessage.textContent = messagesList[0] || 'No data' }

    // Check Password Function
    function checkPassword() {

        let score = getScore()
        updateScore(score)

    }

    // Get Score Function
    function getScore() {

        let score = 0

        let regexLower = new RegExp('(?=.*[a-z])')
        let regexUpper = new RegExp('(?=.*[A-Z])')
        let regexDigits = new RegExp('(?=.*[0-9])')
        // For length score print user selection or default value
        let regexLength = new RegExp('(?=.{' + pswMinLength + ',})')

        if (passwordInputValue.match(regexLower)) { ++score }
        if (passwordInputValue.match(regexUpper)) { ++score }
        if (passwordInputValue.match(regexDigits)) { ++score }
        if (passwordInputValue.match(regexLength)) { ++score }

        if (score === 0 && passwordInputValue.length > 0) { ++score }

        return score

    }

    // Show Score Function
    function updateScore(score) {
        switch (score) {
            case 1:
                scoreBar.className = 'password-strength-meter-score psms-25'
                if (scoreMessage) { scoreMessage.textContent = messagesList[1] || 'Too simple' }
                containerElement.dispatchEvent(new Event('onScore1', { bubbles: true }))
                break
            case 2:
                scoreBar.className = 'password-strength-meter-score psms-50'
                if (scoreMessage) { scoreMessage.textContent = messagesList[2] || 'Simple' }
                containerElement.dispatchEvent(new Event('onScore2', { bubbles: true }))
                break
            case 3:
                scoreBar.className = 'password-strength-meter-score psms-75'
                if (scoreMessage) { scoreMessage.textContent = messagesList[3] || 'That\'s OK' }
                containerElement.dispatchEvent(new Event('onScore3', { bubbles: true }))
                break
            case 4:
                scoreBar.className = 'password-strength-meter-score psms-100'
                if (scoreMessage) { scoreMessage.textContent = messagesList[4] || 'Great password!' }
                containerElement.dispatchEvent(new Event('onScore4', { bubbles: true }))
                break
            default:
                scoreBar.className = 'password-strength-meter-score'
                if (scoreMessage) { scoreMessage.textContent = messagesList[0] || 'No data' }
                containerElement.dispatchEvent(new Event('onScore0', { bubbles: true }))
        }
    }

    // Return anonymous object with properties
    return {
        containerElement,
        getScore
    }

}
// ============================================================================================================================
//                                                  CHECK & CONFIRM PASSWORD
// ============================================================================================================================
function checkPasswordMatch() {
    var password = $("#psw-input").val();
    var confirmPassword = $("#txtConfirmPassword").val();
    if (confirmPassword.length == 0) {
        $("#CheckPasswordMatch").html("");
        $("#CheckPasswordMatch").css("color", '');
        $("#examNxtBtn").attr("disabled", true);
    }
    else if (password != confirmPassword) {
        $("#CheckPasswordMatch").html("Passwords does not match!");
        $("#CheckPasswordMatch").css("color", '#ff2e4c');
        $("#examNxtBtn").attr("disabled", true);
    }
    else {
        $("#CheckPasswordMatch").html("Passwords match.");
        $("#CheckPasswordMatch").css("color", '#49deb2');
        $("#examNxtBtn").attr("disabled", false);
    }

}
$(document).ready(function () {
    $("#txtConfirmPassword").keyup(checkPasswordMatch);
});
// ============================================================================================================================
//                                              VALIDATE PAGE 01 DATA BEFORE SUBMISSION
// ============================================================================================================================
// $('.addP').click(function () {
//     $(this).addClass('selected');
//     $(this).html('<i class="fa fa-check"></i> Selected')
//     $(this).parent().find('.delP').addClass('show');
// });
// $('.delP').click(function () {
//     $(this).removeClass('show');
//     $(this).parent().find('.addP').html('+ Select')
//     $(this).parent().find('.addP').removeClass('selected');
// });

function validateCreateExan() {
    paperID = [];
    var examUniqueName = $("#examUniqueName").val();
    var examUniqueCode = $("#examUniqueCode").val();
    var examType = $("#examType").val();
    $('#exam_Type').text(examType);

    var courseName = $("#coursenameId").val();
    var CourseType = $("#courseTypeId").val();
    var Batches = $("#batchesId").val();

    var password = $("#psw-input").val();
    var confirmPassword = $("#txtConfirmPassword").val();

    // -----------------------   Store Data in dataDict array  -------------------------------
    dataDict['exam_Name'] = examUniqueName.trim();
    dataDict['exam_Unique_Code'] = examUniqueCode.trim();
    dataDict['exam_Type'] = examType.trim();
    dataDict['exam_CourseType'] = CourseType.trim();
    dataDict['exam_Course'] = courseName.trim();
    dataDict['exam_Batches'] = Batches.trim();
    dataDict['exam_Password'] = confirmPassword.trim();

    dataDict['exam_status'] = 'Ongoing';

    console.log('data dict >> ',dataDict);
    // ---------------------------------------------------------------------------------------
    if (examUniqueName.trim().length == 0) {
        Swal.fire('<small>Enter a valid exam name.</small>');
        return false;
    }
    if (examUniqueCode.trim().length == 0) {
        Swal.fire('<small>Enter a valid exam code.</small>');
        return false;
    }
    if (examType.trim().length == 0) {
        Swal.fire('<small>Enter a valid exam type.</small>');
        return false;
    }if (CourseType.trim().length == 0) {
        Swal.fire('<small>Select CourseType</small>');
        return false;
    }
    if (courseName.trim().length == 0) {
        Swal.fire('<small>Select Course</small>');
        return false;
    }if (Batches.trim().length == 0) {
        Swal.fire('<small>Select batch.</small>');
        return false;
    }
    if (password.trim().length == 0) {
        Swal.fire('<small>Enter a valid password.</small>');
        return false;
    }
    if (confirmPassword.trim().length == 0) {
        Swal.fire('<small>Enter a valid confirm Password.</small>');
        return false;
    }
    if (confirmPassword.trim() != password.trim()) {
        Swal.fire("<small>Password doen't matched</small>");
        return false;
    }
    else {
        $('#appendPapers').html('');
        $('#noRowFound').css('display', '');
        $('#noRowFound').html('Loading papers ...');

        $("#examBasicdetail").css('display', 'none');
        $('#examPaperDetail').css('display', '');
        $('#examSchedule').css('display', 'none');

        if ($('#paperTable tr').length == 0) {
            $('#noRowFound').show();
            $('#nextButtonP2').attr('disabled', true);

        } else {
            // ==================================   AJAX CALL FOR PAPER  =================================================
            $.ajax({
                type: 'GET',
                url: "/getSpecificCourseIdPaper",
                data: { 'courseId': courseName },
                success: function (response) {
                    searchArray = response['data']['data'];
                    console.log('searchArray ====>', searchArray.length);
                    console.log('searchArray ====>', searchArray);

                    var dataString = '';
                    var year_cur = '';
                    if (searchArray.length > 0) {
                        for (var i = 0; i < searchArray.length; i++) {
                            var year = searchArray[i]['created_at'].split('-');
                            year_cur = year[0]
                            $('#course_Name').text(searchArray[0]['paperAssociateCourse']['courseName']);
                            var data = '<tr class="dataRows">\
                            <td class="paperId" style="display:none;">'+ searchArray[i]['id'] + '</td>\
                            <td class="paper_ID">'+ searchArray[i]['paperID'] + '</td>\
                            <td class="paper_name">'+ searchArray[i]['paperName'] + '</td>\
                            <td class="paper_subject">'+ searchArray[i]['paperAssociateSubject']['subjectName'] + '</td>\
                            <td class="paper_year">'+ year_cur + '</td>\
                            <td class="paper_total_marks">'+ searchArray[i]['paperTotalMarks'] + '</td>\
                            <td class="paper_total_time">'+ searchArray[i]['totalPaperTime'] + ' hr</td>\
                            <td class="text-center">\
                                <a href="javascript:;" onclick="getPaperID(this)" class="addP"> + Select</a>\
                                <a href="javascript:;" onclick="removePaperID(this)" class="delP"><i class="fas fa-check-circle" style="pointer-events:none;color:green;"></i>&nbsp;&nbsp<i class="fa fa-trash"></i></a>\
                            </td>\
                        </tr>';

                            dataString = dataString + data;
                            year_cur = '';
                        }
                        $('#noRowFound').css('display', 'none');
                        $('#appendPapers').html('');
                        $('#appendPapers').html(dataString);
                        $('#nextButtonP2').prop('disabled', false);

                    } else {
                        $('#appendPapers').html('');
                        $('#noRowFound').css('display', '');
                        $('#noRowFound').html('No record available for selected course!');
                        // Swal.fire('<small>No paper available for selected course!</small>');
                        $('#nextButtonP2').prop('disabled', true);
                        return false;
                    }
                }
            }).then(function () {
                // $('#noRowFound').hide();
                $('#UexamId').html($('#examUniqueCode').val());
                $('#UexamName').html($('#examUniqueName').val());
                $('#totalPapers').html($('#paperTable tr').length - 1);
                // $('#nextButtonP2').attr('disabled', false);
            })
            // ==================================================================================================
        }
    }
}
// ============================================================================================================================
//                                                       Search & Select year for paper
// ============================================================================================================================
function searchPaper() {
    var searchString = $('#selectedCoursePaperAjaxsearch').val();
    var searchYear = $('#paperYear').val();
    var searchPaperArray = searchArray;
    console.log('search data  >>>> ', searchString, '<->', searchYear, '<->', searchPaperArray);
    // ============================================================================================
    if (searchPaperArray.length > 0) {
        var dataString = '';
        for (var i = 0; i < searchPaperArray.length; i++) {
            if (searchPaperArray[i]['paperID'] == searchString | searchPaperArray[i]['paperName'] == searchString | searchPaperArray[i]['subjectName'] == searchString | searchPaperArray[i]['year'] == searchYear) {
                $('#course_Name').text(searchPaperArray[0]['courseName']);
                var data = '<tr class="dataRows">\
            <td class="paperId" style="display:none;">'+ searchPaperArray[i]['id'] + '</td>\
            <td class="paper_ID">'+ searchPaperArray[i]['paperID'] + '</td>\
            <td class="paper_name">'+ searchPaperArray[i]['paperName'] + '</td>\
            <td class="paper_subject">'+ searchPaperArray[i]['subjectName'] + '</td>\
            <td class="paper_year">'+ searchPaperArray[i]['year'] + '</td>\
            <td class="paper_total_marks">'+ searchPaperArray[i]['paperTotalMarks'] + '</td>\
            <td class="paper_total_time">'+ searchPaperArray[i]['totalPaperTime'] + ' hr</td>\
            <td class="text-center">\
                <a href="javascript:;" onclick="getPaperID(this)" class="addP"> + Select</a>\
                <a href="javascript:;" onclick="removePaperID(this)" class="delP"><i class="fas fa-check-circle" style="pointer-events:none;color:green;"></i>&nbsp;&nbsp<i class="fa fa-trash"></i></a>\
            </td>\
        </tr>';

                dataString = dataString + data;
            }
        }
        $('#noRowFound').css('display', 'none');
        $('#appendPapers').html('');
        $('#appendPapers').html(dataString);
        $('#nextButtonP2').prop('disabled', false);

    } else {
        $('#appendPapers').html('');
        $('#noRowFound').css('display', '');
        $('#noRowFound').html('No record available for selected course!');
        // Swal.fire('<small>No paper available for selected course!</small>');
        $('#nextButtonP2').prop('disabled', true);
        return false;
    }
    // =============================================================================================

}

function getSelectedYearPaper() {
    var searchString = $('#selectedCoursePaperAjaxsearch').val();
    var searchYear = $('#paperYear').val();
    var searchPaperArray = searchArray;
    console.log('search data  >>>> ', searchString, '<->', searchYear, '<->', searchPaperArray);
}
// ============================================================================================================================
//                                                       RESET CONFIRM PASSWORD
// ============================================================================================================================
function resetConfirmPass() {
    $('#txtConfirmPassword').val('');
    $("#CheckPasswordMatch").html("");
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if($('#psw-input').val().match(decimal)) 
    { 
    console.log('Correct, try another...')
    $("#examNxtBtn").attr("disabled",false);
    $("#validPassMsg").css("color",'green');
}
else { 
    console.log('Wrong...!')
    $("#examNxtBtn").attr("disabled",true);
    $("#validPassMsg").css("color",'red');
    return false;
    }
}
// ============================================================================================================================
// ============================================================================================================================
//                                              PAGE 02 : get PAPER ID and remove PAPER ID
// ============================================================================================================================
// GET PAPER ID
//--------------------------
function getPaperID(thisTxt) {
    $(thisTxt).addClass('selected');
    // $(thisTxt).html('Heloo')
    $(thisTxt).parent().find('.delP').addClass('show');
    $(thisTxt).css('display','none');
    // -------------------------------------------------------
    paper_id.push($(thisTxt).parent().parent().children('.paper_ID').text());
    paper_name.push($(thisTxt).parent().parent().children('.paper_name').text());
    paper_subject.push($(thisTxt).parent().parent().children('.paper_subject').text());
    paper_year.push($(thisTxt).parent().parent().children('.paper_year').text());
    paper_total_marks.push($(thisTxt).parent().parent().children('.paper_total_marks').text());
    paper_total_time.push($(thisTxt).parent().parent().children('.paper_total_time').text());


    // -------------------------------------------------------
    if (paperID.includes(parseInt($(thisTxt).parent().parent().children('.paperId').text()))) {
        console.log();
    } else {
        paperID.push(parseInt($(thisTxt).parent().parent().children('.paperId').text()));
    }
}

// DELETE PAPRE ID
// -------------------------
function removePaperID(thisTxt) {
    $(thisTxt).removeClass('show');
    $(thisTxt).parent().find('.addP').html('+ Select')
    $(thisTxt).parent().find('.addP').removeClass('selected');
    $(thisTxt).parent().find('.addP').css('display','');
    
    if (paperID.includes(parseInt($(thisTxt).parent().parent().children('.paperId').text()))) {
        const index = paperID.indexOf(parseInt($(thisTxt).parent().parent().children('.paperId').text()));
        if (index > -1) {
            paperID.splice(index, 1);
        }
    }
}

// ============================================================================================================================
//                                        GOTO PAGE : 03
// ============================================================================================================================
function gotoPage3() {

    $('#paperDataTbody').html('');
    if (paperID.length == 0) {
        Swal.fire('<small>Please select atleast one paper to proceed.</small>');
        return false;
    } else {
        $('#noRowFound1').css('display', '');
        $("#examBasicdetail").css('display', 'none');
        $('#examPaperDetail').css('display', 'none');
        $('#examSchedule').css('display', '');

        // $('#examType').text();
        // $('#courseName').text();
        $.ajax({
            type: 'GET',
            url: "/getResource",
            success: function (response) {
                console.log(response['resourceData']);
                var resourceStr = '';
                if (response['resourceData'].length == 0) {
                    Swal.fire('<small>No proctor available to assign!</small>');
                    return false;
                } else {
                    for (var i = 0; i < response['resourceData'].length; i++) {
                        var data = '<option value="' + response['resourceData'][i]['id'] + '">' + response['resourceData'][i]['fullName'] + ' - ' + response['resourceData'][i]['referUser']['username'] + '</option>';
                        resourceStr = resourceStr + data;
                    } response
                    console.log("response['resourceData'] >>>> ", resourceStr);
                }
                // ------------------------------
                

                var dataStr = '';
                console.log('paperID array >>>', paperID);
                $('#totalPapers').html(paperID.length);

                for (var i = 0; i < paperID.length; i++) {
                    var data = '<tr>\
                            <td style="display:none;" id="paperID_'+ (i + 1) + '">' + paperID[i] + '</td >\
                            <td id="ppID_'+ (i + 1) + '">' + paper_id[i] + '</td >\
                            <td id="pName_'+ (i + 1) + '">' + paper_name[i] + ' </td>\
                            <td id="pYear_'+ (i + 1) + '">' + paper_year[i] + '</td>\
                            <td id="pTotalTime_'+ (i + 1) + '">' + paper_total_time[i] + '</td>\
                            <td><input type="date" id="startDate_'+ (i + 1) + '" class="form-control startDate"\
                                    name="dateOfBirth" min="" max="" value="" /></td>\
                            <td><input type="time" id="startTime_'+ (i + 1) + '" placeholder="Select time"\
                                    class="form-control" name=""></td>\
                            <td class="text-center">\
                                <select class="form-control" id="pProctor_'+ (i + 1) + '">\
                                <option value="" style="pointer-events:none;">Select Proctor</option>'+ resourceStr + '\
                                </select>\
                            </td>\
                        </tr>';
                    dataStr = dataStr + data;

                    // $('[type="date"]').prop('min', function(){
                    //     return new Date().toJSON().split('T')[0];
                    // });
                  
                }



                $('#noRowFound1').css('display', 'none');
                $('#paperDataTbody').html('');
                $('#paperDataTbody').append(dataStr);
            }
        });
        // -------------------------------------------------------
        // -------------------------------------------------------

        // $('select').selectpicker('refresh');
        // -------------------------------------------------------
    }
}
// ============================================================================================================================
//                                     SUBMIT and SAVE DATA to DATABASE & Redirect to the EXAM LIST
// ============================================================================================================================
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
$('#submitBtn').on('click', function () {
    paperDetailArray = [];
    for (var i = 0; i < paperID.length; i++) {
        var paperObj = new Object();
        var data = [];
        var dict = {};
        paperObj['PID'] = $('#paperDataTbody tr').children('#paperID_' + (i + 1)).text();
        paperObj['PaperUniqueID'] = $('#paperDataTbody tr').children('#ppID_' + (i + 1)).text();
        paperObj['PName'] = $('#paperDataTbody tr').children('#pName_' + (i + 1)).text();
        paperObj['PYear'] = $('#paperDataTbody tr').children('#pYear_' + (i + 1)).text();
        paperObj['PTotalTime'] = $('#paperDataTbody tr').children('#pTotalTime_' + (i + 1)).text();
        // ------------------------------------------------------------------------------------
        data.push($('#paperDataTbody tr').children('#pName_' + (i + 1)).text());
        data.push($('#paperDataTbody tr').children('#paperID_' + (i + 1)).text());
        data.push($('#paperDataTbody tr').children('#pYear_' + (i + 1)).text());
        data.push($('#paperDataTbody tr').children('#pTotalTime_' + (i + 1)).text());

        dict['paperID'] = $('#paperDataTbody tr').children('#paperID_' + (i + 1)).text();

        // paperDetailArray
        // ------------------------------------------------------------------------------------
        if ($('#paperDataTbody tr').children().children('#startDate_' + (i + 1)).val().trim().length == 0) {
            Swal.fire('<small>Please select Start Date.</small>');
            $('#startDate_' + (i + 1)).css('border', '1px solid red');
            return false;
        }
        if ($('#paperDataTbody tr').children().children('#startTime_' + (i + 1)).val().trim().length == 0) {
            Swal.fire('<small>Please select Start Time.</small>');
            $('#startTime_' + (i + 1)).css('border', '1px solid red');
            return false;
        }
        if ($('#paperDataTbody tr').children().children('#pProctor_' + (i + 1)).val().trim().length == 0) {
            Swal.fire('<small>Please select Proctor.</small>');
            $('#pProctor_' + (i + 1)).css('border', '1px solid red');
            return false;
        }
        else {
            $('#startDate_' + (i + 1)).css('border', '');
            $('#startTime_' + (i + 1)).css('border', '');
            $('#pProctor_' + (i + 1)).css('border', '');
        }
        // ----------------------------------------
        paperObj['PStartDate'] = $('#paperDataTbody tr').children().children('#startDate_' + (i + 1)).val();
        paperObj['PStartTime'] = $('#paperDataTbody tr').children().children('#startTime_' + (i + 1)).val();
        paperObj['PProctor'] = $('#paperDataTbody tr').children().children('#pProctor_' + (i + 1)).val();
        // ----------------------------------------------------------
        data.push($('#paperDataTbody tr').children().children('#startDate_' + (i + 1)).val());
        data.push($('#paperDataTbody tr').children().children('#startTime_' + (i + 1)).val());
        data.push($('#paperDataTbody tr').children().children('#pProctor_' + (i + 1)).val());
        // -----------------------------------------------------------

        dict['paperStartDate'] = $('#paperDataTbody tr').children().children('#startDate_' + (i + 1)).val();
        dict['paperStartTime'] = $('#paperDataTbody tr').children().children('#startTime_' + (i + 1)).val()
        var proctorArray = [];
        proctorArray.push(parseInt($('#paperDataTbody tr').children().children('#pProctor_' + (i + 1)).val()));
        dict['proctor'] = proctorArray;

        paperDetailArray.push(dict);
        console.log('this is paperDetailArray >> ', paperDetailArray);

        paperDetail['paper_object_' + (i + 1)] = paperObj;
        dateArray.push(new Date($('#paperDataTbody tr').children().children('#startDate_' + (i + 1)).val()));
    }
    dataDict['paper_deatails'] = paperDetail;
    // -------------------------------------------------------
    // var b = totzarrange(dateArray)
    var maxDate = new Date(Math.max.apply(null, dateArray));
    var minDate = new Date(Math.min.apply(null, dateArray));

    dataDict['exam_start_date'] = minDate.toLocaleDateString();
    dataDict['exam_end_date'] = maxDate.toLocaleDateString();

    console.log('dataDict >>>> ', dataDict);

    // =======================================================
    // console.log('Exam data dict : ',dataDict);
    console.log('paperDetailArray data dict : ', paperDetailArray);

    exampaperCount.push(paperID.length)
    // console.log('exampaperCount count : ',exampaperCount);

    // =======================================================
    const csrftoken = getCookie('csrftoken');
    Swal.fire({
        position: 'center',
        title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>Creating New Exam</small></b>",
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })

    var examBatches = [];
    examBatches.push(parseInt($('#batchesId').val()));
    var examAssociateCourseType = $('#courseTypeId').val();

    console.log('examBatches ====>>> ',examBatches);
    // return false;

    $.ajax({
        type: 'POST',
        url: "submitExam",
        headers: { 'X-CSRFToken': csrftoken },
        data: { 'examName': dataDict['exam_Name'], 'examID': dataDict['exam_Unique_Code'], 'examType': dataDict['exam_Type'], 'examPassword': dataDict['exam_Password'], 'examStartDate': dataDict['exam_start_date'], 'examEndDate': dataDict['exam_end_date'],'examAssociateCourseType':examAssociateCourseType, 'examAssociateCourse': dataDict['exam_Course'], 'examPaperTimeTable': JSON.stringify(paperDetailArray), 'examPapers[]': exampaperCount[0],'examBatches[]': examBatches },
        success: function (response) {
            console.log('bjbk',response['response']);
            Swal.close();
            if (response['response']['message'] == 'Exam Already Exist') {
                Swal.fire({
                    icon: 'error',
                    title: '<small><strong>' + dataDict['exam_Name'] + '</strong> Exam Already Exist!</small>',
                    showConfirmButton: true,
                })
                return false;
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '<small><strong>' + dataDict['exam_Name'] + '</strong> Exam created successfully.</small>',
                    showConfirmButton: false,
                    timer: 2000
                }).then(function () {
                    window.location.href = window.location;
                })
            }
        }
    });
    // =======================================================
});

// ====================================================================================================
function changeDate(date) {
    let currentDate = new Date(date);
    var fd = currentDate.toDateString();

    var dateArray = fd.split(' ');
    var date = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[3];
    console.log('this is my date :>>', date);
    return date;
}
// {
//     "id": 1,
//     "examName": "Test",
//     "examID": "ASS",
//     "examType": "Annual",
//     "examPassword": "1241",
//     "examStartDate": "10-05-1996",
//     "examEndDate": "15-04-2021",

//     "examPaperTimeTable":"[{'paperID':'paperID1','paperStartDate': '05-10-1996','paperStartTime': '2:00','paperEndTime':'5:00'}]",

//     "created_at": "2021-04-14T21:12:45.293521Z",
//     "examAssociateCourse": 7,
//     "examPapers": [
//         5
//     ],
//     "examStatus":"Upcoming"
// }