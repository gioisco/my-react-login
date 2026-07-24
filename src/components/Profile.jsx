import React from "react";
import MyContext from "./Context";
import Button from "./Button";

function Profile() {

    const { loggedUser, users } = React.useContext(MyContext)
    const [notes, setNotes] = React.useState([])
    const [newNote, setNewNote] = React.useState("")

    const [profile, setProfile] = React.useState("");

    React.useEffect(() => {
        if (!loggedUser.name) {
            return;
        }

        loadProfile();
        loadNotes();
    }, [loggedUser.id]);



    const myUsersURL = 'https://www.ugobetori.it/_notes/api-test/unauth/select_users.php';
    const selectProfileURL = 'https://www.ugobetori.it/_notes/api-test/unauth/select_profile.php?id=';

    function loadProfile() {

        // let foundUser = users.find(user => user.id === loggedUser.id);
        // setProfile(foundUser)

        console.log("found")
        console.log("users", users)
        console.log("loggedUser", loggedUser)

        fetch(myUsersURL)
            .then(response => response.json())
            .then(networkUsers => {
                setProfile(networkUsers.find(user => user.id === loggedUser.id))
            })
            .catch(error => console.log('Errore get: ', error.message))
    }

    function loadNotes() {
        fetch(selectProfileURL + loggedUser.id)
            .then(response => response.json())
            .then(notesRetrieved => {
                setNotes(notesRetrieved)
            })
            .catch(error => console.log('Errore get: ', error.message))
    }

    function deleteNote(id) {
        console.log("Deleted note with id: ", id)

    }


    function renderNotes(notes) {
        console.log(notes)
        if (notes) {
            return notes.map(note => (
                <h5 key={note.id_note}>
                    {note.note} - {note.id_note > 16 ? (
                        <Button
                            text="Delete"
                            handleClick={() => deleteNote(note.id_note)}
                        />
                    ) : ""}
                </h5>
            ))
        }
    }

    console.log("profile", profile)

    if (!loggedUser.name) {
        return <h2>Profile</h2>;
    }

    function submitNote() {

        console.log("Submit text: ", newNote)

    }

    return (
        <div>
            <h2>Profile of {profile.name}</h2>
            <h3>Quote of {profile.name}: {profile?.quote}</h3>

            {renderNotes(notes)}

            <input type="text" id="note" value={newNote} onChange={setNewNote}/>
            <Button text="Submit" handleClick={submitNote}/>

       </div>
    )
}

export default Profile
