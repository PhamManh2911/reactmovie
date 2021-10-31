import {useEffect, useReducer} from "react"
import API from "../API"
import {getSessionStorage} from "../helpers"

const initialPage = 1
const initialState = {
	movies: {page: 0,
			results: [],
			total_pages: 0,
			total_results: 0},
	searchMovies: {page: 0,
			results: [],
			total_pages: 0,
			total_results: 0},
	loading: false,
	err: false,
	searchTerm: "",
	page: initialPage
}
export const ACTIONS = {
	TOGGLELOADING: "toggle-loading",
	TRUEERR: "true-err",
	FALSEERR: "false-err",
	SETSEARCHMOVIES: "set-search-movies",
	SETMOVIES: "set-movie",
	RESETPAGE: "reset-page",
	SETPAGE: "set-page",
	SETSEARCHTERM: "set-search-term",
}
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.TOGGLELOADING : 
			return {...state, loading: !state.loading }
		case ACTIONS.FALSEERR : 
			return {...state, err: false }
		case ACTIONS.TRUEERR : 
			return {...state, err: true }
		case ACTIONS.SETSEARCHMOVIES :
			return {...state,searchMovies: {...action.payload.data,
				results: action.payload.data.page > 1 
				? [...state.searchMovies.results,...action.payload.data.results] 
				: [...action.payload.data.results]}}
		case ACTIONS.SETMOVIES :
			return {...state,movies: action.payload.availableData ||
				{...action.payload.data,
				results: action.payload.data.page > 1 
				? [...state.movies.results,...action.payload.data.results] 
				: [...action.payload.data.results]}}
		case ACTIONS.RESETPAGE :
			return {...state,page: initialPage}
		case ACTIONS.SETPAGE :
			return {...state,page: state.page+1}
		case ACTIONS.SETSEARCHTERM :
			return {...state,searchTerm: action.payload.searchTerm}
		default:
			return state
	}
}

export default function useMoviesFetch() {
	const [state, dispatch] = useReducer(reducer,initialState)
	const fetchData = async() => {
		try {
			dispatch({type: ACTIONS.TOGGLELOADING})
			dispatch({type: ACTIONS.FALSEERR})
			const data = await API.fetchMovies(state.searchTerm,state.page)
			state.searchTerm 
				? (state.page > 1 
					? dispatch({type: ACTIONS.SETMOVIES, payload: {data: data}}) 
					: dispatch({type: ACTIONS.SETSEARCHMOVIES, payload: {data: data}}))
				: dispatch({type: ACTIONS.SETMOVIES, payload: {data: data}})
			dispatch({type: ACTIONS.TOGGLELOADING})
		} catch(err) {
			dispatch({type: ACTIONS.TRUEERR})
		}
	}
	useEffect(() => {
		const dataFromStorage = getSessionStorage("homePage")
		if (!state.searchTerm && dataFromStorage) return dispatch({type: ACTIONS.SETMOVIES, payload: {availableData: dataFromStorage}})
		dispatch({type: ACTIONS.RESETPAGE})
		fetchData()	
	},[state.searchTerm])

	useEffect(() => {
		fetchData()
	},[state.page])

	useEffect(() => {
		if (!state.searchTerm && state.page === 1) return sessionStorage.setItem("homePage", JSON.stringify(state.movies))
	},[state.searchTerm,state.movies,state.page])

	return {
		movies: state.movies, 
		searchMovies: state.searchMovies, 
		loading: state.loading, 
		err: state.err, 
		searchTerm: state.searchTerm, 
		dispatch
	}
}