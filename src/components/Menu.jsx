import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebaseconfig'

const Menu = () => {
    const historial = useHistory()
    const [usuario, setUsuario] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
            }
        })
    }, [])

    const CerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
    }


    return (
        <div className='container'>
            <div className="row">
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <h3 style={{color:'white'}} className='float-left'>Jesus Cajal</h3>
                    <ul className='navbar-nav mr-auto mx-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Inicio</Link>
                        </li>
                        <li>
                            {
                                !usuario ?
                                    (
                                        <Link className='nav-link' to='/login'>Login</Link>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                        </li>
                        <li>
                            {
                                !usuario ?
                                    (
                                        <Link className='nav-link' to='/admin'>Admin</Link>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                        </li>
                    </ul>
                    {
                        usuario ?
                            (
                                <button
                                    onClick={CerrarSesion}
                                    className='btn btn-danger'
                                >Cerrar Sesion</button>
                            )
                            :
                            (
                                <span></span>
                            )
                    }
                </nav>
            </div>
        </div>
    )
}

export default Menu
