
<?php
    function rglob($pattern, $flags = 0) {
        $files = glob($pattern, $flags);
        foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
            $files = array_merge($files, rglob($dir.'/'.basename($pattern), $flags));
        }
        return $files;
    }

    function ctrl_ui($ctx){
        $ctx->projects = array();
        foreach(glob("./../html/*/") as $folder){
            $folder = realpath($folder);

            if(file_exists($folder . "/app/motor/core.php") && end(explode("/",$folder)) !== "P-MCL"){
                $ctx->projects[] = $folder;
            }
        }

        $ctx->regVarStrict("lista", json_encode($ctx->projects));

        $ctx->regVarStrict("subd", "projetos/");

        $ctx->regVarStrict("conteudo", "{}");

        if(isset($ctx->urlParams[0]) && $ctx->urlParams[0] == "projetos" && isset($ctx->projects[(int)$ctx->urlParams[1]])){
            $projeto = $ctx->projects[(int)$ctx->urlParams[1]];
            $projeto = explode("/", $projeto);
            $projeto = $projeto[count($projeto)-1];
            $arquivos = array();
            foreach(rglob("./../html/{$projeto}/app/*.json") as $file){
                $file = realpath($file);
                if(file_exists($file)){
                    $arquivos[] = $file;
                }
            }



            $ctx->regVarStrict("lista", json_encode($arquivos));
            $ctx->regVarStrict("subd", "projetos/{$ctx->urlParams[1]}/");

            if(isset($ctx->urlParams[2]) && isset($arquivos[(int)$ctx->urlParams[2]])){

                $arquivo = $arquivos[(int)$ctx->urlParams[2]];
                $arquivo = explode("/", $arquivo);
                $arquivo = $arquivo[count($arquivo)-1];

                $ctx->regVarStrict("layout", "tabelas");

                $ctx->regVarStrict("conteudo",file_get_contents($arquivos[(int)$ctx->urlParams[2]]));

                $ctx->regVarStrict("painel-titulo", "{$projeto} -> {$arquivo}");
                $ctx->regVarStrict("painel-icone", "cogs");
            }
        }
    }
?>
