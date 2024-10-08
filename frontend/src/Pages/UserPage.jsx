import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '../components/Post'
import base_Url from '../API/api'

axios.defaults.withCredentials = true;

const UserPage = () => {
    const [user, setUser] = useState(null)
    const { username } = useParams(null)
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

    const userData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${base_Url}/api/users/profile/${username}`, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getPost = async () => {
        try {
            const res = await axios.get(`${base_Url}/api/posts/user/${username}`, { withCredentials: true })
            setPosts(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setPosts([])
        }
    }

    useEffect(() => {
        userData()
        getPost()
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
            {posts.map((post) => (
                <Post key={post._id} post={post} getPost={getPost} postedBy={post.postedBy} />
            ))}
        </>
    )
}

export default UserPage