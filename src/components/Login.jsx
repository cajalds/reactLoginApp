import React, { useState } from 'react'
import { auth } from '../firebaseconfig'
import { useHistory } from 'react-router';

const Login = () => {
    const historial = useHistory()
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msgerror, setMsgError] = useState(null)

    const RegistrarUsuario = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, pass)
            .then(r => {
                historial.push('/')
            })
            .catch(e => {
                if (e.code == "auth/invalid-email") {
                    setMsgError('Formato de Email incorrecto')
                }
                if (e.code == "auth/weak-password") {
                    setMsgError('La contraseña debe contener al menos 6 caracteres')
                }
            })
    }

    const LoginUsuario = () => {
        auth.signInWithEmailAndPassword(email, pass)
            .then((r) => {
                 historial.push('/')
            })
            .catch((err) => {
                //"auth/wrong-password" "auth/user-not-found"     
                if (err.code == "auth/wrong-password") {
                    setMsgError('Password incorrecto')
                }

                if (err.code == "auth/user-not-found") {
                    setMsgError('Usuario no registrado')
                }
            })
    }

    return (
        <div className='row mt-5'>
            <div className="col"></div>

            <div className="col">
                <form onSubmit={RegistrarUsuario} className='form-group '>
                    <input
                        onChange={(e) => { setEmail(e.target.value) }}
                        className='form-control'
                        placeholder='Introduce tu Email'
                        type="email" />
                    <input
                        onChange={(e) => { setPass(e.target.value) }}
                        className='form-control mt-4'
                        placeholder='Introduce tu Contraseña'
                        type="password" />
                    <input
                        className='btn btn-dark mt-4 mb-2 col-12 '
                        value='Registrar Usuario'
                        type="submit" />
                </form>
                <button
                    onClick={LoginUsuario}
                    className='btn btn-success col-12 mb-2 '

                >
                    Iniciar Sesion
                </button>
                {
                    msgerror ?
                        (
                            <div>
                                {msgerror}
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                }
            </div>

            <div className="col"></div>
        </div>
    )
}

export default Login
