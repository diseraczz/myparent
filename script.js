const image = document.getElementById('salad')
const canvas = document.getElementById('canvas')
const outp = document.getElementById('output')
const context = canvas.getContext('2d')
context.drawImage(image,0,0)
async function run() {
    
    const model = await tf.automl.loadObjectDetection('model.json');
    const image = document.getElementById('salad');
    const options = {score: 0.5, iou: 0.5, topk: 20};
    const predictions = await model.detect(image, options);
    console.log(predictions);
    // Show the resulting object on the page.
    for(var i = 0; i<predictions.length; i++){
        bbox = [
            predictions[i].box.left,
            predictions[i].box.top,
            predictions[i].box.width,
            predictions[i].box.height
        ]
        outp.innerHTML += "<br/>" + predictions[i].label + " : Score = " + predictions[i].score + " : box = " + bbox;
        context.beginPath();
        context.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
        context.lineWidth = 3;
        context.strokeStyle = 'red';
        context.stroke();
        context.fillStyle = "red";
        context.fillText(predictions[i].label, bbox[0]+4, bbox[1]+12);
    }
    /////
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(predictions, null, 2);
    document.body.append(pre);
    

}
run();

    
