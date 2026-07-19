import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams()
  const { state: user } = useLocation()
  return (
    <div>UserDetails {user?.name} {id}</div>
  )
}

export default UserDetails