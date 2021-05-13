import React, { useState } from "react";
import TopNav from "../Landingpage/TopNav/TopNav";
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom"


export default function ProfilePage() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.pushState('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
     <TopNav></TopNav>
     <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>  
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
     </Card>
     <div className="w-100 text-center mt-2">
       <Button variant="link" onClick={handleLogout}>Log Out</Button>
     </div>
    </>
  )
}
/*
const ProfilePage = () => {
  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <TopNav />
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">Faruq</h2>
          <h3 className="italic">faruq123@gmail.com</h3>
        </div>
      </div>
      <button className="w-full py-3 bg-red-600 mt-4 text-white">
        Sign out
      </button>
    </div>
  );
};
*/
