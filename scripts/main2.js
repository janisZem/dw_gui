/*
 * 
 * @var cfg - declare in cfg.js
 */

var MT = {
    drawMenu: function (menuID, elemID, position) {
        $('.dropdown-menu').children().remove(); //remove old menu elems
        var elem = MT.findElem(elemID);
        $('.multi-level').append(' <li class="dropdown-submenu">' +
                '<a>' + elem.name + '</a>' + MT.findchildsHTML(elem, menuID, 0, position) +
                '</li>');
    },
    /*
     * Function who find one element childs, returns html string
     * Reverse function
     * 
     */
    findchildsHTML: function (elem, menuID, called, postion) {
        if (called) { //levels can be add by one
            return "";
        }
        var childHTML = "";
        var a = "";
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].parent) {
                for (var j = 0; j < cfg[i].parent.length; j++) { // foreach element parent
                    if (cfg[i].parent[j] === elem.id) {
                        var revChilds = MT.findchildsHTML(cfg[i], menuID, 1, postion);
                        if (revChilds !== "") {
                            a += '<li class="dropdown-submenu"><a onclick="MT.doAction(\''
                                    + cfg[i].id + '\', \'' + menuID + '\', \'' + postion + '\')">'
                                    + cfg[i].name
                                    + '</a>'
                                    + revChilds
                                    + '</li>';
                        } else {
                            a += '<li class="dropdown"><a onclick="MT.doAction(\''
                                    + cfg[i].id + '\', \'' + menuID + '\', \'' + postion + '\')">'
                                    + cfg[i].name
                                    + '</a></li>';
                        }
                    }
                }
                if (a !== "") {
                    childHTML += '<ul class="dropdown-menu"><li>' + a + '</li></ul>';
                }
            }
        }
        //console.log(childHTML);
        return childHTML;
    },
    doAction: function (cfgID, menuID, position) {

        //console.log(menuID);
        var elem = MT.findElem(cfgID);
        //MT.checkLevel(elem, menuID); //to remove +
        var newLevelID = MT.genID();
        var html = "";
        switch (elem.action) {
            case "dropdown":
                {
                    html = elem.name + '<br>' + MT.drawDropDown(elem);
                }
                break;
            case "input":
                {
                    html = elem.name + '<br>' + MT.drawInput(elem);
                }
                break;
            default:
            {
                html = elem.name;
            }
        }
        if (MT.findchilds(MT.findElem(cfgID)).length !== 0) {
            MT.CON.newElem(MT.drawNewButton(newLevelID, cfgID, 'b') + html, newLevelID, elem.id, menuID);
            // MT.TABLE.appendRow(MT.drawNewButton(newLevelID, cfgID, 'b') + html, newLevelID, elem.id, menuID);
        } else {
            MT.CON.newElem(html, newLevelID, elem.id, menuID);
            // MT.TABLE.appendRow(html, newLevelID, elem.id, menuID);

        }

    },
    findElem: function (id) {
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].id === id) {
                return cfg[i];
            }
        }
    },
    /*
     * to do - add submit button
     */
    drawDropDown: function (elem) {
        var html = '<div class="dropdown">'
                + '<button class="btn btn-default dropdown-toggle values-dropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                + ' Izvēlies <span class="caret"></span>  </button>'
                + ' <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">';
        for (var i = 0; i < elem.values.length; i++) {
            html += '<li><a href="">' + elem.values[i] + '</a></li>';
        }
        html += '  </ul></div>';
        return html;
    },
    drawInput: function () {
        return '<input style="width:70%; margin:3px;" type="text" class="form-control" placeholder="">';
    },
    genID: function () {
        return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
    },
    /*
     * remove menu, if choosen element have not any childs 
     */
    checkLevel: function (elem, menuID) {
        if (MT.findchilds(elem).length === 0) {
            $('#' + menuID).children('.dropdown-menu-req').remove();
        }
    },
    /*
     * finds cfg element all childs
     * return array of childs
     */
    findchilds: function (elem) {
        //console.log(elem);
        var childs = [];
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].parent) {
                for (var j = 0; j < cfg[i].parent.length; j++) {
                    if (cfg[i].parent[j] === elem.id) {
                        childs.push(cfg[i]);
                    }
                }
            }
        }
        return childs;
    },
    drawNewButton: function (id, cfgID, postion) {
        var className = 'btn-primary';
        if (postion === 'b') {
            var className = 'btn-primary';
        } else {
            var className = 'btn-danger';
        }
        return '   <div class="dropdown dropdown-menu-req">'
                + '    <a id="dLabel" role="button" data-toggle="dropdown"'
                + '       class="btn ' + className + '"'
                + '       onclick="MT.drawMenu(\'' + id + '\', \'' + cfgID + '\', \'' + postion + '\')" >'
                + '        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'
                + '    </a>'
                + '    <ul class="dropdown-menu multi-level" role="menu">'
                + '    </ul>'
                + '</div>';
    },
    CON: {
        /*
         * html - div html content
         * new element id
         * className - add specific class name 
         * parentID element parent ID
         */
        newElem: function (html, id, className, parentID) {
            console.log(parentID);
            if (parentID === '0_menu') {
                $('#req_master').append(HTML.newClass(html, id, className, parentID));
            } else {
                $('#' + parentID).append(HTML.newClass(html, id, className, parentID));
            }
        }

    }
};
