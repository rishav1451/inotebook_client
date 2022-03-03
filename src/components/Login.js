import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch(`https://morning-thicket-99399.herokuapp.com/api/auth/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email , password : credentials.password})
      });
      const json = await  response.json()
      console.log(json);
      if(json.success){
          //Save the auth-token and redirect
          localStorage.setItem('token',json.authtoken);
          props.showAlert('Logged in Successfully','success');
          history.push('/');
      }
      else{
        props.showAlert('Invalid details','danger')
      }
    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h2>Login to continue to iNotebook</h2>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
