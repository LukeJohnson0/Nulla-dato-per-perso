/*
    This code is used for handling thumbUI and its movement.
    Time complexity : O(1);
*/
document.addEventListener('DOMContentLoaded', loaded => {
    var shape;
    var input;
    const init={ 
		x:300 + "px",
		y:300 + "px",
	}
	init.boundYPos = Number((init.y.replace("px", ""))) + 70 + "px";
	init.boundYMin = Number((init.y.replace("px", ""))) - 70 + "px";
	init.boundXPos = Number((init.x.replace("px", ""))) + 70 + "px";
	init.boundXMin = Number((init.x.replace("px", ""))) - 70 + "px";
    function drawUI() {
        if(loaded) {
            shape = document.getElementById("inputUI");
            const ctx = shape.getContext("2d");
			bound = document.getElementById("boundRec");
			const ctx2 = bound.getContext("2d");
			ctx2.transform(1,0,0,1,-9,-9);
			ctx2.fillStyle = "white";
			ctx2.fillRect(10,10, 200,200);
			/* transform is represented in this matrix:
			┌ 		  ┐		┌ 		   ┐
			│ a  c  e │		│ 1  0  25 │
			│ b  d  f │ =>  │ 0  1  0  │
			│ 0  0  1 │		│ 0  0  1  │
			└ 		  ┘		└ 		   ┘
			*/
			ctx.transform(1,0,0,1,25,0);
            ctx.beginPath();
            ctx.arc(75, 100, 40, 0, 2 * Math.PI);
			shape.style.x = bound.style.x = init.x;
			shape.style.y = bound.style.y = init.y;
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }
    
    drawUI();
    class updateInput {
        constructor(touchIntX, touchIntY, onClicked) {
            this.touchIntX = touchIntX;
            this.touchIntY = touchIntY;
            this.onClicked = false;
            this.boundRectX = 0;
			this.boundRectY = 0;	
			this.boundLimit = bound.getBoundingClientRect();	
			this.limit = false;
            const inputMap = {
                'touchstart': true,
                'touchend' : false,
                'mousedown' : true,
                'mouseup' : false,
                'pointerleave' : false
            };
            
            Object.entries(inputMap).forEach(([eventType, state]) => {
                shape.addEventListener(eventType, (e) => {
					var boundRect = shape.getBoundingClientRect();
					this.boundRectX = e.clientX - boundRect.left;
					this.boundRectY =  e.clientY - boundRect.top;
                    this.onClicked = state;
                });
            });
            
            window.addEventListener("mousemove", clientInput => {
                this.touchIntX = clientInput.clientX;
                this.touchIntY = clientInput.clientY;
            });
        }
        limitBound(){
			var lastPos = {
				x: 200 + "px",// shape.style.x,
				y:shape.style.y
			}
			if(shape.style.left >= init.boundXPos | shape.style.left <= init.boundXMin |
				shape.style.top <= init.boundYMin| shape.style.top >= init.boundYPos){
					this.limit = true;
					console.log("out of bounds!");
					shape.style.x = lastPos.x;
					shape.style.y = lastPos.y;
			}
			else{
                setTimeout(()=>{this.limit = false;}, .6);
			}
		}
        callUPD() {
            //console.log(`left:${shape.style.left}, top:${shape.style.top}`);
            //console.log(this.limit);
            this.limitBound();
            if(this.onClicked && !this.limit) {
                //console.log(`Position: ${this.touchIntX}, ${this.touchIntY}`);
                shape.style.left = (this.touchIntX - this.boundRectX)  + "px";
                shape.style.top = (this.touchIntY - this.boundRectY) + "px";
                //console.log(`UI: ${shape.style.top}, ${shape.style.left}`);
            }
			else if(!this.onClicked){
				shape.style.left = bound.style.left = init.x;
				shape.style.top =bound.style.top  =init.y;
			}
        }
    }
    
    if(shape) {
        input = new updateInput(0, 0, false);
    }

    function updateFunc() {
        requestAnimationFrame(updateFunc);
        if(input) input.callUPD();
    }
    updateFunc();
});
