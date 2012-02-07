var zBuffer = [];

var f = 500;
canvas.width = canvas.height = f;
var h = -250;

function surface(a, b, c) {
	if(c > 60) {
		return {
			x: Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) - Math.sin(b) * 50,
			y: b * f + 50,
			z: 625 + Math.cos(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
			3: a * 1 - b / 2,
			4: a
		};
	}
	var A = a * 2 - 1;
	var B = b * 2 - 1;
	if(A * A + B * B < 1) {
		if(c > 37) {
			var j = c & 1;
			var n = j ? 6 : 4;
			var o = .5 / (a + .01) + Math.cos(b * 125) * 3 - a * 300;
			var w = b * h;
			return {
				x: o * Math.cos(n) + w * Math.sin(n) + j * 610 - 390,
				y: o * Math.sin(n) - w * Math.cos(n) + 550 - j * 350,
				z: 1180 + Math.cos(B + A) * 99 - j * 300,
				3: .4 - a * .1 + Math.pow(1 - B * B, -h * 6) * .15 - a * b * .4 + Math.cos(a + b) / 5 + Math.pow(Math.cos((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B),
				4: o / 1e3 + .7 - o * w * 3e-6
			};
		}
		if(c > 32) {
			c = c * 1.16 - .15;
			var o = a * 45 - 20;
			var w = b * b * h;
			var z = o * Math.sin(c) + w * Math.cos(c) + 620;
			return {
				x: o * Math.cos(c) - w * Math.sin(c),
				y: 28 + Math.cos(B * .5) * 99 - b * b * b * 60 - z / 2 - h,
				z: z,
				3: (b * b * .3 + Math.pow((1 - (A * A)), 7) * .15 + .3) * b,
				4: b * .7
			};
		}
		var o = A * (2 - b) * (80 - c * 2);
		var w = 99 - Math.cos(A) * 120 - Math.cos(b) * (-h - c * 4.9) + Math.cos(Math.pow(1 - b, 7)) * 50 + c * 2;
		var z = o * Math.sin(c) + w * Math.cos(c) + 700;
		return {
			x: o * Math.cos(c) - w * Math.sin(c),
			y: B * 99 - Math.cos(Math.pow(b, 7)) * 50 - c / 3 - z / 1.35 + 450,
			z: z,
			3: (1 - b / 1.2) * .9 + a * .1,
			4: Math.pow((1 - b), 20) / 4 + .05
		};
	}
}

setInterval(function () {
	for(var i = 0; i < 1e4; i++) {
		var point = surface(Math.random(), Math.random(), i % 46 / .74);
		if(point) {
			var z = point.z;
			var x = parseInt(point.x * f / z - h);
			var y = parseInt(point.y * f / z - h);
			var zBufferIndex = y * f + x;
			if((typeof zBuffer[zBufferIndex] === "undefined")  ||  (zBuffer[zBufferIndex] > z)) {
				zBuffer[zBufferIndex] = z;
				var r = -parseInt(point[3] * h);
				var g = -parseInt(point[4] * h);
				var b = -parseInt(point[3] * point[3] * -80);
				context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
				context.fillRect(x, y, 1, 1);
			}
		}
	}
}, 0);
