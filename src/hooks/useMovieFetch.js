import {useReducer, useEffect} from 'react'
import API from "../API"
import {getSessionStorage} from "../helpers"

const initialState = {
	movie: {},
	loading: false,
	err: false
}
const ACTIONS = {
	SETMOVIE: "set-movie",
	TOGGLELOADING: "toggle-loading",
	TRUEERR: "true-err",
	FALSEERR: "false-err",
}
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SETMOVIES :
			return {
				...state, movie: action.payload.availableData ||
				action.payload.data
			}
		case ACTIONS.TOGGLELOADING:
			return {...state, loading: !state.loading}
		case ACTIONS.FALSEERR:
			return {...state, err: false}
		case ACTIONS.TRUEERR:
			return {...state, err: true}
		default: 
			return state
	}
}
export default function useMovieFetch(movieId) {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const movieData = getSessionStorage(movieId)
		if (movieData) return dispatch({type: ACTIONS.SETMOVIES, payload: {availableData: movieData}})
		const fetchData = async() => {
			try {
				dispatch({type: ACTIONS.TOGGLELOADING})
				dispatch({type: ACTIONS.FALSEERR})
				const movie = await API.fetchMovie(movieId)
				const credits = await API.fetchCredits(movieId)
				const directors = credits.crew.filter(member => member.job === "Director")
				dispatch({type: ACTIONS.SETMOVIES, payload: {
					data: {
						...movie,
						cast: credits.cast,
						directors
					}
				}})
				dispatch({type: ACTIONS.TOGGLELOADING})
			} catch(err) {
				dispatch({type: ACTIONS.TRUEERR})
			}
		}
		fetchData()
	},[movieId])

	useEffect(() => {
		sessionStorage.setItem(movieId,JSON.stringify(state.movie))
	},[movieId,state])
	
	return {
		movie: state.movie, 
		loading: state.loading, 
		err: state.err
	}
}
	// const [state, setState] = useState({})
	// const [loading, setLoading] = useState(false)
	// const [err, setErr] = useState(false)
	// useEffect(() => {
	// 	const movieData = getSessionStorage(movieId)
	// 	if (movieData) return setState(movieData)
	// 	const fetchData = async() => {
	// 		try {
	// 			setLoading(true)
	// 			setErr(false)
	// 			const movie = await API.fetchMovie(movieId)
	// 			const credits = await API.fetchCredits(movieId)
	// 			const directors = credits.crew.filter(member => member.job === "Director")
	// 			setState({
	// 				...movie,
	// 				cast: credits.cast,
	// 				directors})
	// 		}
	// 		catch(err) {
	// 			setErr(true)
	// 		}
	// 		setLoading(false)
	// 	}
	// 	fetchData()
	// },[movieId])