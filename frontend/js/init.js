const margin = { top: 140, bottom: 10, left: 120, right: 20 };

function updateList(name) {
    var node = document.createElement("LI");                        // Create a <li> node
    var textnode = document.createTextNode(name);                   // Create a text node
    node.appendChild(textnode);                                     // Append the text to <li>
    document.getElementById("deviceList").appendChild(node);        // Append <li> to <ul> with id="myList"
}



function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

document.body.insertAdjacentHTML('beforeend', '<div class="DrawingContainer" ><canvas id="network"></canvas></div>');
document.querySelector('#network').setAttribute('height', window.innerHeight-20 );
document.querySelector('#network').setAttribute('width', window.innerWidth*0.8-20  );



var canvas = d3.select("#network"),
    width = canvas.attr("width"),
    height = canvas.attr("height"),
    ctx = canvas.node().getContext("2d"),
    r = 30,
    color = d3.scaleOrdinal(d3.schemeCategory20),
    simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(r + 100))
        .force("charge", d3.forceManyBody()
            .strength(-20))
        .force("link", d3.forceLink()
            .id(function (d) { return d.name; }));


d3.json("data_tmp.json", function (err, graph) {
    if (err) throw err;

    simulation.nodes(graph.nodes);
    simulation.force("link")
        .links(graph.links);

    graph.nodes.forEach(refreshNode);
    graph.nodes.forEach(refreshList);

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

    if (d.isalive == "True") {
        ctx.fillStyle = "#00ff00";
    } else if (d.isalive == "False") {
        ctx.fillStyle = "#ff0000";
    } else {
        ctx.fillStyle = "#404040";
    }
    
    ctx.moveTo(d.x, d.y);
    ctx.rect(d.x, d.y, 120, 70);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.font = "14px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText(d.name + "\n", d.x+60, d.y+42);
}

function refreshNode(d) {
    fetch('/api/isalive/' + d.ipv4).then(response => response.text()).then(data => d.isalive = data);   
}

function refreshList(d) {
    updateList(d.name); 
    //updateList(d.name + " " + d.isalive); 
}


function drawLink(l) {
    ctx.lineWidth = 1;
    ctx.lineCap = "square";
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.moveTo(l.source.x+60, l.source.y+35);
    ctx.lineTo(l.target.x+60, l.target.y+35);
}





