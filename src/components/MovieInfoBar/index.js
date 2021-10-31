import {Wrapper, Content} from "./MovieInfoBar.styles"
import {calcTime, convertMoney} from "../../helpers"
import PropTypes from "prop-types"

export default function MovieInfoBar({runtime, budget, revenue}) {
	return (
		<Wrapper>
			<Content>
				<div className="column">
					<p>Running time: {calcTime(runtime)}</p>
				</div>
				<div className="column">
					<p>Budget: {convertMoney(budget)}</p>
				</div>
				<div className="column">
					<p>Revenue: {convertMoney(revenue)}</p>
				</div>
			</Content>
		</Wrapper>
	)
}

MovieInfoBar.propTypes = {
	runtime: PropTypes.number,
	budget: PropTypes.number,
	revenue: PropTypes.number
}