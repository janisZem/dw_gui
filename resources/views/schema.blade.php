<!DOCTYPE html>
<html>
    <head>
        <title>Candidate schema</title>
        <meta name="description" content="Interactive entity-relationship diagram or data model diagram implemented by GoJS in JavaScript for HTML." />
        <!-- Copyright 1998-2016 by Northwoods Software Corporation. -->
        <meta charset="UTF-8">
        <script src="js/go.js"></script> 
        <script src="scripts/diagram.js"></script>
        <script>

            var myArr = [<?php
                foreach ($modelClasses as $m) {
                    echo '{ key: "';
                    echo $m['key'];
                    if ($m['items'] > 0) {
                        echo '", items:[';
                        foreach ($m['items'] as $i) {
                            echo '{name: "';
                            echo $i['name'] . '",';
                            echo 'iskey: ';
                            echo $i['iskey'] . ',';
                            echo 'figure: "';
                            echo $i['figure'] . '",';
                            echo 'color: ';
                            echo '"' . $i['color'] . '"';
                            echo '}';
                        }
                        echo "]";
                    }
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
            <div id="myDiagram" style="background-color: white; border: solid 1px black; width: 100%; height: 700px"></div>
        </div>
    </body>
</html>