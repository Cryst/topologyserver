const margin = { top: 140, bottom: 10, left: 120, right: 20 };
//const canvaswidth = 800 - margin.left - margin.right;
//const canvasheight = 600 - margin.top - margin.bottom;

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/*
var ip = "8.8.8.8";

fetch('/frontend/api/isalive/' + ip )
    .then(response => response.text())
    .then(data => console.log(data));

fetch( '/frontend/api/ping/'+ ip )
    .then(response => response.text())
    .then(data => console.log(data));
*/


document.body.insertAdjacentHTML('beforeend', '<canvas id="network" width="1000" height="1000"></canvas>');





var canvas = d3.select("#network"),
    width = canvas.attr("width"),
    height = canvas.attr("height"),
    ctx = canvas.node().getContext("2d"),
    r = 50,
    color = d3.scaleOrdinal(d3.schemeCategory20),
    simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(r + 100))
        .force("charge", d3.forceManyBody()
            .strength(-20))
        .force("link", d3.forceLink()
            .id(function (d) { return d.name; }));


d3.json("data.json", function (err, graph) {
    if (err) throw err;

    simulation.nodes(graph.nodes);
    simulation.force("link")
        .links(graph.links);
    simulation.on("tick", update);

    canvas
        .call(d3.drag()
            .container(canvas.node())
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    function update() {
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
     //   ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "#aaa";
        graph.links.forEach(drawLink);
        ctx.stroke();


        ctx.globalAlpha = 1.0;
        graph.nodes.forEach(drawNode);
    }

    function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
    }

});

function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
    console.log(d3.event.subject);
}

function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
}

function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
}



function drawNode(d) {
    ctx.beginPath();
    ctx.fillStyle = "#0000FF";
    ctx.moveTo(d.x, d.y);
    ctx.rect(d.x, d.y, 100, 100);
    ctx.fill();

    ctx.fillStyle = "#FF0000";
    ctx.font = "50px Comic Sans MS";
    ctx.fillText(d.name, d.x, d.y);
}


function drawLink(l) {
    ctx.lineWidth = 30;
    ctx.lineCap = "square";
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.moveTo(l.source.x, l.source.y);
    ctx.lineTo(l.target.x, l.target.y);
}





