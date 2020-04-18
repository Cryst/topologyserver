
function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// ----------------------------
// canvas test 
function _test() {
    var x = 10,
        y = 10;
    var dx = 11,
        dy = 1;
    setInterval(_movetest, 1000/60);

    function _movetest() {
        reset();
        _drawtest();

        //dot
        ctx.fillStyle = "red";
        circle(x, y, 5);

        if (x + dx > canvas.width || x + dx < 0)
            dx = -dx;
        if (y + dy > canvas.height || y + dy < 0)
            dy = -dy;

        x += dx;
        y += dy;


        // diag text
        ctx.font = "20px Arial";
        ctx.fillText("x=" + x + " y=" + y + " dx=" + dx + " dy=" + dy, 300, 50);
    }
}
function _drawtest() {
    // outlined square X: 50, Y: 35, width/height 50

    ctx.strokeStyle = 'pink';
    ctx.beginPath();
    ctx.strokeRect(50, 35, 50, 50);

    // filled rect X: 125, Y: 35, width/height 50/70
    ctx.fillStyle = "black";
    rect(125, 35, 50, 70);

    // filled circle X: 125, Y: 235, R: 50
    ctx.beginPath();
    circle(125, 235, 50);

    ctx.beginPath();
    // First sub-path
    ctx.lineWidth = 26;
    ctx.strokeStyle = 'orange';
    ctx.moveTo(20, 20);
    ctx.lineTo(160, 20);
    ctx.stroke();

    // Second sub-path
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'red';
    ctx.moveTo(20, 80);
    ctx.lineTo(220, 80);
    ctx.stroke();

    // Third sub-path
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'pink';
    ctx.moveTo(20, 140);
    ctx.lineTo(280, 140);
    ctx.stroke();
}
