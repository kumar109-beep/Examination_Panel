import { Input } from '../utils/Input.js';
import { dropDown } from '../utils/dropDown.js';
import { Button } from '../utils/Button.js';
import { textArea } from '../utils/textArea.js';
import { datePicker } from '../utils/datePicker.js';
import { uploadImage } from '../utils/uploadImage.js';
import { gender, studentImage, studentBranch, addStudentSubmitButton, studentCourse, studentDateOfBirth, studentRegistrationNumber, studentFirstName, studentLastName, studentGuardianName, studentGuardianRelation, studentEmail, studentMobileNumber, studentGuardianMobileNumber, studentAddress, studentCountry, studentstate, studentDistrict, studentPinCode, studentCourseYear } from '../globalVariables/variable.js'


// #############################################################################################
// ######################## Code Render Html Add STUDENT Form ##################################
// #############################################################################################
// ################################################################################ Student Personal Details #############################################################
// --------------------------------  Student Registration Number -------------------------------
var studentRegistrationFormField = '';
var registrationData = [studentRegistrationNumber];
for (var i = 0; i < registrationData.length; i++) {
    const studentRegistrationNoinputTag = Input(registrationData[i][0], registrationData[i][1], registrationData[i][2], registrationData[i][3], registrationData[i][4], registrationData[i][5], registrationData[i][6], registrationData[i][7], registrationData[i][8], registrationData[i][9], registrationData[i][10], registrationData[i][11]);
    studentRegistrationFormField = studentRegistrationFormField + studentRegistrationNoinputTag
}
$('#registrationNoInput').html(studentRegistrationFormField);
// --------------------------------  Student First Name -------------------------------
var studentFnameFormField = '';
var FnameData = [studentFirstName];
for (var i = 0; i < FnameData.length; i++) {
    const studentFnameInputTag = Input(FnameData[i][0], FnameData[i][1], FnameData[i][2], FnameData[i][3], FnameData[i][4], FnameData[i][5], FnameData[i][6], FnameData[i][7], FnameData[i][8], FnameData[i][9], FnameData[i][10], FnameData[i][11]);
    studentFnameFormField = studentFnameFormField + studentFnameInputTag
}
$('#firstNameInput').html(studentFnameFormField);
// --------------------------------  Student Last Name -------------------------------
var studentLnameFormField = '';
var LnameData = [studentLastName];
for (var i = 0; i < LnameData.length; i++) {
    const studentLnameInputTag = Input(LnameData[i][0], LnameData[i][1], LnameData[i][2], LnameData[i][3], LnameData[i][4], LnameData[i][5], LnameData[i][6], LnameData[i][7], LnameData[i][8], LnameData[i][9], LnameData[i][10], LnameData[i][11]);
    studentLnameFormField = studentLnameFormField + studentLnameInputTag
}
$('#lastNameInput').html(studentLnameFormField);
// --------------------------------  Select Gender  --------------------------------------------
var genderFormField = '';
var genderdata = [gender];
for (var i = 0; i < genderdata.length; i++) {
    const dropelement = dropDown(genderdata[i][0], genderdata[i][1], genderdata[i][2], genderdata[i][3]);
    genderFormField = genderFormField + dropelement
}
$('#AddStudentFormGender').html(genderFormField);
// --------------------------------  Student Guardian Name -------------------------------
var studentguardianFormField = '';
var guardiannameData = [studentGuardianName];
for (var i = 0; i < guardiannameData.length; i++) {
    const studentGuardianNameInputTag = Input(guardiannameData[i][0], guardiannameData[i][1], guardiannameData[i][2], guardiannameData[i][3], guardiannameData[i][4], guardiannameData[i][5], guardiannameData[i][6], guardiannameData[i][7], guardiannameData[i][8], guardiannameData[i][9], guardiannameData[i][10], guardiannameData[i][11]);
    studentguardianFormField = studentguardianFormField + studentGuardianNameInputTag
}
$('#guardianInput').html(studentguardianFormField);
// --------------------------------  Student-Guardian Relation -------------------------------
var relationFormField = '';
var studentGuardianRelationdata = [studentGuardianRelation];
for (var i = 0; i < studentGuardianRelationdata.length; i++) {
    const dropelement = dropDown(studentGuardianRelationdata[i][0], studentGuardianRelationdata[i][1], studentGuardianRelationdata[i][2], studentGuardianRelationdata[i][3]);
    relationFormField = relationFormField + dropelement
}
$('#studentGuardianRelation').html(relationFormField);
// --------------------------------  Student DOB -------------------------------
var DOBFormField = '';
var studentDobData = [studentDateOfBirth];
for (var i = 0; i < studentDobData.length; i++) {
    const dobelement = datePicker(studentDobData[i][0]);
    DOBFormField = DOBFormField + dobelement
}
$('#studentDOB').html(DOBFormField);

// ################################################################## Student Contact Details ############################################################################
// --------------------------------  Student Email ID -------------------------------
var studentEmailFormField = '';
var EmailData = [studentEmail];
for (var i = 0; i < EmailData.length; i++) {
    const studentEmailInputTag = Input(EmailData[i][0], EmailData[i][1], EmailData[i][2], EmailData[i][3], EmailData[i][4], EmailData[i][5], EmailData[i][6], EmailData[i][7], EmailData[i][8], EmailData[i][9], EmailData[i][10], EmailData[i][11]);
    studentEmailFormField = studentEmailFormField + studentEmailInputTag
}
$('#studentEmailID').html(studentEmailFormField);

// --------------------------------  Student Mobile number -------------------------------
var studentMobileFormField = '';
var MobileData = [studentMobileNumber];
for (var i = 0; i < MobileData.length; i++) {
    const studentMobileInputTag = Input(MobileData[i][0], MobileData[i][1], MobileData[i][2], MobileData[i][3], MobileData[i][4], MobileData[i][5], MobileData[i][6], MobileData[i][7], MobileData[i][8], MobileData[i][9], MobileData[i][10], MobileData[i][11]);
    studentMobileFormField = studentMobileFormField + studentMobileInputTag
}
$('#studentMobile').html(studentMobileFormField);
// --------------------------------  Student Mobile number -------------------------------
var studentGuardianMobileFormField = '';
var gurdianMobileData = [studentGuardianMobileNumber];
for (var i = 0; i < gurdianMobileData.length; i++) {
    const studentGuardianMobileInputTag = Input(gurdianMobileData[i][0], gurdianMobileData[i][1], gurdianMobileData[i][2], gurdianMobileData[i][3], gurdianMobileData[i][4], gurdianMobileData[i][5], gurdianMobileData[i][6], gurdianMobileData[i][7], gurdianMobileData[i][8], gurdianMobileData[i][9], gurdianMobileData[i][10], gurdianMobileData[i][11]);
    studentGuardianMobileFormField = studentGuardianMobileFormField + studentGuardianMobileInputTag
}
$('#studentGuardianMobile').html(studentGuardianMobileFormField);

// --------------------------------  Student Address -------------------------------
var studentAddressFormField = '';
var guardianMobileData = [studentAddress];
for (var i = 0; i < guardianMobileData.length; i++) {
    const studentAddressTextAreaTag = textArea(guardianMobileData[i][0], guardianMobileData[i][1], guardianMobileData[i][2], guardianMobileData[i][3], guardianMobileData[i][4], guardianMobileData[i][5]);
    studentAddressFormField = studentAddressFormField + studentAddressTextAreaTag
}
$('#addressTextArea').html(studentAddressFormField);

// --------------------------------  Student Country -------------------------------
var countryFormField = '';
var studentCountrydata = [studentCountry];
for (var i = 0; i < studentCountrydata.length; i++) {
    const dropelement = dropDown(studentCountrydata[i][0], studentCountrydata[i][1], studentCountrydata[i][2], studentCountrydata[i][3]);
    countryFormField = countryFormField + dropelement
}
$('#addressCountrySelect').html(countryFormField);

// --------------------------------  Student State -------------------------------
var stateFormField = '';
var studentStatedata = [studentstate];
for (var i = 0; i < studentStatedata.length; i++) {
    const dropelement = dropDown(studentStatedata[i][0], studentStatedata[i][1], studentStatedata[i][2], studentStatedata[i][3]);
    stateFormField = stateFormField + dropelement
}
$('#addressStateSelect').html(stateFormField);

// --------------------------------  Student State -------------------------------
var districtFormField = '';
var studentDistrictdata = [studentDistrict];
for (var i = 0; i < studentDistrictdata.length; i++) {
    const dropelement = dropDown(studentDistrictdata[i][0], studentDistrictdata[i][1], studentDistrictdata[i][2], studentDistrictdata[i][3]);
    districtFormField = districtFormField + dropelement
}
$('#addressDistrictSelect').html(districtFormField);

// --------------------------------  Student Pin Code -------------------------------
var studentPinCodeFormField = '';
var pinCodeMobileData = [studentPinCode];
for (var i = 0; i < pinCodeMobileData.length; i++) {
    const studentPinCodeInputTag = Input(pinCodeMobileData[i][0], pinCodeMobileData[i][1], pinCodeMobileData[i][2], pinCodeMobileData[i][3], pinCodeMobileData[i][4], pinCodeMobileData[i][5], pinCodeMobileData[i][6], pinCodeMobileData[i][7], pinCodeMobileData[i][8], pinCodeMobileData[i][9], pinCodeMobileData[i][10], pinCodeMobileData[i][11]);
    studentPinCodeFormField = studentPinCodeFormField + studentPinCodeInputTag
}
$('#addressPinCode').html(studentPinCodeFormField);
// ################################################################## Student Course Details ############################################################################
// --------------------------------  Student Course -------------------------------
var courseFormField = '';
var courseData = [studentCourse];
for (var i = 0; i < courseData.length; i++) {
    const dropelement = dropDown(courseData[i][0], courseData[i][1], courseData[i][2], courseData[i][3]);
    courseFormField = courseFormField + dropelement
}
$('#studentCourse').html(courseFormField);
// --------------------------------  Student Branch -------------------------------
var branchFormField = '';
var branchData = [studentBranch];
for (var i = 0; i < branchData.length; i++) {
    const dropelement = dropDown(branchData[i][0], branchData[i][1], branchData[i][2], branchData[i][3]);
    branchFormField = branchFormField + dropelement
}
$('#studentBranch').html(branchFormField);
// --------------------------------  Student Course Current Year -------------------------------
var courseYearFormField = '';
var courseYearData = [studentCourseYear];
for (var i = 0; i < courseYearData.length; i++) {
    const dropelement = dropDown(courseYearData[i][0], courseYearData[i][1], courseYearData[i][2], courseYearData[i][3]);
    courseYearFormField = courseYearFormField + dropelement
}
$('#studentCourseYear').html(courseYearFormField);

// // --------------------------------  Student image -------------------------------
// var imageFormField = '';
// var studentImageData = [studentImage];
// for (var i = 0; i < studentImageData.length; i++) {
//     const imageData = uploadImage(studentImageData[i][0], studentImageData[i][1], studentImageData[i][2], studentImageData[i][3]);
//     imageFormField = imageFormField + imageData
// }
// $('#studentimage').html(imageFormField);
// ===================================   Add Student Buttom ============================
var addStudentButtonFormField = '';
var attrButtondata = [addStudentSubmitButton];
for (var i = 0; i < attrButtondata.length; i++) {
    const buttonTag = Button(attrButtondata[i][0], attrButtondata[i][1], attrButtondata[i][2], attrButtondata[i][3]);
    addStudentButtonFormField = addStudentButtonFormField + buttonTag
}
$('#renderAddStudentSubmitButton').html(addStudentButtonFormField);
