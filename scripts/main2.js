/*
 * 
 * @var cfg - declare in cfg.js
 */

var MT = {
    /*drawMenu: function (menuID) {
     $('.dropdown-menu').children().remove(); //remove old menu elems
     console.log(menuID);
     for (var i = 0; i < cfg.length; i++) {
     if (cfg[i].parent === null) { //parent element - root elem
     $('.multi-level').append(' <li class="dropdown-submenu"><a>' + cfg[i].name + '</a>' + MT.findchildsHTML(cfg[i], menuID) + '</li>');
     }
     }
     }, */
    drawMenu: function (menuID, elemID, position) {
        console.log('im here ' + menuID + ' pos ' + position);
        $('.dropdown-menu').children().remove(); //remove old menu elems
        var elem = MT.findElem(elemID);
        $('.multi-level').append(' <li class="dropdown-submenu"><a>' + elem.name + '</a>' + MT.findchildsHTML(elem, menuID, 0, position) + '</li>');
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
        console.log(menuID);
        var elem = MT.findElem(cfgID);
        //MT.checkLevel(elem, menuID); //to remove +
        var newLevelID = MT.genID();
        var html = "";
        switch (elem.action) {
            case "dropdown":
                {
                    html = MT.drawDropDown(elem);
                }
                break;
            case "input":
                {
                    html = MT.drawInput(elem);
                }
                break;
            default:
            {
                html = elem.name;
            }
        }
        if (position === 'b') {
            $('.req-table').append(MT.drawBottomLevel(newLevelID, html, cfgID));
        } else {
            MT.drawRightLevel();
        }
    },
    findElem: function (id) {
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].id === id) {
                return cfg[i];
            }
        }
    },
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
    /*
     * to do - check when draw button, when not (element is in last level)
     */
    drawBottomLevel: function (id, html, cfgID) {
        if (MT.findchilds(MT.findElem(cfgID)).length !== 0) { //if element can be childs, then draw + button
            return '<tr><td id="' + id + '">'
                    + html + MT.drawNewButton(id, cfgID, 'b')
                    + MT.drawNewButton(id, cfgID, 'r ')
                    + '</td></tr>';
        } else {
            return '<tr><td id="' + id + '">' + html + '</td></tr>';
        }
    },
    drawRightLevel: function () {
        console.log($('.req-table').children('tr'));
    },
    findParent: function () {},
    /*
     * id - tr ID 
     * cfgID - cfg element
     * position - b = bottom, r - right (where explain table)
     */
    drawNewButton: function (id, cfgID, postion) {
        return '   <div class="dropdown dropdown-menu-req">'
                + '    <a id="dLabel" role="button" data-toggle="dropdown"'
                + '       class="btn btn-primary"'
                + '       onclick="MT.drawMenu(\'' + id + '\', \'' + cfgID + '\', \'' + postion + '\')" >'
                + '        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'
                + '    </a>'
                + '    <ul class="dropdown-menu multi-level" role="menu">'
                + '    </ul>'
                + '</div>';
    }

};
