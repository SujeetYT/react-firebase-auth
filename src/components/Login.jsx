import React, { useRef } from 'react'
import { auth, db } from '../Firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
// import { collection, getDocs, query, where } from 'firebase/firestore'
import axios from 'axios'




const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )

      const url = 'http://localhost:5000/user'
      const token = await response.user.getIdToken(); // getIDToken is a function which takes paramethers to set the token expiration time
      const header = {
        "Accept": "*/*",
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      const requestOption = {
        method: 'GET',
        headers: header,
        url: url
      }

      const result = await axios.request(requestOption)

      console.log({token ,result})
      // navigate('/user')
    } catch (error) {
      console.log(error)
    }

  }



  const googleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)

      navigate('/home');
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="container" style={{ width: '50%' }}>
        <h1 className='text-center'>React Firebase Authentication</h1>

        <div className="container  my-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                ref={emailRef}
                type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                ref={passwordRef}
                type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className='text-center'>
              <button style={{ width: '40%' }}
                type="submit" className="btn btn-primary">Login</button>
            </div>
            <Link to='/register'><p style={{
              color: 'white',
              marginLeft: '30rem'

            }}>Register New User</p></Link>
          </form>
        </div>

        <div className="container text-center">
          <div className='d-flex justify-content-center align-items-center'>

            <button

              onClick={googleClick}

              className="btn d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: 'white',
                width: '72%'
              }}
            >
              <div style={{ width: '12%' }}>
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="" style={{ width: '100%' }} />
              </div>
              <div>
                <h2 style={{
                  fontWeight: 'bold',
                  color: 'red'
                }}
                >Login With Google</h2>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login