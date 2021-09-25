import { Input } from '../utils/Input.js';
import { Button } from '../utils/Button.js';
import { spaceNotAllow } from '../validation/validation.js';
import { resetPassword,resetPasswordButton } from '../globalVariables/variable.js'


// #############################################################################################
// ############################### Code Render Html Form #######################################
// #############################################################################################

// -------- Reset Mail ID Input Box ---------
var InoutFormField = '';
var attrInputdata = [resetPassword];
for (var i = 0; i < attrInputdata.length; i++) {
    const inputTag = Input(attrInputdata[i][0], attrInputdata[i][1], attrInputdata[i][2], attrInputdata[i][3], attrInputdata[i][4], attrInputdata[i][5],attrInputdata[i][6]);
    InoutFormField = InoutFormField + inputTag
}
$('#resetPass').html(InoutFormField);

// --------- Reset  Button  -------
var ButtonFormField = '';
var attrButtondata = [resetPasswordButton];
for (var i = 0; i < attrButtondata.length; i++) {
    const buttonTag = Button(attrButtondata[i][0], attrButtondata[i][1], attrButtondata[i][2]);
    ButtonFormField = ButtonFormField + buttonTag
}
$('#reasetButton').html(ButtonFormField);



// ###############################################################################################
// ##################################### Validation ##############################################
// ###############################################################################################

// For Checking Validation Email Input
spaceNotAllow(resetPassword[2]);

