const yargs = require("yargs");
const { sequelize } = require("./db/connection");
//imports from crud functions
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movie/movieMethods")
const {addDirector, listDirectors, updateDirector, deleteDirector,  linkDirector} = require("./movie/directorMethods");
const Director = require("./movie/directorTable");
const Movie = require("./movie/movieTable");

Director.hasMany(Movie);
Movie.belongsTo(Director);

const app = async(yargsObj) => {
try {    
    await sequelize.sync();

    // #### MOVIE CRUD ####
    if (yargsObj.add) {
        //add movie to database - example: 
            //node src/app.js --add --title "The Terminator" --actor "Arnie S" --rating 15 --score 83
        await addMovie({title:yargsObj.title, actor: yargsObj.actor, rating: yargsObj.rating, metacritic_score: yargsObj.score})
    } else if (yargsObj.listMovies) {
        // list all movies - example: 
                // node src/app.js --listMovies 
        console.log(await listMovies());
    } else if (yargsObj.update) {
        //update one movie
            // node src/app.js --update --movie "The Terminator" --title "Terminator 2" --actor "Linda Hamilton" 
        await updateMovie(yargsObj.movie, 
            {
            title:yargsObj.title, 
            actor: yargsObj.actor, 
            rating: yargsObj.rating, 
            metacritic_score: yargsObj.score
        }
            )
    } else if (yargsObj.delete) {
        //delete one movie
        await deleteMovie({title: yargsObj.title})
    } 
    
    // #### DIRECTOR CRUD  ####
    else if (yargsObj.addDirector) {
        // add director
        await addDirector ({name: yargsObj.name});
    } else if (yargsObj.listDirectors) {
        // list directors
        console.log(await listDirectors());
    } else if (yargsObj.updateDirector) {
        // update director - example:
            // node src/app.js --updateDirector --name "James Cameron" --newName "Steven Spielbergo"
        await updateDirector({name: yargsObj.name, id: yargsObj.id, newName: yargsObj.newName})
    }  else if (yargsObj.deleteDirector) {
        // delete director - example:
            // node src/app.js --deleteDirector --name "Steven Spielbergo"
        await deleteDirector({name: yargsObj.name}) 
    }
    
        // link director to movies example below can add multiple movies: 
                //node src/app.js --linkUp --directorName "Francis Ford Coppola" --movies "The Godfather" --movies "Apocalypse Now"
    else if (yargsObj.linkUp) {
      await linkDirector({name: yargsObj.directorName, movies: yargsObj.movies})
    } else {
        console.log("Incorrect command")
    }
} catch (error) {
    console.log(error)
}
}





app(yargs.argv)