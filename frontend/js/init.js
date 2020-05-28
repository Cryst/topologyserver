const margin = { top: 140, bottom: 10, left: 120, right: 20 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;


// Creates sources <svg> element
const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// Group used to enforce margin
const g = svg.append("circle");
let router1 = new Router(50, 50, "192.168.15.1");
let router2 = new Router(200, 200, "192.168.15.1");

/* 
add canvas dom to end of html
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

*/



/*

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

    */

    //_drawtest();
    //_test();
    





