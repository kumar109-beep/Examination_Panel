import { Input } from '../utils/Input.js';
import { Button } from '../utils/Button.js';
import { Anchortag } from '../utils/Anchortag.js';
import { spaceNotAllow } from '../validation/validation.js';
import { loginUserName, loginPassword,loginbutton,anchorTagResetPass,anchorTagSignUP} from '../globalVariables/variable.js'


// #############################################################################################
// ############################### Code Render Html Form #######################################
// #############################################################################################

// -------- Username && Password INPUT BOX ---------
var InoutFormField = '';
var attrInputdata = [loginUserName,loginPassword];
for (var i = 0; i < attrInputdata.length; i++) {
    const inputTag = Input(attrInputdata[i][0], attrInputdata[i][1], attrInputdata[i][2], attrInputdata[i][3], attrInputdata[i][4], attrInputdata[i][5], attrInputdata[i][6], attrInputdata[i][7], attrInputdata[i][8], attrInputdata[i][9], attrInputdata[i][10], attrInputdata[i][11]);
    InoutFormField = InoutFormField + inputTag
}
$('#renderInputBox').html(InoutFormField);

// --------- Login Button  -------
var ButtonFormField = '';
var attrButtondata = [loginbutton];
for (var i = 0; i < attrButtondata.length; i++) {
    const buttonTag = Button(attrButtondata[i][0], attrButtondata[i][1], attrButtondata[i][2]);
    ButtonFormField = ButtonFormField + buttonTag
}
$('#renderLoginButton').html(ButtonFormField);

// --------- Anchor Tag  -----------
var anchorTagField = '';
var attrAnchordata = [anchorTagResetPass];
for (var i = 0; i < attrAnchordata.length; i++) {
    const anchortags = Anchortag(attrAnchordata[i][0], attrAnchordata[i][1], attrAnchordata[i][2]);
    anchorTagField = anchorTagField + anchortags
}

    

$('#renderAnchorTag').html(anchorTagField);


var anchorTagField1 = '';
var attrAnchordata1 = [anchorTagSignUP];
for (var i = 0; i < attrAnchordata1.length; i++) {
    const anchortags1 = Anchortag(attrAnchordata1[i][0], attrAnchordata1[i][1], attrAnchordata1[i][2]);
    anchorTagField1 = anchorTagField1 + anchortags1
}
$('#renderAnchorTag1').html('<span>Don \'t have an account ? ' + anchorTagField1 + '</span>');



// ###############################################################################################
// ##################################### Validation ##############################################
// ###############################################################################################


loginUserName[7] == 'True' ? spaceNotAllow(loginUserName[2]) : //pass;

// For Checking Validation UserName


// For Checking Validation Password
spaceNotAllow(loginPassword[2]);

