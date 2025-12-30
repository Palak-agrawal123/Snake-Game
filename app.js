let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');

let cellsize=50;
let boardHeight=600;
let boardWidth=1000;
let snakeCells=[[0,0]];

let direction='right';
let score=0;


//repeates work;
let intervalid=setInterval(function(){
    update();
    draw();
},200);

let gameover=false;
//keydown event is triggerd
document.addEventListener('keydown',function(event){
    if(event.key==='ArrowDown'){
        direction='down';
    }
    else if(event.key==='ArrowUp'){
        direction='up';
    }
    else if(event.key==='ArrowLeft'){
        direction='left';
    }
    else{
        direction='right';
    }
});

let food=generateFood();

//function to draw snake 
function draw(){
    if(gameover==true){
        clearInterval(intervalid);
        ctx.fillStyle='white';
        ctx.font='60px monospace';
        ctx.fillText('GAME OVER !',300,300);
        return;
    }
    ctx.clearRect(0,0,boardWidth,boardHeight);
    for(let cell of snakeCells){
        ctx.fillStyle='blue';
        ctx.fillRect(cell[0],cell[1],cellsize,cellsize);
        ctx.strokeStyle='purple';
        ctx.strokeRect(cell[0],cell[1],cellsize,cellsize);
    }

    //food draw
    ctx.fillStyle='green';
    ctx.fillRect(food[0],food[1],cellsize,cellsize);

    //draw score
    ctx.fillStyle='brown';
    ctx.font='24px monospace';
    ctx.fillText(`Score : ${score}`,20,20);

}
//function to update snake
function update(){
    let headX=snakeCells[snakeCells.length-1][0];
    let headY=snakeCells[snakeCells.length-1][1];
    let newHeadX;
    let newHeadY;
    if(direction=='right'){
        newHeadX=headX+cellsize;
        newHeadY=headY;
        if(newHeadX===boardWidth||collide(newHeadX,newHeadY)){
            gameover=true;
        }
    }
    else if(direction=='left'){
        newHeadX=headX-cellsize;
        newHeadY=headY;
        if(newHeadX<0||collide(newHeadX,newHeadY)){
            gameover=true;
        }
    }
    else if(direction=='up'){
        newHeadX=headX;
        newHeadY=headY-cellsize;
        if(newHeadY<0||collide(newHeadX,newHeadY)){
            gameover=true;
        }
    }
    else{
        newHeadX=headX;
        newHeadY=headY+cellsize;
        if(newHeadY===boardHeight||collide(newHeadX,newHeadY)){
            gameover=true;
        }
    }
    snakeCells.push([newHeadX,newHeadY]);
    if(newHeadX===food[0]&&newHeadY===food[1]){
        food=generateFood();
        score+=1;
    }
    else{
        snakeCells.shift();
    }
}

function generateFood(){
    return [
        Math.round((Math.random()*(boardWidth-cellsize))/cellsize)*cellsize,
        Math.round((Math.random()*(boardHeight-cellsize))/cellsize)*cellsize
    ]
}

function collide(newHeadX,newHeadY){
    for(let item of snakeCells){
        if(newHeadX===item[0]&&newHeadY==item[1]){
            return true;
        }
    }
    return false;
}



