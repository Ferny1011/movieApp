import React from 'react'
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie : {id, title, vote_average, poster_path, release_date, original_language} }) => {
    const navigate = useNavigate();
    return (
        <div className="movie-card transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer" onClick={() => navigate(`/movie/${id}`)}>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} className="rounded-lg hover:brightness-110 transition duration-300"/>
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon"/>
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard
