export function textArea(ID = '', PlaceHolder = '', Name = '', Required = 'False',labelRequired = 'False', label = '') {
    var FiledRequired = Required == 'False' ? '' : 'required';
    var addLabel = labelRequired == 'True' ? '<label>' + label + '</label>' : '';
    var TextAreaTag = '<label>' + addLabel +'</label>\
                        <textarea class="form-control" id='+ ID + ' name=' + Name +' placeholder="'+ PlaceHolder +'" "" '+ FiledRequired +'></textarea>';
    return TextAreaTag;
}