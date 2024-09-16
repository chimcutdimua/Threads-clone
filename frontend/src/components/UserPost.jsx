import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from './Actions'

const UserPost = () => {
    const [liked, setLiked] = useState(false)
    return (
        <Link to={"/markzuckerberg/post/1"}>
            <Flex gap={3} py={5} mb={4}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size={"md"} name='markzuckerberg' src='zuck-avatar.png' />
                    <Box w={"1px"} h={"full"} my={2} bg={"gray.light"}></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar position={"absolute"} top={0} left='15px' padding={"2px"} size={"xs"} name='john' src='https://bit.ly/tioluwani-kolawole' />
                        <Avatar position={"absolute"} bottom={0} right='-5px' padding={"2px"} size={"xs"} name='hello' src='https://bit.ly/ryan-florence' />
                        <Avatar position={"absolute"} bottom={0} left='4px' padding={"2px"} size={"xs"} name='fuck' src='https://bit.ly/tioluwani-kolawole' />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
                            <Image src="/verified.png" alt="" w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                            <BsThreeDots cursor={"pointer"} />
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>Building the future of work</Text>
                    <Box
                        borderRadius={6}
                        overflow={"hidden"}
                        border={"1px solid "}
                        borderColor={"gray.light"}
                    >
                        <Image src='/post1.png' w={"full"} />
                    </Box>
                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>123 replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>234 likes</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}

export default UserPost