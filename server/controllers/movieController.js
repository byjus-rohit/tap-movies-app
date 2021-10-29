const { Op } = require('sequelize');

const { Movie } = require('../models');

const getAllMovies = async (req, res) => {
    const { searchText } = req.query;

    try {
        const conditions = searchText ? {
            where: {
                title: {
                    [Op.iRegexp]: searchText
                }
            }
        } : {};
        const movies = await Movie
            .findAll(conditions);
        res
            .status(200)
            .json({
                success: true,
                message: 'All movies',
                movies
            })
    }
    catch (err) {
        res
            .status(500)
            .json({
                message: err.message
            })
    }
}

const getMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie
            .findOne({
                where: {
                    id: Number(movieId)
                }
            })
        if (!movie) throw new Error('Movie not found');
        res
            .status(200)
            .json({
                success: true,
                message: 'Movie found',
                movie
            })
    }
    catch (err) {
        res
            .status(500)
            .json({
                message: err.message
            })
    }
}

const addMovie = async (req, res) => {
    const { title, poster, rating } = req.body;
    try {
        const createdMovie = await Movie
            .create({ title, poster, rating });
        res
            .status(200)
            .json({
                success: true,
                message: 'Movie created successfully',
                createdMovie
            })
    }
    catch (err) {
        res
            .status(500)
            .json({
                message: err.message
            })
    }
}

module.exports = {
    getAllMovies,
    getMovie,
    addMovie
}