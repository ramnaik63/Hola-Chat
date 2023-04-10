import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [password, setpassword] = useState();
  const [pic, setpic] = useState();
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => {
    setshow(!show);
  };
  const postDetails = (pics) => {
    setloading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an image",

        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type==="image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append('file',pics);
      data.append('upload_preset','chat-app');
      data.append('cloud_name', 'dxeysmkn7');
      fetch('https://api.cloudinary.com/v1_1/dxeysmkn7/image/upload',{
        method: 'post',
        body: data
      }).then((res)=> res.json()).then((data)=> {
        setpic(data.url.toString());
        console.log(data.url.toString());
        setloading(false);
      })
      .catch((err)=>{
        console.log(err);
        setloading(false);
      })
      
    }
    else{
      toast({
        title: "Please Select an image",

        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };
  const submitHandler = async () => {
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      setloading(true);
      toast({
        title: "Passwords do not match",

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

      const {data} = await axios.post('/api/user', {name , email,password ,pic},config);
      toast({
        title: "Registeration successful",

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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Re-enter Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
