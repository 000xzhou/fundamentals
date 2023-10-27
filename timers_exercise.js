function countdown(num) {
    const inter = setInterval(() => {
        if(num <= 0) {
            clearInterval(inter)
            console.log("Done!")
            return
        } else {
            console.log(num)
            num--
        }
    }, 1000);
}


function randomGame() {
    let counter = 0
    let num
    const randomNum = setInterval(() => {
        num = Math.random()
        counter++
        console.log(`count: ${counter}, num: ${num}`)
        if ( num > .75) {
        clearInterval(randomNum)
        setTimeout(() => {
            console.log(`Took total of ${counter} tries.`)
        }, 1000);
        }
    
    }, 1000);     
}