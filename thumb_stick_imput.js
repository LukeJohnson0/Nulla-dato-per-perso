/*
    This code is used for handling thumbUI and its movement.
    Time complexity : O(1);
*/
document.addEventListener('DOMContentLoaded', loaded => {
    var shape;
    var input;
    const init = {
        x: 300,
        y: 300,
        radius: 70
    }
    const usrAgent = /iPhone|iPad/.test(navigator.userAgent);
    function drawUI() {
        if (loaded) {
            shape = document.getElementById("inputUI");
            const ctx = shape.getContext("2d");
            bound = document.getElementById("boundRec");
            const ctx2 = bound.getContext("2d");
            /* transform is represented in this matrix:
            ┌ 		  ┐		┌ 		   ┐
            │ a  c  e │		│ 1  0  25 │
            │ b  d  f │ =>  │ 0  1  0  │
            │ 0  0  1 │		│ 0  0  1  │
            └ 		  ┘		└ 		   ┘ */
            ctx.transform(1, 0, 0, 1, 25, 0);
            ctx.beginPath();
            ctx.arc(75, 100, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx2.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx2.lineWidth = 2;
            ctx2.beginPath();
            ctx2.arc(init.x, init.y, init.radius, 0, 2 * Math.PI);
            ctx2.stroke();
            shape.style.left = bound.style.left = init.x + "px";
            shape.style.top = bound.style.top = init.y + "px";
        }
    }

    drawUI();
    class updateInput {
        constructor (touchIntX, touchIntY, onClicked) {
            this.touchIntX = touchIntX;
            this.touchIntY = touchIntY;
            this.onClicked = onClicked = false;
            this.boundRectX = 0;
            this.boundRectY = 0;
            const inputMap = {
                'touchstart': true,
                'touchend': false,
                'mousedown': true,
                'mouseup': false,
                'pointerleave' : false,
                "touchcancel" : false
            };

            Object.entries(inputMap).forEach(([eventType, state]) => {
                shape.addEventListener(eventType, (e) => {
                    e.preventDefault();
                    var boundRect = shape.getBoundingClientRect();
                    this.boundRectX = (e.touches ? e.touches[0].clientX : e.clientX ) - boundRect.left;
                    this.boundRectY = (e.touches ? e.touches[0].clientY : e.clientY) - boundRect.top;
                    this.onClicked = state;
                }, {passive:false});
            });
            if(usrAgent){
                    console.log("phgone");
                    shape.addEventListener("touchmove", clientInput => {
                        clientInput.preventDefault();
                    this.touchIntX = clientInput.touches.item(0).clientX;
                    this.touchIntY = clientInput.touches.item(0).clientY;},{passive:false});
                    // console.log(this.touchIntY); console.log(this.touchIntX);
            }
            else{
                    window.addEventListener("mousemove", clientInput => {
                    this.touchIntX = clientInput.clientX;
                    this.touchIntY = clientInput.clientY;});
            }
        }
        outOfBound(x, y, radius) {
            let distance = Math.sqrt(((x - init.x) ** 2) + ((y - init.y) ** 2));
            if (distance > radius) {
                let teta = Math.atan2(y - init.y, x - init.x);
                return {
                    x: init.x + radius * Math.cos(teta),
                    y: init.y + radius * Math.sin(teta)
                }
            }
            return {x, y};
        }
        callUPD() {
            if (this.onClicked) {
                let xGoal = this.touchIntX - this.boundRectX;
                let yGoal = this.touchIntY - this.boundRectY;
                const final = this.outOfBound(xGoal, yGoal, init.radius);
                shape.style.left = final.x + "px";
                shape.style.top = final.y + "px";
                //console.log(`UI: ${shape.style.top}, ${shape.style.left}`);
            }
            else {
                shape.style.left = bound.style.left = init.x + "px";
                shape.style.top = bound.style.top = init.y + "px";
            }
        }
    }

    if (shape) {
        input = new updateInput(0, 0, false);
    }

    function updateFunc() {
        requestAnimationFrame(updateFunc);
        if (input) input.callUPD();
    }
    updateFunc();
});
