import { Box, Button, Container, VStack, Input, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import {useState} from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    // <input> -> newProduct 로 업데이트 -> createProduct(newProduct)로 store에 새로운 product 정보 업데이트
    //input으로 입력 받은 product 정보 전달
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: "",
        image: "",
      })
    
      const toast = useToast();
      
      //zustand store에서 createProduct()를 가져온다.
      const {createProduct} = useProductStore();
    
      const handleAddProduct = async () => {
        console.log("newProduct in handleAddProduct()",newProduct)
        //input으로 입력된 data인 newProduct를 인수로 createProduct()함수를 실행하여 newProduct르 db에 저장한다.
        const { success, message } = await createProduct(newProduct);
        if(!success) {
          toast({
            title:"Error",
            description: message,
            status: "error",
            isClosable: true,
          });
        } else {
          toast({
            title:"Success",
            description: message,
            status: "success",
            isClosable: true,
          });
        }
        //input의 data 제출 후 빈 문자열로 초기화
        setNewProduct({ name:"", price:"", image:""});
      }
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
            <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input 
                        placeholder="Product Name"
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <Input 
                        placeholder="Price"
                        name='price'
                        type='number'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <Input 
                        placeholder="Image URL"
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                    <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                        Add Product
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage;