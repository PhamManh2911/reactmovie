import useMovieFetch from "../hooks/useMovieFetch"
import {useParams} from "react-router-dom"
import {POSTER_SIZE, IMAGE_BASE_URL} from "../config"
import BreadCrumb from "./BreadCrumb"
import MovieInfo from "./MovieInfo"
import MovieInfoBar from "./MovieInfoBar"
import Grid from "./Grid"
import Actor from "./Actor"
import Spinner from "./Spinner"
import NoImage from "../images/no_image.jpg"

export default function Movie() {
	const {movieId} = useParams()
	const {movie, loading, err} = useMovieFetch(movieId)
	if (err) return <div>Something went wrong</div>
	if (loading) return <Spinner />
	return (
		<>
			<BreadCrumb title={movie.original_title} />
			<MovieInfo movie={movie} />
			<MovieInfoBar runtime={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
			<Grid header="Actors">
				{movie?.cast?.map(actor => 
					<Actor key={actor.cast_id} 
					name={actor.name}
					character={actor.character}
					image={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
						: NoImage} />
				)}
			</Grid>
		</>
	)
}