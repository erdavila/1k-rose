var zBuffer = [];

var f = 500;
canvas.width = canvas.height = f;
var h = -250;

function surface(a, b, c) {
	if(c > 60) {
		// The rose STICK.
		// There is only one value greater than 60, which is 60.8108108108
		return {
			x: Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) - Math.sin(b) * 50,
			y: b * f + 50,
			z: 625 + Math.cos(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
			3: a * 1 - b / 2,
			4: a
		};
	}
	
	// a and b have values in the interval [0, 1)
	// A and B have values in the interval [-1, +1)
	var A = a * 2 - 1;
	var B = b * 2 - 1;
	
	if(A * A + B * B < 1) {
		// Consider only points inside a [to-be-deformed] circle.
		
		if(c > 37) {
			// The 2 LEAVES.
			// There are 17 values for which 37 < c <= 60, but only 2 leaves are drawn.
			// The value of c is not used to draw the leaves - only its parity is used.
			// The left leaf (when c is even) is drawn 8 times! 
			// The right leaf (when c is odd) is drawn 9 times! 
			//if(c < 58) return;   // This code would avoid redrawing the leaves.
			
			var j = c & 1;   // Is c odd or even?
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
			// The 4 SEPALS.
			// There are 4 values for which 32 < c <= 37, one for each sepal.
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
		
		// The 24 PETALS.
		// There are 24 values for which c <= 32, one for each petal.
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
	for(var i = 0; i < 10000; i++) {
		// Splits i in intervals [0, 45)
		// and stretches each interval to [0, 62.1621621622).
		// See the table in the end of this file.
		var part = i % 46 / .74;
		
		var point = surface(Math.random(), Math.random(), part);
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


/*
i	part
-------------------------------
0	0				A petal
1	1.3513513514	A petal
2	2.7027027027	A petal
3	4.0540540541	A petal
4	5.4054054054	A petal
5	6.7567567568	A petal
6	8.1081081081	A petal
7	9.4594594595	A petal
8	10.8108108108	A petal
9	12.1621621622	A petal
10	13.5135135135	A petal
11	14.8648648649	A petal
12	16.2162162162	A petal
13	17.5675675676	A petal
14	18.9189189189	A petal
15	20.2702702703	A petal
16	21.6216216216	A petal
17	22.972972973	A petal
18	24.3243243243	A petal
19	25.6756756757	A petal
20	27.027027027	A petal
21	28.3783783784	A petal
22	29.7297297297	A petal
23	31.0810810811	A petal
24	32.4324324324	A sepal
25	33.7837837838	A sepal
26	35.1351351351	A sepal
27	36.4864864865	A sepal
28	37.8378378378	The right leaf (?)
29	39.1891891892	The right leaf (?)
30	40.5405405405	The left  leaf (?)
31	41.8918918919	The right leaf (?)
32	43.2432432432	The right leaf (?)
33	44.5945945946	The left  leaf (?)
34	45.9459459459	The right leaf (?)
35	47.2972972973	The right leaf (?)
36	48.6486486486	The left  leaf (?)
37	50				The left  leaf (?)
38	51.3513513514	The right leaf (?)
39	52.7027027027	The left  leaf (?)
40	54.0540540541	The left  leaf (?)
41	55.4054054054	The right leaf (?)
42	56.7567567568	The left  leaf (?)
43	58.1081081081	The left  leaf (?)
44	59.4594594595	The right leaf (?)
45	60.8108108108	The rose stick
46	0
47	1.3513513514
48	2.7027027027
49	4.0540540541
50	5.4054054054
...	...				... 
*/
