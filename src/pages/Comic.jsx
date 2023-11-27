import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ComicCard from '../components/ComicCard';
import { HStack } from '@chakra-ui/react';
const Comic = () => {
  return (
    <Box
      w="100%"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor={'#e8dcca'}
      minHeight={'100vh'}
      display={'flex'}
      alignContent={'space-around'}
      justifyContent={'center'}
      gap={'2'}
      flexWrap={'wrap'}
    >
      <HStack w={'100%'}>
        <Text
          marginX={"50px"}
          fontWeight={'bold'}
          color={'#00394d'}
          fontSize={'30px'}
          marginBottom={'20px'}
        >
          DASHTOON | COMIC GENERATOR PANEL
        </Text>
      </HStack>
      {[...Array(10)].map((x, i) => (
        <ComicCard key={i} />
      ))}
    </Box>
  );
};

export default Comic;
