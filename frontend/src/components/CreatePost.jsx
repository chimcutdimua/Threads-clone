import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const MAX_CHAR = 500

const CreatePost = () => {
    const user = useRecoilValue(userAtom)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [post, setPost] = useState('')
    const { handleImgUpload, imgUrl, setImgUrl } = usePreviewImg()
    const fileRef = useRef(null)
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
    const [loading, setLoading] = useState(false)


    const handleTextChange = (e) => {
        const inputText = e.target.value
        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR)
            console.log(truncatedText)
            setPost(truncatedText)
            setRemainingChar(0)
        } else {
            setPost(inputText)
            setRemainingChar(MAX_CHAR - inputText.length)
        }

    }

    const handlePost = async () => {
        setLoading(true)
        const body = {
            postedBy: user?._id,
            text: post,
            img: imgUrl
        }
        try {
            const res = await axios.post('/api/posts/create', body)
            console.log(res.data)
            toast({
                title: 'Success',
                description: res.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            setPost('')
            setImgUrl('')
            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Button
                onClick={onOpen}
                position={"fixed"}
                bottom={"30px"}
                right={"30px"}
                bg={useColorModeValue("gray.300", "gray.dark")}
                leftIcon={<AddIcon />}
            >
                Create
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Textarea
                                value={post}
                                onChange={handleTextChange}
                                placeholder='Write your post here...' />
                            <Text
                                color='gray.500'
                                fontSize='xs'
                                fontWeight='bold'
                                textAlign={"right"}
                                m={"1"}
                            >
                                {remainingChar}/{MAX_CHAR}
                            </Text>
                            <Input type='file' hidden ref={fileRef} onChange={handleImgUpload} />
                            <BsFillImageFill
                                style={{ cursor: 'pointer', marginLeft: "5px" }}
                                size={20}
                                onClick={() => fileRef.current.click()} />
                        </FormControl>
                        {imgUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>
                                <Image src={imgUrl} alt='selected img' />
                                <CloseButton
                                    onClick={() => setImgUrl("")}
                                    bg={"gray.800"}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose} variant='ghost'>Close</Button>
                        <Button isLoading={loading} onClick={handlePost} colorScheme='blue'>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost