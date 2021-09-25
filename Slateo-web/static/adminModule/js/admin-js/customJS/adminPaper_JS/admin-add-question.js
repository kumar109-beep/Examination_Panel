// ---------------------------------------------------------------------------------------------------------------------------------------------
//                                                        RESET FILTER
// ---------------------------------------------------------------------------------------------------------------------------------------------
function resetFilter() {
    $('#filterDiv').css('opacity', 0.3);

    $('#tableDiv').css('opacity', 0.1);
    $('#loader').css('display', '');

    array = []
    $("#resetFilter").removeClass("fas fa-sync-alt");
    $("#resetFilter").addClass("spinner-grow spinner-grow-sm");

    setTimeout(function () {

        $("#resetFilter").removeClass("spinner-grow spinner-grow-sm");
        $("#resetFilter").addClass("fas fa-sync-alt");

        $("input[name='Difficulty']").prop('checked', false);
        $("input[name='questionType']").prop('checked', false);
        $("input[name='language']").prop('checked', false);
        $("input[name='marks']").prop('checked', false);


        $('.sel_filters').html('');
        $('#filterDiv').css('opacity', 1);
        $('#allFilter').show();

    }, 1000);

    $('#tableDiv').css('opacity', 1);
    $('#loader').css('display', 'none');


}
// ---------------------------------------------------------------------------------------------------------------------------------------------
//  ---------------------------------------------------------------------------------------------------------------------------------------------
//                                                        FILTER SELECTION
// ---------------------------------------------------------------------------------------------------------------------------------------------
var array = []
function filterSelect(thisTxt) {

    $('#allFilter').hide();
    var data = $(thisTxt).val();

    if (array.includes(data)) {
        var index = array.indexOf(data);
        if (index > -1) {
            array.splice(index, 1);
        }
        var dataStr = '';
        if (array.length != 0) {
            for (var i = 0; i < array.length; i++) {
                var dataString = '<a href="javascript:;" class="filterData">' + array[i] + '</a>&nbsp;';

                dataStr = dataStr + dataString;
                $('.sel_filters').html('');
                $('.sel_filters').append(dataStr);
            }
        } else {
            $('.sel_filters').html('');
            $('.sel_filters').append('<a href="javascript:;" class="filterData">All</a>&nbsp;');
        }
    } else {
        $('.sel_filters').append('<a href="javascript:;" class="filterData">' + data + '</a>&nbsp;');
        array.push(data)
    }
}
// ----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
