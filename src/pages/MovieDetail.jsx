import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaGlobe, FaCalendarAlt } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { motion } from 'framer-motion';
import Spinner from "../components/Spinner.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/movie/${id}?append_to_response=videos`, API_OPTIONS);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie detail:', error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    const trailer = movie.videos?.results.find(v => v.type === "Trailer" && v.site === "YouTube");

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10 px-6 py-16 max-w-6xl mx-auto text-white"
        >
            <Link to="/" className="inline-flex items-center gap-2 mb-6 text-sm px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white transition duration-200 shadow-md">
                <FaArrowLeft />
                Home
            </Link>

            <div className="flex flex-col lg:flex-row gap-10 bg-black/50 backdrop-blur-md rounded-2xl shadow-xl p-6">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full max-w-sm object-cover aspect-[2/3] rounded-lg shadow-lg"
                />

                <div className="flex-1 space-y-6">
                    <h1 className="text-5xl font-extrabold text-gradient tracking-wide leading-tight">
                        {movie.title}
                    </h1>

                    <p className="italic text-purple-300 text-lg">{movie.tagline}</p>

                    <div className="text-gray-400 text-sm flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-purple-200">
                            <FaCalendarAlt />
                            {movie.release_date}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-purple-200">
                            <BiTime />
                            <span>{movie.runtime} min</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-blue-500">
                            <FaGlobe />
                            {movie.original_language?.toUpperCase()}
                        </div>

                        <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                            <FaStar />
                            {movie.vote_average?.toFixed(1)}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-red-500">
                            <MdLocalMovies />
                            <span>{movie.status}</span>
                        </div>
                    </div>

                    <p className="text-gray-200 leading-relaxed">{movie.overview}</p>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map(g => (
                                <span key={g.id} className="bg-[#444062] text-white px-4 py-2 rounded-md text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-500">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {movie.production_companies.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold ">Production</h3>
                            <ul className="flex flex-wrap gap-3">
                                {movie.production_companies.map(c => (
                                    <li key={c.id} className="bg-[#36354A] px-4 py-2 rounded-md text-sm text-white/90 hover:scale-105 transition-transform duration-500">
                                        {c.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-[#28273d] rounded-lg p-4 shadow-md hover:scale-105 transition-transform duration-500">
                            <p className="text-sm text-purple-400">Budget</p>
                            <p className="text-xl font-bold text-white">{movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "Not available"}</p>
                        </div>

                        <div className="bg-[#28273d] rounded-lg p-4 shadow-md hover:scale-105 transition-transform duration-500">
                            <p className="text-sm text-purple-400">revenue</p>
                            <p className="text-xl font-bold text-white">{movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "Not available"}</p>
                        </div>
                    </div>

                    {trailer && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2">🎬 Trailer</h3>
                            <div className="w-full h-[360px] md:h-[420px] rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="Movie Trailer"
                                    className="w-full max-w-2xl aspect-video rounded-xl shadow-lg mx-auto mt-6"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </motion.section>
    );
};

export default MovieDetail;
