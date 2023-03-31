const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/criarLogo', async function (req, res) {
	console.log(req.body.prompt);

	var img = await query({"inputs": req.body.prompt}).then((response) => {
		return response;
	});

	var dadosBinariosImg = await img.arrayBuffer();
	 
	var  object = {
		name: "Logo",
		imgBinario: Array.from(new Uint8Array(dadosBinariosImg))
	}

	res.send(JSON.stringify(object));
	
})

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
		{
			headers: { Authorization: "Bearer {API_TOKEN}" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}






/*
const blobToImage = (blob) => {
	return new Promise(resolve => {
	  const url = URL.createObjectURL(blob)
	  console.log(url)
	  let img = new Image()
	  img.onload = () => {
		URL.revokeObjectURL(url)
		resolve(img)
	  }
	  img.src = url
	  console.log(img.src)
	})
  }

  */

app.listen(3000)
console.log("Servidor escutando na porta 3000")