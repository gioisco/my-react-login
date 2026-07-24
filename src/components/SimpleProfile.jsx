import React from 'react'
import MyContext from './Context'

function SimpleProfile() {
    console.log("SimpleProfile()")

    const { loggedUser } = React.useContext(MyContext);
    const [profile, setProfile] = React.useState("");

    function loadProfile() {

        console.log(loadProfile())

        fetch(myUsersURL)
            .then(response => response.json())
            .then(networkUsers => {
                setProfile(networkUsers.find(user => user.id === loggedUser.id))
            })
            .catch(error => console.log('Errore get: ', error.message))
    }


    React.useEffect(() => {
        console.log("useEffect()")
        if (loggedUser.name) {
            loadProfile();
        }
    }, [loggedUser.id]);


    return (
        <div>Simple Profile: {profile?.name}</div>

    )
}

export default SimpleProfile