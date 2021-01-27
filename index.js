//Parametros del modelo
const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 5,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.90,    // confidence threshold for predictions.
  }

//Funcion aleatoria para poder jugar con los sonidos
  function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

//Obtenemos la camara desde el navegador que usemos
navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

//Traemos los elementos del html
const id = document.getElementById("id");;
const audio = document.getElementById("audio");
const canvas = document.getElementById("canvas");
let aleatorio;
const sounds = ["/its a trap.mp3", "/michael scott no.mp3", 
    "/nooo darth.mp3", "/windows xp.mp3"];

const context = canvas.getContext('2d')
let model;

handTrack.startVideo(video)
    .then(status =>{
        if(status){
            navigator.getUserMedia({video:{}}, stream=>{
                
                video.srcObject = stream;
                setInterval(runDetection, 1000)
                
            }, err=>{
                console.log(err)
            })
        }
    })

function runDetection() {
    model.detect(video)
        .then(predictions=>{
            
            //Si no detecta manos, tenemos un objecto vacio
            if(predictions.length > 0 ){
                console.log(predictions)
                aleatorio = randomInt(0,4);
                audio.src = sounds[aleatorio];
                audio.play();
            }
        })
}



handTrack.load(modelParams)
    .then(lmodel=>{
        model = lmodel;
    });