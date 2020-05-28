
class Switch {
    constructor(_x, _y, _ipaddr, ..._uplink) {
        this.x = _x;
        this.y = _y;
        this.ip = _ipaddr;
        this.width = 150;
        this.heigh = 50;
        this.uplinkX = _uplink[0].downlinkX;
        this.uplinkY = _uplink[0].downlinkY;

        this.update(); 
    }

    update() {
        this.downlinkX = this.x + this.width / 2;
        this.downlinkY = this.y + this.heigh;
    }

    show() {
        this.update();
        // draw uplink
      //  ctx.beginPath();
        //ctx.lineWidth = 2;
        //ctx.strokeStyle = 'blue';
        //ctx.setLineDash([]);
        //ctx.moveTo(this.uplinkX, this.uplinkY);
        //ctx.lineTo(this.downlinkX, this.downlinkY-this.heigh);
        //ctx.stroke();
        const g = svg.append("rect")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 114)
        .attr("transform", `translate(${margin.left},${margin.top})`);

        /*
        // draw rect
        ctx.fillStyle = "yellow";
        rect(this.x, this.y, this.width, this.heigh);

        // draw text
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.constructor.name + " " + this.ip, this.x + this.width / 2, this.y + this.heigh/2);
        */
    }
}

class Router {
    constructor(_x, _y, ipaddr, ..._uplink) {
        this.x = _x;
        this.y = _y;
        this.ip = ipaddr;
        this.r = 25;
        this.heigh = this.width = this.r * 2;
        //this.uplinkX = _uplink[0].downlinkX;
        //this.uplinkY = _uplink[0].downlinkY;

        this.update();
        this.show();
    }

    update() {
        this.downlinkX = this.x + this.width / 2;
        this.downlinkY = this.y + this.heigh;
    }

    show() {
        
      //  ctx.fillStyle = "yellow";
      //  //rect(this.x, this.y, this.width, this.heigh);
      //  circle(this.x + this.r , this.y + this.r , this.r );
 


      //  ctx.fillStyle = "black";
      //  ctx.textAlign = "center";
      //  ctx.fillText(this.constructor.name + " " + this.ip, this.x + this.width / 2, this.y + this.heigh/2);
     this.g = svg.append("circle")
    .attr("stroke", "white")
    .attr("stroke-width", 1.5)
    .attr("r", 114)
    .attr("transform", `translate(${this.x + this.r},${this.y + this.r})`);
    }
}