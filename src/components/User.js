import {createContext, useState, useEffect} from 'react'

export const UserContext = createContext()
export default function UserProvider({children}) {
	const [user, setUser] = useState({
		sessionId: "",
		username: ""
	})
	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	)
}