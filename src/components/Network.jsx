import React from "react";
import MyContext from "./Context";
import TableUsers from "./TableUsers";

function Network() {

    const myUsersURL = 'https://www.ugobetori.it/_notes/api-test/unauth/select_users.php';


    const { loggedUser } = React.useContext(MyContext)
    const [users, setUsers] = React.useState([]);

    function loadUsers() {
        if (!loggedUser.name) {
            return
        }

        // Senza questo va il caricamento continuo...
        if (users.length !== 0) {
            return
        }

        console.log("fetch")

        fetch(myUsersURL)
            .then(response => response.json())
            .then(networkUsers => {
                console.log(networkUsers)
                setUsers(networkUsers);
            })
            .catch(error => console.log('Errore get: ', error.message))
    }

    return (
        <div>
            {/* <Button text="get users" handleClick={loadUsers} /> */}

            <h3>{loggedUser.name ? `La rete di ${loggedUser.name}` : "Nessun utente loggato"}</h3>

            {loadUsers()}

            {/* {loggedUser.name ? <TableUsers users={users} loggedUser={loggedUser} /> : ""} */}
            {<TableUsers users={users} loggedUser={loggedUser} />}


        </div>
    )
}

export default Network
