const image = document.getElementById('salad')
//const canvas = document.getElementById("myCanvas");


async function run() {
    const model = await tf.automl.loadObjectDetection('model.json');
    const img = document.getElementById('salad');
    const options = {score: 0.5, iou: 0.5, topk: 20};
    const predictions = await model.detect(img, options);
    console.log(predictions);
    // Show the resulting object on the page.
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(predictions, null, 2);
    document.body.append(pre);

}
function imgs(){
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    document.body.append('imagss')
    image.addEventListener('change',async ()=> {
        const imad = await model.bufferToImage('salad')
        container.append(imad)
        const canvas = model.createCanvasFromMedia(imad)
        container.append(canvas)
        const displaySize = { width: imad.width, hight: imad.hight }
        model.matchDimensions(canvas, displaySize)
        const detections = await model.detectAllImage(imad).withLandmarks().withDescriptors()
        const resizeDetecttions = model.resizeResults(detections, displaySize)
        resizeDetecttions.forEach(detection => {
            const box = detection.detection.box
            const drawBox = model.draw.DrawBox(box, {label: 'toto'})
            drawBox.draw(canvas)
        })

    })
}



run();
imgs();

    
