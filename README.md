# Movie History

## Description 
Movie History is an application that allows users to keep track of movies they either want to watch, or have watched and would like to rate. The Add Movie button on the main page allows users to add movies to their collection using  form. That movie is added to the Movies collection in Firebase and a new movie card is created. Each movie has 3 buttons: Add to Watchlist, Rate, and Delete. If a movie is added to the watchlist and that button disappears for that particular movie. The watchlist can be found by selecting the See Watchlist button. 

Once a movie is added to the watchlist the user still has the ability to rate the movie from the home screen. When this happens the movie is then removed from the watchlist because it is assumed that the user has watched the movie if they're rating it. Additionally, the user can rate movies from their watchlist or delete them from the watchlist entirely. If a movie is deleted from the watchlist the "Add to Watchlist" button is readded on the main screen. The Delete button removes the selected movie from the page and also deletes the record in Firebase, permenantly deleting the movie. 

## Screenshots

![movie-history screenshot-1](https://raw.githubusercontent.com/mtgill/movie-history/master/assets/screenshots/movie-history-main.PNG "movie-history screenshot-1")

![movie-history screenshot-2](https://raw.githubusercontent.com/mtgill/movie-history/master/assets/screenshots/movie-history-singleMovie.PNG "movie-history screenshot-2")

![movie-history screenshot-3](https://raw.githubusercontent.com/mtgill/movie-history/master/assets/screenshots/movie-history-watchlist-demo.PNG "movie-history screenshot-3")

![movie-history screenshot-4](https://raw.githubusercontent.com/mtgill/movie-history/master/assets/screenshots/movie-history-watchlist.PNG "movie-history screenshot-4")

# Technologies Used
* html, scss and javascript
* modular javascript
* import and export to pass information between modules
* axios get to retrieve data from json files
* xmlhttprequest promises
* firebase CRUD

## Installation Instructions
* Clone down this repo
* At the root of the project, run `npm install`

## How to run 
* In the terminal, type `npm start` to run the webpage.
* If you want to make a production build of this project, type `npm run build`. This will create a folder called build with all of the minified code you need.

## Author
Matt Gill 