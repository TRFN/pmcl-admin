
<?php
    function ctrl_ui($ctx){
        $ctx->projects = array();
        foreach(glob("./../html/*/") as $folder){
            $folder = realpath($folder);

            if(file_exists($folder . "/app/motor/core.php") && end(explode("/",$folder)) !== "P-MCL"){
                $ctx->projects[] = $folder;
            }
        }

        print_r($ctx);
    }
?>
