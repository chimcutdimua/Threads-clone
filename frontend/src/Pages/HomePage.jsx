import { Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import { base_Url } from "../API/api"

const HomePage = () => {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const postFeed = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${base_Url}/api/posts/feed`)
                console.log(res.data)
                setPost(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        postFeed()
    }, [])
    return (
        <>
            {!loading && post?.length === 0 && <h1>Follow some user to see post</h1>}

            {loading && (
                <Flex justify={"center"}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {post.map((p) => (
                <Post key={p._id} post={p} postedBy={p.postedBy} />
            ))}
        </>
    )
}

export default HomePage