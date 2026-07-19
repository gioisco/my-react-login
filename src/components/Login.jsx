import React, { useState, Suspense, lazy } from "react";
import MyContext from './Context';
import Button from "./Button";
import Logout from "./Logout";

function Login() {

    const myLoginURL = 'https://www.ugobetori.it/_notes/api-test/unauth/login.php';

    const initialData = {
        name: '',
        password: ''
    };
    const [data, setData] = React.useState(initialData);
    const [errorMessage, setErrorMessage] = React.useState("");


    const {setLoggedUser} = React.useContext(MyContext)


    function handleChange(elementoDelForm) {
        const myName = elementoDelForm.name;
        const myValue = elementoDelForm.type === 'checkbox' ? elementoDelForm.checked : elementoDelForm.value;
        setData(prevState => ({ ...prevState, [myName]: myValue }));
    }


    function handleSubmit(p) {
        return function (e) {
            if (!data.name || !data.password) {
                setErrorMessage("Inserisci bene")
                return
            }


            fetch(myLoginURL,
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            )
                .then(response => response.json())
                .then(logged => {
                    console.log(JSON.stringify(logged))
                    if (logged.log !== "Si") {
                        setErrorMessage("Wrong user or password")
                        console.log(errorMessage)
                        return
                    }
                    setLoggedUser(logged)
                })
                .catch(error => {
                    console.log('Errore post: ', error.message)
                    setErrorMessage("Something went wrong")
                });
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <MyContext.Consumer>
                {(contextValue) => {
                    console.log(contextValue)
                    return (
                        <h5>Status: {JSON.stringify(contextValue)}</h5>
                    )
                }}
            </MyContext.Consumer>

            <form>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome"
                    value={data.name}
                    onChange={e => handleChange(e.target)}
                />
                <br /><br />
                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={e => handleChange(e.target)}
                />
                <br /><br />
                <Button text="Login" handleClick={handleSubmit()} />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>

        </div>
    )
}

export default Login
