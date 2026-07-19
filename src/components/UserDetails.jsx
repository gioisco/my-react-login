import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import MyContext from './Context';

function UserDetails() {
  const { loggedUser, users} = React.useContext(MyContext)
  if (!loggedUser.name) {
    return
  }

  console.log("users[UserDetails]", users)

  const baseImgURL = 'https://www.ugobetori.it/_notes/api-test/unauth/img/';

  const { id } = useParams()
  const user = users[id-1]

  console.log("user[UserDetails]", user)

  return (
    <>
      <h2>UserDetails</h2>

      <img src={baseImgURL + user.id + ".png"} />
      <p>Id: {id}</p>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Age: {user.age}</p>
      <p>Description: {user.description}</p>
      <p>Profession: {user.profession}</p>
      <p>Quote: {user.quote}</p>
    </>
  )
}

export default UserDetails
