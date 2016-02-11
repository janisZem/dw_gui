var HTML = {
    /*
     * function who draws new div, which represents class in UML metamodel
     */
    newClass: function (html, id, className, parentID) {
        return '<div id="' + id + '" data-parent="' + parentID + '" class="uml-class"><div>' + html + '</div></div>';
    },
    /*
     * function who draws some UML class dropdown, for example, Arithmetical Operator
     */
    drawDropDown: function (elem) {
        var html = '<div class="dropdown">'
                + '<button class="btn btn-default dropdown-toggle values-dropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                + ' Izvēlies <span class="caret"></span>  </button>'
                + ' <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">';
        for (var i = 0; i < elem.values.length; i++) {
            html += '<li><a onclick="MT.submitDropDown(this)">' + elem.values[i] + '</a></li>';
        }
        html += '  </ul></div>';
        return html;
    },
    /*
     * function who draws some UML class input some value, for example, Qualifying Data
     */
    drawInput: function () {
        return '<input style="width:65%; margin:3px; display: inline;" type="text" class="form-control req-input">'
                + '<input style="width:30%;" onclick="MT.submitInput(this)" class="btn btn-default sbt-btn" type="submit" value="Submit">';
    },
    /*
     * function who draws + button, which opens menu from UML cfg.js file
     */
    drawNewButton: function (id, cfgID, postion) {
        var className = 'btn-primary';
        return '   <div class="dropdown dropdown-menu-req">'
                + '    <a id="dLabel" role="button" data-toggle="dropdown"'
                + '       class="btn ' + className + '"'
                + '       onclick="MT.drawMenu(\'' + id + '\', \'' + cfgID + '\', \'' + postion + '\')" >'
                + '        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'
                + '    </a>'
                + '    <ul class="dropdown-menu multi-level" role="menu">'
                + '    </ul>'
                + '</div>';
    }
};
