export function dropDown(label, className, Options,name='') {
    var part1 = '<label>' + label + '</label><select class="form-control" name="' + name +'"><option class="d-none">Select</option>'
    var part2 = '</option></select>'
    var element = '';
    for (var i = 0; i < Options.length; i++) {
        element = element + "<option value='" + Options[i] + "' class="+className+">"+Options[i]+"</option>"
    }
    var dropDownelement = '';
    dropDownelement = part1+element+part2;
    return dropDownelement;
}