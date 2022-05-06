const Movie = require("./movieTable")

exports.addMovie = async (movieObj) => {
    try {
        await Movie.create(movieObj);
    } catch (error) {
        console.log(error)
    }
}

exports.listMovies = async () => {
    try {
        return await Movie.findAll();
    } catch (error) {
        console.log(error)
    }
}

exports.updateMovie = async (movie, updateObj
    ) => {
    try {
        let tempArray = await Movie.findOne({
            where: {title: movie}
        });
        await Movie.upsert({
            id: tempArray.id,
            title: updateObj.title,
            actor: updateObj.actor,
            rating: updateObj.rating,
            metacritic_score: updateObj.metacritic_score
        })
        console.log( await Movie.findAll());
    } catch (error) {
        console.log(error)
    }
}

exports.deleteMovie = async(movie) => {
    try {
        await Movie.destroy({
            where: {title: movie.title}
        })
    } catch (error) {
        console.log(error)
    }
}