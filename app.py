from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

print("Loading model...")

model = tf.keras.models.load_model("../model/plant_disease_model.h5")

print("Model loaded successfully")

class_names = [
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato___Early_blight",
    "Tomato___healthy"
]

disease_info = {
"Potato___Early_blight":{
"symptoms":"Brown spots with yellow rings on leaves",
"treatment":"Remove infected leaves and apply fungicide"
},
"Potato___Late_blight":{
"symptoms":"Dark brown patches on leaves and stems",
"treatment":"Use copper fungicide and reduce moisture"
},
"Potato___healthy":{
"symptoms":"Plant is healthy",
"treatment":"No treatment needed"
},
"Tomato___Early_blight":{
"symptoms":"Dark spots with circular rings on leaves",
"treatment":"Remove infected leaves and spray fungicide"
},
"Tomato___healthy":{
"symptoms":"Plant is healthy",
"treatment":"No treatment needed"
}
}

@app.route("/detect", methods=["POST"])
def detect():

    file = request.files["image"]

    img = Image.open(file).resize((224,224))
    img = np.array(img)/255.0
    img = img.reshape(1,224,224,3)

    prediction = model.predict(img)[0]

    index = np.argmax(prediction)

    disease = class_names[index]

    confidence = float(prediction[index])*100

    info = disease_info.get(disease, {})

    return jsonify({
        "disease": disease,
        "confidence": round(confidence,2),
        "symptoms": info.get("symptoms","Unknown"),
        "treatment": info.get("treatment","Consult expert")
    })

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True)