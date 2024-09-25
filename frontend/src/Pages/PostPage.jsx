import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text, Toast, useEditable, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comments from '../components/Comments'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'

axios.defaults.withCredentials = true;

const PostPage = () => {
    const { user, loading } = useGetUserProfile()
    const [post, setPost] = useState(null)
    const { pid } = useParams()
    const currentUser = useRecoilValue(userAtom)
    const toast = useToast()
    const navigate = useNavigate()
    console.log(pid)

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`/api/posts/${pid}`)
                setPost(res.data)
                console.log(res.data)
            } catch (error) {
                console.error(error)

            }
        }
        getPosts()
    }, [pid])

    const handleDeletePost = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/posts/delete/${pid}`)
            toast({
                title: 'Post Deleted',
                description: res.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate(`/${user?.username}`)
        } catch (error) {
            console.error(error)

        }
    }

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        )
    }



    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar size={"md"} name='Mark Zuckerberg' src={user?.profilePic} />
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
                        <Image src='/verified.png' w={4} h={4} ml={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"xs"} textAlign={"right"} width={36} color={"gray.light"}>
                        {formatDistanceToNow(new Date(post?.createdAt))} ago
                    </Text>
                    {currentUser._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
                </Flex>
            </Flex>

            <Text my={3}>{post?.text}</Text>
            {post?.img && (
                <Box
                    borderRadius={6}
                    overflow={"hidden"}
                    border={"1px solid "}
                    borderColor={"gray.light"}
                >
                    <Image src={post?.img} w={"full"} />
                </Box>

            )}
            <Flex gap={3} my={3}>
                <Actions post={post} />
            </Flex>

            <Divider my={4} />
            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>✌️</Text>
                    <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>
            <Divider my={4} />
            {post?.replies?.map(reply => (
                <Comments key={reply._id} reply={reply}
                    lastReply={reply._id === post.replies[post.replies.length - 1]._id}
                />
            ))}
        </>
    )
}

export default PostPage