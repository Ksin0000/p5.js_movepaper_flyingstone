// グローバル変数の定義
let S; // 図形のサイズ
let N; // 図形の数
let V; // 図形の配列
let color_fill = 40;
let color_stroke = 10;

class UpQuad {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight); //windowHeight + S * 2;
    this.t = random(TWO_PI); // 時間パラメータ
    this.tv = random(0.01,-0.01); // 時間パラメータの進み方
    this.speed = random(0.1, 1);
  }

  update() {
    this.y -= this.speed;
    if (this.y < -S * 2) {
      this.reset();
    }

    this.t += this.tv; // 時間パラメータを更新
    if (this.t > TWO_PI) {
      this.t -= TWO_PI;
    }
  }

  reset() {
    this.y = windowHeight + S * 2;
    this.r = random(-5, 5);
    this.speed = random(0.1, 1);
  }

  draw() {
    fill(color_fill);
    stroke(color_stroke);
    
    // メインの四角形を描画
    let v1 = createVector(this.x, this.y + S);
    let v2 = createVector(this.x + S, this.y);
    let v3 = createVector(this.x, this.y - S);
    let v4 = createVector(this.x - S, this.y);
    quad(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, v4.x, v4.y);

    // v_centerをレンズ型の下弦上の点に設定したいができてない
    let v_center = createVector(
      this.x + S * cos(this.t), 
      this.y + S * 0.1 * sin(this.t)
    );

    // 内部の線を描画
    line(v_center.x, v_center.y, v1.x, v1.y);
    line(v_center.x, v_center.y, v2.x, v2.y);
    line(v_center.x, v_center.y, v3.x, v3.y);
    line(v_center.x, v_center.y, v4.x, v4.y);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  S = 70;
  N = 50;
  
  // 図形の配列を初期化
  V = Array(N).fill().map(() => new UpQuad());
}

function draw() {
  background(20);

  // すべての図形を更新して描画
  V.forEach(quad => {
    quad.draw();
    quad.update();
  });
}

// ウィンドウサイズが変更されたときにキャンバスをリサイズ
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}