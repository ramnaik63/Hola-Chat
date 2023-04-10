import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [show, setshow] = useState(false);
  const [loading ,setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => {
    setshow(!show);
    
  };
  const submitHandler = async() => {
    setloading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",

        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
    try{
      const config = {
        headers:{
          'Content-type': 'application/json',
        },
      };

      const {data} = await axios.post('/api/user/login', {email,password },config);
      toast({
        title: "Login successful",

        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem('userInfo', JSON.stringify(data))
      setloading(false)
      history.push('/chats');
    }
    catch(error){
      toast({
        title: "Error occured",
        description: error.response.data.message ,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);

    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            placeholder="Password"
            type={show ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading = {loading}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        colorScheme={"red"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setemail("guest@gmail.com");
          setpassword("123456");
        }}
      >
        Get guest user Credential
      </Button>
    </VStack>
  );
};

export default Login;
