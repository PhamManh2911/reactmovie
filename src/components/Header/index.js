import {useContext} from "react"
import {UserContext} from "../User"
import {Link} from "react-router-dom"
import RMDBLogo from "../../images/react-movie-logo.svg"
import TMDBLogo from "../../images/tmdb_logo.svg"
import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"

export default function Header() {
	const {user} = useContext(UserContext)
	return (
		<Wrapper>
			<Content>
				<Link to="/">
					<LogoImg src={RMDBLogo} alt="rmdb-logo" />
				</Link>
				<div>
					{!user.username ? 
						<Link to="./login">Login</Link>
						: <span>Hello {user.username}</span>
					}
					<TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" /> 
				</div>
			</Content>
		</Wrapper>
	)
}