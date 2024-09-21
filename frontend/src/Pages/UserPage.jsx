import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'

const UserPage = () => {
    const [user, setUser] = useState(null)
    const { username } = useParams(null)
    const [loading, setLoading] = useState(false)

    const userData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/users/profile/${username}`)
            setUser(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        userData()
    }, [username])

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        )
    }

    if (!user && !loading) return <h1>User not found</h1>




    return (
        <>
            <UserHeader user={user} />
            <UserPost />
            <UserPost />
            <UserPost />

        </>
    )
}

export default UserPage