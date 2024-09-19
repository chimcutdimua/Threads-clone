import { useToast } from '@chakra-ui/react'
import { useState } from 'react'

const usePreviewImg = () => {
    const toast = useToast()
    const [imgUrl, setImgUrl] = useState(null)
    const handleImgUpload = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImgUrl(e.target.result);
            }
            reader.readAsDataURL(file)
        } else {
            toast({
                title: "Invalid file type",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setImgUrl(null)
        }
    }
  return {
    imgUrl,
    handleImgUpload
  }
}

export default usePreviewImg