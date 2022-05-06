const Director = require("./directorTable");
const Movie = require("./movieTable")

exports.addDirector = async (directorObj) => {
    try {
        await Director.create(directorObj);
    } catch (error) {
        console.log(error)
    }
}

exports.listDirectors = async() => {
    try {
        return await Director.findAll();
    } catch (error) {
        console.log(error)
    } 
}

exports.updateDirector = async(updateObj) => {
    try {
        let temp = await Director.findOne({
            where: {name: updateObj.name}
        })
        await Director.upsert({
            id: temp.id,
            name: updateObj.newName
        });

    } catch (error) {
        console.log(error)
    }
}

exports.deleteDirector = async (updateObj) => {
    try {
        await Director.destroy({
            where: {name: updateObj.name}
        })
    } catch (error) {
        console.log(error)
    }
}

exports.linkDirector = async(updateObj) => {
    try {
        let temp = await Director.findOne({where: {name: updateObj.name}})
        let tempMovies = updateObj.movies;
        for(let i = 0; i < tempMovies.length; i++) {
            let movieObj = await(Movie.findOne({where: {title: tempMovies[i]}}))
            await Movie.upsert({
                id: movieObj.id,
                DirectorId: temp.id
            });
        }
    } catch (error) {
        console.log(error)
    }
}