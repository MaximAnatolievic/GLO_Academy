'use strict';

const img = document.getElementById('img'),
res = document.getElementById('res'),
anim = document.getElementById('anim');
img.style.position = 'relative';
let animateFly;

img.style.left = '300px';
const firstPositionLeft = parseInt(img.style.left);
let count = firstPositionLeft;
let animate = false;
const fly = () =>{  
    animateFly = requestAnimationFrame(fly);  

    if(count<document.documentElement.clientWidth){
      count +=10;
      img.style.left = count + 'px';
    } else {
      count = 0;
    }
}

anim.addEventListener('click', ()=>{
if(!animate){
  animateFly = requestAnimationFrame(fly);
  animate = true;
  anim.textContent = 'Stop';
}else if(animate){
  cancelAnimationFrame(animateFly);
  animate = false;
  anim.textContent = 'Start';
}
});

res.addEventListener('click', ()=>{
    cancelAnimationFrame(animateFly);
    animate = false;
    anim.textContent = 'Start';
    img.style.left = firstPositionLeft + 'px';
    count = firstPositionLeft;
  });