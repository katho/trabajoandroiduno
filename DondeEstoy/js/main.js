$( document ).ready(function() {
    console.log( "document loaded" );
    var latitud_1;
    var longitud_1;
    var latitud_2;
    var longitud_1;
    var distancia;
    var origen;
    var destino;
    var alerta;
    var resultado;

    function aRadianes(num)
    {
        return num * Math.PI / 180;
    }

    function haversine() 
    {
        var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
        var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
        var R = 6372.8; // km
        var dLat = lat2 - lat1;
        var dLon = lon2 - lon1;
        var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.asin(Math.sqrt(a));
        return R * c;
    }

    $("#envia-forma").click(
        function()
        {
            latitud_1  = $("#latitud-1").val();
            longitud_1 = $("#longitud-1").val();
            latitud_2  = $("#latitud-2").val();
            longitud_2 = $("#longitud-2").val();
            
            origen  = $("#nombre-origen").val();
            destino = $("#nombre-destino").val();

            latitud_1  = $.trim(latitud_1);
            longitud_1 = $.trim(longitud_1);
            latitud_2  = $.trim(latitud_2);
            longitud_2 = $.trim(longitud_2);

            origen  = $.trim(origen);
            destino = $.trim(destino);

            

            alerta = '<br><br><div class="alert alert-danger alert-dismissible fade show" role="alert">'+
                        '<strong>Ha habido un error!</strong> Todos los campos de la forma son obligatorios.'+
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>' + 
                     '</div>';

            if((latitud_1 !== "")&&(longitud_1 !== "") && (latitud_2 !== "") && (longitud_2 !== "") && (origen !== "") && (destino !== ""))
            {
                console.log(origen+": "+latitud_1+","+longitud_1+" \n "+destino+": " +latitud_2+","+longitud_2);

                var currentdate = new Date(); 
                var datetime = currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() +" "   
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds();
                
                resultado = '<div class="container" id="resultado">'+
                                datetime+' La distancia de '+ origen +' a '+ destino +' es '+
                                haversine(latitud_1, longitud_1, latitud_2, longitud_2) +' km.' +
                            '</div>';

                console.log(haversine(latitud_1, longitud_1, latitud_2, longitud_2));
                $("#resultados").prepend(resultado);
            }
            else
            {
                
                $(".mi-alerta").prepend(alerta);
                $(".alert").alert()
            }

            
        }
    );
});