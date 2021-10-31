import {Wrapper, Image} from "./Actor.styles"
import PropTypes from "prop-types"

export default function Actor({name, character, image}) {
	return (
		<Wrapper>
			<Image src={image} alt="actor-thumb" title={name}></Image>
			<h3>{name}</h3>
			<p>{character}</p>
		</Wrapper>
	)
}

Actor.propTypes = {
	name: PropTypes.string,
	character: PropTypes.string,
	image: PropTypes.string
}