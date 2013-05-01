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
        ctx.fillStyle = '#401840';
        ctx.fill(); 
        this.addHexagons();
    },
    addHexagons: function() {
        var canvas = document.getElementById("canvas-"+this.collection.collectionAttr('uid'));
        var cxt = canvas.getContext('2d');
        function whole(i){
            if(i<0) return 0;
            return i;
        }
        for(i=0,j=0; i < 19; i++){

            var radius = 20;
            var diam = 40;
            var side = Math.cos(Math.PI/3)*radius*2;
            var width = Math.cos(Math.PI/3) * radius * 2;
            var Radius = 2 * j * radius * Math.sin(Math.PI/3);
            var X = 150;
            var Y = 150;
            var offsetModifier = j > 0 ? 1/j : 1;
            var offset = (2*offsetModifier*i*Math.PI/6)
            if(j>1 && i%j != 0) 
                Radius = (diam + side) + ((j-2)*(diam) + whole(j-3)*(side));
            if(j>2 && i%j != 0) {
                Radius = (diam + side) + ((j-2)*(diam) - 7);
            }
            console.log(Radius);
            /*((j-2)*((Math.cos(Math.PI/12)*(diam+side))+(Math.sin(Math.PI/12)*(diam+side))));*/
            var dX = Radius * Math.cos(offset)
            var dY = Radius * Math.sin(offset)
            var x,y;
            x = X + dX;
            y = Y + dY;
            if(i === 6) j++;
            if(i === 0) j++;
            if(i === 18) j++;
            cxt.beginPath();
            cxt.moveTo(x + radius*Math.sin(0), y + radius*Math.cos(0));           
            for (var k = 1; k <= 6; k++) {
                cxt.lineTo(x + radius*Math.sin(k*2*Math.PI/6), y + radius*Math.cos(k*2*Math.PI/6));
            }
            cxt.closePath();
            cxt.strokeStyle = "#ffffff";
            cxt.lineWidth = 1;
            cxt.stroke();
        }
    },
    alert: function () {
        alert(this.collection.collectionAttr('uid'));
    },
    test:function() {
    var canvas = document.getElementById("canvas-"+this.collection.collectionAttr('uid'));
    var num = this.collection.models.length;
    var Width = Math.ceil(Math.sqrt(num));
    var side = 100/width;
    var width = Math.sin(Math.PI/6) * side;
    var radius = Math.cos(Math.PI/6) * side;

    var cxt = canvas.getContext('2d');
    for(i = 0; i < Width; i++) {
        for(j = 0; j < Width; j++) {
            console.log('hex');
            x = i * 2 * radius + ((j % 2) * radius);
            y = j * (side + width);
            x= x;
            y= y;
            cxt.beginPath()
            cxt.moveTo(x + radius*Math.sin(0), y + radius*Math.cos(0));          
            for (var k = 1; k <= 6; k++) {
                cxt.lineTo(x + radius*Math.sin(k*2*Math.PI/6), y + radius*Math.cos(k*2*Math.PI/6));
            }
            cxt.closePath();
            cxt.strokeStyle = "#000000";
            cxt.lineWidth = 3;
            cxt.stroke();
        }
    }

    }
});