
var MT = {
    drawMenu: function () {
        $('.multi-level').children().remove(); //remove old menu elems
        console.log(cfg.length);
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].parent === null) { //parent element - root elem
                console.log(cfg[i]);
                $('.multi-level').append(' <li class="dropdown-submenu"><a>' + cfg[i].name + '</a>' + MT.findchilds(cfg[i]) + '</li>');
            }
        }
    },
    /*
     * Function who find one element childs, returns html string
     */
    findchilds: function (elem) {
        var childHTML = "";
        var a = "";
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].parent) {
                for (var j = 0; j < cfg[i].parent.length; j++) {
                    if (cfg[i].parent[j] === elem.id) {
                        var revChilds = MT.findchilds(cfg[i]);
                        if (revChilds !== "") {
                            a += '<li class="dropdown-submenu"><a onclick="MT.doAction(\''
                                    + cfg[i].id + '\')">'
                                    + cfg[i].name
                                    + '</a>'
                                    + MT.findchilds(cfg[i])
                                    + '</li>';
                        } else {
                            a += '<a onclick="MT.doAction(\''
                                    + cfg[i].id + '\')">'
                                    + cfg[i].name
                                    + '</a>';
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
    doAction: function (id) {
        var elem = MT.findElem(id);
        if (elem.action === "dropown") {
            console.log(MT.drawDropDown(elem));
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
                + '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                + ' Izvēlies <span class="caret"></span>  </button>'
                + ' <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">';
        for (var i = 0; elem.values.length; i++) {
            html += '<li><a href="#">test</a></li>';
        }
        html += '  </ul></div>';
    }
};
