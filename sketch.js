let S;//�傫��
let N;//��
let V;
let color_fill = 40;
let color_stroke = 10;


class Up_quad{
  constructor(){
    this.x = random(document.body.clientWidth);
    this.y = document.body.clientHeight+S*2;
    this.r = random(-5,5);
    this.u = random(1,10)/10;
  }

  update(){
    this.y -=this.u;
    if(this.y<-S*2){
      this.y = document.body.clientHeight+S*2;
      this.r = random(-5,5);
      this.u = random(1,10)/10;
    }
  }

  draw8mentai(){
    fill(color_fill);
    stroke(color_stroke);
    quad(this.x, this.y+S, this.x+S, this.y, this.x, this.y-S, this.x-S, this.y);

    let x_ = this.x+10;
    let y_ = this.y+15;
    line(x_, y_, this.x, this.y+S);
    line(x_, y_, this.x, this.y-S);
    line(x_, y_, this.x+S, this.y);
    line(x_, y_, this.x-S, this.y);
  }
}


function setup() {
  createCanvas(document.body.clientWidth, document.body.clientHeight);
  frameRate(30);
  S = 70;
  N = 50;
  V = new Array(N);
  for(let i = 0 ; i<V.length ; i++){
    V[i] = new Up_quad();
  }
}

function draw() {
  background(20);

  //ellipse(mouseX, mouseY, 30, 30);

  for(let i=0 ; i<V.length ;i++){
    //text(V[i].x, 10,10*i);
    V[i].draw8mentai();
    V[i].update();
  }
}
