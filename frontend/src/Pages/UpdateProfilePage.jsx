'use client'

import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import usePreviewImg from '../hooks/usePreviewImg'
import axios from 'axios'

export default function UpdateProfilePage() {
    const toast = useToast()
    const user = useRecoilValue(userAtom)
    const setUser = useSetRecoilState(userAtom)
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState(user.bio)
    const [profilePic, setProfilePic] = useState(user.profilePic)
    const fileRef = useRef(null)
    const {handleImgUpload, imgUrl} = usePreviewImg()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            name: name,
            username: username,
            email: email,
            password: password,
            bio: bio,
            profilePic: imgUrl || user.profilePic,
        }
        try {
            const res = await axios.put('/api/users/update', body)
            toast({
                title: "Success",
                description: "Profile updated successfully!",
                status: "success",
            })
            setUser(res.data)
            localStorage.setItem('user-threads', JSON.stringify(res.data))
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        <Flex
            align={'center'}
            justify={'center'}
            my={6}
            >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.dark')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>
                <FormControl id="userName">
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic} />
                                
                        </Center>
                        <Center w="full">
                            <Button onClick={() => fileRef.current.click()} w="full">Change Avatar</Button>
                            <Input type='file' hidden ref={fileRef} onChange={handleImgUpload}/>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl  >
                    <FormLabel>Full name</FormLabel>
                    <Input
                        value={name}
                        placeholder="FullName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>User name</FormLabel>
                    <Input
                        value={username}
                        placeholder="UserName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Email address</FormLabel>
                    <Input
                        value={email}
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Bio</FormLabel>
                    <Input
                        value={bio}
                        placeholder="Your bio..."
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        onChange={(e) => setBio(e.target.value)}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Password</FormLabel>
                    <Input
                        value={password}
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'green.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'green.500',
                        }}
                        type='submit'
                        >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
        </form>
    )
}