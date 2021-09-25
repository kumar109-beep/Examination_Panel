var questionType_dorop = '';
var questionLanguage_dorop = '';
var lang_id = '';
var existingQuestionData = [];

var samereferenceUniqueCode = '';
function questionType(thistxt) {
    questionType_dorop = '';
    $("#questionType :selected").each(function () {
        questionType_dorop = this.text;
        // console.log(this.value);
    });
    if (questionType_dorop.trim() != '') {
        if (questionType_dorop == 'Objective') {
            $('#questionlanguage').prop('disabled', true);
            $("#questionlanguage").selectpicker("refresh");
            $('#objectiveOptions').show();
            $('#questionlanguage').val('Select Language');
            $('#objectiveOptions').css('opacity', '1');
            $('#objectiveOptions').css('pointer-events', '');
            $('#objectiveOptions').val('');
            $('#renderEditor').html('');
            $('#labelForLangugae').html('');
        } else {
            $('#questionlanguage').prop('disabled', false);
            $("#questionlanguage").selectpicker("refresh");
            $('#questionlanguage').val('Select Language');
            $('#objectiveOptions').css('opacity', '1');
            $('#objectiveOptions').css('pointer-events', '');
            $('#objectiveOptions').val('');
            $('#objectiveOptions').hide();
            $('#options').hide();
            $('#renderEditor').html('');
            $('#labelForLangugae').html('');
        }
    } else {
        $('#questionlanguage').prop('disabled', true);
        $("#questionlanguage").selectpicker("refresh");
        $('#objectiveOptions').css('opacity', '1');
        $('#objectiveOptions').css('pointer-events', '');
        $('#objectiveOptions').val('');
        $('#questionlanguage').val('Select Language');
        $('#renderEditor').html('');
        $('#labelForLangugae').html('');
    }
}





function questionlanguageDropDown(thistxt) {
    questionLanguage_dorop = '';
    var optionCount = $('#optionCount').val();
    var questionType = questionType_dorop;
    $("#questionlanguage :selected").each(function () {
        if (questionLanguage_dorop == '') {
            questionLanguage_dorop = this.text;
        } else {
            questionLanguage_dorop = questionLanguage_dorop + '||' + this.text;
        }
    });

    lang_id = '';
    $("#questionlanguage :selected").each(function () {
        if (lang_id == '') {
            lang_id = this.value;
        } else {
            lang_id = lang_id + '||' + this.value;
        }
    });

    var lang = questionLanguage_dorop.split('||')
    console.log(lang);
    var html = '<ul class="donate-now">';
    var endHtml = '</ul>';
    var innerHtml = '';
    var renderTextEditor = '';
    var idDiv = '';
    var optionListHtml = '';
    var nameID = 1;
    var count = 1;
    // ========================================================================================
    console.log('lang.length', lang.length);
    // return false;

    // ========================================================================================
    for (var i = 0; i < lang.length; i++) {
        // ===============================================================================================
        var optionString = '';
        for (var j = 0; j < parseInt(optionCount); j++) {
            if (optionString == '') {
                optionString = '<div class="row objectivePart">\
        <div class="col-lg-2  mt-1  form-group opt_radio" >\
        <label><input class="topicOption" type="radio" name="trueoption_'+ count + '" value="" checked="checked" > Option ' + (j + 1) + '</label>\
        </div>\
        <div class="col-lg-10 mt-1   form-group">\
        <input  type="text" class="form-control topicData"  placeholder="Type Options" value="" />\
        </div> \
        </div >';
            } else {
                optionString = optionString + '<div class="row objectivePart">\
        <div class="col-lg-2  mt-1  form-group opt_radio">\
        <label><input class="topicOption" type="radio" name="trueoption_'+ count + '" value="" checked="checked" > Option ' + (j + 1) + '</label>\
        </div>\
        <div class="col-lg-10 mt-1   form-group">\
        <input  type="text" class="form-control topicData"  placeholder="Type Options" value="" />\
        </div> \
        </div >';
            }
        }
        count = count + 1;
        if (innerHtml == '') {
            innerHtml = '<li><input type="radio" style="text-align: center;" onclick="onClickGetLang(this)" id="' + lang[i] + '" name="language" checked="checked"/><label for="' + lang[i] + '">' + lang[i] + '</label></li>';
        }
        else {
            innerHtml = innerHtml + '<li><input type="radio" style="text-align: center;" onclick="onClickGetLang(this)" id="' + lang[i] + '" name="language" /><label for="' + lang[i] + '">' + lang[i] + '</label></li>';
        }
        if (renderTextEditor == '') {
            idDiv = 'div_' + lang[i];
            renderTextEditor = '<div id="div_' + lang[i] + '"><label> Type Question in <b>' + lang[i] + '</b> here..</label>\
    <textarea class="form-control" id="txtEditor_'+ lang[i] + '" style="height: 200px" placeholder="Type Question in ' + lang[i] + ' here.."></textarea>\
             <script>$("#txtEditor_'+ lang[i] + '").Editor();</script>' + optionString + '</div>\
             ';
        }
        else {
            idDiv = idDiv + '||' + 'div_' + lang[i];
            renderTextEditor = renderTextEditor + '<div id="div_' + lang[i] + '"  style="display:none;"><label> Type Question in <b>' + lang[i] + '</b> here..</label>\
    <textarea class="form-control" id="txtEditor_'+ lang[i] + '" style="height: 200px" placeholder="Type Question in ' + lang[i] + ' here.."></textarea>\
             <script>$("#txtEditor_'+ lang[i] + '").Editor();</script>' + optionString + '</div>\
             ';
        }

    }


    var addHtml = html + innerHtml + endHtml;
    localStorage.setItem('idDiv', idDiv)
    $('#labelForLangugae').html(addHtml);
    $('#renderEditor').html();

    $('#renderEditor').html(renderTextEditor)
    if (questionType == 'Subjective') {
        $('.objectivePart').css('display', 'none');
    } else {
        $('.objectivePart').css('display', '');
    }

    $('#options').show();
    $('#options').html('');
    $('#objectiveOptions').css('opacity', '0.3');
    $('#objectiveOptions').css('pointer-events', 'none');
}






function saveQuestionButton() {
    var languageList = questionLanguage_dorop.split('||');
    var DictFormOptionData = {}
    var optionList = [];
    var optionListFlag = '';
    var optionStatement = '';
    var textOptionCount = 0;
    var languageArray = '';
    var course = $('#courseName').val();
    var subject = $('#subjectID').val();
    var topic = $('#topicID').val();
    var refrenceUniuecode = $('input[name="refrenceUniuecode"]').val();
    var questionType = $('#questionType').val();
    var questionSubType = $('#questionSubType').val();
    var questionDifficultyLevel = $('#questionDifficulty').val();
    var questionCorrectMark = $('#questionCorrectMark').val();

    if (languageList.length == 0) {
        Swal.fire("<small>Select question language</small>")
        return false;
    } else if (questionType.trim().length == 0) {
        Swal.fire("<small>Select question type</small>")
        return false;
    } else if (questionSubType.trim().length == 0) {
        Swal.fire("<small>Select question sub-type</small>")
        return false;
    } else if (questionDifficultyLevel.trim().length == 0) {
        Swal.fire("<small>Select question difficulty level</small>")
        return false;
    } else if (questionCorrectMark.trim().length == 0) {
        Swal.fire("<small>Enter question correct marks</small>")
        return false;
    }

    // var questionData = $('.Editor-editor').html();
    // =======================================================================================
    var questionDivID = localStorage.getItem('idDiv');
    // var res = questionDivID.replaceAll("div_", "txtEditor_");
    var questionDivIdList = questionDivID.split('||');
    var questionContainer = '';
    for (var i = 0; i < questionDivIdList.length; i++) {
        // "||(~Q~)||"
        if (questionContainer == '') {
            questionContainer = $("#" + questionDivIdList[i] + " > div > div.Editor-editor").html();
        } else {
            questionContainer = questionContainer + "||(~Q~)||" + $("#" + questionDivIdList[i] + " > div > div.Editor-editor").html();
        }

    }


    console.log('questionType_dorop >>', questionType_dorop);
    // return false;
    // ---------------------------------------------------------------------------------------
    if (questionType_dorop == 'Objective') {
        var optionCount = $('#optionCount').val();
        if (optionCount.trim().length == 0) {
            swal("<small>Select no. of options</small>", '')
            return false;
        }
        else {
            var questionDivID = localStorage.getItem('idDiv');
            var questionDivIdList = questionDivID.split('||');
            var optionText = [];

            $("input[class *= 'topicData']").each(function () {
                optionText.push($(this).val().trim());
            });

            for (var j = 0; j < languageList.length; j++) {
                if ($("#" + questionDivIdList[j] + " > div > div.Editor-editor").html().length == 0) {
                    Swal.fire({
                        title: "<h4>Question can't be blank.</h4>",
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    });
                    return false;
                }
                DictFormOptionData['Question_' + languageList[j].trim()] = $("#" + questionDivIdList[j] + " > div > div.Editor-editor").html();
                var radios = document.getElementsByName('trueoption_' + (j + 1));
                for (var i = 0, length = radios.length; i < length; i++) {
                    if (optionListFlag == '') {
                        console.log('this is option text 01 : ', optionText[textOptionCount]);
                        if (optionText[textOptionCount].length == 0) {
                            Swal.fire({
                                title: "<h4>Options can't be blank.</h4>",
                                icon: 'info',
                                html: '',
                                showCloseButton: false,
                                showCancelButton: false,
                                focusConfirm: false,
                                confirmButtonText:
                                    'OK',
                                cancelButtonAriaLabel: 'Thumbs down'
                            });
                            return false;
                        }
                        if (radios[i].checked) {
                            optionListFlag = 'True';
                            optionStatement = optionText[textOptionCount];
                        } else {
                            optionListFlag = 'False';
                            optionStatement = optionText[textOptionCount];
                        }
                    } else {
                        if (radios[i].checked) {
                            console.log('this is option text 02 : ', optionText[textOptionCount]);

                            optionListFlag = optionListFlag + '|' + 'True';
                            optionStatement = optionStatement + '<<-|->>' + optionText[textOptionCount];
                        } else {
                            optionListFlag = optionListFlag + '|' + 'False';
                            optionStatement = optionStatement + '<<-|->>' + optionText[textOptionCount];
                        }
                    }

                    textOptionCount = textOptionCount + 1;

                }

                DictFormOptionData['option'] = optionListFlag;
                DictFormOptionData['optionStatement'] = optionStatement;
                optionList.push(DictFormOptionData)
                console.log('DictFormOptionData data : ', DictFormOptionData);
                console.log('optionList data : ', optionList);

                optionListFlag = []

                DictFormOptionData = {}
                quetionDtata = {}

            }
            // return false;

            console.log(optionList);
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Creating Question</b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
            // -------------------------   AJAX call  -----------------------------
            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "add_questions",
                headers: { 'X-CSRFToken': csrftoken },
                data: {
                    course: course, subject: subject, topic: topic,
                    questionLanguage: languageList.toString(), questionType: questionType,
                    questionSubType: questionSubType, questionDifficultyLevel: questionDifficultyLevel,
                    questionCorrectMark: questionCorrectMark, optionCount: optionCount, optionList: JSON.stringify(optionList),
                    refrenceUniuecode: refrenceUniuecode, 'addType': 'objective', questionType_dorop: questionType_dorop,
                    lang_id: lang_id
                },
                success: function (response) {
                    Swal.close()

                    console.log('question bank API Subjective RESPONSE :---->> ', response['data']);
                    existingQuestionData = [];
                    if (response['data'] != 'success') {
                        if (response['data'] != 'success') {
                            existingQuestionData.push(response['data']);
                        }
                    }
                    console.log('existingQuestionData array : ', existingQuestionData);
                    console.log('language array length : ', languageList);
                    if (response['data'] === 'success') {
                        Swal.fire({
                            title: '<h4>Your <b>objective</b> type question has been created successfully.</h4>',
                            icon: 'success',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                            cancelButtonAriaLabel: 'Thumbs down'
                        }).then(function () {
                            location.reload();
                        })
                    }
                    else if (response['data']['data'].length == 1 && languageList.length == 1) {
                        Swal.fire({
                            title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                            icon: 'info',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })

                    }
                    else if (response['data']['data'].length == 1 && languageList.length > 1) {
                        var id = response['data']['data']
                        samereferenceUniqueCode = response["data"]["data"][0]['sameQuestionrefrence'];
                        Swal.fire({
                            title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                            icon: 'info',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                                '<i class="far fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;<a questionID="' + response['data']['data'] + '" dataList="' + response['data']['data'] + '" onclick="questionPostMethod(this)">Continue</a>',
                            confirmButtonAriaLabel: 'Thumbs up, great!',
                            cancelButtonText:
                                '<i class="far fa-window-close"></i>Cancel',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })
                    }
                    else if (response['data']['data'].length > 1 && languageList.length > 1) {
                        var id = response['data']['data']
                        Swal.fire({
                            title: '<h4>These Questions Already Exist</h4>',
                            icon: 'info',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                        })
                    }
                    else if (response['data'] === 'fail') {
                        alert('This question already exist.\nTry with different data!');
                        Swal.fire({
                            title: '<h4>An error occured!.</h4>',
                            icon: 'error',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                '<i class="fas fa-redo"></i>&nbsp;&nbsp;&nbsp;Retry',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })
                        return false;
                    }
                }
            });
            // --------------------------------------------------------------------
        }
    } else {
        var questioArray = [];
        for (var j = 0; j < languageList.length; j++) {
            if ($("#" + questionDivIdList[j] + " > div > div.Editor-editor").html().length == 0) {
                Swal.fire({
                    title: "<h4>Question can't be blank.</h4>",
                    icon: 'info',
                    html: '',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        'OK',
                    cancelButtonAriaLabel: 'Thumbs down'
                });
                return false;
            }
            DictFormOptionData['Question_' + languageList[j].trim()] = $("#" + questionDivIdList[j] + " > div > div.Editor-editor").html();
            questioArray.push($("#" + questionDivIdList[j] + " > div > div.Editor-editor").html());
            optionList.push(DictFormOptionData)
            optionListFlag = []
            DictFormOptionData = {}
            quetionDtata = {}
        }
        // =================================   check for duplicate question text   ======================================
        // empty object
        let map = {};
        let result = false;
        for (let i = 0; i < questioArray.length; i++) {
            // check if object contains entry with this element as key
            if (map[questioArray[i]]) {
                result = true;
                // terminate the loop
                break;
            }
            // add entry in object with the element as key
            map[questioArray[i]] = true;
        }
        if (result) {
            Swal.fire({
                title: "<h4>Question text can't be same for different languages.</h4>",
                icon: 'error',
                html: '',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText:
                    'OK',
                cancelButtonAriaLabel: 'Thumbs down'
            });
            return false;
        }
        // ==============================================================================================================
        // -------------------------   AJAX call  -----------------------------
        const csrftoken = getCookie('csrftoken');
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Creating Question</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        $.ajax({
            type: 'POST',
            url: "add_questions",
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                course: course, subject: subject, topic: topic,
                questionLanguage: languageList.toString(), questionType: questionType,
                questionSubType: questionSubType, questionDifficultyLevel: questionDifficultyLevel,
                questionCorrectMark: questionCorrectMark, optionCount: optionCount, optionList: JSON.stringify(optionList),
                refrenceUniuecode: refrenceUniuecode, 'addType': 'primary', questionType_dorop: 'Subjective',
                lang_id: lang_id
            },
            success: function (response) {
                console.log('question bank API Subjective RESPONSE :---->> ', response['data']);
                existingQuestionData = [];
                if (response['data'] != 'success') {
                    existingQuestionData.push(response['data']);
                }
                console.log('existingQuestionData array : ', existingQuestionData);
                console.log('language array length : ', languageList);

                Swal.close()

                if (response['data'] === 'success') {
                    Swal.fire({
                        title: '<h4>Your <b>subjective</b> type question has been created successfully.</h4>',
                        icon: 'success',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    }).then(function () {
                        location.reload()
                    })
                }
                else if (response['data']['message'] == "Question Already Exist" && languageList.length == 1) {
                    Swal.fire({
                        //{'data': [{'id': 228, 'language': 'Hindi', 'sameQuestionrefrence': '2021-06-07|13:37:58.836593'}], 'status': False, 'message': 'Question Already Exist'}
                        title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        // cancelButtonAriaLabel: 'Thumbs down'
                    })

                }
                else if (response['data']['data'].length == 1 && languageList.length > 1) {
                    var id = response['data']['data']
                    samereferenceUniqueCode = response["data"]["data"][0]['sameQuestionrefrence'];
                    Swal.fire({
                        title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="far fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;<a questionID="' + response['data']['data'] + '" dataList="' + response['data']['data'] + '" onclick="questionPostMethod(this)">Continue</a>',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="far fa-window-close"></i>Cancel',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                }
                else if (response['data']['data'].length > 1 && languageList.length > 1) {
                    var id = response['data']['data']
                    Swal.fire({
                        title: '<h4>These Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',

                    })
                }
                else if (response['data'] === 'fail') {
                    alert('This question already exist.\nTry with different data!');
                    Swal.fire({
                        title: '<h4>An error occured!.</h4>',
                        icon: 'error',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fas fa-redo"></i>&nbsp;&nbsp;&nbsp;Retry',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                    return false;
                }
            }
        });
        // --------------------------------------------------------------------
    }
}


















// }


function onClickGetLang(thistxt) {
    var textLang = $(thistxt).attr('id');
    var ids = localStorage.getItem('idDiv');
    var IdsList = ids.split("||");
    for (var i = 0; i < IdsList.length; i++) {
        if ("div_" + textLang.trim() == IdsList[i].trim()) {
            $('#' + IdsList[i].trim()).show();
        } else {
            $('#' + IdsList[i].trim()).hide();
        }
    }
}







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
// ==========================================    SEARCH FOR SUBJECTS ACCORDING TO SELECTED COURSE    =============================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseName = document.getElementById("courseName");
    var subjectID = document.getElementById("subjectID");

    courseName.onchange = function () {
        $('#questionlanguage').prop('disabled', true);
        $("#questionlanguage").selectpicker("refresh");
        subjectID.length = 1;
        var courseName = document.getElementById("courseName");
        var selectedCourseId = courseName.value;

        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                if (response['subjectList'] === 'error') {
                    var data = '<option value="" class="text-center">No Subject Associated with this Course !</option>';
                    $('#topicID').html('');
                    $('#topicID').append('<option value="" style="pointer-events: none;">Select Topic</option>');
                    $("#topicID").selectpicker("refresh");
                    $('#baseSelectOption').show();
                    $('#subjectID').html('');
                    $('#subjectID').append(data);
                    $("#subjectID").selectpicker("refresh");

                    $('#questionDetailDiv').css('opacity', 0.3);
                    $('#questionButtons').css('opacity', 0.3);
                    $('#questionDetailDiv').css('pointer-events', 'none');
                    $('#questionButtons').css('pointer-events', 'none');


                } else {
                    var courseStr = ''
                    var baseData = '<option value="" style="pointer-events: none;">Select Subject</option>';
                    if (response['subjectList']['data']['subjectNameFK'].length > 0) {
                        for (var i = 0; i < response['subjectList']['data']['subjectNameFK'].length; i++) {
                            var data = '<option value="' + response['subjectList']['data']['subjectNameFK'][i]['id'] + '">' + response['subjectList']['data']['subjectNameFK'][i]['subjectName'] + '</option>';
                            if (courseStr == '') {
                                courseStr = data;
                            } else {
                                courseStr = courseStr + data;
                            }
                            data = '';
                        }
                        $('#topicID').html('');
                        $('#topicID').append('<option value="" style="pointer-events: none;">Select Topic</option>');
                        $("#topicID").selectpicker("refresh");


                        $('#baseSelectOption').hide();
                        var subjectName = baseData + courseStr + data;
                        $('#subjectID').html('');
                        $('#subjectID').append(subjectName);
                        $("#subjectID").selectpicker("refresh");

                        $('#questionDetailDiv').css('opacity', 0.3);
                        $('#questionButtons').css('opacity', 0.3);
                        $('#questionDetailDiv').css('pointer-events', 'none');
                        $('#questionButtons').css('pointer-events', 'none');
                        $('#renderEditor').html('');
                        $('#labelForLangugae').html('');
                    } else {
                        var data = '<option value="">No Subject Associated with this Course !</option>';
                        $('#topicID').html('');
                        $('#topicID').append('<option value="" style="pointer-events: none;">Select Topic</option>');
                        $("#topicID").selectpicker("refresh");
                        $('#renderEditor').html('');
                        $('#labelForLangugae').html('');

                        $('#baseSelectOption').show();
                        $('#subjectID').html('');
                        $('#subjectID').append(data);
                        $("#subjectID").selectpicker("refresh");

                        $('#questionDetailDiv').css('opacity', 0.3);
                        $('#questionButtons').css('opacity', 0.3);
                        $('#questionDetailDiv').css('pointer-events', 'none');
                        $('#questionButtons').css('pointer-events', 'none');
                    }
                }
            }

        });
    }
});
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ============================================    SEARCH FOR TOPICS ACCORDING TO SELECTED SUBJECT   =============================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
function available_TOPIC() {
    var course_ID = parseInt($('#courseName').val());
    var subject_ID = parseInt($('#subjectID').val());
    $.ajax({
        type: 'GET',
        url: "searchTopic",
        data: { courseID: course_ID, subjectID: subject_ID },
        success: function (response) {
            console.log(response['topicList'], typeof (response['topicList'][0]));
            var topicList = '';
            if (response['topicList'][0] === '<b>- No topic available for selected course and subject!</b>') {
                topicList = '<option value="No topic available for selected course and subject!">No topic available for selected course and subject!</option>';
                $('#topicID').html('');
                $('#topicID').append(topicList);
                $("#topicID").selectpicker("refresh");

                $('#questionDetailDiv').css('opacity', 0.3);
                $('#questionButtons').css('opacity', 0.3);
                $('#questionDetailDiv').css('pointer-events', 'none');
                $('#questionButtons').css('pointer-events', 'none');

            } else {
                for (var i = 0; i < response['topicList'].length; i++) {
                    var data = '<option unchecked value="' + response['topicList'][i] + '">' + response['topicList'][i] + '</option>';
                    topicList = topicList + data;
                }
                $('#topicID').html('');
                $('#topicID').append(topicList);
                $("#topicID").selectpicker("refresh");

                $('#questionDetailDiv').css('opacity', 1);
                $('#questionButtons').css('opacity', 1);
                $('#questionDetailDiv').css('pointer-events', '');
                $('#questionButtons').css('pointer-events', '');
            }
        }
    });

}
// -----------------------------------------------------------------------------------------------------------------------------------------------
// =======================================================    DISCARD BUTTON   ===================================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
function discardButton() {
    alert();
    location.reload();
}
// ===============================================================================================================================================
// ===============================================================================================================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ==================================================  SAVE BUTTON : CREATE QUESTION  =============================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===============================================================================================================================================
// ===============================================================================================================================================

// =====================================================================================================================================
// =====================================================================================================================================
// =====================================================================================================================================
function questionPostMethod(thisTxt) {
    console.log('hello world!', $(thisTxt).attr('dataList'));
    var questionLanguageStr = [];
    var DictFormOptionData = {}
    var optionList = [];
    var optionListFlag = '';
    var optionStatement = '';
    var textOptionCount = 0;
    var languageArray = '';
    var course = $('#courseName').val();
    var subject = $('#subjectID').val();
    var topic = $('#topicID').val();
    // var refrenceUniuecode = $('input[name="refrenceUniuecode"]').val();samereferenceUniqueCode
    var refrenceUniuecode = samereferenceUniqueCode;
    console.log('refrenceUniuecoderefrenceUniuecode==>', refrenceUniuecode)

    var questionLanguage = $('#questionlanguage').val();
    for (var i = 0; i < questionLanguage.length; i++) {
        if (languageArray == '') {
            languageArray = questionLanguage[i].trim()
        } else {
            languageArray = languageArray + "||(~Q~)||" + questionLanguage[i].trim()
        }

    }
    var questionType = $('#questionType').val();
    var questionSubType = $('#questionSubType').val();
    var questionDifficultyLevel = $('#questionDifficulty').val();
    var questionCorrectMark = $('#questionCorrectMark').val();

    if (questionLanguage.length == 0) {
        swal("<small>Select question language</small>", '')
        return false;
    } else if (questionType.trim().length == 0) {
        swal("<small>Select question type</small>", '')
        return false;
    } else if (questionSubType.trim().length == 0) {
        swal("<small>Select question sub-type</small>", '')
        return false;
    } else if (questionDifficultyLevel.trim().length == 0) {
        swal("<small>Select question difficulty level</small>", '')
        return false;
    } else if (questionCorrectMark.trim().length == 0) {
        swal("<small>Enter question correct marks</small>", '')
        return false;
    }
    // var questionData = $('.Editor-editor').html();
    // =======================================================================================
    var questionDivID = localStorage.getItem('idDiv');
    // var res = questionDivID.replaceAll("div_", "txtEditor_");
    var questionDivIdList = questionDivID.split('||');
    var questionContainer = '';
    for (var i = 0; i < questionDivIdList.length; i++) {
        // "||(~Q~)||"
        if (questionContainer == '') {
            questionContainer = $("#" + questionDivIdList[i] + " > div > div.Editor-editor").html();
        } else {
            questionContainer = questionContainer + "||(~Q~)||" + $("#" + questionDivIdList[i] + " > div > div.Editor-editor").html();
        }

    }
    // ---------------------------------------------------------------------------------------
    console.log('existingQuestionData >> ', existingQuestionData);
    // ---------------------------------------------------------------------------------------

    if (questionType == 'Objective') {
        // alert('Objective');

        // FOR Option
        var optionCount = $('#optionCount').val();
        if (optionCount.trim().length == 0) {
            swal("<small>Select no. of options</small>", '')
            return false;
        }
        else {
            var questionDivID = localStorage.getItem('idDiv');
            var questionDivIdList = questionDivID.split('||');
            var optionText = [];

            $("input[class *= 'topicData']").each(function () {
                optionText.push($(this).val().trim());
            });
            var language_id = '';

            for (var j = 0; j < questionLanguage.length; j++) {

                console.log('questionLanguage >> ', questionLanguage);
                // console.log('existingQuestionData >> ',existingQuestionData[0]['data'][j]['language_id']);
                // return false;
                for (var k = 0; k < existingQuestionData[0]['data'].length; k++) {
                    if ((existingQuestionData[0]['data'][k]['language_id']).toString() == questionLanguage[j]) {
                        console.log(questionLanguage[j]);
                        const index = questionLanguage.indexOf((existingQuestionData[0]['data'][k]['language_id']).toString());
                        if (index > -1) {
                            questionLanguage.splice(index, 1);
                        }

                        // questionLanguage = [2, 9]
                    }
                    console.log('lang_id1 >> ', language_id);
                    console.log('questionLanguage[j]1 >> ', questionLanguage[j])
                    if (language_id == '') {
                        language_id = questionLanguage[j];
                    } else {
                        language_id = language_id + '||' + questionLanguage[j];
                    }
                    console.log('questionLanguage2 >> ', questionLanguage);
                    console.log('language_id2 >> ', language_id);

                    // return false;
                    if (questionLanguage[j] == 2) {
                        var languageStr = 'English';
                        var div_id = 'div_English';
                        questionLanguageStr.push(languageStr);
                    } else if (questionLanguage[j] == 1) {
                        var languageStr = 'Hindi';
                        var div_id = 'div_Hindi';
                        questionLanguageStr.push(languageStr);
                    }

                    console.log('languageStr >> ', languageStr);

                    DictFormOptionData['Question_' + languageStr.trim()] = $("#div_" + languageStr.trim() + " > div > div.Editor-editor").html();
                    var radios = document.getElementsByName('trueoption_' + (j + 1));
                    for (var i = 0, length = radios.length; i < length; i++) {
                        if (optionListFlag == '') {
                            if (radios[i].checked) {
                                optionListFlag = 'True';
                                optionStatement = optionText[textOptionCount];
                            } else {
                                optionListFlag = 'False';
                                optionStatement = optionText[textOptionCount];
                            }
                        } else {
                            if (radios[i].checked) {
                                optionListFlag = optionListFlag + '|' + 'True';
                                optionStatement = optionStatement + '<<-|->>' + optionText[textOptionCount];
                            } else {
                                optionListFlag = optionListFlag + '|' + 'False';
                                optionStatement = optionStatement + '<<-|->>' + optionText[textOptionCount];
                            }
                        }

                        textOptionCount = textOptionCount + 1;

                    }

                    DictFormOptionData['option'] = optionListFlag;
                    DictFormOptionData['optionStatement'] = optionStatement;
                    optionList.push(DictFormOptionData)
                    optionListFlag = []

                    DictFormOptionData = {}
                    quetionDtata = {}

                }
            }

        }

        console.log(optionList);
        // -------------------------   AJAX call  -----------------------------
        console.log('language_id >> ', language_id);

        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: "add_questions",
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                course: course, subject: subject, topic: topic,
                questionLanguage: questionLanguageStr.toString(), questionType: questionType,
                questionSubType: questionSubType, questionDifficultyLevel: questionDifficultyLevel,
                questionCorrectMark: questionCorrectMark, optionCount: optionCount, optionList: JSON.stringify(optionList),
                refrenceUniuecode: refrenceUniuecode, 'data': $(thisTxt).attr('dataList'), 'addType': 'multiple', 'data': $(thisTxt).attr('questionID'), questionType_dorop: 'Objective', lang_id: language_id,
            },
            success: function (response) {
                console.log('question bank API Objective RESPONSE :---->> ', response['data']);
                if (response['data'] === 'success') {
                    Swal.fire({
                        title: '<h4>Your <b>subjective</b> type question has been created successfully.</h4>',
                        icon: 'success',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    });
                    location.reload()
                } else if (response['data'] === 'fail') {
                    alert('This question already exist.\nTry with different data!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------------------

    } else {
        // alert('Subjective');
        var language_id = '';
        for (var j = 0; j < questionLanguage.length; j++) {
            console.log('questionLanguage >> ', questionLanguage);
            for (var k = 0; k < existingQuestionData[0]['data'].length; k++) {
                if ((existingQuestionData[0]['data'][k]['language_id']).toString() == questionLanguage[j]) {
                    console.log(questionLanguage[j]);
                    const index = questionLanguage.indexOf((existingQuestionData[0]['data'][k]['language_id']).toString());
                    if (index > -1) {
                        questionLanguage.splice(index, 1);
                    }

                }
                console.log('lang_id1 >> ', language_id);
                console.log('questionLanguage[j]1 >> ', questionLanguage[j])
                if (language_id == '') {
                    language_id = questionLanguage[j];
                } else {
                    language_id = language_id + '||' + questionLanguage[j];
                }
                console.log('questionLanguage2 >> ', questionLanguage);
                console.log('language_id2 >> ', language_id);

                // return false;
                if (questionLanguage[j] == 2) {
                    var languageStr = 'English';
                    var div_id = 'div_Hindi';
                    questionLanguageStr.push(languageStr);
                } else if (questionLanguage[j] == 1) {
                    var languageStr = 'Hindi';
                    var div_id = 'div_Hindi';
                    questionLanguageStr.push(languageStr);
                }

                console.log('languageStr >> ', languageStr);
                console.log('questionDivIdList >> ', questionDivIdList);



                DictFormOptionData['Question_' + languageStr.trim()] = $("#div_" + languageStr.trim() + " > div > div.Editor-editor").html();
                optionList.push(DictFormOptionData)
                optionListFlag = []
                DictFormOptionData = {}
                quetionDtata = {}

            }

        }
        // -------------------------   AJAX call  -----------------------------
        console.log('language_id >> ', language_id);

        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: "add_questions",
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                course: course, subject: subject, topic: topic,
                questionLanguage: questionLanguageStr.toString(), questionType: questionType,
                questionSubType: questionSubType, questionDifficultyLevel: questionDifficultyLevel,
                questionCorrectMark: questionCorrectMark, optionCount: optionCount, optionList: JSON.stringify(optionList),
                refrenceUniuecode: refrenceUniuecode, 'data': $(thisTxt).attr('dataList'), 'addType': 'primary', 'data': $(thisTxt).attr('questionID'), questionType_dorop: 'Subjective', lang_id: language_id,
            },
            success: function (response) {
                // alert(response['data']);
                console.log('question bank API Subjective RESPONSE :---->> ', response);

                if (response['data'] === 'success') {
                    Swal.fire({
                        title: '<h4>Your <b>subjective</b> type question has been created successfully.</h4>',
                        icon: 'success',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    });
                    location.reload()
                }
                else if (response['data']['message'] === "Question Already Exist") {
                    var id = response['data']['data']
                    Swal.fire({
                        title: '<h4>Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="far fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;<a href="" onclick="return questionPostMethod()">Continue</a>',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="far fa-window-close"></i>Cancel',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                    return false;
                }
                else if (response['data'] === 'fail') {
                    alert('This question already exist.\nTry with different data!');
                    return false;
                }
            }
        });
        // --------------------------------------------------------------------
    }
}
// =====================================================================================================================================
// =====================================================================================================================================
// =====================================================================================================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
// =======================================================    SAVE &  NEXT BUTTON   ==============================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
function saveAndNextQuestionButton() {
    var languageList = questionLanguage_dorop.split('||');
    var DictFormOptionData = {}
    var optionList = [];
    var optionListFlag = '';
    var optionStatement = '';
    var textOptionCount = 0;
    var languageArray = '';
    var course = $('#courseName').val();
    var subject = $('#subjectID').val();
    var topic = $('#topicID').val();
    var refrenceUniuecode = $('input[name="refrenceUniuecode"]').val();
    var questionType = $('#questionType').val();
    var questionSubType = $('#questionSubType').val();
    var questionDifficultyLevel = $('#questionDifficulty').val();
    var questionCorrectMark = $('#questionCorrectMark').val();

    if (languageList.length == 0) {
        Swal.fire("<small>Select question language</small>")
        return false;
    } else if (questionType.trim().length == 0) {
        Swal.fire("<small>Select question type</small>")
        return false;
    } else if (questionSubType.trim().length == 0) {
        Swal.fire("<small>Select question sub-type</small>")
        return false;
    } else if (questionDifficultyLevel.trim().length == 0) {
        Swal.fire("<small>Select question difficulty level</small>")
        return false;
    } else if (questionCorrectMark.trim().length == 0) {
        Swal.fire("<small>Enter question correct marks</small>")
        return false;
    }

    // var questionData = $('.Editor-editor').html();
    // =======================================================================================
    var questionDivID = localStorage.getItem('idDiv');
    // var res = questionDivID.replaceAll("div_", "txtEditor_");
    var questionDivIdList = questionDivID.split('||');
    var questionContainer = '';
    for (var i = 0; i < questionDivIdList.length; i++) {
        // "||(~Q~)||"
        if (questionContainer == '') {
            questionContainer = $("#" + questionDivIdList[i] + " > div > div.Editor-editor").html();
        } else {
            questionContainer = questionContainer + "||(~Q~)||" + $("#" + questionDivIdList[i] + " > div > div.Editor-editor").html();
        }

    }


    console.log('questionType_dorop >>', questionType_dorop);
    // return false;
    // var uniqueCode = str(dateTime).replace(" ", "|")2021-06-07|15:55:18.237003"
    var mydate = new Date();
    var month = mydate.getMonth();
    var year = mydate.getFullYear();
    var day = mydate.getDay();
    var time = mydate.getTime();



    var datestr = year + '-' + month + '-' + day + '|' + time;
    console.log('dateStr >> ', datestr);
    // return false;

    // ---------------------------------------------------------------------------------------
    if (questionType_dorop == 'Objective') {
        var optionCount = $('#optionCount').val();
        if (optionCount.trim().length == 0) {
            swal("<small>Select no. of options</small>", '')
            return false;
        }
        else {
            var questionDivID = localStorage.getItem('idDiv');
            var questionDivIdList = questionDivID.split('||');
            var optionText = [];

            $("input[class *= 'topicData']").each(function () {
                optionText.push($(this).val().trim());
            });

            for (var j = 0; j < languageList.length; j++) {
                if ($("#" + questionDivIdList[j] + " > div > div.Editor-editor").html().length == 0) {
                    Swal.fire({
                        title: "<h4>Question can't be blank.</h4>",
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    });
                    return false;
                }
                DictFormOptionData['Question_' + languageList[j].trim()] = $("#" + questionDivIdList[j] + " > div > div.Editor-editor").html();
                var radios = document.getElementsByName('trueoption_' + (j + 1));
                for (var i = 0, length = radios.length; i < length; i++) {
                    if (optionListFlag == '') {
                        console.log('this is option text 01 : ', optionText[textOptionCount]);
                        if (optionText[textOptionCount].length == 0) {
                            Swal.fire({
                                title: "<h4>Options can't be blank.</h4>",
                                icon: 'info',
                                html: '',
                                showCloseButton: false,
                                showCancelButton: false,
                                focusConfirm: false,
                                confirmButtonText:
                                    'OK',
                                cancelButtonAriaLabel: 'Thumbs down'
                            });
                            return false;
                        }
                        if (radios[i].checked) {
                            optionListFlag = 'True';
                            optionStatement = optionText[textOptionCount];
                        } else {
                            optionListFlag = 'False';
                            optionStatement = optionText[textOptionCount];
                        }
                    } else {
                        if (radios[i].checked) {
                            console.log('this is option text 02 : ', optionText[textOptionCount]);

                            optionListFlag = optionListFlag + '|' + 'True';
                            optionStatement = optionStatement + '<<-|->>' + optionText[textOptionCount];
                        } else {
                            optionListFlag = optionListFlag + '|' + 'False';
                            optionStatement = optionStatement + '<<-|->>' + optionText[textOptionCount];
                        }
                    }

                    textOptionCount = textOptionCount + 1;

                }

                DictFormOptionData['option'] = optionListFlag;
                DictFormOptionData['optionStatement'] = optionStatement;
                optionList.push(DictFormOptionData)
                console.log('DictFormOptionData data : ', DictFormOptionData);
                console.log('optionList data : ', optionList);

                optionListFlag = []

                DictFormOptionData = {}
                quetionDtata = {}

            }
            // return false;

            console.log(optionList);
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Creating Question</b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
            // -------------------------   AJAX call  -----------------------------
            const csrftoken = getCookie('csrftoken');
            $.ajax({
                type: 'POST',
                url: "add_questions",
                headers: { 'X-CSRFToken': csrftoken },
                data: {
                    course: course, subject: subject, topic: topic,
                    questionLanguage: languageList.toString(), questionType: questionType,
                    questionSubType: questionSubType, questionDifficultyLevel: questionDifficultyLevel,
                    questionCorrectMark: questionCorrectMark, optionCount: optionCount, optionList: JSON.stringify(optionList),
                    refrenceUniuecode: datestr, 'addType': 'objective', questionType_dorop: questionType_dorop,
                    lang_id: lang_id
                },
                success: function (response) {
                    Swal.close()
                    // {'data': 'Question Created Successfully', 'status': True, 'message': 'Question Sucessfully'}
                    console.log('question bank API Subjective RESPONSE :---->> ', response['data']);
                    existingQuestionData = [];
                    if (response['data'] != 'success') {
                        if (response['data'] != 'success') {
                            existingQuestionData.push(response['data']);
                        }
                    }
                    console.log('existingQuestionData array : ', existingQuestionData);
                    console.log('language array length : ', languageList);
                    if (response['data'] === 'success') {
                        Swal.fire({
                            title: '<h4>Your <b>objective</b> type question has been created successfully.</h4>',
                            icon: 'success',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                            cancelButtonAriaLabel: 'Thumbs down'
                        }).then(function () {
                            // location.reload();
                            $('#questionDetailDiv').css('display', '');
                            $('#questionDetailDiv').css('opacity', 1);

                            $('#labelForLangugae').html('');
                            $('#renderEditor').html('');
                            $('#options').html('');

                            $('#questionlanguage').prop('disabled', false);
                            $("#questionlanguage").selectpicker("refresh");
                            $('#questionlanguage').val('Select Language');
                            // languageList = [];
                            // $('#questionlanguage').val(languageList);
                            // var questionDivID = localStorage.getItem('idDiv');
                            // $('#questionDivID').html('');

                            return false;
                        })
                    }
                    else if (response['data']['data'].length == 1 && languageList.length == 1) {
                        Swal.fire({
                            title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                            icon: 'info',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })

                    }
                    else if (response['data']['data'].length == 1 && languageList.length > 1) {
                        var id = response['data']['data']
                        Swal.fire({
                            title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                            icon: 'info',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                                '<i class="far fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;<a questionID="' + response['data']['data'] + '" dataList="' + response['data']['data'] + '" onclick="questionPostMethod(this)">Continue</a>',
                            confirmButtonAriaLabel: 'Thumbs up, great!',
                            cancelButtonText:
                                '<i class="far fa-window-close"></i>Cancel',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })
                    }
                    else if (response['data']['data'].length > 1 && languageList.length > 1) {
                        var id = response['data']['data']
                        Swal.fire({
                            title: '<h4>These Questions Already Exist</h4>',
                            icon: 'info',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                                'OK',
                            // cancelButtonAriaLabel: 'Thumbs down'
                        })
                    }
                    else if (response['data'] === 'fail') {
                        alert('This question already exist.\nTry with different data!');
                        Swal.fire({
                            title: '<h4>An error occured!.</h4>',
                            icon: 'error',
                            html: '',
                            showCloseButton: false,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText:
                                '<i class="fas fa-redo"></i>&nbsp;&nbsp;&nbsp;Retry',
                            cancelButtonAriaLabel: 'Thumbs down'
                        })
                        return false;
                    }
                }
            });
            // --------------------------------------------------------------------
        }
    } else {
        var questioArray = [];
        for (var j = 0; j < languageList.length; j++) {
            if ($("#questionlanguage").val() == '') {
                Swal.fire({
                    title: "<h4>Select Language of Question.</h4>",
                    icon: 'info',
                    html: '',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        'OK',
                    cancelButtonAriaLabel: 'Thumbs down'
                });
                return false;
            }
            if ($("#" + questionDivIdList[j] + " > div > div.Editor-editor").html().length == 0) {
                Swal.fire({
                    title: "<h4>Question can't be blank.</h4>",
                    icon: 'info',
                    html: '',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        'OK',
                    cancelButtonAriaLabel: 'Thumbs down'
                });
                return false;
            }
            DictFormOptionData['Question_' + languageList[j].trim()] = $("#" + questionDivIdList[j] + " > div > div.Editor-editor").html();
            questioArray.push($("#" + questionDivIdList[j] + " > div > div.Editor-editor").html());
            optionList.push(DictFormOptionData)
            optionListFlag = []
            DictFormOptionData = {}
            quetionDtata = {}
        }
        // =================================   check for duplicate question text   ======================================
        // empty object
        let map = {};
        let result = false;
        for (let i = 0; i < questioArray.length; i++) {
            // check if object contains entry with this element as key
            if (map[questioArray[i]]) {
                result = true;
                // terminate the loop
                break;
            }
            // add entry in object with the element as key
            map[questioArray[i]] = true;
        }
        if (result) {
            Swal.fire({
                title: "<h4>Question text can't be same for different languages.</h4>",
                icon: 'error',
                html: '',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText:
                    'OK',
                cancelButtonAriaLabel: 'Thumbs down'
            });
            return false;
        }
        // ==============================================================================================================
        // -------------------------   AJAX call  -----------------------------
        const csrftoken = getCookie('csrftoken');
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Creating Question</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        $.ajax({
            type: 'POST',
            url: "add_questions",
            headers: { 'X-CSRFToken': csrftoken },
            data: {
                course: course, subject: subject, topic: topic,
                questionLanguage: languageList.toString(), questionType: questionType,
                questionSubType: questionSubType, questionDifficultyLevel: questionDifficultyLevel,
                questionCorrectMark: questionCorrectMark, optionCount: optionCount, optionList: JSON.stringify(optionList),
                refrenceUniuecode: datestr, 'addType': 'primary', questionType_dorop: 'Subjective',
                lang_id: lang_id
            },
            success: function (response) {
                console.log('question bank API Subjective RESPONSE :---->> ', response['data']);
                existingQuestionData = [];
                if (response['data'] != 'success') {
                    existingQuestionData.push(response['data']);
                }
                console.log('existingQuestionData array : ', existingQuestionData);
                console.log('language array length : ', languageList);

                Swal.close()

                if (response['data'] === 'success') {
                    Swal.fire({
                        title: '<h4>Your <b>subjective</b> type question has been created successfully.</h4>',
                        icon: 'success',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    }).then(function () {
                        // location.reload()
                        $('#questionDetailDiv').css('display', '');
                        $('#questionDetailDiv').css('opacity', 1);

                        $('#labelForLangugae').html('');
                        // $("#questionlanguage").val("");
                        // $("#questionlanguage").selectpicker("refresh");
                        // $('.filter-option-inner-inner').text('Select Language');
                        $('#questionlanguage').prop('disabled', false);
                        $("#questionlanguage").selectpicker("refresh");
                        $('#questionlanguage').val('Select Language');

                        $('#renderEditor').html('');
                        $('#options').html('');
                        // languageList = [];
                        // $('#questionlanguage').val(languageList);
                        // var questionDivID = localStorage.getItem('idDiv');
                        // $('#questionDivID').html('');

                        return false;
                    })
                }
                else if (response['data']['message'] == "Question Already Exist" && languageList.length == 1) {
                    Swal.fire({
                        //{'data': [{'id': 228, 'language': 'Hindi', 'sameQuestionrefrence': '2021-06-07|13:37:58.836593'}], 'status': False, 'message': 'Question Already Exist'}
                        title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        // cancelButtonAriaLabel: 'Thumbs down'
                    })

                }
                else if (response['data']['data'].length == 1 && languageList.length > 1) {
                    var id = response['data']['data']
                    Swal.fire({
                        title: '<h4><b>' + response["data"]["data"][0]['language'] + '</b>  Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="far fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;<a questionID="' + response['data']['data'] + '" dataList="' + response['data']['data'] + '" onclick="questionPostMethod(this)">Continue</a>',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="far fa-window-close"></i>Cancel',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                }
                else if (response['data']['data'].length > 1 && languageList.length > 1) {
                    var id = response['data']['data']
                    Swal.fire({
                        title: '<h4>These Question Already Exist</h4>',
                        icon: 'info',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            'OK',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                }
                else if (response['data'] === 'fail') {
                    alert('This question already exist.\nTry with different data!');
                    Swal.fire({
                        title: '<h4>An error occured!.</h4>',
                        icon: 'error',
                        html: '',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fas fa-redo"></i>&nbsp;&nbsp;&nbsp;Retry',
                        cancelButtonAriaLabel: 'Thumbs down'
                    })
                    return false;
                }
            }
        });
        // --------------------------------------------------------------------
    }
}
// -----------------------------------------------------------------------------------------------------------------------------------------------
// =======================================================    QUESTION TYPE SELECTION   ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------------------------
// ======================================================   OBJECTIVE QUESTION's OPTIONS   =======================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------






// -----------------------------------------------------------------------------------------------------------------------------------------------
// ======================================================   VALIDATE CORRECT MARKS   =======================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(function () {
    $('#questionCorrectMark').on('input', function () {
        this.value = this.value
            .replace(/[^\d.]/g, '')             // numbers and decimals only
            .replace(/(^[\d]{3})[\d]/g, '$1')   // not more than 2 digits at the beginning
            .replace(/(\..*)\./g, '$1')         // decimal can't exist more than once
            .replace(/(\.[\d]{3})./g, '$1');    // not more than 4 digits after decimal
    });
});



function optionCount(thisTxt) {
    var options = $(thisTxt).val();
    if (options > 0) {
        $('#questionlanguage').prop('disabled', false);
        $("#questionlanguage").selectpicker("refresh");
    } else {
        $('#questionlanguage').prop('disabled', true);
        $("#questionlanguage").selectpicker("refresh");
    }
}