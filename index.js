const CA = require('./cellular-automata.js')
const drawGrid = require('./grid-to-canvas.js')

const INTERVAL = 500;
const CA_RESOLUTION = 100
const canvas = document.getElementById('canvas')

let grid, rulesFunction, interval;

reset()

function reset() {
    grid = Array(CA_RESOLUTION).fill(0).map(x => Array(CA_RESOLUTION).fill(0).map(x => Math.random() >= 0.5)) // make a 2d array of random booleans
    
    rulesFunction = new Function("cell", document.getElementById('textarea').value) // grab the user-entered rules
    
    clearInterval(interval)
    interval = setInterval(function() {
        drawGrid(canvas, grid, alive => alive ? {r: 255, g: 255, b: 255} : {r: 0, g: 0, b: 0})
        grid = CA(rulesFunction, grid)
    }, INTERVAL)
}

document.getElementById('restart-button').onclick = reset

// toggle readme/textarea
document.getElementById('readme-button').onclick = () => {
    const readme = document.getElementById('readme')
    const textarea = document.getElementById('textarea')

    if (readme.style.display === 'none') {
        textarea.style.display = 'none'
        readme.style.display = 'block'
    } else {
        textarea.style.display = 'block'
        readme.style.display = 'none'
    }
}
