var bp = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: bpArr
});

bp.initialize();

$('#bp').typeahead(
        null, {
            name: 'bp',
            displayKey: 'name',
            source: bp.ttAdapter()

        }).on('typeahead:selected', function (event, data) {
    $('#bp').attr('data-value', data.id);
});

var st = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: stArr
});

st.initialize();

$('#st').typeahead(
        null, {
            name: 'st',
            displayKey: 'name',
            source: st.ttAdapter()

        }).on('typeahead:selected', function (event, data) {
    $('#st').attr('data-value', data.id);
});


var stocks = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: themses
});

stocks.initialize();

$('#theme_name').typeahead(
        null, {
            name: 'stocks',
            displayKey: 'name',
            source: stocks.ttAdapter()

        }).on('typeahead:selected', function (event, data) {
    $('#theme_name').attr('data-value', data.id);
});


var schemas = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: schemasArr
});

schemas.initialize();

$('#schema_name').typeahead(
        null, {
            name: 'schemas',
            displayKey: 'title',
            source: schemas.ttAdapter()

        }).on('typeahead:selected', function (event, data) {
    $('#schema_name').attr('data-value', data.id);
});

function autoEntities(elem) {
    var val = $(elem).val();
    $.ajax({
        type: "POST",
        url: "get_suggestions",
        data: 'keyword=' + val + '&theme=' + $('#theme_name').attr('data-value'),
        beforeSend: function () {
            $(".req-input").css("background", "#FFF url(pic/LoaderIcon.gif) no-repeat 165px");
        },
        success: function (data) {
            console.log(data);
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<div onclick="elementSelected(' + data[i].id + ', \'' + data[i].value + '\', \'' + $(elem).parent().parent().attr('id') + '\')">' + data[i].value + '</div>';
            }
            $("#suggesstion-box").show();
            $("#suggesstion-box").addClass('tt-menu class-sugg');
            $("#suggesstion-box").html(html);

        }
    });

}

function elementSelected(id, name, parentId) {
    $('.class-sugg').remove();
    $('#' + parentId).children('div').children('input').first().val(name);
    $('#' + parentId).attr('data-id', id);
}



