import { Avatar, Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import base_Url from "../API/api"
import postAtom from '../atoms/postAtom'


axios.defaults.withCredentials = true;

const Post = ({
    post,
    postedBy,
    getPost
}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const currentUser = useRecoilValue(userAtom)
    const toast = useToast()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${base_Url}/api/users/profile/${postedBy}`, { withCredentials: true })
                setUser(res.data)
            } catch (error) {
                console.error(error)
                setUser(null)
            }
        }
        getUser()
    }, [postedBy])

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault()
            if (!window.confirm('Are you sure you want to delete this post?')) return
            const res = await axios.delete(`${base_Url}/api/posts/delete/${post._id}`, { withCredentials: true })
            toast({
                title: 'Post Deleted',
                description: res.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            getPost()
        } catch (error) {
            console.error(error)
        }
    }

    if (!user) return null

    return (
        <Link to={`${user.username}/post/${post._id}`}>
            <Flex gap={3} py={5} mb={4}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size={"md"} name={user?.name} src={user?.profilePic} onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${user.username}`)
                    }} />
                    <Box w={"1px"} h={"full"} my={2} bg={"gray.light"}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies.length === 0 && <Text alignItems={"center"}>🥱</Text>}
                        {post?.replies[0] && (
                            <Avatar position={"absolute"} top={0} left='15px' padding={"2px"} size={"xs"} name='john' src={post?.replies[0].userProfilePic} />
                        )}
                        {post?.replies[1] && (
                            <Avatar position={"absolute"} bottom={0} right='-5px' padding={"2px"} size={"xs"} name='hello' src={post?.replies[1].userProfilePic} />
                        )}
                        {post?.replies[2] && (
                            <Avatar position={"absolute"} bottom={0} left='4px' padding={"2px"} size={"xs"} name='fuck' src={post?.replies[2].userProfilePic} />
                        )}
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text onClick={(e) => {
                                e.preventDefault()
                                navigate(`/${user.username}`)
                            }} fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
                            <Image src="/verified.png" alt="" w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} width={36} textAlign={"right"} color={"gray.light"}>
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text>
                            {currentUser._id === user._id && (
                                <DeleteIcon
                                    size={20}
                                    cursor={"pointer"}
                                    onClick={handleDeletePost}
                                />
                            )}
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (
                        <Box
                            borderRadius={6}
                            overflow={"hidden"}
                            border={"1px solid "}
                            borderColor={"gray.light"}
                        >
                            <Image src={post.img} w={"full"} />
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>

                </Flex>
            </Flex>
        </Link>
    )
}

export default Post