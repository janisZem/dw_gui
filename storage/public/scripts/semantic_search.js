
var projectLimit = 500; //+50
var def = 'Education';


var entities = [];
var debug = 0;
searchEntities(def, entities.length);

function themseSelected() {
    //alert('im here ' + $('#theme_name').val());
    if ($('#theme_name').val() !== '') {
        searchEntities($('#theme_name').val(), entities.length);
    }
}

/*
 * reverse function, fill enities variable, for autocomplite
 */
function searchEntities(word, contin) {
    //console.log('im here2: ' + word + " caller: " + arguments.callee.caller);
    if (entities.length > projectLimit) {
        return;
    }
    $.ajax({
        dataType: "json",
        async: true,
        url: 'http://wikidata.org/w/api.php?action=wbsearchentities&search=' + word + '&limit=50continue=' + contin + '&language=en&format=json&callback=?'

    }).done(function (data) {
        //console.log(data);
        for (var i = 0; i < data.search.length; i++) {
            //entities[Object.keys(entities).length + 1] = {'id': i, 'name': data.search[i].label};
            entities.push(data.search[i].label);
        }
        if (data.search.length < 50) {
            return;
        }
        if (entities.length < 100) {
            searchEntities(def, entities.length);
        } else if ($('#theme_name').val() !== '') {
            //console.log(theme);
            searchEntities($('#theme_name').val(), entities.length);
        }
        //console.log(entities);
        //console.log(entities.length);
    });

}
