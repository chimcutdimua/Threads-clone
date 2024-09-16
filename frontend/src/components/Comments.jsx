import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'

const Comments = () => {
    const [liked, setLiked] = useState(false)
    return (
        <>
            <Flex gap={4} py={4} my={4} w={"full"}>
                <Avatar src='/zuck-avatar.png' size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>2d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>Hey this looks great</Text>
                    <Actions liked={liked} setLiked={setLiked} />
                    <Text fontSize={"sm"} color={"gray.light"}>{(liked ? 1 : 0)} likes</Text>
                </Flex>
            </Flex>
            <Divider my={4} />
        </>
    )
}

export default Comments