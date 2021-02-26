let cvs;
let ctx;
let playButton = document.getElementById('play');
let audio = new Audio();
audio.src = audioFile;
audio.preload = 'auto';
let __$__$_ = false;
audio.addEventListener('canplaythrough', e=>playButton.disabled = false);
playButton.onclick = function() {
	init();
	window.onkeydown = keydown;
	window.onkeyup = keyup;
	draw();
	audio.play();
};
window.onkeydown = function(e) {
	if(!playButton.disabled&&e.keyCode==80)
		playButton.onclick();
	else if(e.keyCode==65)
		console.log(auto());
};
let nList = [[], [], [], []];
let result = [[0, 0], [0, 0], [0, 0], [0, 0]];
let last = 0;
function init() {
	cvs = document.createElement('canvas');
	cvs.id = 'canvas';
	cvs.width = window.innerWidth;
	cvs.height = window.innerHeight;
	cvs.style.cursor = "none";
	document.body.replaceChild(cvs, document.getElementById('startup'));
	cvs.requestFullscreen();
	ctx = cvs.getContext('2d');
	let bpm = 60, offset = 0;
	for(let i=0; i<crochet.length; i++) {
		switch(crochet[i].type) {
		case 'b':
			offset += crochet[i].offset/bpm*60;
			bpm = crochet[i].bpm;
			break;
		case 'n':
			nList[crochet[i].kind].push({t:crochet[i].pos/bpm*60+offset, s:0});
			last = Math.max(last, nList[crochet[i].kind][nList[crochet[i].kind].length-1].t);
			if(crochet[i].kind==3) {
				nList[3][nList[3].length-1].b = false;
				nList[3][nList[3].length-1].d = 0;
				if(crochet[i].dur) {
					nList[3][nList[3].length-1].d = crochet[i].dur/bpm*60;
					nList[3][nList[3].length-1].b = true;
					last = Math.max(last, nList[3][nList[3].length-1].t+nList[3][nList[3].length-1].d);
				}
			}
			break;
		}
	}
	nList[0].sort(function (a, b) {
		return a.t-b.t;
	});
	nList[1].sort(function (a, b) {
		return a.t-b.t;
	});
	nList[2].sort(function (a, b) {
		return a.t-b.t;
	});
	nList[3].sort(function (a, b) {
		return a.t-b.t;
	});
}
let fish = new Image();
fish.src = fishFile;
let time;
let _drawRange = [{min: 0, max: 0}, {min: 0, max: 0}, {min: 0, max: 0}, {min: 0, max: 0}];
let drawRange = [];
function draw() {
	time = audio.currentTime;
	let __time = audio.currentTime;
	cvs.width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
	cvs.height = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
	earlygimmick();
	ctx.lineWidth = cvs.width/200;
	ctx.font = cvs.height/20+'px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = 'dodgerblue';
	ctx.fillRect(0, 0, cvs.width/2, cvs.height/2);
	ctx.fillStyle = 'white';
	ctx.fillRect(cvs.width/2, 0, cvs.width/2, cvs.height/2);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, cvs.height/2, cvs.width/2, cvs.height/2);
	ctx.fillStyle = 'yellow';
	ctx.fillRect(cvs.width/2, cvs.height/2, cvs.width/2, cvs.height/2);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cvs.width / audio.duration * __time, 5);
	ctx.fillStyle = 'yellow';
	ctx.fillRect(0, 0, Math.min(cvs.width/2, cvs.width / audio.duration * __time), 5);

	// Set drawRange
	while(_drawRange[0].min<nList[0].length&&(nList[0][_drawRange[0].min].t - time) * cvs.width/4 + cvs.width/28*3+cvs.height/15<0) {
		_drawRange[0].max = ++_drawRange[0].min;
	}
	while(_drawRange[0].max<nList[0].length&&(nList[0][_drawRange[0].max].t - time) * cvs.width/4 + cvs.width/28*3-cvs.height/15<cvs.width/2) {
		_drawRange[0].max++;
	}
	while(_drawRange[1].min<nList[1].length&&cvs.width/4*3+((nList[1][_drawRange[1].min].t - time)*cvs.width/4)+cvs.height/40<cvs.width/2) {
		_drawRange[1].max = ++_drawRange[1].min;
	}
	while(_drawRange[1].max<nList[1].length&&cvs.width/4*3+((nList[1][_drawRange[1].max].t - time)*cvs.width/4)-cvs.height/40<cvs.width) {
		_drawRange[1].max++;
	}
	while(_drawRange[2].min<nList[2].length&&cvs.height/15+(time - nList[2][_drawRange[2].min].t)*cvs.width/2>Math.sqrt(Math.pow(cvs.width/4*3, 2)+Math.pow(cvs.height/4*3, 2))) {
		_drawRange[2].max = ++_drawRange[2].min;
	}
	while(_drawRange[2].max<nList[2].length&&(nList[2][_drawRange[2].max].t < time||cvs.width/4-Math.pow(nList[2][_drawRange[2].max].t - time, 2)*cvs.width/5+cvs.height/15>0)) {
		_drawRange[2].max++;
	}
	while(_drawRange[3].min<nList[3].length&&cvs.width/10*7+(nList[3][_drawRange[3].min].t+nList[3][_drawRange[3].min].d-time)*cvs.width/4<cvs.width/2) {
		_drawRange[3].max = ++_drawRange[3].min;
	}
	while(_drawRange[3].max<nList[3].length&&cvs.width/10*7+(nList[3][_drawRange[3].max].t-time)*cvs.width/4<cvs.width) {
		_drawRange[3].max++;
	}
	for(let i=0; i<4; i++) {
		drawRange[i] = {..._drawRange[i]};
	}

	// Call Gimmick
	gimmick();

	ctx.lineWidth = cvs.width/200;
	ctx.font = cvs.height/20+'px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	if(!__$__$_) {
		ctx.fillStyle = 'yellow';
		ctx.fillText('F', cvs.width/2-50, cvs.height/2-50);
		ctx.fillStyle = 'black';
		ctx.fillText('J', cvs.width/2+50, cvs.height/2-50);
		ctx.fillStyle = 'white';
		ctx.fillText('D', cvs.width/2-50, cvs.height/2+50);
		ctx.fillStyle = 'dodgerblue';
		ctx.fillText('K', cvs.width/2+50, cvs.height/2+50);
	}

	// Draw Fish Part
	ctx.beginPath();
	ctx.fillStyle = '#fff3';
	ctx.arc(cvs.width/28*3, cvs.height/4, cvs.height/15, 0, Math.PI*2);
	ctx.fill();
	for(let i=drawRange[0].min; i<drawRange[0].max; i++) {
		if(nList[0][i].s==0&&nList[0][i].t-__time<-0.1) {
			nList[0][i].s = -1;
			result[0][1]++;
		}
		ctx.beginPath();
		ctx.strokeStyle = nList[0][i].s==0?'white':nList[0][i].s>0?'green':'red';
		ctx.arc((nList[0][i].t - time) * cvs.width/4 + cvs.width/28*3, cvs.height/4, cvs.height/15, Math.PI/2, Math.PI/2*3);
		ctx.stroke();
		ctx.closePath();
	}
	ctx.drawImage(fish, cvs.width/35*2, cvs.height/5, cvs.width/10, cvs.height/10);
	for(let i=drawRange[0].min; i<drawRange[0].max; i++) {
		ctx.beginPath();
		ctx.strokeStyle = nList[0][i].s==0?'white':nList[0][i].s>0?'green':'red';
		ctx.arc((nList[0][i].t - time) * cvs.width/4 + cvs.width/28*3, cvs.height/4, cvs.height/15, Math.PI/2*3, Math.PI/2);
		ctx.stroke();
		ctx.closePath();
		if(__$__$_&&nList[0][i].s==0&&nList[0][i].t<__time) {
			keydown({keyCode: 70});
		}
	}

	// Draw Ball Part
	for(let i=drawRange[1].min; i<drawRange[1].max; i++) {
		if(nList[1][i].s==0&&nList[1][i].t-__time<-0.1) {
			nList[1][i].s = -1;
			result[1][1]++;
		}
		ctx.beginPath();
		ctx.fillStyle = nList[1][i].s==0?'black':nList[1][i].s>0?'green':'red';
		if((nList[1][i].t - time)*cvs.width/4>0) {
			ctx.arc(cvs.width/4*3+(nList[1][i].t - time)*cvs.width/4, Math.pow((nList[1][i].t - time)*cvs.width/4-cvs.width/4, 2)/(cvs.width*cvs.width/16)*cvs.height/2-cvs.height/40, cvs.height/40, 0, Math.PI*2);
		}
		else {
			ctx.arc(cvs.width/4*3+(nList[1][i].t - time)*cvs.width/4, Math.pow((nList[1][i].t - time)*cvs.width/4+cvs.width/4, 2)/(cvs.width*cvs.width/16)*cvs.height/2-cvs.height/40, cvs.height/40, 0, Math.PI*2);
		}
		ctx.fill();
		if(__$__$_&&nList[1][i].s==0&&nList[1][i].t<__time)
			keydown({keyCode: 74});
	}

	// Draw Shoot Part
	for(let i=drawRange[2].min; i<drawRange[2].max; i++) {
		if(nList[2][i].s==0&&nList[2][i].t-__time<-0.1) {
			nList[2][i].s = -1;
			result[2][1]++;
		}
		ctx.beginPath();
		ctx.fillStyle = ctx.strokeStyle = nList[2][i].s==0?'white':nList[2][i].s>0?'green':'red';
		if(nList[2][i].t>time) {
			ctx.arc(cvs.width/4-Math.pow(nList[2][i].t - time, 2)*cvs.width/5, cvs.height/4*3, cvs.height/15, 0, Math.PI*2);
			ctx.fill();
		}
		else {
			ctx.arc(cvs.width/4, cvs.height/4*3, cvs.height/15+(time - nList[2][i].t)*cvs.width/2, 0, Math.PI*2);
			ctx.stroke();
			ctx.closePath();
		}
		if(__$__$_&&nList[2][i].s==0&&nList[2][i].t<__time)
			keydown({keyCode: 68});
	}
	ctx.beginPath();
	ctx.strokeStyle = 'pink';
	ctx.arc(cvs.width/4, cvs.height/4*3, cvs.height/10, 0, Math.PI*2);
	ctx.moveTo(cvs.width/4+cvs.height/20, cvs.height/4*3);
	ctx.arc(cvs.width/4, cvs.height/4*3, cvs.height/20, 0, Math.PI*2);
	ctx.moveTo(cvs.width/4, cvs.height/8*5);
	ctx.lineTo(cvs.width/4, cvs.height/8*7);
	ctx.moveTo(cvs.width/4-cvs.height/8, cvs.height/4*3);
	ctx.lineTo(cvs.width/4+cvs.height/8, cvs.height/4*3);
	ctx.stroke();
	ctx.closePath();

	// Draw Draw Part (lol)
	for(let i=drawRange[3].min; i<drawRange[3].max; i++) {
		if(nList[3][i].s==0&&nList[3][i].t-__time<-0.1) {
			nList[3][i].s = -1;
			result[3][1]++;
		}
		// If the note is long
		if(nList[3][i].b) {
			ctx.strokeStyle = 'black';
			ctx.beginPath();
			ctx.moveTo(Math.max(cvs.width/2, cvs.width/10*7+Math.max(0, nList[3][i].t-time)*cvs.width/4), cvs.height/10*9);
			ctx.lineTo(Math.max(cvs.width/2, cvs.width/10*7+Math.max(0, nList[3][i].t+nList[3][i].d-time)*cvs.width/4), cvs.height/10*9);
			ctx.stroke();
			ctx.closePath();
			ctx.strokeStyle = nList[3][i].s==0?'black':nList[3][i].s>0?'green':'red';
			ctx.beginPath();
			ctx.moveTo(Math.max(cvs.width/2, cvs.width/10*7+Math.min(0, nList[3][i].t-time)*cvs.width/4), cvs.height/10*9);
			ctx.lineTo(Math.max(cvs.width/2, cvs.width/10*7+Math.min(0, nList[3][i].t+nList[3][i].d-time)*cvs.width/4), cvs.height/10*9);
			ctx.stroke();
			ctx.closePath();
		}
		// If the note is short
		else {
			ctx.strokeStyle = nList[3][i].s==0?'black':nList[3][i].s>0?'green':'red';
			ctx.beginPath();
			ctx.moveTo(cvs.width/10*7+(nList[3][i].t-time)*cvs.width/4, cvs.height/10*9);
			ctx.lineTo(cvs.width/10*7+(nList[3][i].t-time)*cvs.width/4, cvs.height/10*6);
			ctx.stroke();
			ctx.closePath();
		}
		if(__$__$_&&nList[3][i].s==0&&nList[3][i].t<__time) {
			keydown({keyCode: 75});
		}
	}
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(cvs.width/10*7, cvs.height/2);
	ctx.lineTo(cvs.width/10*7, cvs.height);
	ctx.stroke();
	ctx.closePath();

	// Show Result
	if(last<time-0.1) {
		ctx.fillStyle = 'green';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'bottom';
		ctx.fillText(result[0][0]+' ', cvs.width/4, cvs.height/2);
		ctx.fillText(result[1][0]+' ', cvs.width/4*3, cvs.height/2);
		ctx.textBaseline = 'top';
		ctx.fillText(result[2][0]+' ', cvs.width/4, cvs.height/2);
		ctx.fillText(result[3][0]+' ', cvs.width/4*3, cvs.height/2);
		ctx.fillStyle = 'red';
		ctx.textAlign = 'left';
		ctx.fillText(' '+result[2][1], cvs.width/4, cvs.height/2);
		ctx.fillText(' '+result[3][1], cvs.width/4*3, cvs.height/2);
		ctx.textBaseline = 'bottom';
		ctx.fillText(' '+result[0][1], cvs.width/4, cvs.height/2);
		ctx.fillText(' '+result[1][1], cvs.width/4*3, cvs.height/2);
		if(!finished) {
			document.exitFullscreen();
			finished = true;
			cvs.style.cursor = "auto";
		}
	}
	// Call LateGimmick
	lategimmick();
	requestAnimationFrame(draw);
}
let finished = false;
function keydown(e) {
	let time = audio.currentTime;
	switch(e.keyCode) {
	case 70:	// F
	case 85:
		for(let i=0; i<nList[0].length; i++)
			if(nList[0][i].s==0&&Math.abs(nList[0][i].t-time)<0.1) {
				nList[0][i].s = 1;
				result[0][0]++;
				break;
			}
		break;
	case 74:	// J
	case 82:
		for(let i=0; i<nList[1].length; i++)
			if(nList[1][i].s==0&&Math.abs(nList[1][i].t-time)<0.1) {
				nList[1][i].s = 1;
				result[1][0]++;
				break;
			}
		break;
	case 68:	// D
	case 73:
		for(let i=0; i<nList[2].length; i++)
			if(nList[2][i].s==0&&Math.abs(nList[2][i].t-time)<0.1) {
				nList[2][i].s = 1;
				result[2][0]++;
				break;
			}
		break;
	case 75:	// K
	case 69:
		for(let i=0; i<nList[3].length; i++)
			if(nList[3][i].s==0&&Math.abs(nList[3][i].t-time)<0.1) {
				nList[3][i].s = 1;
				result[3][0]++;
				break;
			}
		break;//*/
	case 32:	// Debug Mode
		if(audio.paused)
			audio.play();
		else
			audio.pause();
		break;
	case 37:
		audio.currentTime -= 10;
		break;
	case 39:
		audio.currentTime += 10;
		break;//*/
	}
}
function keyup(e) {
	if(e.keyCode == 75 || e.keyCode == 69) {		// K
		lettime = audio.currentTime;
		for(let i=0; i<nList[3].length; i++) {
			if(nList[3][i].b&&nList[3][i].s==1&&nList[3][i].t<time-0.1&&nList[3][i].t+nList[3][i].d>time+0.1) {
				nList[3][i].s = -1;
				result[3][0]--;
				result[3][1]++;
				break;
			}
		}
	}
}

function auto() {
	__$__$_ = !__$__$_;
	document.body.style.backgroundColor = __$__$_?'black':'white';
	return 'Autoplay '+(__$__$_?'en':'dis')+'abled';
}