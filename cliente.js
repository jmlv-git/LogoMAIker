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


function mostrarConfAdicionais() {
  var configOpicionais = document.getElementById("config-opicionais");
  configOpicionais.style.display = "block";
  var botaoConf = document.getElementById("botao-conf-adic");
  botaoConf.style.display = "none";
}



botaoGerarLogo.addEventListener('click', async function (e) {

    var tipo = document.getElementById("tipoOrg").value;
    var func = document.getElementById("funcOrg").value;
    var unic = document.getElementById("unicOrg").value;
    var ele = document.getElementById("elemento").value;
    var cor = document.getElementById("cor").value;
    
    if (tipo === "" || func === "" || unic === "") {
      alert("Por favor, preencha todos os campos.");
      e.preventDefault();
    }else {/faz requisicao/
      let promt = tipo;

    var blob = await query({"inputs": promt}).then((response) => {
    return response;
  });
    }

    

    console.log(blob)
    let imgGerada = new Image();
    var url = URL.createObjectURL(blob);
    imgGerada.src = url;
    body.appendChild(imgGerada);
    console.log("data length: " + blob.length);
    console.log("url: " + url);
  
})