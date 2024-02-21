import React from 'react';
import {Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export const CustomButton = props => {
  const {buttonText} = props;

  return (
    <Button
      {...props}
      _pressed={{
        bg: 'yellow.300',
      }}
      w={'100%'}
      bg={'yellow.400'}
      borderRadius={25}
      style={{marginTop: 0, height: 50}}
      _text={{
        fontFamily: 'Lato-Bold',
        fontSize: 18,
      }}>
      <Text size="md" color={'white'}>
        {buttonText}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({});
