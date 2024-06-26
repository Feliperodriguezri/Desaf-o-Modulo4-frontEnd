// Activacion tooltip

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

//fin tooltip

function cargarGrafico(datos = [], name) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${name}`
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: datos
        }]
    });
    chart.render();
};

function obtenerData(id) {
    let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            let dataPoints = [];
            for (const [key, value] of Object.entries(powerstats)) {
                //{label: "texto", y: 50}
                let dato = {
                    label: key,
                    y: value
                }

                dataPoints.push(dato);
            }
            cargarGrafico(dataPoints, datos.name);
			cargarCard(datos)
        })
        .fail(function () {
            alert("error");
        })

}
$("form").on("submit", function (event) {
    event.preventDefault();
    const id = $("#formSuperhero").val()
	if(isNaN(id)){
		alert("numero no ingresado")
	}
	else if (id>732 || id<=0 ){
		alert("rango de numero invalido 'nro entre 1 y 732'")
	}
	else{
		obtenerData(id);
	}
});

function cargarCard(superHero){
	$("#cardContainer").html(
		`<div class="card mb-3 overflow-scroll" style="height: 300px; width: 100%;">
		<div class="row g-0">
		  <div class="col-4">
			<img src="${superHero.image.url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="...">
		  </div>
		  <div class="col-8">
			<div class="card-body">
    <h5 class="card-title">${superHero.name}</h5>
    <h6 class="card-text">${superHero.biography["full-name"]}</h6>
	<div class="text-start">
    <p class="card-text"><strong>Alias:</strong> ${superHero.biography["aliases"]}</p>
    <p class="card-text"><strong>Primera Aparición:</strong> ${superHero.biography["first-appearance"]}</p>
    <p class="card-text"><strong>Primera Publicación:</strong> ${superHero.biography["publisher"]}</p>
    <p class="card-text"><strong>Ocupación:</strong> ${superHero.work["occupation"]}</p>
    <p class="card-text"><strong>Conexiones:</strong> ${superHero.connections["group-affiliation"]}</p>
	</div>
</div>
  
		  </div>
		</div>
	  </div>`
	)
}

