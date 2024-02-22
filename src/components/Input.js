import {StyleSheet} from 'react-native';
import {Input} from 'native-base';

const InputWrapper = props => {
  return (
    <Input
      {...props}
      multiline
      fontSize={16}
      variant="unstyled"
      p={2}
      placeholderTextColor={'lightgrey'}
      InputLeftElement={props.leftIcon}
      InputRightElement={props.rightIcon}
    />
  );
};

export default InputWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
