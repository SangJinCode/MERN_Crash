import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import {useProductStore} from "../store/product";


const ProductCard = ({ product }) => {
    //product 편집 버튼을 위한 state
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    //store로 부터 삭제와 업데이트를 위한 함수를 전달받는다.
    const { deleteProduct, updateProduct} = useProductStore();

    //메세지 출력을 위해 toast 사용
    const toast = useToast();

    //isOpen은 boolean이고 기본값 false, onOpen과 onClose은 isOpen의 상태과 변경을 위해 각각 true와 false를 반환 
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log("isOpen:", isOpen, "onOpen:", onOpen, "onClose:",onClose)

    //이벤트발생시 deleteProduct() 실행
    const handleDeleteProduct = async (pid) => {
        //pid를 인수로 store의 deleteProduct() 함수 실행
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast ({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast ({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    //이벤트발생시 updateProduct() 실행
    const handleUpdateProduct = async (pid, updatedProduct) => {
        //pid를 인수로 store의 deleteProduct() 함수 실행
        const { success, message } = await updateProduct(pid, updatedProduct );

        //isOpen의 값이 true일때 modal 창이 활성화되기 때문에 false로 초기화 한다.
        onClose()

        if (!success) {
            toast ({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast ({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box 
            shadow='lg' 
            rounded="lg" 
            overflow="hidden" 
            transition='all 0.3s' 
            _hover= {{ transform: "translateY(-5px)", shadow: "xl" }} 
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton 
                        icon={<DeleteIcon />}
                        onClick={()=> handleDeleteProduct(product._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input 
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input 
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard