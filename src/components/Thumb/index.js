import {Link} from "react-router-dom"
import {Image} from "./Thumb.styles"
import PropTypes from "prop-types"

export default function Thumb({image, movieId, clickable, title}) {
	return (
		<>
			{clickable ? (
				<Link to={`/${movieId}`}>
					<Image src={image} alt="movie-thumb" title={title} />
				</Link>
			)
			: (
				<Image src={image} alt="movie-thumb" title={title} />
			)}
		</>
	)
}	

Thumb.propTypes = {
	image: PropTypes.string,
	movieId: PropTypes.number,
	clickable: PropTypes.bool,
	title: PropTypes.string
}