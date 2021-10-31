import {Wrapper, Content} from './Grid.styles'
import PropTypes from "prop-types"

export default function Grid({header,children}) {
	return (
		<Wrapper>
			<h1>{header}</h1>
			<Content>{children}</Content>
		</Wrapper>
	)
}

Grid.propTypes = {
	header: PropTypes.string
}