window.onload=function(){
	var canvas3 = document.querySelector('#canvas3');
	var ctx = canvas3.getContext('2d');

var begin = function(){
  var y = 20.5;
    for(var i=0;i<15;i++){
    var li = ctx.createLinearGradient(0,0,560,0);
    li.addColorStop(0.3,'#ff6700');
    li.addColorStop(1,'black');
     // ctx.lineWidth = 6;
        // ctx.lineCap = 'round';
        // ctx.strokeStyle = lingrad;
    ctx.strokeStyle = li;
        ctx.beginPath();
    ctx.moveTo(20.5,i*40+y);
    ctx.lineTo(580,i*40+y);
    ctx.stroke();
    }
    var x = 20.5;
    for(var i=0;i<15;i++){
    var li = ctx.createLinearGradient(0,0,560,0);
    li.addColorStop(0.3,'#000');
    li.addColorStop(1,'#ff6700');
    ctx.strokeStyle = li;
    ctx.beginPath();
    ctx.moveTo(x+i*40,20.5);
    ctx.lineTo(x+i*40,580);
    ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(300.5,300.5,3,0,Math.PI*2);
    ctx.fill();
        var Z=[140.5,460.5];
        for(var i = 0;i<Z.length;i++){
          for(var j = 0;j<Z.length;j++){
            ctx.beginPath();
            ctx.arc(Z[i],Z[j],3,0,Math.PI*2);
            ctx.fill();
          }
        }
}
begin();


  var canvas1 = document.querySelector('#canvas1');
  var ctx1 = canvas1.getContext('2d');
        var luozi = function(x,y,color){
        var zx = 40*x + 20.5;
        var zy = 40*y + 20.5;

        var white = ctx1.createRadialGradient(zx-7,zy-7,1,zx,zy,18)
        white.addColorStop(0.3,'#fff');
        white.addColorStop(1,'#ccc');

        var black = ctx1.createRadialGradient(zx-7,zy-7,1,zx,zy,18)
        black.addColorStop(0.1,'#ccc');
        black.addColorStop(1,'#000');

        ctx1.fillStyle = color?black:white;
        ctx1.beginPath();
        ctx1.arc(40*x+20.5,40*y+20.5,17,0,Math.PI*2);
        ctx1.fill();
        }

        var qizi = {};
        var kaiguan  = localStorage.x?false:true;
        canvas1.onclick=function(e){
        var x = Math.round((e.offsetX-20.5)/40);
        var y = Math.round((e.offsetY-20.5)/40);
        if(qizi[x+'_'+y]){return;}
        luozi(x,y,kaiguan)
        qizi[x+'_'+y] = true;
        kaiguan = !kaiguan;
        qizi[x+'_'+y] = kaiguan?'black':'white';
        localStorage.data = JSON.stringify(qizi);

        if(kaiguan){
        if( win(x,y,'black') ){
          alert('白棋胜利');
          if(confirm('是否再来一局?')){
             localStorage.clear();
             location.reload();
             qizi = {};
             kaiguan = true;
             return;
          }else{
             canvas1.onclick  = null;
          }
        }
      }else{
        if( win(x,y,'white')){
           alert('黑棋胜利');
          if(confirm('是否再来一局?')){
            localStorage.clear();
            location.reload();
            qizi = {};
            kaiguan = true;
            return;
          }else{
             canvas1.onclick  = null;
          }
        }
      }

      if(!kaiguan){
          localStorage.x = 1;
        }else{
          localStorage.removeItem('x');
        }

        document.querySelector('.huiqi').onclick = function(){
          var newqizi = {};//创建一个新对象
          for(var i in qizi){
            if(i != (x+'_'+y)){//把当前点击的棋子除去之后，将qizi对象重新复制给newqizi;
              newqizi[i] = qizi[i];
            }
          }
          qizi = newqizi;//再把newqizi重新复制给qizi，
          kaiguan = !kaiguan;
          ctx1.clearRect(x*40+3,y*40+3,35,35);//擦除刚才点击过的棋子
        }
    }


      var win=function(x,y,color){
        var shuju = filter(color);
        var tx,ty,H = 1,S = 1,ZX = 1,YX= 1;

        tx = x;ty = y;while(shuju[moshi(tx-1,ty)]){tx--;H++}
        tx = x;ty = y;while(shuju[moshi(tx+1,ty)]){tx++;H++}
        if(H >= 5){return true}

        tx = x;ty = y;while(shuju[moshi(tx,ty-1)]){ty--;S++}
        tx = x;ty = y;while(shuju[moshi(tx,ty+1)]){ty++;S++}
        if(S >= 5){return true}

        tx = x;ty = y;while(shuju[moshi(tx-1,ty-1)]){ty--;tx--;ZX++}
        tx = x;ty = y;while(shuju[moshi(tx+1,ty+1)]){ty++;tx++;ZX++}
        if(ZX >= 5){return true}

        tx = x;ty = y;while(shuju[moshi(tx+1,ty-1)]){ty--;tx++;YX++}
        tx = x;ty = y;while(shuju[moshi(tx-1,ty+1)]){ty++;tx--;YX++}
        if(YX >= 5){return true}
      }

      var moshi = function(x,y){
        return x+'_'+y;
      }

      var filter = function(color){
        var r = {};
        for(var i in qizi){
          if(qizi[i] == color){
             r[i] = qizi[i]
          }
        }
        return r;
      }

      canvas1.ondblclick = function(ev){
        ev.stopPropagation();
      }

      if(localStorage.data){
      	qizi = JSON.parse(localStorage.data);
      	for(var i in qizi){
      		var x = i.split('_')[0];
      		var y = i.split('_')[1];
      		luozi(x,y,(qizi[i]=='white')?true:false);
      	}
      }

      document.querySelector('.chongzhi').onclick = function(){
      	localStorage.clear();
        location.reload();
      }




var drawClock=function(){
  var canvas=document.querySelector("#canvas");
  var ctx = canvas.getContext('2d');
  var d=new Date();
  var h=d.getHours();
  var s=d.getSeconds();
  var m=d.getMinutes();

  ctx.clearRect(0,0,400,400);

  ctx.save();//保存一个干净的画布
  ctx.translate(200,200);//移动画布到原点中心
  //画最外边的表盘
  ctx.save();
  ctx.strokeStyle='#ac6316';
  //加阴影
  ctx.shadowOffsetX=2;
  ctx.shadowOffsetY=2;
  ctx.shadowBlur=2;
  ctx.shadowColor='rgba(0,0,0,0.7)'
  ctx.lineWidth=8;
  ctx.beginPath();
  ctx.arc(0,0,100,0,Math.PI*2);
  ctx.stroke();
  ctx.restore();

  //化时间刻度
  ctx.save();
  ctx.lineWidth=3;
  ctx.lineCap='round';
  ctx.strokeStyle='#6e5b00';
  for (var i = 1; i < 61; i++) {
    ctx.rotate(Math.PI/30);
    ctx.beginPath();
    if(i%5==0){
      ctx.moveTo(70,0);
    }else{
      ctx.moveTo(75,0);
    }
    ctx.lineTo(85,0);
    ctx.stroke();
  }
  ctx.restore();

  //圆心
  ctx.beginPath();
  ctx.arc(0,0,5,0,Math.PI*2);
  ctx.lineWidth=3;
  ctx.stroke();

  //时针
  ctx.save();
  ctx.beginPath();
  var h2=360*((h*3600+m*60+s)/(12*3600))/180*Math.PI;
  ctx.rotate(h2);
  ctx.strokeStyle='black';
  ctx.lineWidth=4;
  ctx.lineCap='round'
  ctx.moveTo(0,20);
  ctx.lineTo(0,-50);
  ctx.stroke();
  ctx.restore();

  //分针
  ctx.save();
  ctx.beginPath();

  /*var m2=360*((m*60+s)/(3600))/180*Math.PI;*/
  ctx.rotate(Math.PI/30*m);

  ctx.lineWidth=4;
  ctx.strokeStyle='black';
  ctx.lineCap='round'
  ctx.moveTo(0,20);
  ctx.lineTo(0,-60);
  ctx.stroke();
  ctx.restore();

  //秒针
  ctx.save();

  ctx.beginPath();
  ctx.rotate(Math.PI/30*s);
  // ctx.rotate(x);
  ctx.lineWidth=3;
  ctx.lineCap='round';
  ctx.strokeStyle='red';
  ctx.moveTo(0,20);
  ctx.lineTo(0,-70);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle="red";
  ctx.arc(0,0,6,0,Math.PI*2);
  ctx.fill();

 /*   ctx.beginPath();
    ctx.fillStyle="red";
    ctx.arc(140,0,10,0,Math.PI*2,true);
    ctx.stroke();*/

  ctx.restore();

  ctx.restore();//复原一开始保存的那个干净的状态
  // console.log(1);
  requestAnimationFrame(drawClock);
 }

 
//drawClock(); 
requestAnimationFrame(drawClock); 

document.onclick=function(){
  local.href=(canvas.toDataURL().replace('data:image/png','data:stream/octet'));//保存图片属性
}

var link = document.createElement('a');
link.innerHTML = 'download image';

link.addEventListener('click', function(ev) {
  link.href = canvas.toDataURL();
  link.download = "mypainting.png";//给link设置登录属性
}, false);
document.body.appendChild(link);

}
