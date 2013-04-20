var editPlanetController = Backbone.View.extend({
    events: {
        'click canvas':'alert'   
    },
    initialize: function () {
        this.setElement("#"+this.collection.collectionAttr('uid'));
        this.draw();
    },
    draw: function () {
        var canvas = document.getElementById("canvas-"+this.collection.collectionAttr('uid'));
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(150,150,140,0,2*Math.PI,false);
        ctx.fillStyle = '#123456';
        ctx.fill(); 
        this.addHexagons();
    },
    addHexagons: function() {
        var canvas = document.getElementById("canvas-"+this.collection.collectionAttr('uid'));
        var cxt = canvas.getContext('2d');
        console.log(this.collection.models.length);
        for(i=0,j=1; i < this.collection.models.length; i++){
            console.log(i);
            var size = 20,
                height = size * Math.sin(Math.PI/3);
            
                x = 150,
                y = 150;
            console.log(height); 
             
            var dX = height * Math.sin(i*(Math.PI/2));
            var dY = height * Math.cos(i*(Math.PI/2));
            x = x + dX;
            y = y + dY;
            cxt.beginPath();
            cxt.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin(0));          
             
            for (var k = 1; k <= 6; k++) {
                cxt.lineTo (x + size * Math.cos(k * 2 * Math.PI / 6), y + size * Math.sin(k * 2 * Math.PI / 6));
            }
             
            cxt.strokeStyle = "#000000";
            cxt.lineWidth = 1;
            cxt.stroke();
        }
    },
    alert: function () {
        alert(this.collection.collectionAttr('uid'));
    }
});