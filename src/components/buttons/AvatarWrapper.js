import React from 'react';
import {Avatar, Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export const AvatarWrapper = ({source}) => {
  return (
    <Avatar
      bg="green.500"
      alignSelf="center"
      size="xl"
      source={{
        uri: source,
      }}
    />
  );
};

const styles = StyleSheet.create({});
