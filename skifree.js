(()=>{var t={823:(t,s,i)=>{var e=i(502),o=i(962),h=i(103),a=i(486),r=function(t,s){this.skierSpriteMap=t,this.obstacleSpriteMap=s,this.reset()};r.prototype.reset=function(){NUM_TREES=5,this.obstacles=[],this.skier=new o(this.skierSpriteMap),this.yeti=new a(this.skierSpriteMap),this.addObstacles(),this.paused=!1,this.score=0,this.crashCount=0,this.isSkierCaught=!1,this.mousePos=[250,250]},r.prototype.addObstacles=function(t){for(var s=0;s<NUM_TREES;s++)this.obstacles.push(new h(e.randPos(),this.obstacleSpriteMap))},r.prototype.removeElapsed=function(){for(var t=0;t<this.obstacles.length;t++)this.obstacles[t].pos[1]<-50&&delete this.obstacles[t];var s=[];for(t=0;t<this.obstacles.length;t++)void 0!==this.obstacles[t]&&s.push(this.obstacles[t]);this.obstacles=s},r.prototype.rebalanceObstacles=function(){this.removeElapsed();for(var t=this.obstacles.length;t<NUM_TREES;t++)this.obstacles.push(new h(e.newObstaclePos(),this.obstacleSpriteMap))},r.prototype.checkCollision=function(){for(var t=0;t<this.obstacles.length;t++){if(Math.sqrt(Math.pow(this.obstacles[t].pos[0]-this.skier.pos[0],2)+Math.pow(this.obstacles[t].pos[1]-this.skier.pos[1],2))<20&&!1===this.obstacles[t].colided)return void this.colide(this.obstacles[t]);this.skier.ok()}},r.prototype.colide=function(t){this.skier.colide(),t.colided=!0,this.paused=!0,this.crashCount+=1,this.score-=100,setTimeout(function(){this.paused=!1}.bind(this),1e3)},r.prototype.checkCaught=function(){Math.sqrt(Math.pow(this.yeti.pos[0]-this.skier.pos[0],2)+Math.pow(this.yeti.pos[1]-this.skier.pos[1],2))<20&&this.catchSkier()},r.prototype.catchSkier=function(){this.isSkierCaught=!0,this.paused=!0,this.yeti.catchSkier(),this.skier.getCaught()},r.prototype.tallyScore=function(){this.score+=1,this.score>1e3?NUM_TREES=25:this.score>750?NUM_TREES=11:this.score>500?NUM_TREES=8:NUM_TREES=5},r.prototype.drawStats=function(t){var s="Score: "+this.score,i="Crashes: "+this.crashCount;t.fillStyle="#000000",t.font="18px 'PT Sans'",t.fillText(s,10,20),t.fillText(i,120,20),this.gameOverMessage(t)},r.prototype.gameOverMessage=function(t){if(this.isSkierCaught){t.fillStyle="#000000",t.font="40px 'PT Sans'";var s="You are Yeti food",i=t.measureText(s).width;t.fillText(s,canvas.width/2-i/2,100),t.fillStyle="#000000",t.font="18px 'PT Sans'";var e="Click to play again",o=t.measureText(e).width;t.fillText(e,canvas.width/2-o/2,400)}},r.prototype.moveObjects=function(){this.skier.move(this.mousePos),this.yeti.move(this.skier.pos),this.obstacles.forEach((function(t){t.move()}))},r.prototype.step=function(){this.isSkierCaught&&(this.paused=!0),this.paused?(this.yeti.catchUp(),this.checkCaught()):(this.moveObjects(),this.tallyScore(),this.rebalanceObstacles(),this.checkCollision(),this.checkCaught())},r.prototype.draw=function(t){t.clearRect(0,0,500,500),t.fillStyle="#FFFFFF",t.fillRect(0,0,500,500),this.obstacles.forEach((function(s){s.draw(t)})),this.skier.draw(t),this.yeti.draw(t),this.drawStats(t)},t.exports=r},258:t=>{var s=function(t,s){this.game=t,this.ctx=s,this.isStarted=!1};s.prototype.start=function(){if(this.isStarted){if(!this.game.isSkierCaught)return;this.game.reset()}else this.isStarted=!0,tick=setInterval(function(){this.game.draw(this.ctx),this.game.step()}.bind(this),30)},t.exports=s},103:(t,s,i)=>{i(502);var e=function(t,s){this.spriteMap=s,this.type=Math.floor(4*Math.random()),this.pos=t,this.vel=[0,-10],this.radius=40,this.color="green",this.colided=!1};e.prototype.draw=function(t){switch(this.type){case 0:t.drawImage(this.spriteMap,0,28,30,34,this.pos[0],this.pos[1],30,34);break;case 1:t.drawImage(this.spriteMap,95,66,32,64,this.pos[0],this.pos[1],32,64);break;case 2:t.drawImage(this.spriteMap,30,52,23,11,this.pos[0],this.pos[1],23,11);break;case 3:t.drawImage(this.spriteMap,85,138,15,32,this.pos[0],this.pos[1],15,32)}},e.prototype.move=function(){this.pos[0]+=this.vel[0],this.pos[1]+=this.vel[1]},t.exports=e},962:t=>{var s=function(t){this.spriteMap=t,this.radius=20,this.color="red",this.pos=[250,250],this.state="OK",this.vel=0,this.isCaught=!1};s.prototype.getCaught=function(){this.isCaught=!0},s.prototype.colide=function(){this.state="COLIDE"},s.prototype.ok=function(){this.state="OK"},s.prototype.isColide=function(){return"COLIDE"===this.state},s.prototype.isOk=function(){return"OK"===this.state},s.prototype.pushLeft=function(){this.vel<0?this.vel+=1.5:this.vel+=.5},s.prototype.pushRight=function(){this.vel>0?this.vel-=1.5:this.vel-=.5},s.prototype.move=function(t){t[0]>=this.pos[0]+10?this.pushLeft():t[0]<=this.pos[0]-10&&this.pushRight(),this.pos[0]+this.vel>=490||this.pos[0]+this.vel<=0||(this.pos[0]+=this.vel)},s.prototype.draw=function(t){if(!this.isCaught)switch(this.state){case"OK":this.vel>2.5?t.drawImage(this.spriteMap,49,0,17,34,this.pos[0],this.pos[1],17,34):this.vel<-2.5?t.drawImage(this.spriteMap,49,37,17,34,this.pos[0],this.pos[1],17,34):t.drawImage(this.spriteMap,65,0,17,34,this.pos[0],this.pos[1],17,34);break;case"COLIDE":t.drawImage(this.spriteMap,240,0,31,31,this.pos[0],this.pos[1],31,31)}},t.exports=s},502:t=>{var s={inherits:function(t,s){function i(){}i.constructor=t,i.prototype=s.prototype,t.prototype=new i},randPos:function(){for(var t=[],s=0;s<2;s++)t.push(Math.floor(500*Math.random()));return t},newObstaclePos:function(){var t=[];return t.push(Math.floor(500*Math.random())),t.push(500),t}};t.exports=s},486:t=>{var s=function(t){this.spriteMap=t,this.pos=[250,-100],this.frame=0,this.frameTimer=0,this.vel=.05,this.isCaughtSkier=!1};s.prototype.pushLeft=function(){this.vel+=.05},s.prototype.pushRight=function(){this.vel-=.05},s.prototype.move=function(t){t[0]>this.pos[0]?this.pushLeft():t[0]<this.pos[0]&&this.pushRight(),this.pos[0]+=this.vel},s.prototype.catchUp=function(){!0!==this.isCaughtSkier&&(this.pos[0]+=this.vel,this.pos[1]<250&&(this.pos[1]+=1.5))},s.prototype.catchSkier=function(){this.isCaughtSkier=!0},s.prototype.incrementTimer=function(t){if(this.frameTimer>6){if(this.frameTimer=0,t)return void t();this.switchFrame()}else this.frameTimer+=1},s.prototype.switchFrame=function(){0===this.frame?this.frame=1:(1===this.frame||this.frame>1)&&(this.frame=0)},s.prototype.draw=function(t){if(this.isCaughtSkier)this.eatSkier(t);else if(this.incrementTimer(),this.vel>0)switch(this.frame){case 0:t.drawImage(this.spriteMap,91,112,31,40,this.pos[0],this.pos[1],31,40);break;case 1:t.drawImage(this.spriteMap,62,112,29,40,this.pos[0],this.pos[1],29,40)}else if(this.vel<0)switch(this.frame){case 0:t.drawImage(this.spriteMap,91,158,31,40,this.pos[0],this.pos[1],31,40);break;case 1:t.drawImage(this.spriteMap,62,158,29,40,this.pos[0],this.pos[1],29,40)}},s.prototype.eatSkier=function(t){switch(this.incrementTimer(function(){this.frame>6?7===this.frame?this.frame=8:8===this.frame&&(this.frame=7):this.frame+=1}.bind(this)),this.frame){case 0:t.drawImage(this.spriteMap,35,112,25,43,this.pos[0],this.pos[1],25,43);break;case 1:t.drawImage(this.spriteMap,0,112,32,43,this.pos[0],this.pos[1],32,43);break;case 2:t.drawImage(this.spriteMap,122,112,34,43,this.pos[0],this.pos[1],34,43);break;case 3:t.drawImage(this.spriteMap,156,112,31,43,this.pos[0],this.pos[1],31,43);break;case 4:t.drawImage(this.spriteMap,187,112,31,43,this.pos[0],this.pos[1],31,43);break;case 5:t.drawImage(this.spriteMap,219,112,25,43,this.pos[0],this.pos[1],25,43);break;case 6:t.drawImage(this.spriteMap,243,112,26,43,this.pos[0],this.pos[1],26,43);break;case 7:t.drawImage(this.spriteMap,35,112,25,43,this.pos[0],this.pos[1],25,43);break;case 8:t.drawImage(this.spriteMap,0,112,32,43,this.pos[0],this.pos[1],32,43)}},t.exports=s}},s={};function i(e){if(s[e])return s[e].exports;var o=s[e]={exports:{}};return t[e](o,o.exports,i),o.exports}(()=>{i(502);var t=i(823),s=i(258);function e(){var i=document.getElementById("canvas"),e=document.getElementById("skier"),o=document.getElementById("obstacles"),h=i.getContext("2d"),a=new t(e,o),r=new s(a,h);i.addEventListener("mousemove",(function(t){a.mousePos[0]=t.clientX-i.offsetLeft,a.mousePos[1]=t.clientY})),i.addEventListener("click",(function(t){r.start()}))}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()})()})();