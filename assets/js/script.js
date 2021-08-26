
//Smooth-scroll al hacerle click al #botón te lleva al contenido, y de vuelta el #subir-boton al navbar
$("#main-boton").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#outcome").offset().top
    }, 1500);
});

$("#subir-boton").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#navbar").offset().top
    }, 1000);
});

//funcion principal
$(function () {

    $('form').on('submit', (event)=>{

        event.preventDefault();


        var numberHero = parseInt($('#numberHero').val());
        

        $('#resultado').html("");
        $('#chartContainer').html("");
        console.log(numberHero);
        consulta(numberHero);
    })

    let expresion = /\d/g;

    let consulta = (numberHero) =>{
        if(expresion.test(numberHero)){


            $.ajax({
                dataType:"json",
                type:"get",
                url:`https://superheroapi.com/api.php/10226569611764208/${numberHero}`,
                success: (results) =>{
                    console.log(results)
                    
                    let html_1 = `
                    <h3 class="text-center">SuperHero encontrado!</h3>
                    
                    <div class="card mb-3">
                    <div class="row no-gutters">
                    <div class="col-md-4">
                    <img src="${results.image.url}" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${results.name}</h5>
                        
                        <p class="card-text text-justify">Conexiones: ${results.connections["group-affiliation"]}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-left"><em>Publicado por:</em> ${results.biography.publisher} </li>
                            <li class="list-group-item text-left"><em>Ocupación</em> ${results.work.occupation}</li>
                            <li class="list-group-item text-left"><em>Primera aparición: </em>${results.biography["first-appearance"]}</li>
                            <li class="list-group-item text-left"><em>Altura:</em> ${results.appearance.height.join(" - ")}</li>
                            <li class="list-group-item text-left"><em>Peso:</em> ${results.appearance.weight.join(" - ")}</li>
                            <li class="list-group-item text-left"><em>Alianzas: ${results.biography.aliases.join(" ")}</em></li>
                        </ul>
                        
                    </div>
                    </div>
                    </div>
                    </div>
                    `

                    var options = {
                        title: {
                            text: `Estadísticas de poder de ${results.name}`,
                            fontSize: 26
                        },
                        axisX:{
                            title : "Atributos",
                            titleFontSize: 12
                        },
                        axisY:{
                            title : "Nivel",
                            titleFontSize: 12
                            
                        },
                        data: [
                        {
                        type: "column",
                        dataPoints: [
                            { label: "combat", y: parseInt(results.powerstats.combat) },
                            { label: "durability", y: parseInt(results.powerstats.durability) },
                            { label: "intelligence", y: parseInt(results.powerstats.intelligence) },
                            { label: "speed", y: parseInt(results.powerstats.speed) },
                            { label: "power", y: parseInt(results.powerstats.power) },
                            { label: "strength", y: parseInt(results.powerstats.strength) },
                        ],
                        },
                        ],
                        };

                    $('#resultado').append(html_1);
                    $('#chartContainer').CanvasJSChart(options);
                },
                error: ()=>{alert("Error al consultar información")}
            
            })

        } else {
            alert("Ingrese un número desde el 1 al 732")
        }
    }

})