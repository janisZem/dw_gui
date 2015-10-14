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
                    console.log(rawFile.responseText);
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
        console.log((json.Model[0].packagedElement).length);
        for (var i = 0; i < json.Model[0].packagedElement.length; i++) {
            MT.findParent()
            console.log(json.Model[0].packagedElement[i]);
        }
    },
    findParent: function (json, child) {
        for (var i = 0; i < json.Model[0].packagedElement.length; i++) {
           
        }

    }
};