/**
 * @type HTMLCanvasElement
 */
window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    // Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

/*
    // Example rectangles
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.strokeRect(100, 100, 200, 500);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(200, 200, 200, 500);
*/
/*
    // Draw from point
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 150);
    ctx.closePath();    // line back to start
    ctx.stroke();
*/
    const lineWidth = 10;
    const drawColor = 'blue';
    let painting = false;
    let startX = 0, startY = 0;

    function startPosition(e) {
        painting = true;
        startX = e.clientX;
        startY = e.clientY;
        // Set up drawing parameters & begin path on mouse-down
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = drawColor;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }

    function finishedPosition(e) {
        painting = false;
        // No movement since mouse-down?  Draw a circle/dot
        if (startX === e.clientX && startY === e.clientY)
        {
            ctx.fillStyle = drawColor;
            ctx.arc(startX, startY, lineWidth / 2, 0, 2 * Math.PI, true);
            ctx.fill();
            // Alternative: Square
            //ctx.fillRect(startX - lineWidth / 2, startY - lineWidth / 2, lineWidth, lineWidth);
        }
    }

    function draw(e) {
        if (!painting) return;
        // Draw to current mouse position from previous location
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();        
    }

    // Event Listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});
