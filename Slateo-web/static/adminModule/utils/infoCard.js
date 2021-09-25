export function infoCard(label, total, color, imagePath,ID) {
    // var FiledRequired = Required == 'False' ? '' : 'required';
    var inputTag = '<div class="card info">\
        <div class="card-content">\
            <div class="card-body">\
                <div class="media d-flex"><div class="media-body text-left align-self-bottom mt-1">\
                        <h1 class="mb-0" id="'+ID+'"><div class="loader"></div></h1>\
                        <span style="color:'+ color + ';" class="d-block mb-1 font-medium-1 mt-1">' + label + '</span></div><img src=' + imagePath +'></div>\
                </div>\
            </div>\
    </div>';
    return inputTag;
}
// #fe8700
// ../images/dashboard/resources.png