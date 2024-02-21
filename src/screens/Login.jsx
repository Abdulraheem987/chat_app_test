// src/screens/LoginScreen.js
import React, {useCallback, useState} from 'react';
import {Image, Alert, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import {CustomButton} from '../components/buttons/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AvatarWrapper} from '../components/buttons/AvatarWrapper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/authSlice';
import InputWrapper from '../components/Input';
import {IconButtonWrapper} from '../components/buttons/IconButtonWrapper';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setAvatar(imageUri);
      }
    });
  };

  const handleLogin = () => {
    // Perform validation logic here
    if (!username.trim()) {
      ToastAndroid.show('Please enter username', ToastAndroid.SHORT);
      return;
    } else if (!avatar) {
      ToastAndroid.show('Please upload profile image', ToastAndroid.SHORT);
    } else {
      // Perform login logic here
      // For now, just log the username and avatar URI
      console.log('Username:', username);
      console.log('Avatar URI:', avatar);
      dispatch(login({username, avatar}));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <Box w={'100%'}>
          <Image
            source={require('../assets/images/chatimage.png')}
            style={{width: '100%', height: 230}}
          />
        </Box>

        <Text textAlign={'center'} size={'lg'} mt={'10'}>
          LOG IN
        </Text>

        <Stack mt={'10'} mb={50} mx={6}>
          <AvatarWrapper
            source={
              avatar
                ? avatar
                : 'https://ongaropc.com/wp-content/uploads/2023/03/avatar-placeholder.jpg'
            }
          />

          <Box position={'absolute'} right={'32'} top={'16'}>
            <IconButtonWrapper
              onPress={handleImagePicker}
              borderRadius="full"
              borderWidth={'2'}
              bg={'yellow.400'}
              _icon={{
                color: '#fff',
                size: 'md',
              }}
              _pressed={{
                bg: 'yellow.300',
                _icon: {
                  name: 'upload',
                },
              }}
              icon={<Icon as={AntDesign} name="upload" size={3} />}
            />
          </Box>

          <FormControl isRequired>
            <Text fontFamily={'Lato-Bold'} fontSize={14} mb={1}>
              User name
            </Text>
            <InputWrapper
              onChangeText={e => setUsername(e)}
              value={username}
              placeholder="Enter username"
              variant="outline"
              borderWidth={1}
              borderRadius={12}
              height={50}
              _focus={{
                borderColor: 'yellow.400',
              }}
            />
          </FormControl>

          <HStack justifyContent={'center'} my={10}>
            <CustomButton
              w={'100%'}
              onPress={() => handleLogin()}
              buttonText="Login"
            />
          </HStack>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
