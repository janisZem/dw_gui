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
// console.log('im here ' + menuID + ' pos ' + position);
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
        if (position === 'b') {
            MT.TABLE.appendRow(MT.drawBottomLevel(newLevelID, html, cfgID, menuID), newLevelID, elem.id, menuID);

        } else {
            MT.drawRightLevel(newLevelID, elem.id, menuID);
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
        console.log(elem);
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
    drawBottomLevel: function (id, html, cfgID, parentID) {
        var parent = MT.findTableParent(parentID);
        /*
         * creating right level button need find parent who can have two childs
         */
        //console.log('parent ' + parent);
        if (MT.findchilds(MT.findElem(cfgID)).length !== 0) { //if element can have childs, then draw + button
            return MT.drawNewButton(id, cfgID, 'b') + MT.drawNewButton(id, parent, 'r ') + html;
        } else {
            return MT.drawNewButton(id, parent, 'r ') + html;
        }
    },
    /*
     * 
     */
    drawRightLevel: function (id, className, parentID) {
        var parent = MT.findTableParent(parentID);
        console.log('parnts: ' + parent);
        MT.TABLE.appendColumn(id, className);
    },
    /*
     * id - tr ID 
     * cfgID - cfg element
     * position - b = bottom, r - right (where explain table)
     */
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
    /*
     * parentID - td id from which action is called
     */
    findTableParent: function (parentID) {
        // console.log('olol' + parentID);
        if (parentID === '0_menu') {
            return MT.findElem('req').id;
        }
        var $elem = $('#' + parentID);
        var cfgElem = MT.findElem($elem.attr('class')); //fix me: can be more than one class

        if ($elem.attr('data-parent') === '0_menu') {
            return MT.findElem('req').id;
        }
        if (MT.findchilds(cfgElem).length > 1) { //atleast have two childs
            return cfgElem.id; //recived elem can be parent
        }
        var flag = 1;
        var cfgElem = MT.findElem($('#' + $elem.attr('data-parent')).attr('class'));
        var parentElem = $elem;
        while (flag === 1) {
            if (parentElem.attr('data-parent') === '0_menu') {
                return 'req';
            }
            if (MT.findchilds(cfgElem).length > 1) {
                return cfgElem.id;
            }
            parentElem = $('#' + parentElem.attr('data-parent'));
            cfgElem = MT.findElem(parentElem.attr('class'));
        }
    },
    findLimit: function (id, cfgID) {

    },
    TABLE: {// source - http://www.redips.net/javascript/adding-table-rows-and-columns/
        appendRow: function (html, id, className, parentID) {
            //console.log(html);
            var tbl = document.getElementById('req_table');
            var row = tbl.insertRow(tbl.rows.length);
            for (var i = 0; i < tbl.rows[0].cells.length; i++) {
                MT.TABLE.createCell(row.insertCell(i), html, id, className, parentID);
            }
            if (tbl.rows[0].cells.length === 0) {
                MT.TABLE.createCell(row.insertCell(0), html, id, className, parentID);
            }
        },
        createCell: function (cell, text, id, className, parentID, merge) {

            cell.id = id;
            $(cell).append(text);
            $(cell).attr('class', className);
            $(cell).attr('data-parent', parentID);

        },
        //limit - number when stop
        //limit - 1 = have not me merged
        appendColumn: function (id, className) {
            var limit = 2;
            var tbl = document.getElementById('req_table');
            var merged = 0;
            var parentID = '0_menu';
            for (var i = 0; i < tbl.rows.length; i++) {
                if (i !== 0) {
                    parentID = $(tbl.rows[i]).prev().children('td').attr('id');
                }
                if (i < limit) {
                    var colsapn = $(tbl.rows[i]).children('td').attr('colspan');
                    if (!colsapn || colsapn < 2) {
                        colsapn = 1;
                    }
                    $(tbl.rows[i]).children('td').attr('colspan', colsapn + 1);
                } else if (i === limit) {
                    MT.TABLE.createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), 'insert text', id, className, parentID, 0);
                }

            }
        },
        // delete table rows with index greater then 0
        deleteRows: function () {
            var tbl = document.getElementById('req_table'), // table reference
                    lastRow = tbl.rows.length - 1, // set the last row index
                    i;
            // delete rows with index greater then 0
            for (var i = lastRow; i > 0; i--) {
                tbl.deleteRow(i);
            }
        },
        deleteColumns: function () {
            var tbl = document.getElementById('req_table'), // table reference
                    lastCol = tbl.rows[0].cells.length - 1, // set the last column index
                    i, j;
            // delete cells with index greater then 0 (for each row)
            for (i = 0; i < tbl.rows.length; i++) {
                for (j = lastCol; j > 0; j--) {
                    tbl.rows[i].deleteCell(j);
                }
            }
        }
    }
};
