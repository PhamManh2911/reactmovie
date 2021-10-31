import {Wrapper} from "./Button.styles"
import PropTypes from "prop-types"

export default function Button({text, callback}) {
	return (
		<Wrapper onClick={callback}>
			{text}
		</Wrapper>
	)
}

Button.propTypes = {
	setPage: PropTypes.func
}