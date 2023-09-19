import React, { useRef, useState } from 'react'
import { auth } from '../Firebase'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const idTypeRef = useRef();
  const idNumberRef = useRef();
  const imageURLRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      setLoading(true);
      
      const userDetails = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        idType: idTypeRef.current.value,
        idNumber: idNumberRef.current.value,
        imageURL: imageURLRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        password: passwordRef.current.value,
        passwordConfirm: passwordConfirmRef.current.value
      }
  
      if (userDetails.password !== userDetails.passwordConfirm) {
        return setError("Passwords do not match")
      }

      const user = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      )

      if(user){
        // notify to the admin
        const reqOptions = { 
          url: 'http://localhost:5000/user/signup',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            uid: user.user.uid,
            name: userDetails.name,
            email: userDetails.email,
            idType: userDetails.idType,
            idNumber: userDetails.idNumber,
            imageURL: userDetails.imageURL,
            phoneNumber: userDetails.phoneNumber,
          }
        }
        const response = await axios.request(reqOptions);
        console.log(response)

        // navigate to the home page
        navigate('/')
      }

    } catch (error) {
      setError(error.message)
      console.log(error)
    }
  }

  return (
    <>
      <div className="container" style={{ width: '50%' }}>
        <h3 className='text-center'>React Firebase Authentication</h3>

        <div className="container  my-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input id='name' type="text" ref={nameRef} className="form-control" />
            </div>


            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp" />
            </div>

            <div className="mb-3">
              <label htmlFor="idType" >ID TYpe</label>
              <input id='idType' type="text" ref={idTypeRef} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="idNumber" >ID Number</label>
              <input id='idNumber' type="text" ref={idNumberRef} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="imageURL">Image URL</label>
              <input id='imageURL' type="text" ref={imageURLRef} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id='phoneNumber' type="tel" ref={phoneNumberRef} className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input id='password' type="password" ref={passwordRef} className="form-control" />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input id='cPassword' type="password" ref={passwordConfirmRef} className="form-control" />
            </div>

            <div className='text-center'>
              <button 
                style={{ width: '40%' }}
                type="submit" className="btn btn-primary"
                disabled={loading}  
              >
                Register
              </button>
            </div>
          </form>
        </div>


      </div>
    </>
  )
}

export default Register