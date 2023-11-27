import React, { useState } from 'react';
import {
  Card,
  Image,
  Stack,
  Button,
  Input,
  Text
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'

const ComicCard = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const defaultImageURUL = "https://images.unsplash.com/photo-1534481016308-0fca71578ae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const GenerateImage = async () => {
    if (input.trim().length === 0) {
      toast({
        description: 'Text can not be empty.',
        status: 'warning',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    try {
      const data = { inputs: input };
      toast({
        description: 'Wait while generating',
        status: 'loading',
        isClosable: true,
        position: 'top',
        
      });
      setIsLoading(true);
      const response = await fetch(
        'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
        {
          headers: {
            Accept: 'image/png',
            Authorization:
              'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
        console.log("done");
      if (response.ok) {
        const result = await response.blob();
        const url = URL.createObjectURL(result);
        toast({
          description: 'Image Generated successfully',
          status: 'success',
          isClosable: true,
          position: 'top',
        });
        setImage(url);
        setIsLoading(false);
      } else {
        toast({
          description: 'Error! Try Again',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setInput(value);
  }

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        width={"48%"}
      >
        {
          image === null ? (<Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '50%' }}
            src={defaultImageURUL}
            alt='image'
          />) : (<Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={image}
            alt='image'
          />)
        }

        <Stack w={"50%"}  justifyContent={"center"} justifyItems={"center"} alignContent={"center"} alignItems={"center"}>
          
            <Input w={"80%"} placeholder='Enter text' value={input} onChange={handleChange} />
            <Button w={"80%"} variant='solid' colorScheme='blue' onClick={GenerateImage}>
            { (isLoading) ? <Spinner/> : (<Text>Generate</Text>)}
            </Button>
        </Stack>
      </Card>
    </>

  );
};

export default ComicCard;


/* <Card w={'22%'} >
      <CardBody>
        {loading ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
          >
            <Spinner />
          </Box>
        ) : image === null ? (
          <Image
            src={blank}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        ) : (
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        )}
      </CardBody>
      <Divider w={'90%'} marginX={'auto'} />
      <CardFooter w={'100%'}>
        <VStack w={'100%'}>
          <Input
            placeholder="Enter text to generate"
            size="lg"
            w={'100%'}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <Button
            variant="solid"
            colorScheme="purple"
            w={'100%'}
            onClick={handleGenerate}
          >
            Generate Comic
          </Button>
        </VStack>
      </CardFooter>
    </Card> */