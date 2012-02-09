var zBuffer = [];

var SIZE = 500;
canvas.width = canvas.height = SIZE;
var h = -250;

function surface(a, b, c) {
	if(c > 60) {
		// The rose STICK.
		// There is only one value greater than 60, which is 60.8108108108.
		return {
			x: Math.sin(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) - Math.sin(b) * 50,
			y: b * SIZE + 50,
			z: 625 + Math.cos(a * 7) * (13 + 5 / (.2 + Math.pow(b * 4, 4))) + b * 400,
			r: a * 1 - b / 2,
			g: a
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
			/*
			 * The left leaf (when c is even) is drawn 8 times, while the right
			 * leaf (when c is odd) is drawn 9 times. This is due to the deformation
			 * that makes the tips of the leaves to take more iterations to render.
			 * So, with more rendering per iteration, the leaves will be filled
			 * more or less at the same time as the rest of the rose.
			 */
			var j = c & 1;   // Is c odd or even?
			var n = j ? 6 : 4;
			var o = .5 / (a + .01) + Math.cos(b * 125) * 3 - a * 300;
			var w = b * h;
			return {
				x: o * Math.cos(n) + w * Math.sin(n) + j * 610 - 390,
				y: o * Math.sin(n) - w * Math.cos(n) + 550 - j * 350,
				z: 1180 + Math.cos(B + A) * 99 - j * 300,
				r: .4 - a * .1 + Math.pow(1 - B * B, -h * 6) * .15 - a * b * .4 + Math.cos(a + b) / 5 + Math.pow(Math.cos((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B),
				g: o / 1e3 + .7 - o * w * 3e-6
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
				r: (b * b * .3 + Math.pow((1 - (A * A)), 7) * .15 + .3) * b,
				g: b * .7
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
			r: (1 - b / 1.2) * .9 + a * .1,
			g: Math.pow((1 - b), 20) / 4 + .05
		};
	}
}

setInterval(function () {
	for(var i = 0; i < 10000; i++) {
		// Splits i in intervals [0, 45) ...
		var part = i % 46;
		// .. and stretches each interval to [0, 62.1621621622).
		var c = part / .74;
		// See the table in the end of this file.
		
		var point = surface(Math.random(), Math.random(), c);
		if(point) {
			var z = point.z;
			var x = parseInt(point.x * SIZE / z - h);
			var y = parseInt(point.y * SIZE / z - h);
			var zBufferIndex = y * SIZE + x;
			if((typeof zBuffer[zBufferIndex] === "undefined")  ||  (zBuffer[zBufferIndex] > z)) {
				zBuffer[zBufferIndex] = z;
				/*
				The rose is mostly red and green - that's why the objects
				returned by the surface function do not have a field for the
				blue component. However, a bit of the blue component is desired
				to "tune" the colors of the petals, so the blue component can be
				derived from the red component.
				 */
				var r = -parseInt(point.r * h);
				var g = -parseInt(point.g * h);
				var b = -parseInt(point.r * point.r * -80);
				
				context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
				context.fillRect(x, y, 1, 1);
			}
		}
	}
}, 0);


/*

 i   part    c
-------------------------------------------
 0     0     0              A petal
 1     1     1.351351351    A petal
 2     2     2.702702703    A petal
 3     3     4.054054054    A petal
 4     4     5.405405405    A petal
 5     5     6.756756757    A petal
 6     6     8.108108108    A petal
 7     7     9.459459459    A petal
 8     8    10.81081081     A petal
 9     9    12.16216216     A petal
10    10    13.51351351     A petal
11    11    14.86486486     A petal
12    12    16.21621622     A petal
13    13    17.56756757     A petal
14    14    18.91891892     A petal
15    15    20.27027027     A petal
16    16    21.62162162     A petal
17    17    22.97297297     A petal
18    18    24.32432432     A petal
19    19    25.67567568     A petal
20    20    27.02702703     A petal
21    21    28.37837838     A petal
22    22    29.72972973     A petal
23    23    31.08108108     A petal
24    24    32.43243243     A sepal
25    25    33.78378378     A sepal
26    26    35.13513514     A sepal
27    27    36.48648649     A sepal
28    28    37.83783784     The right leaf
29    29    39.18918919     The right leaf
30    30    40.54054054     The left  leaf
31    31    41.89189189     The right leaf
32    32    43.24324324     The right leaf
33    33    44.59459459     The left  leaf
34    34    45.94594595     The right leaf
35    35    47.2972973      The right leaf
36    36    48.64864865     The left  leaf
37    37    50              The left  leaf
38    38    51.35135135     The right leaf
39    39    52.7027027      The left  leaf
40    40    54.05405405     The left  leaf
41    41    55.40540541     The right leaf
42    42    56.75675676     The left  leaf
43    43    58.10810811     The left  leaf
44    44    59.45945946     The right leaf
45    45    60.81081081     The rose stick
46     0     0    
47     1     1.351351351    
48     2     2.702702703    
49     3     4.054054054    
50     4     5.405405405    
...   ...   ...     

*/
