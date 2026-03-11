// -------- Disease Detection --------
async function detectDisease() {
  let file = document.getElementById("imageInput").files[0];
  if (!file) {
    alert("Upload image first");
    return;
  }

  let formData = new FormData();
  formData.append("image", file);

  let response = await fetch("http://127.0.0.1:5000/detect", {
    method: "POST",
    body: formData
  });

  let data = await response.json();

  document.getElementById("result").innerHTML =
    "<h3>Disease: " + data.disease + "</h3>" +
    "<p>Confidence: " + data.confidence + "%</p>" +
    "<p><b>Symptoms:</b> " + (data.symptoms || "Not available") + "</p>" +
    "<p><b>Treatment:</b> " + (data.treatment || "Consult expert") + "</p>";
}


// -------- AI Assistant --------
function askAI() {
  let question = document.getElementById("question").value.toLowerCase();
  let answer = "";

  if (question.includes("disease")) {
    answer = "Inspect plants regularly and remove infected leaves.";
  } else if (question.includes("water")) {
    answer = "Most crops require moderate irrigation.";
  } else if (question.includes("fertilizer")) {
    answer = "Use balanced NPK fertilizers.";
  } else {
    answer = "Maintain soil health and proper irrigation.";
  }

  document.getElementById("aiAnswer").innerText = answer;
}


// -------- Voice Assistant --------
function startVoice(){

const recognition = new webkitSpeechRecognition()

recognation = recognition

recognition.lang = "hi-IN"

recognition.onresult = function(event){

let speech = event.results[0][0].transcript

let question = speech.toLowerCase()

let answer = ""

if(question.includes("रोग") || question.includes("disease")){
answer = "फसल को नियमित रूप से जांचें और संक्रमित पत्तियों को हटा दें। जरूरत पड़ने पर फंगीसाइड का उपयोग करें।"
}

else if(question.includes("पानी") || question.includes("water")){
answer = "फसलों को संतुलित सिंचाई की आवश्यकता होती है। अधिक पानी देने से बचें।"
}

else if(question.includes("खाद") || question.includes("fertilizer")){
answer = "नाइट्रोजन, फॉस्फोरस और पोटैशियम वाली संतुलित खाद का उपयोग करें।"
}

else if(question.includes("मौसम") || question.includes("weather")){
answer = "आज मौसम साफ है और तापमान लगभग 32 डिग्री सेल्सियस है।"
}

else{
answer = "फसल की नियमित देखभाल करें, सही सिंचाई और अच्छी मिट्टी बनाए रखें।"
}

document.getElementById("voiceText").innerHTML =
"आपने कहा: " + speech + "<br><b>उत्तर:</b> " + answer

}

recognition.start()

}

// -------- Weather --------
function getWeather() {
  document.getElementById("weather").innerHTML =
    "<b>Weather Report</b><br>City: Jaipur<br>Temperature: 32°C<br>Condition: Sunny<br>Humidity: 40%";
}


// -------- Soil Recommendation --------
function recommendCrop() {
  let soil = document.getElementById("soilType").value;
  let result = "";

  if (soil === "Black Soil") {
    result = "Cotton, Soybean";
  } else if (soil === "Red Soil") {
    result = "Millets, Groundnut";
  } else if (soil === "Alluvial Soil") {
    result = "Rice, Wheat";
  } else if (soil === "Sandy Soil") {
    result = "Peanuts, Watermelon";
  }

  document.getElementById("cropResult").innerHTML =
    "Recommended crops: " + result;
}


// -------- Government Schemes --------
function getSchemes() {
  document.getElementById("schemes").innerHTML =
    "<ul>" +
    "<li>PM Kisan Samman Nidhi</li>" +
    "<li>Pradhan Mantri Fasal Bima Yojana</li>" +
    "<li>Soil Health Card Scheme</li>" +
    "</ul>";
}