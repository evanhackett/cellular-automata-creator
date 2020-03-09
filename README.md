# Cellular Automata Creator

Users can enter a function which will define the rules of a cellular automata.
Looping through the grid, coloring cells, and getting neighboring cells are abstracted away.

To start the dev environment, run the following in the root directory:

    npm start

That will watch js files and build with browserify.

View the site online: https://evanhackett.com/cellular-automata-creator/

## Coding Style

One thing to note about the coding style is that this project was an experiment in terseness and design simplicity. My goal was to have every single javascript file fit into one page without scrolling (one "screenfull"). This was inspired by reading about the APL language and the philosophy some of its users have when writing code. I don't necessarily recommend this style, I just wanted to explore it and push myself to write minimal LoC.