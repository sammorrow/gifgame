# Gif Glob Game

## Overview

A simple React game managed with Redux-based state.

### Installation

This program requires [nodejs](https://nodejs.org/en/download/) and a package manager, either npm (bundled with node) or [yarn](https://yarnpkg.com/lang/en/docs/install/).

Unzip this folder, navigate to it, and run the following code:
````
npm i / yarn install
````

**NOTE:** You will need a GIPHY API key to run this program. You can use an existing one, or create one via [this link](https://developers.giphy.com/dashboard/). Once you have your API string, create a file named `secrets.js` on the root level of this application and insert this code: 
````
module.exports = {
  key: YOUR_KEY_HERE
}
````

When you are set up, you can build the webpack bundle with the command `webpack`, then fire up the server with either `yarn start`. Alternatively, those on UNIX-based systems can use `yarn run start-dev` to do both at once.

### Dependencies

This application uses [axios](https://www.npmjs.com/package/axios) to make promise-based AJAX requests. It also generates sudoku boards with [this](https://www.npmjs.com/package/sudoku) package. 

On the development side, this program uses [webpack](https://www.npmjs.com/package/webpack) and its suite of modules to generate a bundled Javascript file.

### Organization

Most all of work is done in the **src** folder. 

The components are structured like so:

           App
    Game        Lobby
    Cell

All state is managed by the Redux store. 

### Outside Resources

**Loading SVG**: [Codepen](https://codepen.io/aurer/pen/jEGbA).

## Known Bugs and Future Additions

Combo-meter -- instead of managing points with 'clicks', it would be better to use a combo-based system like Bejeweled. 

Eventually, I'd like the gifs to expand as they take on larger blocks. When the game is over, you'll have that wonderful gif of a cat drinking milk take up your whole screen.