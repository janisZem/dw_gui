var STORE = {
    store: function () {
        var classes = $('#req_master').children('div');
        if (classes.length === 0) {
            alert('No classes added!');
        } else {
            STORE.createSchema();
        }
    },
    createSchema: function (classes) {
        $.ajax({
            url: 'http://localhost/dw_gui/public/create_schema',
            type: "post",
            data: STORE.createJSON(),
            success: function (id) {
                console.log(id);
            }
        });
    },
    createJSON: function () {
        var parent = '0_menu';
        var childs = $('[data-parent="0_menu"]');
        var data = {};
        var lowestChilds = STORE.findLowestChilds();
        var counter = 0;
        for (var i = 0; i < lowestChilds.length; i++) {
            var child = lowestChilds[i];
            var parent = $(child).attr('data-parent');
            while (parent !== '0_menu') {
                data[counter] = {'title': 'eeeeee', '_token': $('meta[name=_token]').attr('content')};
                counter++;
                parent = $('#' + $(child).attr('data-parent')).attr('data-parent');
                child = $('#' + $(child).attr('data-parent'));
            }
        }
        return data;
    },
    findRel: function (child, parent, data) {

    },
    findLowestChilds: function () {
        var divs = $('div').filter('[data-parent]');
        var lowestDivs = [];
        var found = 0;
        for (var i = 0; i < divs.length; i++) {
            found = 0;
            for (var j = 0; j < divs.length; j++) {
                if (divs[i].id === $(divs[j]).attr('data-parent') && divs[i].id !== divs[j].id) {
                    found = 1;
                    break;
                }
            }
            if (found === 0) {
                lowestDivs.push(divs[i]);
            }
        }
        return lowestDivs;
    }
};