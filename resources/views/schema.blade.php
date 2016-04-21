<!DOCTYPE html>
<html>
    <head>
        <title>iReq candidate schema</title>
        <meta name="description"/>
        <!-- Copyright 1998-2016 by Northwoods Software Corporation. -->
        <meta charset="UTF-8">
        <script src="js/go.js"></script> 
        <script src="scripts/diagram.js"></script>
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <script>

            var myArr = [<?php
foreach ($modelClasses as $m) {
    echo '{ key: "';
    echo $m['key'] . '"';
    echo ', text: "' . $m['text'] . '"';
    echo "},";
}
?>];


            var myRels = [<?php
foreach ($rels as $r) {
    echo '{ from: "' . $r['from'] . '", to: "' . $r['to'] . '", text: "' . $r['text'] . '", toText: "' . $r['toText'] . '" },';
}
?>];


        </script>

    </head>
    <body onload="init()">
        <div id="sample">
            <div id="myDiagram" style="background-color: white; border: solid 1px black; width: 50%; height: 500px"></div>
        </div>
        <div onclick="save()" style="width: 80px" class="btn-danger">Saglabāt</div>
    </body>
</html>