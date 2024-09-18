import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import axios from 'axios'

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom)
    const handleLogout = async () => {
        try {
            const res = await axios.post('/api/users/logout')
            localStorage.removeItem('user-threads')
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button onClick={handleLogout} position={"fixed"} top={"30px"} right={"30px"}>Log out</Button>
    )
}

export default LogoutButton