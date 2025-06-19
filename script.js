const URL = "https://teachablemachine.withgoogle.com/models/QRPqDNgum/";
let model, recognizer;
let lastDetectedClass = "";

async function init() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    model = await tmSound.load(checkpointURL, metadataURL);
    console.log("Model loaded.");

    listen();
}

function listen() {
    model.listen(result => {
        const highest = result.scores.reduce((max, score, i) => score > max.score ? {label: result.labels[i], score} : max, {label: "", score: 0});
        
        const currentLabel = highest.label;
        document.getElementById("current").innerText = `Detected: ${currentLabel}`;

        if (currentLabel !== lastDetectedClass) {
            lastDetectedClass = currentLabel;
            document.getElementById("last-command").innerText = currentLabel;
        }
    }, {
        probabilityThreshold: 0.8,
        overlapFactor: 0.5
    });
}

init();
