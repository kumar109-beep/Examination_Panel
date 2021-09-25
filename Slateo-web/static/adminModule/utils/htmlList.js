export function HtmlList(Preview_imagePath ='',Edit_imagePath='') {
    var buttonTag = '<div class="card">\
                        <div class="card-content">\
                        <div id="recent-projects" class="media-list position-relative">\
                                <div class="table-responsive">\
                                    <table class="table table-padded table-xl mb-0 tbl-btn">\
                                        <thead>\
                                            <tr>\
                                                <th class="border-top-0">Exam Id </th>\
                                                <th class="border-top-0">Exam Name</th>\
                                                <th class="border-top-0">Month Range</th>\
                                                <th class="border-top-0">Actions</th>\
                                            </tr>\
                                        </thead>\
                                        <tbody>\
                                            <tr>\
                                                <td class="text-truncate align-middle">\
                                                    <a href="#">E10022</a>\
                                                </td>\
                                                <td class="text-truncate">\
                                                    Class 2nd Mid Terms 2020 \
                                                </td>\
                                                <td class="text-truncate pb-0">\
                                                    <span>Feb-Mar, 20201</span>\
                                                </td>\
                                                <td>\
                                                    <a href="">\
                                                 <img src=' + Edit_imagePath +' //></a>\
                                                    <a href="">\
                                                        <img src=' + Preview_imagePath +' //></a>\
                                                </td>\
                                            </tr>\
                                          <tr>\
                                                <td class="text-truncate align-middle">\
                                                    <a href="#">E10022</a>\
                                                </td>\
                                                <td class="text-truncate">\
                                                    Class 2nd Mid Terms 2020 \
                                                </td>\
                                                <td class="text-truncate pb-0">\
                                                    <span>Feb-Mar, 20201</span>\
                                                </td>\
                                                <td>\
                                                    <a href="">\
                                                    <img src=' + Edit_imagePath +' //></a>\
                                                    <a href="">\
                                                        <img src=' + Preview_imagePath +' //></a>\
                                                </td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
  return buttonTag;
}





   