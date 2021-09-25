// ====================================================================================================
// all headers localstorage data
var Branch = localStorage.getItem('Branch');
var Contact = localStorage.getItem('Contact');
var permanentcountry = localStorage.getItem('permanentcountry');
var Handselection = localStorage.getItem('Handselection');
var permanentaddress = localStorage.getItem('permanentaddress');
var currentdistrict = localStorage.getItem('currentdistrict');
var Gender = localStorage.getItem('Gender');
var currentpincode = localStorage.getItem('currentpincode');
var permanentdistrict = localStorage.getItem('permanentdistrict');
var permanentpincode = localStorage.getItem('permanentpincode');
var Year = localStorage.getItem('Year');
var RegistrationNo = localStorage.getItem('RegistrationNo');
var currentCountry = localStorage.getItem('currentCountry');
var StudentName = localStorage.getItem('StudentName');
var DOB = localStorage.getItem('DOB');
var RelationwithGuardian = localStorage.getItem('RelationwithGuardian');
var permanentstate = localStorage.getItem('permanentstate');
var GuardianName = localStorage.getItem('GuardianName');
var Email = localStorage.getItem('Email');
var Disability = localStorage.getItem('Disability');
var Currentaddress = localStorage.getItem('Currentaddress');
var currentstate = localStorage.getItem('currentstate');
var Course = localStorage.getItem('Course');
var Guardiancontact = localStorage.getItem('Guardiancontact');

// ====================================================================================================
// headerList local storage data
var headers = localStorage.getItem('headerList');
var headerList = headers.split(',');
console.log(headerList);

for(var i=0;i<headerList.length;i++){
    console.log(headerList[i]);
    if (headerList[i] == "RegistrationNo"){
        regNo = RegistrationNo.split('|');
        console.log(regNo);
        var row1 = '';
        for(var j=0; j<regNo.length; j++){
            console.log(regNo[j]);
            var row1 = row1 + '<li>'+regNo[j]+'</li><hr>';
        }
        $('#review_data_1').append(row1);
        console.log('row1 : ',row1);
    }
    else if (headerList[i] == "StudentName") {
        regNo = StudentName.split('|');
        console.log(regNo); 
        var row2 = '';
        for (var j = 0; j < regNo.length; j++) {
            console.log(regNo[j]);
            var row2 = row2 + '<li>'+regNo[j]+'</li><hr>';
        }
        console.log('row2 : ', row2);
        $('#review_data_2').append(row2);
    }
    else if (headerList[i] == "DOB") {
        regNo = DOB.split('|');
        console.log(regNo);
        var row3 = '';
        for (var j = 0; j < regNo.length; j++) {
            console.log(regNo[j]);
            var row3 = row3 + '<li>'+regNo[j]+'</li><hr>';
        }
        console.log('row3 : ', row3);
        $('#review_data_3').append(row3);
    }
}




function submitStudentSheetData(){
    alert('Data Saved successfully !');
}