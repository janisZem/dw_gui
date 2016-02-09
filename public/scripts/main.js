var MT = {
    fileLoc: 'scripts/xml/model.xml',
    readTextFile: function (file) {
        if (!file) {
            file = MT.fileLoc;
        }
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    // console.log(rawFile.responseText);
                    return MT.pharseXML(rawFile.responseText);
                }
            }
        }
        rawFile.send(null);
    },
    pharseXML: function (xml) {
        console.log(xmlToJSON.parseString(xml));
        MT.drawMenu(xmlToJSON.parseString(xml));
    },
    drawMenu: function (json) {
        console.log((json.XMI[0].Model[0].packagedElement).length);
        for (var i = 0; i < json.XMI[0].Model[0].packagedElement.length; i++) {
            var thisElem = json.XMI[0].Model[0].packagedElement[i];
            if (thisElem._attr.type._value === "uml:Class") {
                //console.log('11');
                if (MT.findParent(json, thisElem._attr.id._value)) {
                    console.log(thisElem._attr.name._value + ' found parent: ' + MT.findParent(json, thisElem._attr.id._value));
                } else {
                    console.log(thisElem._attr.name._value + ' not found parent');
                }
            }
            //console.log(json.XMI[0].Model[0].packagedElement[i]._attr.id._value);
        }
    },
    findParent: function (json, child) {
        for (var i = 0; i < json.XMI[0].Model[0].packagedElement.length; i++) {
            // console.log('olol');
            var thisElem = json.XMI[0].Model[0].packagedElement[i];
            if (thisElem._attr.type._value === "uml:Class") { //find parent only class elements
                // console.log('ir klase');
                if (thisElem.hasOwnProperty('generalization')) { //find parnet if generalization
                    //console.log('generalization');
                    console.log('padotais child: ' + child + ' atrastais: ' + thisElem.generalization[0]._attr.general._value);
                    if (thisElem.generalization[0]._attr.general._value === child &&
                            thisElem.generalization[0]._attr.general._value !== child) {
                        return thisElem;
                    }
                }
            }
        }

    }
};