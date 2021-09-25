// import { apiBaseUrl } from '../../../../globalVariables/variable.js'
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ===================================================    DEPENDENT CHAIN SELECTION     ==========================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    var courseName = document.getElementById("courseName");
    var subjectID = document.getElementById("subjectID");


    courseName.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        subjectID.length = 1;
        var courseName = document.getElementById("courseName");
        var selectedCourseId = courseName.value;
        $('#topicDataAppend').html('');
        $('#topicDataAppend').html('<tr><td class="text-center"><b>Please select course & subject to view topic list</b></td></tr>');
        Swal.fire({
            position: 'center',
            title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'>Loading Topics</b>",
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        $.ajax({
            type: 'GET',
            url: "chainedSubjects",
            data: { courseId: selectedCourseId },
            success: function (response) {
                Swal.close();
                var subjectData = response['subjectList'];
                if (subjectData['status'] === false) {
                    var data = '<option value="" class="text-center">No Subject Associated with this Course !</option>';
                    $('#baseSelectOption').show();
                    $('#subjectID').html('');
                    $('#subjectID').append(data);
                } else {
                    var courseStr = ''
                    if (subjectData['data']['subjectNameFK'].length > 0) {
                        for (var i = 0; i < subjectData['data']['subjectNameFK'].length; i++) {
                            var data = '<option value="' + subjectData['data']['subjectNameFK'][i]['id'] + '">' + subjectData['data']['subjectNameFK'][i]['subjectName'] + '</option>';
                            courseStr = courseStr + data;
                        }

                        $('#baseSelectOption').hide();
                        $('#subjectID').html('');
                        $('#subjectID').append(courseStr);

                    } else {
                        var data = '<option value="">No Subject Associated with this Course !</option>';
                        $('#baseSelectOption').show();
                        $('#subjectID').html('');
                        $('#subjectID').append(data);

                    }
                }
            }
        });
    }
});
// ========================================================    SEARCH FOR TOPICS    ==============================================================
// -----------------------------------------------------------------------------------------------------------------------------------------------
function searchTopics() {
    var course_ID = parseInt($('#courseName').val());
    var subject_ID = parseInt($('#subjectID').val());

    console.log(course_ID, subject_ID);
    $('#updatetopicBtn').css('display', 'none');

    $.ajax({
        type: 'GET',
        url: "searchTopic",
        data: { courseID: course_ID, subjectID: subject_ID },
        success: function (response) {
            console.log(response['topicList'],response['topicId']);
            var topicList = '';
            if (response['topicList'] == "<b>- No topic available for selected course and subject!</b>") {
                topicList = '<tr>\
                            <td class="text-center">No topic available for selected course and subject!</td>\
                            </tr>';
                $('#topicDataAppend').html('');
                $('#topicDataAppend').append(topicList);

            } else {
                for (var i = 0; i < response['topicList'].length; i++) {
                    var data = '<tr>\
                            <td id="topicId" style="display:none;">'+ response['topicId'] + '</td>\
                            <td class="" style="font-weight:700;"><span><input style="border-bottom:1px solid grey;outline: 0;\
                            border-width: 0 0 2px;" type="text" class="topicData form-control" placeholder="Enter topic name"\
                            value="'+ response['topicList'][i] + '" onkeypress="return RestrictCommaSemicolon(event);"/></span></td><td class="details-control">\
                            <a topicData="'+ response['topicList'][i] + '" class="del" onclick="deleteEntireTopicRow(this)"><i class="fa fa-trash"></i></a>\
                       </td>\
                            </tr>';
                    topicList = topicList + data;
                }
                $('#topicDataAppend').html('');
                $('#topicDataAppend').append(topicList);
                $('#updatetopicBtn').css('display', '');

            }
        }
    });

}



// -----------------------------------------------------------------------------------------------------------------------------------------------
function deleteEntireTopicRow(thisTxt) {
    
    var topicData = $(thisTxt).attr('topicData');
    console.log('topic >> ', topicData);

    var dataList = []
    $("input[class *= 'topicData']").each(function () {
        dataList.push($(this).val().trim());
    });

    var array1 = []
    
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i] == '') {
            Swal.fire("<small>Blank topic not accepted</small>.");
            return false;
        } else {
            array1.push(dataList[i]);
        }
    }
    
    // =====================================================
    console.log('before deletion >>',array1);
    const index = array1.indexOf(topicData);
    if (index > -1) {
        array1.splice(index, 1);
    }
    console.log('after deletion >>',array1);
    // =====================================================
    var array2 = [];
    var arr = [];
    
    for(var i=0;i<array1.length;i++){
        arr.push(array1[i]);
        array2.push(arr);
        arr = []
    }
    console.log('finar array >>',array2);
    // =====================================================
    var courseNameId = $("#courseName").val();
    var subjectNameId = $("#subjectID").val();
    
    console.log('courseID :>',courseNameId);
    console.log('subjectID :>',subjectNameId);
    

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to Delete?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>deleting ...</small></b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })

    var topicId = $('#topicId').text();
    console.log('topicId :>',topicId);

    var tokenKey = $('#hiddenTokenKey').text();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + tokenKey + "");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "topicsList": array2.toString(), "select_courseFK": parseInt(courseNameId), "selectsubjectFK": parseInt(subjectNameId)
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://13.233.247.133/api/assignSubjectTotopic_detail/"+topicId+'/', requestOptions)
        .then(response => response.text())
        .then(result => {
            Swal.close();
            var data = JSON.parse(result);
            console.log('result >> ',data)
            // if (data['status'] === true) {
                //  $('#showErrorMessage').css('display', 'none');
                // $('#showSuccesMessage').css('display', '');
                Swal.fire({
                    icon: 'success',
                    title: '<small>Topics Deleted successfully.</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    // window.location.href = window.location;
                    searchTopics();
                })

            // } else {
            //     //  $('#showSuccesMessage').css('display', 'none');
            //     // $('#showErrorMessage').css('display', '');
            //     Swal.fire({
            //         icon: 'error',
            //         title: '<small>An error occured.</small>',
            //         showConfirmButton: false,
            //         timer: 1500
            //     }).then(function(){
            //         searchTopics();
            //         // return false;
            //     })
            // }
        })
        .catch(error => console.log('error', error));
        }
    })
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// function filteredArray(arr, elem) {
//     let newArr = [];
//     // change code below this line
//     for(var i=0; i<arr.length; i++){
//       if(arr[i].indexOf(elem) === -1){
//         for(var j=0; j<arr[i].length; j++){
//           if(arr[i][j] === elem){
//             arr.splice((i,j), 1);
//           }
//         }
//         newArr.push(arr[i]);
//       }
//       else{
//         newArr.push(arr[i]);
//       }
//     }
//     // change code above this line
//     return newArr;
//   }
// -----------------------------------------------------------------------------------------------------------------------------------------------
function RestrictCommaSemicolon(e) {
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[^,;]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) {
            theEvent.preventDefault();
        }
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
function updateTopic(){

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to Update?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                title: "<b style='font-size:20px;font-weight:500;color:#1eb6e9;'><small>updating ...</small></b>",
                showConfirmButton: false,
                onOpen: () => {
                    Swal.showLoading();
                }
            })

            var dataList = []
            $("input[class *= 'topicData']").each(function () {
                if($(this).val() == ''){
                    Swal.close();
                        Swal.fire({
                            icon: 'error',
                            title: '<small>Blank field not accepted!</small>',
                            showConfirmButton: true,
                        }).then(function(){
                            return false;
                        })

                    return false;
                }
                dataList.push($(this).val().trim());
            });

            var array1 = []
            var array2 = []

            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i] == '') {
                    Swal.fire("<small>Blank topic not accepted</small>.");
                    return false;
                } else {
                    array1.push(dataList[i]);
                    array2.push(array1);
                }
                array1 = [];
            }
            var courseNameId = $("#courseName").val();
            var subjectNameId = $("#subjectID").val();

            console.log('courseID :>',courseNameId);
            console.log('subjectID :>',subjectNameId);
            console.log('topic array :>',array2);
            var topicId = $('#topicId').text();
            console.log('topicId :>',topicId);

            var topicId = $('#topicId').text();
            console.log('topicId :>',topicId);

    var tokenKey = $('#hiddenTokenKey').text();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + tokenKey + "");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "topicsList": array2.toString(), "select_courseFK": parseInt(courseNameId), "selectsubjectFK": parseInt(subjectNameId)
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://13.233.247.133/api/assignSubjectTotopic_detail/"+topicId+'/', requestOptions)
        .then(response => response.text())
        .then(result => {
            Swal.close();
            var data = JSON.parse(result);
            console.log('result >> ',data)
            // if (data['status'] === true) {
                //  $('#showErrorMessage').css('display', 'none');
                // $('#showSuccesMessage').css('display', '');
                Swal.fire({
                    icon: 'success',
                    title: '<small>Topics updated successfully.</small>',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    // window.location.href = window.location;
                    searchTopics();
                })

            // } else {
            //     //  $('#showSuccesMessage').css('display', 'none');
            //     // $('#showErrorMessage').css('display', '');
            //     Swal.fire({
            //         icon: 'error',
            //         title: '<small>An error occured.</small>',
            //         showConfirmButton: false,
            //         timer: 1500
            //     }).then(function(){
            //         searchTopics();
            //         // return false;
            //     })
            // }
        })
        .catch(error => console.log('error', error));
        }
    })

            // $.ajax({
            //     type: 'GET',
            //     url: "deleteSubjectToCourse/" + id,
            //     success: function (response) {
            //         console.log(response['data']['message']);
            //         Swal.close();
            //         if(response['data']['message'] == 'Course  Attched with Someone'){
            //             Swal.fire({
            //                 icon: 'error',
            //                 title: '<small>Subject To Course Attched with Some other module</small>',
            //                 showConfirmButton: true,
            //                 // timer: 2000
            //             }).then(function(){
            //                 return false;
            //             })
            //         }else{
            //             Swal.fire({
            //                 icon: 'success',
            //                 title: '<small>Subject To Course deleted successfully</small>',
            //                 showConfirmButton: true,
            //                 timer: 2000
            //             }).then(function(){
            //                 window.location.href = window.location;
            //             })
            //         }

            //     }
            // });
        
}