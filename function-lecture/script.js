// declarative function
console.log(greetings("mykels"))

function greetings(name){
    return `welcome ${name}`
}

console.log(greetings("Kurosaki"))

function sum() {
    let total = 0
    for (i=0; i<arguments.length; i++){
        total += arguments[i]
    }

    return total
}
console.log(sum(43, 7))

counter = {
    count: 0,
    increment(){
        this.count++
    }
}

counter.increment()
counter.increment()
counter.increment()

console.log(counter.count)


// function expression
operate = function(){
    return "operation doesn't exist"
}

add = function(){
    total = 0
    for (el of arguments){
        total += el
    }
    return arguments.length === 0 ? "pass in arguments to operate on":total
}

sub = function(){
    total = 0
    for (el of arguments){
        total += el
    }
    return arguments.length === 0 ? "pass in arguments to operate on":total
}

let mode = "sub"
if (mode === "add") {
    operate = add
} else if (mode === "sub") {
    operate = sub
}

console.log(operate(4, 5, 21))


double = function(num){
    return num * 2
}

nums = new Array(1, 2, 3, 4, 5).map(double)
console.log(nums)

makeMultiplier = function(x){
    another1 = function(y){
        out = x * y
        another2 = function(z){
            return out * z
        }
        return another2(3)
    }
    return another1(2)
}
console.log(makeMultiplier(7))



// Arrow functions
timer = {
    seconds: 0,
    start() {
        let frequencyLogger = setInterval( () => console.log(this.seconds+=1), 1000)
        setTimeout(() => clearInterval(frequencyLogger), 6000)
    }
}
timer.start()

person = {
    name: "mykels",
    logName: () => console.log(this.name)
}
person.logName()
