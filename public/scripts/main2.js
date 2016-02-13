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
        var elem = MT.findElem(cfgID);
        var newLevelID = MT.genID();
        var html = "";
        switch (elem.action) {
            case "dropdown":
                {
                    html = '<div class="class-name" id="name_' + newLevelID + '">' + elem.name + '</div><br>' + HTML.drawDropDown(elem);
                }
                break;
            case "input":
                {
                    html = '<div class="class-name" id="name_' + newLevelID + '">' + elem.name + '</div><br>' + HTML.drawInput(elem);
                }
                break;
            default:
            {
                html = '<div class="class-name" id="name_' + newLevelID + '">' + elem.name + '</div>';
            }
        }
        if (MT.findchilds(MT.findElem(cfgID)).length !== 0) {
            MT.CON.newElem(html + HTML.drawNewButton(newLevelID, cfgID, 'b'), newLevelID, elem.id, menuID);
        } else {
            MT.CON.newElem(html, newLevelID, elem.id, menuID);
        }
    },
    submitInput: function (elem) {
        var $elem = $(elem);
        var val = $elem.parent().children('input').first().val();
        if (val === '') {
            alert('No value insert! Please insert some value.');
            return;
        }
        $(elem).after(val);
        var id = $elem.parent().parent().attr('id');
        $elem.parent().parent().attr('data-value-' + id, val);
        console.log(id);
        console.log($elem.parent().parent());
        $(elem).parent().children('input').hide();
    },
    submitDropDown: function (elem) {
        var $elem = $(elem);
        var id =  $elem.parent().parent().parent().parent().parent().attr('id');
        $elem.parent().parent().parent().attr('data-value-' + id, $elem.text());
        $elem.parent().parent().after($elem.text());
        $elem.parent().parent().parent().children('button').hide();
    },
    findElem: function (id) {
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].id === id) {
                return cfg[i];
            }
        }
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
