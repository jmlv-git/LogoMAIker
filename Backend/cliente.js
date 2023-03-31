var campo1 = document.getElementById('text1');
console.log(campo1)

var request = new XMLHttpRequest();

request.open("POST", "http://localhost:3000/criarLogo", true);
request.setRequestHeader("Content-Type", "application/json");

request.onreadystatechange = function() { 
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        //var data = new Uint8Array(response.imgBinario);
        //console.log(data)
        var blob = new Blob(response.imgBinario, { type: "image/png" });
        var url = URL.createObjectURL(blob);
        var img = new Image();
        img.src = url;
        console.log("data length: " + response.imgBinario.length);
        console.log("url: " + url);
        document.body.appendChild(img);
    }
}

var dados = JSON.stringify({prompt:"Astronaut riding a horse"});
request.send(dados);