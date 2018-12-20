// returns a new grid where each cell's value is the result of calling nextStateFn on every cell in the passed in grid
module.exports = function(nextStateFn, grid) {    
    // map over each cell, passing the position, cell value, and neighbors of the cell to nextStateFn. nextStateFn needs to return a cell value.
    return grid.map((cells, i) => {
	return cells.map((cell, j) => {
            return nextStateFn({
                position: {x: i, y: j},
		value: cell,
		neighbors: getNeighbors(grid, i, j)
            })
	})
    })
}

function getNeighbors(grid, x,y) {
    // each cell has 8 neighbors. The array here is laid out visually, with the cell is in the middle surrounded by its neighbors.
    return [    
      CN(grid, x-1, y-1), CN(grid, x, y-1), CN(grid, x+1, y-1),
      CN(grid, x-1, y),   /*Current Cell*/  CN(grid, x+1, y),
      CN(grid, x-1, y+1), CN(grid, x, y+1), CN(grid, x+1, y+1),
    ]
}

// CN stands for "create neighbor". This function returns an object with x,y coords and the boolean value of the given neighbor
function CN(grid, x, y) {
    // we have to wrap around when neighbors are beyond the edge. GNC (get neighbor's coord) returns the neighbors coord, wrapping if necessary.
  const GNC = n => { if (n < 0) return grid.length-1; else if (n >= grid.length-1) return 0; else return n }
    
  return { x: GNC(x), y: GNC(y), value: grid[GNC(x)][GNC(y)] }
}
