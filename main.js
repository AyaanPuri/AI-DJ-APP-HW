song = "";

rightWristx = 0;
leftWristx = 0;

leftWristy = 0;
rightWristy = 0;

scoreLeftWrist = "";
scoreRightWrist = "";

function preload() {
    song2 = loadSound("music.mp3");
    song1 = loadSound("Kalimba.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    scoreRightWrist = song1;
    fill("#FF0000"); 
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristx, rightWristy, 20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Kalimba";
        }
    }
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristx, leftWristy, 20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter";
        }
    }
}

function play() {
    song2.play();
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0)
     {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[9].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + rightWristx + " rightWristy = " + rightWristy);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristx + " leftWristy = " + leftWristy);
    }
}