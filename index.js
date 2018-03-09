'use strict';


const _ = require('lodash')
const Grid = require('./CA_grid.js')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width
const height = canvas.height
const CANVAS_RESOLUTION = width
const CA_RESOLUTION = 100
const INTERVAL = 500;

function draw(grid) {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    grid.each(function(cell, i, j) {
        colorCell(i, j, getCellColor(cell))
    })
}

function colorCell(x, y, color) {
    // calculate dimensions of a cell based on the grid resolution and the canvas resolution
    const cellSize = CANVAS_RESOLUTION / CA_RESOLUTION
    ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`
    ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
}

function getCellColor(value) {
  return value ? {r: 255, g: 255, b: 255} : {r: 0, g: 0, b: 0}
}

const grid = new Grid(CA_RESOLUTION, CANVAS_RESOLUTION)
grid.initialize()


const code = document.getElementById('textarea').textContent

let nextState = new Function("cell", code)

document.getElementById('restart-button').onclick = () => {
    // reset the grid
    grid.initialize()
    // get the user defined function.
    const code = document.getElementById('textarea').value
    nextState = new Function("cell", code)

    // reset the interval to call nextState with the new function.
    clearInterval(interval)
    interval = setInterval(function() {
        draw(grid)
        grid.nextState(nextState)
    }, INTERVAL)
}

let interval = setInterval(function() {
    draw(grid)
    grid.nextState(nextState)
}, INTERVAL)


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
