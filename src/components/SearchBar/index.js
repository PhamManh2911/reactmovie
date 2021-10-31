import {useState, useEffect, useRef} from "react"
import {Wrapper, Content} from './SearchBar.styles'
import SearchedMovie from "./SearchedMovie"
import searchIcon from "../../images/search-icon.svg"
import PropTypes from "prop-types"
import {ACTIONS} from "../../hooks/useMoviesFetch"

export default function SearchBar({dispatch, searchedList, searchMovies}) {
	const [state, setState] = useState("")
	const [searchSession, setSearchSession] = useState(true)
	const initialMounting = useRef(true)
	useEffect(() => {
		setSearchSession(true)
		if (initialMounting.current) {
			initialMounting.current = false
			return
		}
		const timer = setTimeout(() => 
			dispatch({type: ACTIONS.SETSEARCHTERM, payload: {searchTerm: state}}),300)
		return () => clearTimeout(timer)
	},[dispatch,state])
	const handleSearch = () => {
		dispatch({type: ACTIONS.SETMOVIES, payload: {availableData: searchMovies}})
		setSearchSession(false)
	}
	return (
		<Wrapper>
			<Content>
				<img src={searchIcon} alt="search-icon" />
				<input type="text" placeholder="Search Movies" value={state} onChange={event => setState(event.target.value)} />
				{searchedList.length && searchSession ? 
					<div className="searching-result">
						{searchedList.map(movie => 
							<SearchedMovie key={movie.id} movie={movie} />
						)}
						<div className="more-movie" onClick={handleSearch}>
							View all results
						</div>
					</div>
					: null
				}
			</Content>
		</Wrapper>
	)
}

SearchBar.propTypes = {
	setSearchTerm: PropTypes.func,
	handleResult: PropTypes.func,
}