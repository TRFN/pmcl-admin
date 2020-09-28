
const $jsonProps = {
    change:function(data){
        atualizarCores();
        window.jsonOutput = data;
    }
};

function feed(o, path, value) {
    var del = arguments.length == 2;

    if (path.indexOf('.') > -1) {
        var diver = o,
            i = 0,
            parts = path.split('.');
        for (var len = parts.length; i < len - 1; i++) {
            diver = diver[parts[i]];
        }
        if (del) delete diver[parts[len - 1]];
        else diver[parts[len - 1]] = value;
    } else {
        if (del) delete o[path];
        else o[path] = value;
    }
    return o;
}

$("#json").jsonEditor((window.jsonOutput=%conteudo%), $jsonProps);

projetos = %lista%;

for(i = 0; i < projetos.length; i++ ){
    nome = projetos[i].split("/");
    $("#projetos").append('<div class="col-md-3 col-lg-2"><a href="/%subd%' + String(i) + '" class="btn btn-primary btn-block" style="font-weight: bold;margin: 24px 0;font-size: 12px;">' + nome[nome.length-1] + '</a></div>');
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function acaocor(color) {
    if(!/hsv/.test($(this).val())){
        $(this).val($(this).val().split("rgb(").join('"').split(")").join('"'));
    } else {
        $(this).val("0, 0, 0");
    }
}

$("#search").keyup(function(){
    if($(this).val().length == 0){
        $("#json .item").removeClass('expanded');
    } else {
        window.query = $(this).val();
        $("#json .item").addClass("disabled");
        $("#json .item").removeClass("expanded").each(function(){
            if($(this).html().split(query).length > 1){
                $(this).removeClass("disabled").addClass("expanded");
                $(this).find("> .item:first").removeClass("disabled").addClass("expanded");
            }
        });
    }
})

atualizarCores = (function(){
    $("input.value").each(function(){
        $(this).parent().find(".dup").length == 0 && (
            $("<a class='dup btn btn-primary'><i class='fa fa-files-o fa-fw'></i></a>").insertAfter(this),
            $(this).parent().find(".dup").click(function(){
                e = $(this).parent().data("path").split(".");
                o = $(this).parent().data("path");
                u = $(this).parent().find(".property").val() + " - copia";

                if(e[0].length == 0){
                    e = u;
                } else {
                    e.push(u);
                    e = e.join(".");
                }

                $("#json").jsonEditor((window.jsonOutput=feed(jsonOutput, e, (u=JSON.parse($(this).parent().find(".value").val())))), $jsonProps);
                atualizarCores();
                // o = '.item[data-path="' + o + '"]';
                // $(o).first().parent().addClass("expanded");
                // console.log($(o + ":not(.appender)").last()[0].outerHTML);
                // $($(o + ":not(.appender)").last()[0].outerHTML).insertAfter($(this).parent());
            })
        );
        if((match=/(\d{1,3}), (\d{1,3}), (\d{1,3})/).test(val=$(this).val()) && !/:/.test(val)){
            cor = match.exec(val);
            $(this).spectrum({
                showPaletteOnly: true,
                togglePaletteOnly: true,
                togglePaletteMoreText: 'Mais Cores',
                togglePaletteLessText: 'Menos Cores',
                color: 'rgb(' + val.split('"').join('') + ')',
                change: acaocor,
                palette: [
                    ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                    ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                    ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                    ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                    ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                    ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                    ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                    ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
                ]
            });

            $(this).parent().addClass("color");
        } else {
            $(this).spectrum("destroy");
            $(this).parent().removeClass("color");
        }
    });
});

atualizarCores();
