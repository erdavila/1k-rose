var zBuffer = [];

var f = 500;
canvas.width = canvas.height = f;
var h = -250;

function surface(a, b, c) {
	if(c > 60) {
		return [
			Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) - Math.sin(b) * 50,
			b * f + 50,
			625 + Math.cos(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
			a * 1 - b / 2,
			a
		];
	}
	var A = a * 2 - 1;
	var B = b * 2 - 1;
	if(A * A + B * B < 1) {
		if(c > 37) {
			var j = c & 1;
			var n = j ? 6 : 4;
			var o = .5 / (a + .01) + Math.cos(b * 125) * 3 - a * 300;
			var w = b * h;
			return [
				o * Math.cos(n) + w * Math.sin(n) + j * 610 - 390,
				o * Math.sin(n) - w * Math.cos(n) + 550 - j * 350,
				1180 + Math.cos(B + A) * 99 - j * 300,
				.4 - a * .1 + Math.pow(1 - B * B, -h * 6) * .15 - a * b * .4 + Math.cos(a + b) / 5 + Math.pow(Math.cos((o * (a + 1) + (B > 0 ? w : -w)) / 25),
				30) * .1 * (1 - B * B),
				o / 1e3 + .7 - o * w * 3e-6
			];
		}
		if(c > 32) {
			c = c * 1.16 - .15;
			var o = a * 45 - 20;
			var w = b * b * h;
			var z = o * Math.sin(c) + w * Math.cos(c) + 620;
			return [
				o * Math.cos(c) - w * Math.sin(c),
				28 + Math.cos(B * .5) * 99 - b * b * b * 60 - z / 2 - h,
				z,
				(b * b * .3 + Math.pow((1 - (A * A)), 7) * .15 + .3) * b,
				b * .7
			];
		}
		var o = A * (2 - b) * (80 - c * 2);
		var w = 99 - Math.cos(A) * 120 - Math.cos(b) * (-h - c * 4.9) + Math.cos(Math.pow(1 - b, 7)) * 50 + c * 2;
		var z = o * Math.sin(c) + w * Math.cos(c) + 700;
		return [
			o * Math.cos(c) - w * Math.sin(c),
			B * 99 - Math.cos(Math.pow(b, 7)) * 50 - c / 3 - z / 1.35 + 450,
			z,
			(1 - b / 1.2) * .9 + a * .1,
			Math.pow((1 - b), 20) / 4 + .05
		];
	}
}

setInterval(function () {
	for(var i = 0; i < 1e4; i++) {
		var point = surface(Math.random(), Math.random(), i % 46 / .74);
		if(point) {
			var z = point[2];
			var x = ~~ (point[0] * f / z - h);
			var y = ~~ (point[1] * f / z - h);
			var zBufferIndex = y * f + x;
			if((typeof zBuffer[zBufferIndex] === "undefined")  ||  (zBuffer[zBufferIndex] > z)) {
				zBuffer[zBufferIndex] = z;
				context.fillStyle = "rgb(" + ~ (point[3] * h) + "," + ~ (point[4] * h) + "," + ~ (point[3] * point[3] * -80) + ")";
				context.fillRect(x, y, 1, 1);
			}
		}
	}
}, 0);
