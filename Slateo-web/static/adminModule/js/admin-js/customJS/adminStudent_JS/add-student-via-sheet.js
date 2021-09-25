
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

$(function () {
    var file = document.getElementById('browse_csv_file')
    file.addEventListener('change', importFile);
    function importFile(evt) {
        var f = evt.target.files[0];
        //  ---------------------   checking sheet file size   ---------------------
        // if (f.size <= 30000) {
            if (f) {
                var r = new FileReader();
                r.onload = e => {
                    var contents = processExcel(e.target.result);
                    console.log(contents)
                    localStorage.setItem('fileData', contents);
                }
                r.readAsBinaryString(f);
            }
            else {
                console.log("Failed to load file");
            }
        // } else {
        //     $('#file').hide();
        //     Swal.fire('File size is too large\nPlease select file under 30KB');
        //     return false;
        // }
        // -------------------------------------------------------------------------
    }

    function processExcel(data) {
        var workbook = XLSX.read(data, {
            type: 'binary', cellDates: true, dateNF: 'dd-mm-yyyy;@'
        });

        var firstSheet = workbook.SheetNames[0];
        var data = to_json(workbook);
        // console.log('xlsx called!:', data);
        // return false;
        return data
    };

    function to_json(workbook) {
        var result = {};
        var a = [];
        workbook.SheetNames.forEach(function (sheetName) {
            console.log("workbook.Sheets[sheetName]", workbook.Sheets[sheetName]);
            var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                header: 1,
                raw: false,
                dateNF: 'dd-mm-yyyy'

            });

            console.log(roa);
            var w = workbook.Sheets[sheetName];
            // console.log('this is W : ',w);
            // return false;
            for (z in w) {
                if (typeof (w[z].w) != 'undefined') {
                    a.push([w[z].w])
                }
                else if (typeof (w[z].v) != 'undefined') {
                    a.push([w[z].v])
                }
            }
            console.log('AAA', a);
            if (roa.length) result[sheetName] = roa;
        });
        return JSON.stringify(result);
    };




    $('#upload_csv_file').bind('click', function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.xlsx|.xls)$/;
        if (regex.test($('#browse_csv_file').val().toLowerCase())) {
            if (typeof FileReader != 'undefined') {
            //     var fileData = localStorage.getItem('fileData');
            //     var parseData = JSON.parse(fileData)
            //     var body_data = '';
            //     var header_data = '';
            //     var side_header = [];
            //     var store_header = '';
            //     var store_menu = '';
            //     var header_list = ['studentRegistrationNumber', 'studentName', 'studentDOB', 'studentGender', 'guardianName', 'studentGuardianRelation', 'studentHandSelection', 'studentDisability', 'studentEmail', 'studentMobile', 'guardianMobile', 'guardianEmail', 'studentAddress', 'studentCountry', 'studentState', 'studentDistrict', 'studentPinCode', 'studentCourse',
            //         'studentBranch', 'studentYear', 'studentPermanentAddress', 'studentPermanentCountry', 'studentPermanentState', 'studentPermanentDistrict', 'studentPermanentPinCode'];

            //     var table_tag_open = '<div class="table-res">\
            //                           <table class="table tbl table-head-custom table-head-bg tbl-drop \
            //                          table - vertical - center">';
            //     var table_tag_close = '</table></div>';
            //     var header_tag_open = '<thead><tr class="text-left" style="font-weight:700;">';
            //     var header_tag_close = ' </tr></thead >';
            //     var main_body_tag_open = '<tbody><tr>';
            //     var main_body_tag_close = '</tr></tbody >';
            //     for (const [key, rows] of Object.entries(parseData)) {
            //         // ###########################################
            //         // ########  Store Data on Local Storage  ####
            //         // ###########################################
            //         for (var k = 0; k < rows[0].length; k++) {
            //             console.log(rows[0][k]);
            //             var a = '';
            //             for (var m = 1; m < rows.length; m++) {
            //                 console.log('ROWDATA ==>', rows[m][k], typeof rows[m][k]);
            //                 var rData = typeof rows[m][k] != 'undefined' && rows[m][k] !== null ? rows[m][k] : "NA";
            //                 if (a != '') {
            //                     a = a + ' | ' + rData;
            //                 } else {
            //                     a = rData;
            //                 }
            //                 if (rows[0][k] == null) {
            //                     alert('Invalid/Missing headers!');
            //                     location.reload();
            //                     return false;
            //                 }
            //                 console.log('>>>>>>>>>>>>>>>>>>>>>', a, "|||||||||", (rows[0][k]));
            //                 localStorage.setItem(rows[0][k].replace(/\s/g, ''), a);
            //             }
            //         }
            //         for (var i = 0; i < rows.length; i++) {
            //             var cells = rows[i]
            //             if (i == 0) {
            //                 var menu_data = rows[i]
            //                 var count = 1;
            //                 for (m = 0; m < menu_data.length; m++) {
            //                     //   console.log(menu_data[m]);
            //                     //   typeof car.color === 'undefined'
            //                     var menu = typeof (menu_data[m]) != 'undefined' ? menu_data[m] : "NA";
            //                     header_data = header_data + '<td>' + menu + '</td>';
            //                     side_header.push(menu);

            //                     count = count + 1;
            //                     if (store_header != '') {
            //                         store_header = store_header + '|' + menu;
            //                     } else {
            //                         store_header = menu;
            //                     }

            //                 }
            //             } else {
            //                 if (cells.length > 1) {
            //                     var tr_start = '<tr>';
            //                     var tr_end = '</tr>';
            //                     var in_tr = '';

            //                     for (var j = 0; j < menu_data.length; j++) {
            //                         if (i < 4) {
            //                             var cellData = typeof (cells[j]) != 'undefined' ? cells[j] : "NA";

            //                             if (in_tr != '') {
            //                                 var in_tr = in_tr + '<td>' + cellData + '</td>';
            //                             } else {
            //                                 var in_tr = '<td>' + cellData + '</td>';
            //                             }
            //                         }
            //                     }
            //                     var combine_tr = tr_start + in_tr + tr_end;
            //                 }

            //                 var body_data = body_data + combine_tr;

            //             }

            //             for (var no = 1; no < 26; no++) {
            //                 for (var hed = 0; hed < side_header.length; hed++) {
            //                     // alert(onclick="getValueanchortag(this,' + no + '));
            //                     store_menu = store_menu + ' <a class="dropdown-item ' + side_header[hed] + '"  dataHeadre=' + header_list[no - 1] + ' onclick="getValueanchortag(this,' + no + ');" href="#">' + side_header[hed] + '</a>';
            //                 }
            //                 $('#csv_header_' + no).html(store_menu);
            //                 store_menu = '';
            //             }
            //             var complete_table_data =
            //                 table_tag_open +
            //                 header_tag_open +
            //                 header_data +
            //                 header_tag_close +
            //                 main_body_tag_open +
            //                 body_data +
            //                 main_body_tag_close +
            //                 table_tag_close;
            //             $('#dvCSV').html(complete_table_data);
            //             $('.col-assign').show();
            //             $('#UploadCSV').hide();
            //             $('#reuploadSheet').css('display', '');
            //             // $('#header_upload_sheet').html('<img src="static/store_manager/images/dasboard.svg">Uploaded Sheet');

            //         }
            //     }

            }
            // else {
            //     Swal.fire('This browser does not support HTML5.');
            // }
        }
        else {
            Swal.fire('Please select a valid CSV/Excel file.');

        }
    });
});


// $(function () {
//     $('#ShowPreviewSheetData').bind('click', function () {
//         // ========================================================
//         var arr_registrationNo = [];
//         var arr_name = [];
//         var arr_dob = [];
//         var arr_gender = [];
//         var arr_guardianName = [];
//         var arr_guardianRelation = [];
//         var arr_handy = [];
//         var arr_diasability = [];
//         var arr_email = [];
//         var arr_mobile = [];
//         var arr_guardianMobile = [];
//         var arr_guardianEmail = [];
//         var arr_currentAddress = [];
//         var arr_currentCountry = [];
//         var arr_currentState = [];
//         var arr_currentDistrict = [];
//         var arr_currentPincode = [];
//         var arr_permanentAddress = [];
//         var arr_permanentCountry = [];
//         var arr_permanentState = [];
//         var arr_permanentDistrict = [];
//         var arr_permanentPincode = [];
//         var arr_course = [];
//         var arr_branch = [];
//         var arr_year = [];



//         $("#row_data_1 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_registrationNo.push($(this).val().trim())
//             }
//         });


//         $("#row_data_2 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_name.push($(this).val().trim())
//             }

//         });

//         $("#row_data_3 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_dob.push($(this).val().trim())
//             }
//         });


//         $("#row_data_4 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_gender.push($(this).val().trim())
//             }
//         });


//         $("#row_data_5 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_guardianName.push($(this).val().trim())
//             }
//         });



//         $("#row_data_6 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_guardianRelation.push($(this).val().trim())
//             }
//         });


//         $("#row_data_7 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_handy.push($(this).val().trim())
//             }
//         });

//         $("#row_data_8 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_diasability.push($(this).val().trim())
//             }
//         });

//         $("#row_data_9 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_email.push($(this).val().trim())
//             }
//         });


//         $("#row_data_10 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_mobile.push($(this).val().trim())
//             }

//         });

//         $("#row_data_11 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_guardianMobile.push($(this).val().trim())
//             }
//         });


//         $("#row_data_12 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_guardianEmail.push($(this).val().trim())
//             }
//         });


//         $("#row_data_13 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_currentAddress.push($(this).val().trim())
//             }
//         });



//         $("#row_data_14 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_currentCountry.push($(this).val().trim())
//             }
//         });


//         $("#row_data_15 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_currentState.push($(this).val().trim())
//             }
//         });

//         $("#row_data_16 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_currentDistrict.push($(this).val().trim())
//             }
//         });

//         $("#row_data_17 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_currentPincode.push($(this).val().trim())
//             }
//         });


//         $("#row_data_18 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_permanentAddress.push($(this).val().trim())
//             }

//         });

//         $("#row_data_19 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_permanentCountry.push($(this).val().trim())
//             }
//         });


//         $("#row_data_20 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_permanentState.push($(this).val().trim())
//             }
//         });


//         $("#row_data_21 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_permanentDistrict.push($(this).val().trim())
//             }
//         });



//         $("#row_data_22 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_permanentPincode.push($(this).val().trim())
//             }
//         });


//         $("#row_data_23 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_course.push($(this).val().trim())
//             }
//         });

//         $("#row_data_24 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_branch.push($(this).val().trim())
//             }
//         });

//         $("#row_data_25 input").each(function () {
//             if ($(this).val().trim() != '') {
//                 arr_year.push($(this).val().trim())
//             }
//         });




//         const csrftoken = getCookie('csrftoken');
        
//         swal.showLoading();
//         $.ajax({
//             type: 'POST',
//             url: "upload_excel_data",
//             headers: { 'X-CSRFToken': csrftoken },
//             data: {
//                 'registration': arr_registrationNo, 'studentName': arr_name, "dob": arr_dob, "gender": arr_gender, "gardionName": arr_guardianName, "gargionrelatio": arr_guardianRelation, "handy": arr_handy, "diasabe": arr_diasability, "email": arr_email, "mobile": arr_mobile,
//                 "gardionmobile": arr_guardianMobile, "gardionemail": arr_guardianEmail, "currentaddress": arr_currentAddress, "currentcountery": arr_currentCountry,
//                 "currentstate": arr_currentState, "currentdistrict": arr_currentDistrict, "currentpincode": arr_currentPincode, "premanetaddress": arr_permanentAddress, "permcountery": arr_permanentCountry,
//                 "premstate": arr_permanentState, "permdistrict": arr_permanentDistrict, "prempincode": arr_permanentPincode, "course": arr_course, "year": arr_year, "branch": arr_branch
//             },
//             success: function (response) {
//                 console.log(response);
//                 if (response['success'] == 'success') {
//                     Swal.fire({
//                         position: 'center',
//                         icon: 'success',
//                         title: 'Sheet uploaded successfully',
//                         showConfirmButton: false,
//                         timer: 1500
//                     }).then(function(){
//                         location.href = "/student_list";
//                     })
//                 } else {
//                     Swal.fire('An error occured!');
//                     return false;
//                 }
//             }
//         });



//     });
// });


// $(document).ready(function () {
//     localStorage.clear();
//     $('#ShowcsvPreviewData').prop('disabled', false);
// });



// // ============================================================ VALIDATION FOR STUDENT DETAILS FIELDS ===============================================================
// // Validation For Email
// // ---===============----
// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email.replace(/\s/g, ''));
// }

// // Validation For registrationNumber 
// // ---===============----
// function validateRegistrationNumber(inputtxt) {
//     const re = /^[a-zA-Z0-9]+$/;
//     return re.test(inputtxt.replace(/\s/g, ''));
// }

// // Validation For Mobile Number
// // ---=====================-----
// function phonenumber(inputtxt) {
//     var phone = inputtxt;
//     var phoneNum = phone.replace(/[^\d]/g, '');
//     if (phoneNum.length === 10) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// // Validation For Amount oF Purchase
// // ---============================-----
// function pincode_validation(inputtxt) {
//     let isnum = /^\d+$/.test(parseInt(inputtxt));
//     var amt = inputtxt.replace(/[^\d]/g, '');
//     if (amt.length <= 6 && isnum) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// // Validation For Gender Of Customer(male,femail,others)
// // ---============================-----
// function gender_validation(inputtxt) {
//     var gen = inputtxt.toLowerCase();
//     if (gen.trim() === 'male' || gen.trim() === 'female' || gen.trim() === 'others' || gen.trim() === 'm' || gen.trim() === 'f') {
//         return true
//     }
//     else {
//         return false
//     }
// }



// // Validation For DOB Of Customer
// // ---============================-----

// function dob_validation(inputtxt) {

//     var pattern_dash = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
//     var patterns_slash = /^([0-9]{2})\-([0-9]{2})\-([0-9]{4})$/;
//     if (pattern_dash.test(inputtxt.trim()) || patterns_slash.test(inputtxt.trim())) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// // Validation For Name Of Customer
// // ---============================-----
// function validation_Name(inputtxt) {

//     var flagGender = gender_validation(inputtxt);
//     var flagR = flagGender ? true : false;
//     var letters = /^[A-Za-z]+$/;
//     var txt = inputtxt.toLowerCase();
//     if (txt.replace(/\s/g, '').trim().match(letters) && !flagR && txt.replace(/\s/g, '').trim() != 'mala') {
//         return true;
//     }
//     else {
//         return false;
//     }
// }


// // Validation For Name Of Customer
// // ---============================-----
// function validation_InvoNO(inputtxt) {
//     var flagGender = gender_validation(inputtxt);
//     var flagName = validation_Name(inputtxt);
//     var flagR = flagGender ? true : false;
//     var flagN = flagName ? true : false;
//     var letters = /^[0-9a-zA-Z]+$/;
//     if (inputtxt.trim().match(letters) && !flagR && !flagN && inputtxt.replace(/\s/g, '').trim() != 'mala') {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// // Validation For DOM Of Customer
// // ---============================-----
// function address_validation(inputtxt) {

//     var pattern_dash = /^[a - zA - Z0 - 9\s,'-]*$/;
//     if (pattern_dash.test(inputtxt.trim())) {
//         return true
//     }
//     else {
//         return false
//     }
// }


// var headerList = []
// function getValueanchortag(a, id_column) {
//     var findlocalStorage = a.innerHTML.replace(/\s/g, '');
//     console.log('AAA', findlocalStorage);

//     var n = headerList.includes(findlocalStorage);

//     if (n == false) {
//         headerList.push(findlocalStorage);
//         console.log('this is my headersList : ', headerList)
//         localStorage.setItem('headerList', headerList);
//     }

//     var realHeader = a.getAttribute("dataheadre").trim();
//     console.log('.' + a.innerHTML.replace(/\s/g, ''));
//     // $('.' + a.innerHTML.replace(/\s/g, '')).css("pointer-events", "none");

//     // Featch Data From Local Storage
//     var getLocalData = Object.entries(localStorage);
//     var x = '';
//     for (var z = 0; z < getLocalData.length; z++) {
//         if (getLocalData[z][0].trim() === findlocalStorage.trim())
//             x = getLocalData[z][1];
//     }


//     // Render Data In Row 1,2,3,....
//     var data_list = x.split('|');
//     var li_str = DisplayData(data_list, realHeader);
//     console.log('this is list data : ', li_str);

//     $('#row_data_' + id_column).html(li_str);
//     // var row_2 = []; // contact
//     // var row_6 = []; // amount
//     // var row_7 = []; // invoice.

//     // $("#row_data_2 :input").each(function () {
//     //     row_2.push($(this).val());
//     // });

//     // $("#row_data_6 :input").each(function () {
//     //     row_6.push($(this).val());
//     // });

//     // $("#row_data_7 :input").each(function () {
//     //     row_7.push($(this).val());
//     // });
//     // console.log('>>>>>>>>>>>', row_2.length, row_6.length, row_7.length);
//     // if (row_2.length != 0 && row_6.length != 0 && row_7.length != 0) {
//     //     $('#ShowPreviewSheetData').prop('disabled', false);
//     // }
// }



// //  ================================    DISPLAY CSV DATA   ================================
// function DisplayData(wholeData, realHeader) {
//     var li_str = '';
//     var li = '';
//     var data_list = wholeData;
//     if (realHeader === 'studentRegistrationNumber') {
//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isName = validateRegistrationNumber(data_list[i]);
//             var NameLI = isName ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\"  class=\" " + realHeader + "\"  value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' />";

//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + NameLI;
//             }
//             else {
//                 li_str = NameLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentName') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isNumber = validation_Name(data_list[i]);
//             var NumLI = isNumber ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + NumLI;
//             }
//             else {
//                 li_str = NumLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentDOB') {
//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOB = dob_validation(data_list[i]);
//             var DOBLI = isDOB ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {
//                 li_str = li_str + '<hr/>' + DOBLI;
//             }
//             else {
//                 li_str = DOBLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentGender') {
//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isGender = gender_validation(data_list[i]);
//             var GENLI = isGender ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + GENLI;
//             }
//             else {
//                 li_str = GENLI;
//             }
//         }
//     }
//     else if (realHeader === 'guardianName') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isEmail = validation_Name(data_list[i]);
//             var mailLI = isEmail ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + mailLI;
//             }
//             else {
//                 li_str = mailLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentGuardianRelation') {
//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isAMT = validation_Name(data_list[i]);
//             var AMTLI = isAMT ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + AMTLI;
//             }
//             else {
//                 li_str = AMTLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentHandSelection') {
//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isAMT = validation_Name(data_list[i]);
//             var AMTLI = isAMT ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + AMTLI;
//             }
//             else {
//                 li_str = AMTLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentDisability') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentEmail') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validateEmail(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentMobile') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = phonenumber(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'guardianMobile') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = phonenumber(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'guardianEmail') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validateEmail(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentAddress') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = address_validation(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentCountry') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentState') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentDistrict') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentPinCode') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = pincode_validation(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentPermanentAddress') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = address_validation(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentPermanentCountry') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentPermanentState') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentPermanentDistrict') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentPermanentPinCode') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = pincode_validation(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentCourse') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentBranch') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }
//     else if (realHeader === 'studentYear') {

//         for (var i = 0; i < data_list.length; i++) {
//             var column = data_list[i].trim().length != 0 ? data_list[i] : "NA";
//             var isDOM = validation_Name(data_list[i]);
//             var DOMLI = isDOM ? "<input type=\"text\" class=\" " + realHeader + "\" onkeyup='ValidateAfterUpload(this)' style='border: none' value=\'" + column + "'\ />" : "<input type=\"text\" class=\" " + realHeader + "\" value=\'" + column + "'\  style='color:red;border: none;' onkeyup='ValidateAfterUpload(this)' style='border: none'/>";
//             if (li_str != '') {

//                 li_str = li_str + '<hr/>' + DOMLI;
//             }
//             else {
//                 li_str = DOMLI;
//             }
//         }
//     }

//     return li_str
// }



// function back_show() {
//     $('.UploadCSVModule').show();
//     $('.PreviewUploadCSVModule').hide();
// }










// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }


// function myFunction() {
//     $('#sheetuploadbtn').prop('disabled', true);
//     var arr_name = [];
//     var arr_mobno = [];
//     var arr_dob = [];
//     var arr_gender = [];
//     var arr_amt = [];
//     var arr_invoiceno = [];
//     var arr_mailID = [];
//     var arr_dom = [];


//     $("#review_data_1 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_name.push($(this).text().trim())
//         }
//     });


//     $("#review_data_2 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_mobno.push($(this).text().trim())
//         }
//     });

//     $("#review_data_3 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_dob.push($(this).text().trim())
//         }
//     });


//     $("#review_data_4 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_gender.push($(this).text().trim())
//         }
//     });


//     $("#review_data_5 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_mailID.push($(this).text().trim())
//         }
//     });



//     $("#review_data_6 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_amt.push($(this).text().trim())
//         }
//     });


//     $("#review_data_7 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_invoiceno.push($(this).text().trim())
//         }
//     });

//     $("#review_data_8 li").each(function () {
//         if ($(this).text().trim() != '') {
//             arr_dom.push($(this).text().trim())
//         }
//     });

//     const csrftoken = getCookie('csrftoken');
//     $('.loaders').show();
//     $.ajax({
//         type: 'POST',
//         url: "uploadcsvData",
//         headers: { 'X-CSRFToken': csrftoken },
//         data: { Name: arr_name.toString(), ContactNO: arr_mobno.toString(), DOB: arr_dob.toString(), MAILID: arr_mailID.toString(), GENDER: arr_gender.toString(), AMT: arr_amt.toString(), INVONO: arr_invoiceno.toString(), DOM: arr_dom.toString() },
//         success: function (response) {
//             console.log(response);
//             if (response['msg'] === 'Success') {
//                 $('.loaders').hide();
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'success',
//                     title: 'Your work has been saved',
//                     showConfirmButton: true,
//                     timer: 2500
//                 }).then(function () {
//                     window.location.href = "/sheet";
//                 })

//             }
//             else {
//                 $('.loaders').hide();
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'error',
//                     title: 'Please check your entries! \n File is not uploaded.',
//                     showConfirmButton: false,
//                     timer: 4000
//                 }).then(function () {
//                     window.location.href = "/sheet";
//                 })

//             }
//         }
//     })
// }

// // =====================================================    VALIDATER AFTER UPLOADING SHEET DATA     =================================================
// function ValidateAfterUpload(pointer) {
//     var realHeader = $(pointer).attr('class');
//     var data = pointer.value;


//     if (realHeader.trim() === 'studentName') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentCountry') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentState') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentDistrict') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentPermanentCountry') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentPermanentState') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentPermanentDistrict') {
//         var isName = validation_Name(data);
//         isName === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentRegistrationNumber') {
//         var isNumber = validateRegistrationNumber(data);
//         isNumber === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentMobile') {
//         var isNumber = phonenumber(data);
//         isNumber === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'guardianMobile') {
//         var isNumber = phonenumber(data);
//         isNumber === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentDOB') {
//         var isDOB = dob_validation(data);
//         isDOB === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentGender') {
//         var isGender = gender_validation(data);
//         isGender === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentEmail') {
//         var isEmail = validateEmail(data);
//         isEmail === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'guardianEmail') {
//         var isEmail = validateEmail(data);
//         isEmail === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentPinCode') {
//         var isEmail = pincode_validation(data);
//         isEmail === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
//     else if (realHeader.trim() === 'studentPermanentPinCode') {
//         var isEmail = pincode_validation(data);
//         isEmail === true ? $(pointer).css({ 'color': 'black' }) : $(pointer).css({ 'color': 'red' });
//     }
// }


// function submitData() {
//     alert();
//     $('#header_list tr').each(function () {
//         $(this).find('td').each(function () {
//             //do your stuff, you can use $(this) to get current cell
//         })
//     })
//     // /////////////////////////////////////
//     var header_list = document.getElementById("mytab1");
//     var r = 0; //start counting rows in table
//     while (row = header_list
//         .rows[r++]) {
//         var c = 0; //start counting columns in row
//         while (cell = row.cells[c++]) {
//             cell.innerHTML = '[R' + r + 'C' + c + ']'; // do sth with cell
//         }
//     }
// }





// // function confirmSubmission(){
// //     Swal.fire({
// //         title: 'Are you sure?',
// //         text: "Do you want to edit total questions?\n This will remove your section question and question type details data! !",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#3085d6',
// //         cancelButtonColor: '#d33',
// //         confirmButtonText: 'Yes'
// //     }).then((result) => {
// //         if (result.isConfirmed) {
// //             return true;
// //         }else{
// //             return false;
// //         }
// //     })
// // }