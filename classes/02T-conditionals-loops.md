

### Boolean operators Part 1: Boolean Logic


Consider the following pieces of code and calculate by hand what value they should calculate, then check your results by entering them into the console.

1.  true || false
2.  ((true || false) && false) || true
3.  var x;
    (x < 10) || (x > 10);
4.  !!false
5.  !((x >= 0) && (x <= 10)) === (!(x >= 0) || !(x <= 10))
6.  !((x >= 0) && (x <= 10)) ===   ((x < 0) || (x > 10))
7.  var x=1, y=1;
    x === y === 1;
8.  var x = 0;
    -1 < x < 1

### Boolean Operators Part 2: Non-Boolean values and Truthiness


1.	'coffee' || 'tea'
2.	'coffee' && 'tea'
3.	2 && 1 && 0
4.	2*Infinity && 'beyond'
5.	undefined || false
6.	undefined || undefined
7.	'banana'/2 || 'false'
8.	var x, y=1;
	x || y;
9.	var x = 0;
	(x === 1 || 2)


### Conditionals


Consider the following fragments of code: execute them by hand, as shown in class, and then compare your answers to what you get from running the examples in scratchpad.

1.

```
var x;
if (x || (x=10)) {
	console.log(x);
} else {
	if (x && (+"totes a string")){
		console.log("one thing");
	} else {
		console.log("another thing");
	}
}
```

2.

```
if (x || !x) {
	console.log("We've excluded the middle");
} else {
	console.log("The middle is not excluded");
}
```


### Boolean Operators Part 3: Short-circuting

Consider the following fragments of code and try to follow the logic of their execution and their outcome:

1.  true || arglebarg
2.	if (doJShomework() || runMarathon()) deserveCookie();
3.	if (doJShomework() && runMarathon()) deserveCookie();
4.  (backup = '') && deleteAllFiles()
5.  treat() || trick()
6.  practice() && win() && celebrate()

### While loops

Consider the following fragments of code: execute them by hand, as shown in class, and then compare your answers to what you get from running the examples in scratchpad. The second is *almost* the same as the first. Do you understand why they behave differently?

Be sure you understand the examples before you run them!

1.

```
var x;
var i = 0;
while (!x) {
	i = i + 1;
	if (i == 5) {
		x = true;
	}
	console.log("running");
}
```

2.

```
var y;
var j;
while (!y) {
	j = j + 1;
	if (j == 5) {
		y = true;
	}
	console.log("running");
}
```

<!-- GCD/Euclid's algorithm: -->
3.

```
var a=81, b=108;
while (b>0) {
	var t = b;
	b = a % b;
	a = t;
}
var g = a;
```
Setting aside the particular initial values of a and b, how might you summarize the purpose of this calculation?


4.

```
var a=60, b=84;
while (a!==b) {
	if (a>b)
		a-=b;
	else
		b-=a;
}
var g = b;
```
How might you summarize the purpose of this calculation?


## For-loops

Consider the following fragment of code: execute it by hand, as shown in class, and then compare your answer to what you get from running the examples in scratchpad.

```
var i;
    
for (i = 0; i < 8; i=i+1){
    if(i == 5){
        console.log("It's five!");
        i = i+1;
    }
    console.log(i);
}
```

What numbers are printed out by this code?

### Summary


Summarize the following ideas in your own words:

-	if-statements
-	branching
-   booleans
-	truthiness
-   short-circuiting
-   while loops
-   for loops

After you're done, share your answers within your group and discuss them.

