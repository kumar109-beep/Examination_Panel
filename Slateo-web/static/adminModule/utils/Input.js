export function Input(Type = '', Class = '', ID = '', PlaceHolder = '', Name = '', Required = 'False', ValidaiionType = '', applyValidation = 'False', labelRequired = 'False', label = '', icon = '',iconLoc='') {
    var FiledRequired = Required == 'False' ? '' : 'required';
    var addLabel = labelRequired == 'True' ? '<label>' + label + '</label>' : '';
    var inputTag = '<fieldset class="form-group position-relative '+ iconLoc + '">'+ addLabel + '<input type="'+ Type + '" class="' + Class + '" id="' + ID + '" \
                 placeholder="'+ PlaceHolder + '" name="' + Name + '" ' + FiledRequired + ' onkeyup=' + ValidaiionType + '(this)> \
                <div class="form-control-position"><i class="'+ icon + '"></i></div>\
                </fieldset>';
    return inputTag;
}