// add canvas dom to end of html
document.body.insertAdjacentHTML('beforeend', '<canvas id="canvas"></canvas>');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// resize the canvas to fill browser window dynamically
resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight / 2;
    // resize will clear canvas content
    init();
}







function init() {
    let router1 = new Router(255, 5, "192.168.15.1");
    router1.show();

    var switch1 = new Switch(50, 70, "192.168.15.2", router1 );
    var switch2 = new Switch(220, 140, "192.168.15.3", router1 );
    var switch3 = new Switch(60, 200, "192.168.15.2", router1 );
    switch1.show();
    switch2.show();
    switch3.show();


 

    var cx, cy;
    // detect mouse clicks
    canvas.addEventListener('mousedown', onDown, false);
    function onDown() {
        cx = event.pageX - canvas.getBoundingClientRect().left;
        cy = event.pageY - canvas.getBoundingClientRect().top;

        console.log(`X,Y=${cx},${cy}`);
        switch1.x = cx;
        switch1.y = cy;
        switch1.show();
    }



    //_drawtest();
    //_test();
    
}




