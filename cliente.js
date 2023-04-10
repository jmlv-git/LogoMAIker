var botaoGerarLogo = document.getElementById('gerarLogo');
var body = document.getElementById('main');

const tokenApiOpenJourney = "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";

var { Configuration, OpenAIApi } = require("openai");

let gpt_configuration = new Configuration({
	apiKey: "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",
});
delete gpt_configuration.baseOptions.headers['User-Agent'];

let openai = new OpenAIApi(gpt_configuration);

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


async function gpt_request(data) {
  console.log(data)
	const response = await openai.createCompletion({
	model: "text-davinci-003",
	prompt: data,
	temperature: 0.9,
	max_tokens: 150,
	top_p: 1,
	frequency_penalty: 0.0,
	presence_penalty: 0.6,
	})
	const result = await response.data.choices[0].text;
  //console.log(result)
	return result;
}

function genPromp(l){
  if (!l[3]) l[3] = " os elementos que mais fazem sentido"
  if(!l[4]) l[4] = " as cores que mais fazem sentido"
  return `Imagine e descreva a aparência, com no máximo 250 caracteres, uma logo para uma ${l[0]} que faz ${l[1]} de caracteristica ${l[2]} contendo tanto ${l[3]} quanto as cor/cores ${l[4]}. Descreva apenas a imagem em inglês, sem mencionar textos`
}

botaoadicional.addEventListener('click', async function (e) {
  var configOpicionais = document.getElementById("config-opicionais");
  configOpicionais.style.display = "block";
  var botaoConf = document.getElementById("botaoadicional");
  botaoConf.style.display = "none";
})

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
      let promt = genPromp([tipo, func, unic, ele, cor]);
      //let promt = "Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus."
      promt = await gpt_request(promt).then((response) => {return response;});
      console.log(promt);
      var blob = await query({"inputs": promt}).then((response) => {return response;});
    }

     console.log(blob)
    let imgGerada = new Image();
    var url = URL.createObjectURL(blob);
    imgGerada.src = url;
    body.appendChild(imgGerada);
    console.log("data length: " + blob.length);
    console.log("url: " + url); 
  
})