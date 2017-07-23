var canvas = document.createElement("canvas");
$(function(){
printCanvas();
});

function printCanvas(){

  canvas.setAttribute("width", $("#canvasWidth").val());
  canvas.setAttribute("height", $("#canvasHeight").val());
  canvas.setAttribute("style", "position: absolute;");
  canvas.setAttribute("style","background-color:rgb(55,55,55)");
  canvas.onmousemove = mouseOver;
  canvas.onmouseleave = hide;
  canvas.onmouseenter = show;
  $(canvas).appendTo("body");

    size_ = 0;
    cols = [];
    var speed = parseInt($("#speed").val());
    if(parseInt($("#cubesSize").val()) < 3){
      speed = 5;
    }
    draw(parseInt($("#cubesSize").val()),speed);
}


var size_ = 0;
var cols = [];

async function draw(size,sl){
size_ += size;
var ctx = canvas.getContext("2d");
for (var i = 0; i < canvas.width; i+=size) {

if(sl >= 5){await sleep(sl);}
  var color = randomNum(0,255);
  ctx.fillStyle = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';
  for (var y = 0; y < canvas.height; y+=size) {

  var color = randomNum(0,255);
  ctx.fillStyle = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';

  ctx.fillRect(i,y,size,size);

  var cords = {cor:parseInt((i - size_ * 0.5)/size_ + 0.5) + "-" + parseInt((y - size_ * 0.5)/size_ + 0.5), col:color};
    cols.push(cords);
  }
}
}

function mouseOver(e) {

    var rect = canvas.getBoundingClientRect(),
        mouseX = e.clientX - rect.left,
        mouseY = e.clientY - rect.top,

        xIndex = Math.round((mouseX - size_ * 0.5) / size_),
        yIndex = Math.round((mouseY - size_ * 0.5) / size_);
        var coor_ = xIndex + "-" + yIndex;


        if(mouseY < 100){
          $('#box').css({'top':mouseY+(rect.top+100),'left':mouseX+(rect.left-70)});
      }else{
          $('#box').css({'top':mouseY+(rect.top-100),'left':mouseX+(rect.left-70)});
      }

        var val = cols.find(cor => cor.cor === coor_).col;
        $('#box').text("R: " + val[0] + " G: " + val[1] + " B: " + val[2]);
        $('#box').css({'color':'rgb('+val[0]+','+val[1]+','+val[2]+')'});
}

function show(){
  $("#box").fadeIn();

}
function hide(){
  $("#box").fadeOut();
}

function randomNum(min,max)
{
  var colors = new Object();
   colors[0] = Math.floor(Math.random()*(max-min+1)+min);
      colors[1] = Math.floor(Math.random()*(max-min+1)+min);
         colors[2] = Math.floor(Math.random()*(max-min+1)+min);

    return colors;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeSize(){
  printCanvas();
}