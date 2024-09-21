import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const UserPage = () => {
    const [user, setUser] = useState(null)
    const { username } = useParams(null)
    console.log(username)
    
    const userData = async () => {
        try {
            const res = await axios.get(`/api/users/profile/${username}`)
            setUser(res.data)
        } catch (error) {
            console.log(error)       
        }
    }

    useEffect(() => {
        userData()
    }, [username])


    return (
        <>
            <UserHeader user={user}/>
            <UserPost />
            <UserPost />
            <UserPost />

        </>
    )
}

export default UserPage