<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{!! csrf_token() !!}" />
        <title>iReq schema chose</title>
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">

    </head>
    <body>
        <div class="main-content">
            <h3>Generate candidate schema</h3>
            <form action="<?php echo URL::to('/process');?>" method="post">
                <label for="schema_chose">Select theme:</label>
                <div class="form-group">
                    <div class="dropdown">                        
                        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Themes
                            <span class="caret"></span>
                        </button>
                        <ul id="schema_chose" class="dropdown-menu">
                            <?php foreach ($themes as $theme) { ?>
                                <li><a data-value="<?php echo $theme['id']; ?>" onclick="setValue(this)"><?php echo $theme['name']; ?></a></li>  
                            <?php } ?>
                        </ul>
                    </div>
                </div>
                <input name="theme_name" id="theme_name" type="hidden" value="">
                <button type="submit" class="btn btn-danger">Generate candidate schema</button>
            </form>
        </div>
        <script>
            function setValue(elem) {
                $('#dropdownMenu1').text($(elem).text());
                $('#theme_name').val($(elem).attr('data-value'));
            }
        </script>
        <script src="js/jquery-1.11.3.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js"></script>
</html>