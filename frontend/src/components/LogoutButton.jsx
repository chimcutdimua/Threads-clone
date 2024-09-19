import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import axios from 'axios'
import { FiLogOut } from "react-icons/fi";
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
        <Button onClick={handleLogout} position={"fixed"} top={"30px"} right={"30px"}>
            <FiLogOut size={20}/>
        </Button>
    )
}

export default LogoutButton