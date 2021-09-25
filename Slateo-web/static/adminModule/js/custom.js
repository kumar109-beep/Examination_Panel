// localStorage.setItem?('currentTab', 'Dashboard');
$(window).scroll(function () {
    if ($(this).scrollTop() > 60) {
        $(".navbar").removeClass('transparent');
    }
    else { $(".navbar").addClass('transparent'); }
});

$('.menu-toggle').click(function () {
    // $( ".navbar.transparent" ).addClass('transparent');
    $('.content-wrapper-before').toggleClass('full');
});


// for dashboard only
var href = document.location.href;
var pageName = href.substr(href.lastIndexOf('/') + 1);
var local = localStorage.getItem('currentTab')
if (local == "Dashboard" && pageName == '') {
    $('.navbar').addClass('transparent');
    $('.content-wrapper-before').show();
}
else {
    $('.content-wrapper-before').hide();
    $(window).scroll(function () {
        $(".navbar").removeClass('transparent');
    });
}


$('#process').change(function () {
    $('.card.info').show();
    $(".other option[value=1]").attr('selected', 'selected');
    $("html, body").animate({ scrollTop: 400 }, "medium");
    return false;
});

$('#example2 .add').click(function () {
    $('#add_batches span.watermark').hide();
    $('#add_batches').append('<div class="batch card"><ul><li> <span>Batch ID</span>BID001</li><li> <span>Batch Name</span>CSIIA</li><li> <a href="javascript:;" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#add-paper">Select Paper(s)</a> <a href="#" data-toggle="tooltip" data-placement="top" title="Add students"><img src="../app-assets/images/addstudent.svg"></a> <a href="#" id="delete" data-toggle="tooltip" data-placement="top" title="Delete Batch"><img src="../app-assets/images/delete.svg"></a></li></ul></div>');
});



$('.add_seld').click(function () {
    if ($('#example2 tr td').find('input[type=checkbox]').prop("checked") == true) {
        $('#add_batches').append('<div class="batch card"><ul><li> <span>Batch ID</span>BID001</li><li> <span>Batch Name</span>CSIIA</li><li> <a href="javascript:;" class="btn btn-primary btn-sm">Select Paper(s)</a> <a href="#" data-toggle="tooltip" data-placement="top" title="Add students"><img src="../app-assets/images/addstudent.svg"></a> <a href="#" id="delete" data-toggle="tooltip" data-placement="top" title="Delete Batch"><img src="../app-assets/images/delete.svg"></a></li></ul></div><div class="batch card"><ul><li> <span>Batch ID</span>BID001</li><li> <span>Batch Name</span>CSIIA</li><li> <a href="javascript:;" class="btn btn-primary btn-sm">Select Paper(s)</a> <a href="#" data-toggle="tooltip" data-placement="top" title="Add students"><img src="../app-assets/images/addstudent.svg"></a> <a href="#" id="delete" data-toggle="tooltip" data-placement="top" title="Delete Batch"><img src="../app-assets/images/delete.svg"></a></li></ul></div><div class="batch card"><ul><li> <span>Batch ID</span>BID001</li><li> <span>Batch Name</span>CSIIA</li><li> <a href="javascript:;" class="btn btn-primary btn-sm">Select Paper(s)</a> <a href="#" data-toggle="tooltip" data-placement="top" title="Add students"><img src="../app-assets/images/addstudent.svg"></a> <a href="#" id="delete" data-toggle="tooltip" data-placement="top" title="Delete Batch"><img src="../app-assets/images/delete.svg"></a></li></ul></div>');
    }
    else { alert('Please select one or more batches from table.'); }
});

$('#example3 .add').click(function () {
    $('#add_papers span.watermark').hide();
    $('#add_papers').append('<div class="batch card paper"><ul><li> <span>Paper ID</span>PID001</li> <li>  <a href="#" data-toggle="tooltip" data-placement="top" title="Edit paper"><img src="../app-assets/images/editing.svg"></a> <a href="#"  data-toggle="tooltip" data-placement="top" title="View Paper"><img src="../app-assets/images/view.svg"></a><a href="#"   data-toggle="tooltip" data-placement="top" title="Delete"><img src="../app-assets/images/delete.svg"></a><a href="create-exam-step-4.php" class="btn btn-primary btn-sm"  >Select Slot</a></li></ul></div>');
});

$('.add_seld_p').click(function () {
    if ($('#example3 tr td').find('input[type=checkbox]').prop("checked") == true) {
        $('#add_papers').append('<div class="batch card paper"><ul><li> <span>Paper ID</span>PID001</li> <li>  <a href="#" data-toggle="tooltip" data-placement="top" title="Edit paper"><img src="../app-assets/images/editing.svg"></a> <a href="#"  data-toggle="tooltip" data-placement="top" title="View Paper"><img src="../app-assets/images/view.svg"></a><a href="#"   data-toggle="tooltip" data-placement="top" title="Delete"><img src="../app-assets/images/delete.svg"></a><a href="create-exam-step-4.php" class="btn btn-primary btn-sm"  >Select Slot</a></li></ul></div><div class="batch card paper"><ul><li> <span>Paper ID</span>PID001</li> <li>  <a href="#" data-toggle="tooltip" data-placement="top" title="Edit paper"><img src="../app-assets/images/editing.svg"></a> <a href="#"  data-toggle="tooltip" data-placement="top" title="View Paper"><img src="../app-assets/images/view.svg"></a><a href="#"   data-toggle="tooltip" data-placement="top" title="Delete"><img src="../app-assets/images/delete.svg"></a><a href="create-exam-step-4.php" class="btn btn-primary btn-sm" >Select Slot</a></li></ul></div><div class="batch card paper"><ul><li> <span>Paper ID</span>PID001</li> <li>  <a href="#" data-toggle="tooltip" data-placement="top" title="Edit paper"><img src="../app-assets/images/editing.svg"></a> <a href="#"  data-toggle="tooltip" data-placement="top" title="View Paper"><img src="../app-assets/images/view.svg"></a><a href="#"   data-toggle="tooltip" data-placement="top" title="Delete"><img src="../app-assets/images/delete.svg"></a><a href="create-exam-step-4.php" class="btn btn-primary btn-sm"  >Select Slot</a></li></ul></div>');
    }
    else { alert('Please select one or more batches from table.'); }
});


$(function () {
    $(".datepicker").datepicker();
    // $('.timepicker').timepicker({});
});


$('.addmore').click(function () {
    $("#add-more-slots").append('<div class="row position-relative "><a href="javascript:;" class="remove">x</a><div class="col-lg-2 mb-2 pr-0 form-group"> <label>Batch Slot</label> <select class="form-control"><option>1</option><option>2</option> </select></div><div class="col-lg-3 mb-2 pr-0 form-group"> <label>Lies From registration no.</label> <input type="text" placeholder="Enter Registration no" class="form-control "></div><div class="col-lg-3 mb-2 pr-0 form-group"> <label>To</label> <input type="text" placeholder="Enter Registration no" class="form-control "></div><div class="col-lg-2 mb-2 pr-0 form-group"> <label>Center No.</label> <input type="text" placeholder="Enter Center no" class="form-control "></div><div class="col-lg-2 mb-2 form-group"> <label>Room No.</label> <input type="text" placeholder="Enter Room no" class="form-control "></div></div>');
    $('.added-slots').show();
    $('.added-slots').append('<p><i class="fa fa-arrow-right"></i> The students from registration no. <strong>1254545</strong> to <strong>1254645</strong> will sit in Exam centre no. <strong>35</strong></p>');
});
$(document).on('click', '.remove', function () {
    $(this).parent().remove();
    $('.added-slots').children().last().remove();
    var lenght = $('.added-slots').children().length;
    if (lenght < 1) {
        $('.added-slots').hide();
    }
});


$('#example2 .assign-resources').click(function () {
    $('#add_resources span.watermark').hide();
    $('#add_resources').append('<div class="batch card resources"><div class="row"><div class="col-lg-6"><p><span>Faculty Name</span>Rajesh Kumar</p><p><span>Faculty Code</span>FCODE001</p></div><div class="col-lg-6"><p><span>Assigned Responsibilities</span> <em>Teacher</em> <em>Proctor</em> <em>Examiner</em></p></div></div></div>');
});
$('.add_sel_res').click(function () {
    if ($('#example2 tr td').find('input[type=checkbox]').prop("checked") == true) {
        $('#add_resources span.watermark').hide();
        $('#add_resources').append('<div class="batch card resources"><div class="row"><div class="col-lg-6"><p><span>Faculty Name</span>Rajesh Kumar</p><p><span>Faculty Code</span>FCODE001</p></div><div class="col-lg-6"><p><span>Assigned Responsibilities</span> <em>Teacher</em> <em>Proctor</em> <em>Examiner</em></p></div></div></div><div class="batch card resources"><div class="row"><div class="col-lg-6"><p><span>Faculty Name</span>Rajesh Kumar</p><p><span>Faculty Code</span>FCODE001</p></div><div class="col-lg-6"><p><span>Assigned Responsibilities</span> <em>Teacher</em> <em>Proctor</em> <em>Examiner</em></p></div></div></div>');
    }
    else { alert('Please select one or more resources from table.'); }
});

$(document).on('click', '#add_resources p em', function () {
    $(this).remove();
});


$('.add-students').click(function () {
    $('#students tbody tr.not-added').hide();
    $('#students tbody').append('<tr><td>Amit Kumar</td><td>ST7867887</td><td>amit@gmail.com</td><td>8575856688</td><td>Male</td><td class="details-control"> <a href="javascript:;" class="del pt-0 mt-0"><i class="fa fa-trash"></i></a></td></tr>');
});

$(document).on('click', '#students .del', function () {
    var lenght1 = $('#students tbody').children().length;
    $(this).parents('tr').remove();
    if (lenght1 <= 2) {
        $('#students tbody').append('<tr class="not-added"><td colspan="6" class="text-center">No student added</td></tr>');
    }
});

$('.add-bacthes').click(function () {
    $('#batchess tbody tr.not-added').hide();
    $('#batchess tbody').append('<tr><td>BID001</td><td>Batch 1</td><td>Ankur Singh</td><td>65</td> <td class="details-control"> <a href="javascript:;" class="del pt-0 mt-0"><i class="fa fa-trash"></i></a></td></tr>');
});

$(document).on('click', '#batchess .del', function () {
    var lenght1 = $('#batchess tbody').children().length;
    $(this).parents('tr').remove();
    if (lenght1 <= 2) {
        $('#batchess tbody').append('<tr class="not-added"><td colspan="6" class="text-center">No batches added</td></tr>');
    }

});

$('.upload label input').change(function (e) {
    var fileName = e.target.files[0].name;
    $('#file').show();
    $('#file').html(fileName);
});

$('.upload .btn-upload').click(function () {
    $(this).parent().hide();
    $('.col-assign').show();
    $('.sel_val_tbl th select').show();
});

$('#uploadF').click(function () {
    if ($(this).prop("checked") == true) {
        $('.manual-entry, .bottom-btn').hide();
        $('.upload-csv, .bottom-btn1').show();
    }

});
$('#manual').click(function () {
    if ($(this).prop("checked") == true) {
        $('.manual-entry, .bottom-btn').show();
        $('.upload-csv, .bottom-btn1').hide();
    }
});


function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgphoto').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#stu_photo").change(function () {
    readURL1(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgsign').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#stu_sign").change(function () {
    readURL(this);
});



function myFunction() {
    var copyText = document.getElementById("link-box");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    $('.msg').html('link copied!');
}

// $('#no-of-section').change(function(){
// 	alert()
// });
// $('#no-of-section').on('input',function(e){
//      $('#sections').show()
// });

$('.sections input[type=radio]').on('click', function (e) {
    if ($(this).attr('value') == "yes") {
        $(this).parents('td').find('.set-time-limit').show();
    }
    else {
        $(this).parents('td').find('.set-time-limit').hide();
    }
});
// $('#sections .marks, #sections .qno').on('input',function(e){
//     var qno =  $('#sections .qno').val();
//     var marks =   $('#sections .marks').val();
//     var total = parseInt(qno) * parseInt(marks);
//     $(this).parent().parent().find('td .total_marks').val(total);	
// });
$('.timeL input[type=radio]').on('click', function (e) {
    if ($(this).attr('value') == "yes") {
        $('table').find('.time_limit').show();
    }
    else {
        $('table').find('.time_limit').hide();
    }
});
$('.ques_type table tr td #q_type').change(function () {
    $(this).parent().parent().find('.last').html('<span class="q_type">Objective</span>');
});

$('.ques_type .add-more').click(function () {
    $('.ques_type table tbody').append('<tr><td> <select class="form-control"><option class="d-none">Select</option><option>Section A</option><option>Section B</option> </select></td><td> <select title="Select question" class="selectpicker d-block" multiple data-live-search="false"><option>1</option><option>2</option><option>3</option><option>4</option> </select></td><td> <select id="q_type" title="Select question type" class="selectpicker d-block" multiple data-live-search="false"><option>Objctive</option><option>fill in the Blanks</option><option>True/false</option> </select></td><td ><div class="last"></div></td></tr>');
    $('select').selectpicker();
});

$('.set-creation input[type=radio][name=set]').on('click', function (e) {
    if ($(this).attr('value') == "yes") {
        $('.set-creation .set-options').show();
    }
    else {
        $('.set-creation .set-options').hide();
    }
});



// $('#add-paper').modal('show');

// roles section

$('#assign-roles .btn-dark').on('click', function () {
    $('#assigned-roles').show();
    $('#assign-roles').hide();
});
$('#assigned-roles .back, #assigned-roles .btn-dark').on('click', function () {
    $('#assigned-roles').hide();
    $('#assign-roles').show();
})


// add topics

$(document).on('click', '.add-topic', function () {
    $("#more-topics").append('<div class="row"><div class="col-lg-8 mt-0 form-group">  <input type="text" class="topicData form-control" placeholder="Enter topic name" value="" onkeypress="return RestrictCommaSemicolon(event);" required/></div><div class="text-right col-lg-2  pt-0" ><a style="margin-top:2px" class="btn btn-danger remove-topic  btn-sm " href="javascript:;"   ><i class="fa fa-minus"></i></a> <a style="margin-top:2px" class="btn btn-purple  btn-sm add-topic " href="javascript:;"   ><i class="fa fa-plus"></i></a>  </div></div>');
    $(this).remove();
});

$(document).on('click', '.remove-topic', function () {
    $(this).parent().parent('.row').remove();
    $(this).parent().parent('.row').prev().remove();
    //$(this).parents('.row').prev().find('.add-topic').show();
});


$('.sel_filters a').click(function () {
    $(this).remove();
});

$('#option').change(function () {
    $('#options').show()
})


$('.accordion .card-header').click(function () {
    var val = $(this).attr('href');
    $(val).toggle();
});

//   paper add question module : screen 03
$('.question_modal  a.edit').click(function () {
    $(this).html('<i class="fa fa-check"></i> Added');
    $(this).addClass('added')
});

$('.question_modal  .add-to-paper').click(function () {
    // $('#collapseOne .add-ques-btn').hide();
    $('#collapse1 .added-ques').show();
    $("html, body").animate({ scrollTop: 0 }, 100);
});

$('.added-ques .del').click(function () {
    $(this).parent().parent().hide();

});


$('.addP').click(function () {
    $(this).addClass('selected');
    $(this).html('<i class="fa fa-check"></i> Selected')
    $(this).parent().find('.delP').addClass('show');
});
$('.delP').click(function () {
    $(this).removeClass('show');
    $(this).parent().find('.addP').html('+ Select')
    $(this).parent().find('.addP').removeClass('selected');
});


$('.addEva').click(function(){
       
    if($(this).hasClass('selected'))
    {
        $(this).removeClass('selected');
    $(this).html(' Select +');
      }
      else {
          $(this).addClass('selected');
            $(this).html('<i class="fa fa-check"></i> Selected');
      }
     
});

// $('.modal .save').click(function(){
//   $('table tr#row1 td .select').html('Selected  (2)');
//   $('table tr#row1').find('.select').addClass('selected');
// });

// $('.schedule-exam .btn').click(function(){

//    if($(this).hasClass('editD'))
//     {
//      $(this).removeClass('editD');
//      $(this).html('Update');
//      $(this).removeClass('btn-primary');
//      $(this).addClass('btn-success');
//      $(this).parent().parent().find('input').removeClass('readonly');
//      if($(this).parent().parent().find('.select').hasClass('selected')){
//          $(this).parent().parent().find('.select').addClass('editt');
//          $(this).parent().parent().find('.select').html('Edit Evaluator');
//      }
     
//    }
//    else {
//          $(this).parent().parent().find('input').addClass('readonly');
//        $(this).addClass('editD');
//        $(this).html('Edit');
//    }

// });




// ==============================================================================================================
// ==============================================================================================================   
// ==============================================================================================================   
$(document).ready(function(){

    //iterate through each textboxes and add keyup
    //handler to trigger sum event
    $(".marks_ob").each(function() {
        calculateSum();
        $(this).keyup(function(){
            calculateSum();
        });
    });


});
// ==============================================================================================================   
function calculateSum() {

    var sum = 0;
    //iterate through each textboxes and add the values
    $(".marks_ob").each(function() {

        //add only if the value is number
        if(!isNaN(this.value) && this.value.length!=0) {
            sum += parseFloat(this.value);
        }

    });
    //.toFixed() method will roundoff the final sum to 2 decimal places
    $("#markss").html(sum);
}
// ==============================================================================================================   
// ==============================================================================================================   
// ==============================================================================================================   

// notification
$('.noti.all .notif  p a').click(function(){
   if($(this).parent().parent().hasClass('unread')){
        $(this).parent().parent().removeClass('unread');
        $(this).parent().parent().addClass('read');
        $(this).html('');
   }
   else {
       $(this).parent().parent().removeClass('read');
        $(this).parent().parent().addClass('unread');
        $(this).html('');
   }
});

