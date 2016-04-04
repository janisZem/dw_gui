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

function autoEntities(id) {
/*
    var entitiesObj = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // `states` is an array of state names defined in "The Basics"
        local: entities
    });

    $('.req-input').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'entitiesObj',
        source: entitiesObj
    });*/
}



