import React from 'react'
import MyContext from './Context'
import Button from './Button'

function Logout() {

    const {loggedUser, setLoggedUser, setUsers} = React.useContext(MyContext)

    const logoutUser = () => {
        setLoggedUser({})
        setUsers([])
    }

    return (
        <div>
            <h4>Benvenuto {loggedUser.name}!</h4>
            <Button text="Logout" handleClick={logoutUser} />
        </div>
    )
}

export default Logout