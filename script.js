const URL = "https://teachablemachine.withgoogle.com/models/QRPqDNgum/"; // Replace with your model URL from Teachable Machine


let model, recognizer;
let lastDetectedClass = "";

async function startListening() {
  document.getElementById("status").innerText = "Status: Loading model...";
  const checkpointURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmSound.load(checkpointURL, metadataURL);
  document.getElementById("status").innerText = "Status: Listening...";

  model.listen(result => {
    const highest = result.scores.reduce((max, score, i) =>
      score > max.score ? { label: result.labels[i], score } : max,
      { label: "", score: 0 }
    );

    const currentLabel = highest.label;
    document.getElementById("current").innerText = `Detected: ${currentLabel}`;

    if (currentLabel !== lastDetectedClass) {
      lastDetectedClass = currentLabel;
      document.getElementById("last-command").innerText = currentLabel;
    }
  }, {
    probabilityThreshold: 0.5, // adjust sensitivity
    overlapFactor: 0.5 // controls speed of detection
  });
}
