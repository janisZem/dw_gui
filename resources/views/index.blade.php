<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>MT</title>


        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">

    </head>
    <body>
        <div class="container">
            <h1></h1>
            <hr>
            <div class="dropdown dropdown-menu-req">
                <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" onclick="MT.drawMenu('0_menu', 'req', 'b')" >
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </a>
                <ul class="dropdown-menu multi-level" role="menu">
                </ul>
            </div>     
            <div id="req_master">

            </div>


        </div>
        <script src="scripts/jquery-1.11.3.js" type="text/javascript"></script> 
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>   
        <script src="scripts/html_elements.js" type="text/javascript"></script>
        <script src="scripts/cfg.js" type="text/javascript"></script>
        <script src="scripts/main2.js" type="text/javascript"></script>
    </body>
</html>