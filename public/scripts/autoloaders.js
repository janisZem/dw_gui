console.log(themses);
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

function autoEntities(id) {
    console.log($('.req-input'));
    var enitiesObj = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: entities
    });

    enitiesObj.initialize();

    $(id).typeahead(
            null, {
                name: 'enitiesObj',
                displayKey: 'name',
                source: enitiesObj.ttAdapter()

            }).on('typeahead:selected', function (event, data) {
        $(id).attr('data-value', data.id);
    });
}
