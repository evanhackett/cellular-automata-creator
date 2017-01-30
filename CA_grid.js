const _ = require('lodash')

module.exports = class Grid {

    constructor(automata_res, canvas_res) {
        // create grid structure (2d array). Fill grid with arrays of resolution which are filled with an empty obj.
        this.grid = _.map(_.range(automata_res), () => _.fill(_.range(automata_res), 0))
    }
    // reassigns grid to a new grid representing the state of the automata after 1 iteration. Rules for the next state are defined in the callback fn.
    nextState(cb) {
        const getNeighbors = (x,y) => {
            // each cell has 8 neighbors.
            const neighbors = [];

            const createNeighbor = (x, y) => {
                // we have to wrap around when neighbors are beyond the edge.

                // neighbor-x, neighbor-y
                let n_x = x
                let n_y = y

                if (x < 0) {
                     n_x = this.grid.length - 1
                } else if (x >= this.grid.length - 1) {
                    n_x = 0
                }

                if (y < 0) {
                     n_y = this.grid.length - 1
                } else if (y >= this.grid.length - 1) {
                    n_y = 0
                }

                return {
                    x: n_x,
                    y: n_y,
                    value: this.grid[n_x][n_y]
                }
            }
            // upper-left
            neighbors.push(createNeighbor(x-1, y-1))
            // upper-mid
            neighbors.push(createNeighbor(x, y-1))
            // upper-right
            neighbors.push(createNeighbor(x+1, y-1))
            // mid-left
            neighbors.push(createNeighbor(x-1, y))
            // mid-right
            neighbors.push(createNeighbor(x+1, y))
            // lower-left
            neighbors.push(createNeighbor(x-1, y+1))
            // lower-mid
            neighbors.push(createNeighbor(x, y+1))
            // lower-right
            neighbors.push(createNeighbor(x+1, y+1))

            return neighbors
        }
    // map over each cell, passing the position, cell values (user defined), and neighbors of the cell to the callback fn.
        // callback fn needs to return a cell value.
        this.grid = _.map(this.grid, (cells, i) => {
            return _.map(cells, (cell, j) => {
                return cb({
                    position: {x: i, y: j},
                    value: cell,
                    neighbors: getNeighbors(i, j)
                })
            })
        })
    }


   initialize() {
        // for now set random default values.
        // TODO: let the user provide a way to initialize.
        _.each(this.grid, (cells, i) => {
            _.each(cells, (cell, j) => {
                this.grid[i][j] = _.random(0, 11)
            })
        })
   }

   each(cb) {
        _.each(this.grid, (cells, i) => {
            _.each(cells, (cell, j) => {
                cb(cell, i, j)
            })
        })
   }

}
