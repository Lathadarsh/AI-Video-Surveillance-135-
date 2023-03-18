video="";
status="";
objects=[];
r=Math.floor(Math.random()*255);
g=Math.floor(Math.random()*255);
b=Math.floor(Math.random()*255);

function preload() {
video = createVideo('video.mp4');
video.hide();
}

function setup() {
    canvas=createCanvas(480,380);
    canvas.center();
}

function start(){
objectDetector= ml5.objectDetector('cocossd', modelLoaded);
document.getElementById('status').innerHTML = "Status: Detecting Objects";
}

function draw() {
image(video, 0, 0, 480, 380);
if(status!= "") {
    objectDetector.detect(video, gotResults);
    for(i=0; i < objects.length; i++) {
        document.getElementById('status').innerHTML = "Status: Objects Detected";
        document.getElementById('number').innerHTML = "Number of Objects: " + objects.length;

        fill(r,g,b);
        noFill();
        stroke(r,g,b);
        percentage= floor(objects[i].confidence*100);
        text(objects[i].label+ "" + percentage + "%", objects[i].x + 15, objects[i].y + 15);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}
function gotResults(error, results) {
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
       
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}