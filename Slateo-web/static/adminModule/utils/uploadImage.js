export function uploadImage(label, inputID, imageID, sourceFile) {
    var imageField = '<label>'+ label +'</label>\
                            < label class="upl_photo" >\
                                <input type="file" name="" id='+ inputID +'>\
                                <img src="'+ sourceFile +'" id='+ imageID +'>\
                                <span class="btn btn-info btn-sm">Choose Photo</span>\
                            </label>';
    return imageField;
}