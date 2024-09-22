
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/AuthAtom'
import axios from 'axios'
import userAtom from '../atoms/userAtom'

export default function LoginCard() {
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom)
    const [username, setUsername] = useState('kietlee')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        const body = {
            username: username,
            password: password,
        }
        try {
            const res = await axios.post("/api/users/login", body)
            localStorage.setItem("user-threads", JSON.stringify(res.data))
            setUser(res.data)
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px"
                    }}
                >
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>User name</FormLabel>
                            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={loading}
                                loadingText="Logging in"
                                size="lg"
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={'white'}
                                onClick={handleLogin}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}>
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don&apos;t have an account <Link color={'blue.400'}
                                    onClick={() => setAuthScreen("signup")} >Sign up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}