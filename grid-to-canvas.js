// canvas is dom node of canvas to draw to
// grid is the 2d array of data to draw
// colorFn defines how to color a cell based on the cell's data
module.exports = function(canvas, grid, colorFn) {
  const ctx = canvas.getContext('2d')

  function colorCell(x, y, color) {
    // calculate dimensions of a cell based on the grid resolution and the canvas resolution. Assumes square canvas and grid.
    const cellSize = canvas.width / grid.length
    ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`
    ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
  }

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      colorCell(i, j, colorFn(cell))
    })
  })
  
}

