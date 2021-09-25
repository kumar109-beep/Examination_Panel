export function Button(Type='',Class='',buttonLabel = '',ID='') {
    var buttonTag = '<div class="form-group text - center">\
    <button type='+Type+' class="'+ Class +'" id='+ID+'>\
    '+buttonLabel+'</button></div>';
  return buttonTag;
}

