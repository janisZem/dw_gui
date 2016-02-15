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
        var data = {};
        data['theme_name'] = $('#theme_name').val();
        data['theme_id'] = $('#theme_name').attr('data-value');
        data['schema_name'] = $('#schema_name').val();
        data['schema_id'] = $('#schema_name').attr('data-value');
        data['classes'] = STORE.createJSON();
        $.ajax({
            url: 'http://localhost/dw_gui/public/create_schema',
            type: "post",
            data: data,
            success: function (id) {
                console.log(id);
            }
        });
    },
    createJSON: function () {
        var parent = '0_menu';
        var data = {};
        var lowestChilds = STORE.findLowestChilds();
        var counter = 0;
        for (var i = 0; i < lowestChilds.length; i++) {
            var child = lowestChilds[i];
            var parent = $(child).attr('data-parent');
            while (parent !== 0) {
                var $elem = $(child);
                if (STORE.checkRel($elem.attr('id'), parent, data)) {
                    data[counter] = {
                        'type': $elem.attr('data-type'),
                        'name': $('#name_' + $elem.attr('id')).text(),
                        'html_id': $elem.attr('id'),
                        'value': $("[data-value-" + $elem.attr('id')).attr("data-value-" + $elem.attr('id')),
                        'parent': parent
                    };
                    counter++;
                }
                if (parent === '0_menu') {
                    parent = 0;
                } else {
                    parent = $('#' + $elem.attr('data-parent')).attr('data-parent');
                    child = $('#' + $elem.attr('data-parent'));
                }
            }
        }
        return data;
    },
    checkRel: function (child, parent, data) {
        for (var d in data) {
            if (data[d].html_id === child && data[d].parent === parent) {
                return false;
            }
        }
        return true;
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