import React, { useRef } from 'react'
import { auth } from "../Firebase"

const Admin = () => {

  const uidRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = uidRef.current.value;
    console.log(uid)
  }

  return (
    <div>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="" ref={uidRef} />
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default Admin