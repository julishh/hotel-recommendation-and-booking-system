import React from 'react'
import { Link } from 'react-router-dom'

const ProfileNav = () => {
    const active = window.location.pathname
    return (
        <ul className='nav nav-tabs' >
            <li className='nav-item '>
                <Link className={`nav-link ${active === '/profile' && 'active'}`} 
                to='/profile' > your bookings</Link>
            </li>
            <li className='nav-item'>
                <Link className={`nav-link ${active === '/profile/seller' && 'active'}`}
                 to='/profile/seller' > your hotels</Link>
            </li>
        </ul>
    )
}

export default ProfileNav