// ============================================================
// DECLARATIVE FUNCTIONS (Function Declarations)
// ============================================================

// This works before the declaration because function declarations
// are fully hoisted. JS moves the entire function to the top of
// the scope before any code runs, so calling it here is valid.
console.log(greetings("mykels"))

function greetings(name){
    // Template literal used correctly to interpolate the name argument.
    return `welcome ${name}`
}

// Works here too, hoisting applies to the entire script scope.
console.log(greetings("Kurosaki"))


function sum() {
    let total = 0

    // 'arguments' is an array-like object available in all regular
    // functions. It holds every value passed in regardless of how
    // many parameters are defined. This is why no parameters are
    // declared in the signature above, the task required using
    // arguments directly instead of rest parameters (...args).

    // BUG: 'i' is not declared with let or const here. This makes
    // 'i' an implicit global, meaning it leaks out of the function
    // and can silently interfere with other parts of your code.
    // Should be: for (let i = 0; i < arguments.length; i++)
    for (i=0; i<arguments.length; i++){
        total += arguments[i]
    }

    return total
}
console.log(sum(43, 7))


// Object literal with a method shorthand. 'increment' is defined
// as a regular method (not an arrow function), which is intentional.
// Regular methods bind 'this' to the object that calls them, so
// 'this.count' correctly refers to counter.count here.

// NOTE: 'counter' is not declared with let or const, making it an
// implicit global. Should be: const counter = { ... }
counter = {
    count: 0,
    increment(){
        // 'this' here refers to the 'counter' object because increment
        // is called as counter.increment(). Regular function methods
        // get their 'this' from the call site.
        this.count++
    }
}

counter.increment()
counter.increment()
counter.increment()

// Logs 3 because increment was called three times and each call
// correctly mutated counter.count through 'this'.
console.log(counter.count)



// ============================================================
// FUNCTION EXPRESSIONS
// ============================================================

// BUG: 'operate', 'add', 'sub', 'total', 'el' are all undeclared.
// They become implicit globals. Every variable here should be
// declared with let or const.

// This is the default fallback. If mode doesn't match any known
// operation, operate stays as this function and returns a message
// indicating the operation is unknown.
operate = function(){
    return "operation doesn't exist"
}

// Function expression assigned to 'add'. Uses the arguments object
// (valid in regular function expressions) to accept any number of
// values and sum them. The ternary at the end guards against being
// called with no arguments, returning a helpful message instead of 0.
add = function(){
    total = 0
    for (el of arguments){
        total += el
    }
    return arguments.length === 0 ? "pass in arguments to operate on" : total
}

// Same structure as add but intended for subtraction. 
// NOTE: the logic inside is identical to add right now, it adds
// instead of subtracts. To actually subtract, you would start total
// at arguments[0] and subtract all subsequent elements from it.
sub = function(){
    total = 0
    for (el of arguments){
        total += el  // BUG: this adds, not subtracts. Likely unintentional.
    }
    return arguments.length === 0 ? "pass in arguments to operate on" : total
}

// mode controls which function expression gets assigned to operate.
// This is the core of the task: function expressions are values,
// so they can be conditionally assigned to a variable and called later.
// operate now points to whichever function the mode resolves to.
let mode = "sub"
if (mode === "add") {
    operate = add
} else if (mode === "sub") {
    operate = sub
}

// Calls whichever function operate was reassigned to above.
// Since mode is "sub", this calls sub(4, 5, 21) and returns 30.
console.log(operate(4, 5, 21))


// A simple function expression that doubles its argument.
// Stored in a variable so it can be passed as a value, which is
// exactly what happens on the next line.
double = function(num){
    return num * 2
}

// new Array(1,2,3,4,5) creates the array, .map(double) passes each
// element into the double function expression and builds a new array
// from the return values. This demonstrates that function expressions
// are first-class values: they can be passed as arguments.
nums = new Array(1, 2, 3, 4, 5).map(double)
console.log(nums)  // [2, 4, 6, 8, 10]


// makeMultiplier is a closure demonstration, though it goes beyond
// the original task which asked for makeMultiplier to return another
// function. Here it is extended with a third nested layer.
makeMultiplier = function(x){

    // another1 closes over 'x' from the outer scope. Even after
    // makeMultiplier returns, another1 still has access to x.
    another1 = function(y){
        out = x * y  // out is undeclared, implicit global again.

        // another2 closes over 'out' from another1's scope.
        // This is a closure inside a closure.
        another2 = function(z){
            return out * z
        }

        // another2 is immediately invoked with 3 instead of being
        // returned. So the chain is: x * y * 3.
        return another2(3)
    }

    // another1 is immediately invoked with 2.
    // Full execution: x=7, y=2, out=14, z=3, result=42.
    return another1(2)
}
console.log(makeMultiplier(7))  // 42



// ============================================================
// ARROW FUNCTIONS
// ============================================================

// 'start' is defined as a regular method shorthand, which is correct
// because it needs 'this' to refer to the timer object.
timer = {
    seconds: 0,
    start() {
        // The setInterval callback is an arrow function, which is
        // intentional and correct. Arrow functions do not have their
        // own 'this'; they inherit it from the enclosing scope, which
        // here is the 'start' method. So 'this' correctly refers to
        // the timer object, and this.seconds increments as expected.
        let frequencyLogger = setInterval(() => console.log(this.seconds += 1), 1000)

        // Another arrow function used as the setTimeout callback for
        // the same reason: lexical 'this' ensures clearInterval gets
        // the right frequencyLogger reference. Stops after 6 seconds.
        setTimeout(() => clearInterval(frequencyLogger), 6000)
    }
}
timer.start()


// This is the "where arrow functions break" task, and it demonstrates
// the problem correctly.
person = {
    name: "mykels",

    // Arrow functions do not have their own 'this'. At the time this
    // arrow function is defined, the enclosing scope is the global
    // scope, not the person object. So 'this' here is the global
    // object (window in browsers, undefined in strict mode), not person.
    // this.name resolves to undefined, not "mykels".
    // A regular method function(){ console.log(this.name) } would fix this.
    logName: () => console.log(this.name)
}

// Logs undefined, not "mykels". The arrow function captured the wrong 'this'.
// This is the expected broken behavior the task asked you to observe.
person.logName()