var char, yVal, xVal, charWalkSpeed, charRunSpeed;
yVal = xVal = charWalkSpeed = 0;
document.addEventListener('DOMContentLoaded', function() {
    char = document.getElementById("char_sprite");
    charWalkSpeed = 3.4;
    charRunSpeed = 6.9;
    class playerPos {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
        update() {
            this.x += xVal;
            this.y += yVal;
            char.style.bottom = this.y + 'px';
            char.style.left = -this.x + 'px';        
        }
    }
    /*(keycode.shiftKey ? -charRunSpeed :-charWalkSpeed);*/
    var playerChar = new playerPos(-300, 0);
    document.addEventListener('keydown', (keycode) => {
        switch (keycode.key) {
            case 'w': yVal = charWalkSpeed;break;
            case 's': yVal = -charWalkSpeed;break;
            case 'a': xVal = charWalkSpeed; break;
            case 'd': xVal = -charWalkSpeed; break;
            default: yVal = 0; xVal = 0; break;
        }
    });
    document.addEventListener('keyup', (keycodeUp)=>{
           switch (keycodeUp.key) {
            case 'w': yVal = 0; break;
            case 's': yVal = 0; break;
            case 'a': xVal = 0; break;
            case 'd': xVal = 0; break;
        } 
    });
    function update() {
        playerChar.update();
        requestAnimationFrame(update)
    }
    update();
});
