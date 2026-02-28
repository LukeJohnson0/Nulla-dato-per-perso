document.addEventListener('DOMContentLoaded', loaded => {
	var shape;
	function drawUI() {
		if(loaded) {
			shape = document.getElementById("inputUI");
			const ctx = shape.getContext("2d");
			ctx.beginPath();
			ctx.arc(75, 100, 40, 0, 2 * Math.PI);
			ctx.fillStyle = 'white';
			ctx.fill()
		}
	}
	drawUI();
	class updateInput {
		constructor(touchIntX, touchIntY, onClicked) { // constructor that contains variables that can
			this.touchIntX = touchIntX; // accessed through another file.
			this.touchIntY = touchIntY;
			this.onClicked = onClicked = false;
			const inputMap = {
				'touchstart': true,
				'touchend' : false,
				'mousedown' : true,
				'mouseup' : false,
				'pointerleave' : false
			};
			Object.entries(inputMap).forEach(([eventType, state]) =>{
				shape.addEventListener(eventType, () =>{
					this.onClicked = state;
				});
			});
			window.addEventListener(( /*"touchmove", */ "mousemove"), clientInput => {
				this.touchIntX = clientInput.clientX;
				this.touchIntY = clientInput.clientY;
			})
		}
		updateFunc() {
			//console.log(`${this.onClicked}`);
			if(this.onClicked) {
				console.log(`Position: ${this.touchIntX}, ${this.touchIntY}`);
				shape.style.top = this.touchIntY + 'px';
				shape.style.right = this.touchIntX + 'px';
			}
			/*console.log("Update working!"); debug passed: it works*/
		}
	}
	if(shape) {
		var input = new updateInput(0, 0);
	}

	function updateFunc() {
		requestAnimationFrame(updateFunc);
		input.updateFunc(); //:void
	}
	updateFunc();
});
