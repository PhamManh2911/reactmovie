import {useState, useContext} from 'react'
import {UserContext} from "../User"
import {useNavigate} from "react-router-dom"
import Spinner from "../Spinner"
import API from "../../API"
import {Wrapper, Content} from "./Login.styles"

export default function Login() {
	const {setUser} = useContext(UserContext)
	const navigate = useNavigate()
	const [account, setAccount] = useState({
		username: "",
		password: ""
	})
	const [loading, setLoading] = useState(false)
	const [err, setErr] = useState(false)
	const handleInput = (event) => {
		const name = event.target.name
		const value = event.target.value
		if (name === "username") return setAccount(prev => {return {...prev, username: value}})
		if (name === "password") return setAccount(prev => {return {...prev, password: value}})
	}
	const handleSubmit = async(event) => {
		try {
			setLoading(true)
			event.preventDefault()
			setErr(false)
			const requestToken = await API.getRequestToken()
			const response = await API.authenticate(
				requestToken, 
				account.username,
				account.password
			)
			setUser({
				sessionId: response.session_id, 
				username: account.username
			})
			navigate("/")
			setLoading(false)
		} catch(err) {
			setErr(true)
		}
	}
	return (
		<div style={{margin: "80px auto", width: "400px"}}>
			{!loading ? 
				<Wrapper>
					<Content onSubmit={handleSubmit}>
						{err ? <div className="error">Your account or password is not correct !!!</div> : null}
						<label>Username</label>
						<input type="text" value={account.username} name="username" onChange={handleInput} />
						<input type="password" value={account.password} name="password" onChange={handleInput} />
						<input type="submit" value="Log in" />
					</Content>
				</Wrapper>
			: <Spinner />}
		</div>
	)
}