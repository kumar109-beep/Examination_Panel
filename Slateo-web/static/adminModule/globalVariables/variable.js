// ======================================  VARIABLES FORMAT  ===================================================
// Format For Input =====> Type = '', Class = '', ID = '', PlaceHolder = '', Name = '', Required = 'False', ValidaiionType = '', applyValidation = 'False', labelRequired='False', label = ''
// Type ,Class ,buttonLabel  ========>>> Format For Button
//  herf. class, Label  =======>> Fromat For Anchor Tags
// dashboard card =======>> label,count,#ID,Color,imagePath
// deafult static variable ====> './static'
// Add Student Form Variables :
// gender =======> label,className,genderptions
// address =======> ID = '', PlaceHolder = '', Name = '', Required = 'False', labelRequired = 'False', label = ''
// =============================================================================================================
// Login Froms Variable
// ======================
export var loginUserName = ['text', 'form-control round', 'user-name', 'Your Username', 'username', 'True', 'validate_User_EMail', 'False', 'False', '', 'ft-user', 'has-icon-left'];
export var loginPassword = ['password', 'form-control round', 'user-password', 'Your Password', 'userpassword', 'True', 'simpleValidation', 'False', 'False', '', 'ft-lock', 'has-icon-left'];
export var loginbutton = ['submit', 'btn round btn-block btn-glow btn-bg-gradient-x-purple-blue col-12 mr-1 mb-1', 'Login',];
export var anchorTagResetPass = ['recover-password', 'card-link', 'Forgot Password?'];
export var anchorTagSignUP = ['register', 'card-link', 'Sign Up'];

// SignUP Forms Variable
// =====================
export var resetPassword = ['text', 'form-control round', 'user-name', 'Enter Registered Mail ID', 'username', 'True', 'validate_User_EMail'];
export var resetPasswordButton = ['submit', 'btn round btn-block btn-glow btn-bg-gradient-x-purple-blue col-12 mr-1 mb-1', 'Submit'];

// Dashboard Card Variable
// ========================
export var card1 = ['Total Student', '0', '#card1', '#fe8700', 'adminModule/images/dashboard/student.png','totalStudent'];
export var card2 = ['Total Resources', '0', '#card2', '#21a632', 'adminModule/images/dashboard/resources.png','totalResources'];
export var card3 = ['Total Upcoming Exams', '0', '#card3', '#00aaea', 'adminModule/images/dashboard/batches.png','totalBatches'];

// Default static path variable
// =========================
export var defaultStaticPath = './static/'

// Add Student Form Variables
// =======================
// ----------- Student Personal Details --------------------------
export var studentRegistrationNumber = ['text', 'form-control', 'studentRegistrationNo', 'Enter registration no.', 'studentRegNo', 'True', 'validate_User_EMail', 'False', 'True', 'Registration No.', ''];
export var studentFirstName = ['text', 'form-control', 'StudentFname', 'Enter first name', 'StudentFname', 'True', 'validate_User_EMail', 'False', 'True', 'First Name', ''];
export var studentLastName = ['text', 'form-control', 'StudentLname', 'Enter last name', 'StudentLname', 'True', 'validate_User_EMail', 'False', 'True', 'Last Name', ''];
export var gender = ['Gender', 'genderOpt', ['Male', 'Female', 'Other'], 'studentGender']
export var studentGuardianName = ['text', 'form-control', 'StudentguardianName', 'Enter guardian name', 'StudentguardianName', 'True', 'validate_User_EMail', 'False', 'True', 'Guardian Name', ''];
export var studentGuardianRelation = ['Relation with guardian', 'relationOpt', ['Father', 'Mother', 'Brother', 'Sister', 'Aunt', 'Uncle', 'Cousin', 'Grandparent'], 'studentGuardianRelation']

// ---------- Student Contact Details ----------------------------
export var studentEmail = ['email', 'form-control', 'studentEmail phone', 'Enter email id', 'studentEmail', 'True', 'validate_User_EMail', 'False', 'True', 'Email ID.', ''];
export var studentMobileNumber = ['tel', 'form-control', 'phone1', 'Enter mobile number', 'phone1', 'True', 'validate_User_EMail', 'False', 'True', 'Mobile No.', ''];
export var studentGuardianMobileNumber = ['tel', 'form-control', 'phone2', "Enter guardian's Mobile Number", 'phone2', 'True', 'validate_User_EMail', 'False', 'True', "Guardian's Mobile Number", ''];
export var studentAddress = ['studentAddress', 'Enter student address', 'studentAddress', 'True', 'True', 'Address']
export var studentstate = ['State', 'stateOpt', ['Andhra Pradesh', 'Bihar', 'Uttar Pradesh', 'Uttarakhand', 'West Begal'], 'studentState']
export var studentCountry = ['Country', 'countryOpt', ['India', 'UK', 'USA', 'Nigeria', 'Japan'], 'studentCountry']
export var studentDistrict = ['District', 'districtOpt', ['aa', 'xx', 'cc', 'gg', 'ii'], 'studentDistrict']
export var studentPinCode = ['text', 'form-control', 'StudentPinCode', 'Enter pin code', 'StudentPinCode', 'True', 'validate_User_EMail', 'False', 'True', 'Pin code', ''];
export var studentCourse = ['Course Applied for', 'courseOpt', ['B.A.', 'BSc.', 'B.Tech.', 'M.A.', 'MSc.'], 'studentCourse']
export var studentBranch = ['Branch', 'branchOpt', ['Math', 'CSE', 'ME', 'CE', 'Nano Technology','Physics'],'studentBranch']
export var studentCourseYear = ['Year', 'courseYearOpt', [1,2,3,4], 'studentYear']
export var studentDateOfBirth = ['Date Of Birth']
export var studentImage = ['Upload Student Photograph', 'stu_photo', 'imgphoto', 'static/adminModule/images/avatar.jpg']
export var addStudentSubmitButton = ['submit', 'btn btn-primary pl-5 pr-5', 'Submit','addStudent'];


// --------------------- API URL and END POINT -----------------
export var apiBaseUrl = ['http://13.233.247.133/api/']
// export var apiBaseUrl = ['http://127.0.0.1:5000/api/']


