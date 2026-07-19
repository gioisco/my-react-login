import React from 'react'
import Network from './Network'
import { Link, Outlet } from 'react-router-dom'

function NetworkLayout() {
    return (
        <div>
            <Link to="/network" >
                <h2>Network</h2>
            </Link>

            <Outlet />
        </div>
    )
}

export default NetworkLayout