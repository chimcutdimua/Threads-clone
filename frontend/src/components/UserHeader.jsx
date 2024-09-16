import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
    const toast = useToast()
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
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                        Mark zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>
                            @markzuckberg
                        </Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} borderRadius={"full"} p={1}>
                            New York
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        size={{
                            base: "md",
                            md: "xl"
                        }}
                        name={"Dan Abrahmov"}
                        src={"/zuck-avatar.png"}
                    />
                </Box>
            </Flex>
            <Text>Co-founder, executive chairman and CEO of Meta Platform.</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={"2"}>
                    <Text color={"gray.light"}>3.2k followers</Text>
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