var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); localStorage = window.localStorage;
        document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture);

        document.getElementById("createContact").addEventListener("click", createContact);
        document.getElementById("findContact").addEventListener("click", findContact);
        document.getElementById("deleteContact").addEventListener("click", deleteContact);

        document.getElementById("cordovaDevice").addEventListener("click", cordovaDevice);

        document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
        document.getElementById("watchAcceleration").addEventListener("click", watchAcceleration);

        document.getElementById("getOrientation").addEventListener("click", getOrientation);
        document.getElementById("watchOrientation").addEventListener("click", watchOrientation);

        document.getElementById("dialogAlert").addEventListener("click", dialogAlert);
        document.getElementById("dialogConfirm").addEventListener("click", dialogConfirm);
        document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
        document.getElementById("dialogBeep").addEventListener("click", dialogBeep);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);
document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage);
document.getElementById("removeProjectFromLocalStorage").addEventListener("click", removeProjectFromLocalStorage);
document.getElementById("getLocalStorageByKey").addEventListener
   ("click", getLocalStorageByKey);


// Button press event listeners
document.addEventListener("volumeupbutton", upVolButtonFunction, false);
document.addEventListener("volumedownbutton", downVolButtonFunction, false);
document.addEventListener("backbutton", onBackKeyDown, false);

function setLocalStorage(){
  localStorage.setItem("Name", "Michelle");
  localStorage.setItem("Job", "Developer");
  localStorage.setItem("Project", "Cordova Project");
}

function showLocalStorage(){
  console.log(localStorage.getItem("Name"));
  console.log(localStorage.getItem("Job"));
  console.log(localStorage.getItem("Project"));
}

function removeProjectFromLocalStorage(){
  localStorage.removeItem("Project");
}

function getLocalStorageByKey(){
  console.log(localStorage.key(0));
}

function upVolButtonFunction(){
  alert("Volume Up Button is pressed!");
}

function downVolButtonFunction(){
  alert("Volume down Button is pressed!");
}

function onBackKeyDown(e){
  e.preventDefault();
  alert("Back button pressed!");
}

function cameraTakePicture() {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
   });

   function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
}

function cameraGetPicture() {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
   });

   function onSuccess(imageURL) {
      var image = document.getElementById('myImage');
      image.src = imageURL;
      alert(imageURL);
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }

}

function createContact(){
  var myContact = navigator.contacts.create({
    "displayName": 'Test User'
  });

  myContact.save(contactSuccess, contactError);

  function contactSuccess(){
    alert("Contact saved");
  }
  function contactError(message){
    alert("Failed because" + message);
  }
}


function findContact(){
  var options = new ContactFindOptions();
  options.filter = "";
  options.multiple = true;
  fields = ["displayName"];
  navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

  function contactfindSuccess(contacts) {
     for (var i = 0; i < contacts.length; i++) {
        alert("Display Name = " + contacts[i].displayName);
     }
  }

  function contactfindError(message) {
     alert('Failed because: ' + message);
  }
}

function deleteContact(){
    var options = new ContactFindOptions();
    options.filter = "Test User";
    options.multiple = false;
    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts){
      var contact = contacts[0];
      contact.remove(contactRemoveSuccess, contactRemoveError);

      function contactRemoveSuccess(contact){
        alert("Contact Deleted");
      }
      function contactRemoveError(message){
        alert("Failed because: " + message);
      }
    }

    function contactfindError(message){
      alert("Failed because: " + message);
    }
}


function cordovaDevice() {
  alert("Cordova version: " + device.cordova + "\n" +
        "Device model: " + device.model + "\n" +
        "Device platform: " + device.platform + "\n" +
        "Device UUID: " + device.uuid + "\n" +
        "Device version: " + device.version);
}

function getAcceleration(){
  navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError );

  function accelerometerSuccess(acceleration){
    alert("Acceleration X: " + acceleration.x + "\n" +
          "Acceleration Y: " + acceleration.y + "\n" +
          "Acceleration Z: " + acceleration.z + "\n" +
          "Timestamp: " + acceleration.timestamp + "\n");
  };

  function accelerometerError(){
    alert("onError!");
  };
}

function watchAcceleration(){
  var accelerometerOptions = {
    frequency: 3000
  }

  var watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);


  function accelerometerSuccess(acceleration){
    alert("Acceleration X: " + acceleration.x + "\n" +
          "Acceleration Y: " + acceleration.y + "\n" +
          "Acceleration Z: " + acceleration.z + "\n" +
          "Timestamp: " + acceleration.timestamp + "\n");
    setTimeout(function(){
      navigator.accelerometer.clearWatch(watchID);
    }, 1000);
  };

  function accelerometerError(){
    alert("onError!");
  };
}

function getOrientation(){
  navigator.compass.getCurrentHeading(compassSuccess, compassError);

  function compassSuccess(heading){
    alert("Heading: " + heading.magneticHeading);
  };

  function compassError(error){
    alert("Compass Error: " + error.code);
  };
}


function watchOrientation(){
  var compassOptions = {
      frequency: 3000
  }
  var watchID = navigator.compass.watchHeading(compassSuccess,
    compassError, compassOptions);

  function compassSuccess(heading) {
    alert('Heading: ' + heading.magneticHeading);

    setTimeout(function() {
       navigator.compass.clearWatch(watchID);
    }, 10000);
  };

  function compassError(error) {
    alert('CompassError: ' + error.code);
  };
}

function dialogAlert() {
   var message = "Hello Michelle!";
   var title = "ALERT";
   var buttonName = "Alert Button";
   navigator.notification.alert(message, alertCallback, title, buttonName);

   function alertCallback() {
      console.log("Alert is Dismissed!");
   }
}
