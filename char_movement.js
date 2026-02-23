var char;
document.addEventListener('DOMContentLoaded', function() {
    char = document.getElementById("char_sprite");
class playerPos {
    constructor(x,y,xVal, yVal, charWalkSpeed) {
        this.x = x;
        this.y = y;
        this.xVal = xVal;
        this.yVal = yVal,
        this.charWalkSpeed = charWalkSpeed;
    }
    update() {
        this.x += this.xVal;
        this.y += this.yVal;
        char.style.bottom = this.y + 'px';
        char.style.left = -this.x + 'px';        
    }
}
var charPlayer = new playerPos(100,100,0,0, 7);
document.addEventListener('keydown', (keycode) => {
    switch (keycode.key) {
        case 'w': charPlayer.yVal = charPlayer.charWalkSpeed;break;
        case 's': charPlayer.yVal = -charPlayer.charWalkSpeed; break;
        case 'a': charPlayer.xVal = charPlayer.charWalkSpeed; break;
        case 'd': charPlayer.xVal = -charPlayer.charWalkSpeed; break;
    }
});
document.addEventListener('keyup', (keycodeUp)=>{
       switch (keycodeUp.key) {
        case 'w': charPlayer.yVal = 0; break;
        case 's': charPlayer.yVal = 0; break;
        case 'a': charPlayer.xVal = 0; break;
        case 'd': charPlayer.xVal = 0; break;
    } 
});
function update() {
    charPlayer.update();
    requestAnimationFrame(update)
}
update();
});