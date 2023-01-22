import React, { useState, useEffect } from 'react';
import "../assets/styles/Login.scss";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (localStorage.getItem('token') !== null) {
        window.location.replace(process.env.REACT_APP_FRONTEND_URL);
      } else {
        setLoading(false);
      }
    }, []);
  
    const onSubmit = e => {
      e.preventDefault();
  
      const user = {
        email: email,
        password: password
      };
  
      fetch(process.env.REACT_APP_BACKEND_URL+'dj-rest-auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
            console.log(data);
          if (data.key) {
            localStorage.clear();
            localStorage.setItem('token', data.key);
            window.location.replace(process.env.REACT_APP_FRONTEND_URL + 'begin/');
          } else {
            setEmail('');
            setPassword('');
            localStorage.clear();
            setErrors(true);
          }
        });
    };
  
    return (
     
        <div className="form-container">
            {loading === false && <h1>Iniciar sesión</h1>}
            {errors === true && <small style={{color: 'red'}}>No se puede iniciar sesión con las credenciales proporcionadas</small>}
            {loading === false && (
            <form onSubmit={onSubmit}>
                <label htmlFor='email'>Correo Electronico</label> <br />
                <input
                name='email'
                type='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                />{' '}
                <br />
                <label htmlFor='password'>Contraseña:</label> <br />
                <input
                name='password'
                type='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
                />{' '}
                <br />
                <input type='submit' value='Iniciar Sesión' />
            </form>
            )}
        </div>
      
    );
  };
  
export default Login;