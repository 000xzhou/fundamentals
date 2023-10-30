// window.innerWidth
// window.innerHeight

const main = document.body.appendChild(document.createElement("main"))

function onMouseMove() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    // this only gets it once even outside the function
    main.addEventListener("mousemove", (event)=> {
        let x=event.clientX
        let y=event.clientY
        // console.log(x)
        // console.log(y)
        findMousePosition(x, y, windowWidth, windowHeight)
    }) 
}

function findMousePosition (clientWidth,clientHeight, windowWidth, windowHeight) {
    let width = Math.round((clientWidth*255)/windowWidth)
    let height = Math.round((clientHeight*255)/windowHeight)
    let rgb = `255,${width},${height}`
    // console.log(`rgb(${rgb})`)
    main.style.backgroundColor = `rgb(${rgb})`
}
// findMousePosition(250,240,700,800)
onMouseMove()