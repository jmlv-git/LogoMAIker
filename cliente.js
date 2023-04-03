var botaoGerarLogo = document.getElementById('gerarLogo');
var body = document.getElementById('main');
const tokenApiOpenJourney = "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";

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
		{
			headers: { Authorization: `Bearer ${tokenApiOpenJourney}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

botaoGerarLogo.addEventListener('click', async function (e) {

    var tipo = document.getElementById("tipoOrg").value;
    var func = document.getElementById("funcOrg").value;
    var unic = document.getElementById("unicOrg").value;
    
    if (tipo === "" || func === "" || unic === "") {
      alert("Por favor, preencha todos os campos.");
      e.preventDefault();
    }

    let promt = tipo;

    var blob = await query({"inputs": promt}).then((response) => {
		return response;
	});

    console.log(blob)
    let imgGerada = new Image();
    var url = URL.createObjectURL(blob);
    imgGerada.src = url;
    body.appendChild(imgGerada);
    console.log("data length: " + blob.length);
    console.log("url: " + url);
  
})