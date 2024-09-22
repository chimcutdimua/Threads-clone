import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'

const Post = ({
    post,
    postedBy
}) => {
    const [liked, setLiked] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    console.log(post)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/api/users/profile/${postedBy}`)
                console.log(">>>check data: ", res.data)
                setUser(res.data)
            } catch (error) {
                console.error(error)
                setUser(null)
            }
        }
        getUser()
    }, [postedBy])

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
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>{post.likes.length} likes</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}

export default Post