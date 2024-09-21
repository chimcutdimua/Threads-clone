import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios';

const UserHeader = ({
    user
}) => {
    const toast = useToast()
    const currentUser = useRecoilValue(userAtom)
    const [following, setFollowing] = useState(user?.follower.includes(currentUser._id))
    const [updating, setUpdating] = useState(false)
    const copyUrl = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() =>
            toast({
                title: 'Success',
                description: "Profile link copied.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
    }

    const handleFollowAndUnfollow = async () => {
        if (!currentUser) {
            toast({
                title: 'Error',
                description: "Please login to follow this user.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        if (updating) return
        setUpdating(true)
        try {
            const res = await axios.post(`/api/users/follow/${user._id}`)
            if (res.data.message === 'User followed') {
                toast({
                    title: 'Success',
                    description: "You are now following this user.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                user.follower.push(currentUser._id)
            } else {
                toast({
                    title: 'Success',
                    description: "You are now unfollowing this user.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                user.follower.pop()
            }
            setFollowing(!following)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                        {user?.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                            @{user?.username}
                        </Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} borderRadius={"full"} p={1}>
                            New York
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {user?.profilePic && (
                        <Avatar
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                            name={user?.name}
                            src={user?.profilePic}
                        />
                    )}
                    {!user?.profilePic && (
                        <Avatar
                            name={user?.name}
                            src="https://bit.ly/broken-link"
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />
                    )}
                </Box>
            </Flex>
            <Text>{user?.bio}</Text>
            {currentUser._id === user?._id && (
                <Link as={RouterLink} to={"/update"}>
                    <Button size={"sm"}>Update profile</Button>
                </Link>
            )}
            {currentUser._id !== user?._id && (
                <Button isLoading={updating} onClick={handleFollowAndUnfollow} size={"sm"}>
                    {following ? "Unfollow" : "Follow"}
                </Button>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={"2"}>
                    <Text color={"gray.light"}>{user?.follower?.length} followers</Text>
                    <Box w={"1"} h={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"} >instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem onClick={copyUrl} bg={"gray.dark"}>Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"} >
                <Flex pb={"3"} cursor={"pointer"} justifyContent={"center"} flex={1} borderBottom={"1.5px solid white"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex pb={"3"} cursor={"pointer"} justifyContent={"center"} flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader