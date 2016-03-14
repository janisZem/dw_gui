<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{!! csrf_token() !!}" />
        <title>iReq requirement input</title>
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">

    </head>
    <body>
        <div class="container">
            <h1></h1>
            <input onclick="window.location.href = '<?php echo URL::to('/generate'); ?>';" style="" class="btn btn-default" type="submit" value="Create candidate schema">
            <hr>
            <div class="dropdown dropdown-menu-req">
                <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" onclick="MT.drawMenu('0_menu', 'req', 'b')" >
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </a>
                <ul class="dropdown-menu multi-level" role="menu">
                </ul>
            </div>
            <input id="schema_name" class="form-control typeahead schema-names" type="text" placeholder="Project">
            <input id="theme_name" onblur="themseSelected()" class="form-control typeahead schema-names" type="text" placeholder="Themse">
            <input id="st" class="form-control typeahead schema-names" type="text" placeholder="Stateholder">
            <input id="bp" class="form-control typeahead schema-names" type="text" placeholder="Busness process">
            <input onclick="STORE.store()" class="btn btn-danger" type="submit" value="Save requirement">
            <hr>
            <div id="req_master">

            </div>


        </div>

        <script>
            var themses = <?php echo json_encode($themses); ?>;
            var schemasArr = <?php echo json_encode($schemas); ?>;
            var bpArr = <?php echo json_encode($bp); ?>;
            var stArr = <?php echo json_encode($st); ?>;
        </script>

        <script src="js/jquery-1.11.3.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js"></script>

        <script src="js/bootstrap3-typeahead.min.js" type="text/javascript"></script>
        <script src="scripts/semantic_search.js" type="text/javascript"></script>
        <script src="scripts/autoloaders.js" type="text/javascript"></script>
        <script src="scripts/html_elements.js" type="text/javascript"></script>
        <script src="scripts/cfg.js" type="text/javascript"></script>
        <script src="scripts/main2.js" type="text/javascript"></script>
        <script src="scripts/store_req.js" type="text/javascript"></script>
    </body>
</html>