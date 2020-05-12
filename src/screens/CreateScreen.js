import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PhotoPicker } from '../components/PhotoPicker';
import { THEME } from '../theme';
import { addPost } from '../redux/actions/post';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const imgRef = useRef();

  const photoPickHandler = uri => {
    imgRef.current = uri;
  };

  const saveHandler = () => {
    const post = {
      text,
      date: new Date().toJSON(),
      img: imgRef.current,
      booked: false
    };

    navigation.navigate('Main');
    dispatch(addPost(post));
    setText('');
    imgRef.current = null;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Add new Post</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter text of Post...'
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title='Add Post' 
            color={THEME.MAIN_COLOR} 
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Create Post',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle Drawer'
        iconName='ios-menu'
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textInput: {
    padding: 10,
    marginBottom: 10
  }
});