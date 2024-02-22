import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
  LayoutAnimation,
  Animated,
  InteractionManager,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/authSlice';
import {IconButtonWrapper} from '../components/buttons/IconButtonWrapper';
import {Actionsheet, Box, HStack, Icon, Stack, View} from 'native-base';
import InputWrapper from '../components/Input';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
import moment from 'moment';

const ChatRoom = ({navigation}) => {
  const dispatch = useDispatch();
  const inputRef = createRef();
  const fadeAnimRef = useRef(new Animated.Value(1));

  let getTime = moment().format('h:mm A');

  const {user} = useSelector(state => state.auth); //get auth data from redux
  const [inputMessage, setInputMessage] = useState('');
  const [attachmentFile, setAttachmentFile] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [chatUser] = useState({
    name: user.username,
    profile_image: user.avatar,
    last_seen: 'online',
  });

  const [messages, setMessages] = useState([
    {
      id: uuid.v4(),
      sender: chatUser.name,
      message: 'Hey there!',
      time: '6:01 PM',
    },
    {
      id: uuid.v4(),
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      id: uuid.v4(),
      sender: chatUser.name,
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      id: uuid.v4(),
      sender: chatUser.name,
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      id: uuid.v4(),
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      id: uuid.v4(),
      sender: chatUser.name,
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      id: uuid.v4(),
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      id: uuid.v4(),
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      id: uuid.v4(),
      sender: chatUser.name,
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      id: uuid.v4(),
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
    {
      id: uuid.v4(),
      sender: chatUser.name,
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      id: uuid.v4(),
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  // ===========HANDLE SEND MESSAGE===========
  const sendMessage = () => {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    // Enable layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (selectedMessage) {
      // Editing an existing message
      let updatedMessages = messages.map(item =>
        item.id === selectedMessage.id
          ? {
              ...item,
              message: inputMessage,
              time: getTime,
              attachmentFile: attachmentFile,
            }
          : item,
      );
      setMessages(updatedMessages);
    } else {
      // Add new message
      setMessages([
        ...messages,
        {
          id: uuid.v4(),
          sender: chatUser.name,
          message: inputMessage,
          time: getTime,
          attachmentFile: attachmentFile,
        },
      ]);
    }

    setInputMessage('');
    setAttachmentFile('');
    setSelectedMessage('');
  };

  // ===========HANDLE DELETE=================
  const deleteMessage = () => {
    // Close the bottom sheet
    setOpenBottomSheet(false);

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(fadeAnimRef.current, {
          toValue: 0,
          duration: 500, // Adjust the duration as needed
          useNativeDriver: false,
        }),
      ]).start(() => {
        const updatedMessages = messages.filter(
          item => item.id !== selectedMessage.id,
        );
        setMessages(updatedMessages);
        setSelectedMessage('');

        fadeAnimRef.current.setValue(1);
      });
    }, 50);
  };

  // =============HANDLE EDIT MESSAGE==============
  const editMessage = () => {
    setInputMessage(selectedMessage.message);
    setAttachmentFile(selectedMessage.attachmentFile);
    setOpenBottomSheet(false);
    InteractionManager.runAfterInteractions(() => {
      inputRef.current?.focus();
    });
  };

  // ===========HANDLE ATTACHMENT===============
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
        setAttachmentFile(imageUri);
      }
    });
  };

  // ===========SET HEADER COMPONENT==========
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Image
            style={styles.userProfileImage}
            source={{uri: chatUser.profile_image}}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontWeight: '700', fontSize: 18}}>
              {chatUser.name}
            </Text>
            <Text style={{color: '#000', fontWeight: '300'}}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{paddingRight: 10}}
          onPress={() => {
            dispatch(logout());
          }}>
          <FontAwesome name="power-off" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Actionsheet
          isOpen={openBottomSheet}
          onClose={() => setOpenBottomSheet(false)}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={() => deleteMessage()}>
              Remove
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => editMessage()}>
              Edit
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => setOpenBottomSheet(false)}>
              Cancel
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <FlatList
          style={{backgroundColor: '#f2f2ff'}}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({item, index}) => (
            <Animated.View
              style={{
                opacity:
                  item.id === selectedMessage?.id ? fadeAnimRef.current : 1,
              }}>
              <TouchableWithoutFeedback key={index}>
                <View style={{marginTop: 6}}>
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      backgroundColor:
                        item.sender === chatUser.name ? '#d9a221' : '#434f6b',
                      alignSelf:
                        item.sender === chatUser.name
                          ? 'flex-end'
                          : 'flex-start',
                      marginHorizontal: 10,
                      padding: 10,
                      borderRadius: 8,
                      borderBottomLeftRadius:
                        item.sender === chatUser.name ? 8 : 0,
                      borderBottomRightRadius:
                        item.sender === chatUser.name ? 0 : 8,
                    }}>
                    {item.sender === chatUser.name && (
                      <IconButtonWrapper
                        position={'absolute'}
                        left={-28}
                        top={-5}
                        onPress={() => {
                          setOpenBottomSheet(true);
                          setSelectedMessage(item);
                        }}
                        _icon={{
                          color: '#000',
                        }}
                        icon={
                          <Icon as={Feather} name="more-vertical" size={4} />
                        }
                      />
                    )}
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                      }}>
                      {item.message}
                    </Text>
                    {item?.attachmentFile && (
                      <View
                        justifyContent={'start'}
                        alignItems={'start'}
                        mt={3}>
                        <Image
                          source={{uri: item?.attachmentFile}}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 8,
                          }}
                        />
                      </View>
                    )}
                    <Text
                      style={{
                        color: '#dfe4ea',
                        fontSize: 14,
                        alignSelf: 'flex-end',
                      }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          )}
        />

        <Stack style={{paddingVertical: 8}}>
          {attachmentFile && (
            <View px="2">
              <Box
                position={'absolute'}
                style={{left: 85, zIndex: 1, top: -20}}>
                <IconButtonWrapper
                  onPress={() => {
                    setAttachmentFile('');
                  }}
                  _icon={{
                    color: '#434f6b',
                  }}
                  bg="white"
                  icon={<Icon as={AntDesign} name="closecircleo" size={4} />}
                />
              </Box>
              <Image
                source={{uri: attachmentFile}}
                style={{
                  width: '30%',
                  height: 100,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderWidth: 2,
                  borderColor: '#434f6b',
                }}
              />
            </View>
          )}
          <HStack
            bg={'#fff'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={1}
            mx={2}
            shadow={1}
            borderColor={'yellow.400'}
            borderWidth={1}
            borderRadius={4}>
            <InputWrapper
              w="80%"
              ref={inputRef}
              height={50}
              borderRadius={1}
              onChangeText={text => setInputMessage(text)}
              defaultValue={inputMessage}
              placeholder="Message"
              onSubmitEditing={() => {
                sendMessage();
              }}
            />

            <IconButtonWrapper
              onPress={() => {
                handleImagePicker();
              }}
              _icon={{
                color: 'yellow.400',
              }}
              icon={<Icon as={Feather} name="image" size={4} />}
            />
            <IconButtonWrapper
              onPress={() => {
                sendMessage();
                Keyboard.dismiss();
              }}
              disabled={inputMessage.length == 0}
              _icon={{
                color: inputMessage.length == 0 ? 'gray.300' : 'yellow.400',
                size: 'md',
              }}
              icon={<Icon as={FontAwesome} name="send" size={4} />}
            />
          </HStack>
        </Stack>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
});
