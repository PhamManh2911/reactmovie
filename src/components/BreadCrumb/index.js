import {Link} from "react-router-dom"
import {Wrapper, Content} from "./BreadCrumb.styles"
import PropTypes from "prop-types"

export default function BreadCrumb({title}) {
	return (
		<Wrapper>
			<Content>
				<Link to="/">
					<span>Home</span>
				</Link>
				<span>|</span>
				<span>{title}</span>
			</Content>
		</Wrapper>
	)
}

BreadCrumb.propTypes = {
	title: PropTypes.string
}