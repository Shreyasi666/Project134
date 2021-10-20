canvas = "";
observation = "";
objects = [];

function preload()
{

}

function setup()
{
    canvas =  createCanvas(380, 320);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
}

function start()
{
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log('Model Loaded !');
    observation = true;
}

function draw()
{
    image(video, 0, 0, 380, 320);
    setInterval(function()
    {
    if(observation != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            object_name = objects[i].label;
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if(object_name == "person")
        {
            document.getElementById("status_objects").innerHTML = "Baby is found";
        }
        else
        {
            document.getElementById("status_objects").innerHTML = "Baby is not found";
        }
    }
         
},10000);

}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}