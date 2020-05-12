import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  Text, 
  Image, 
  Button, 
  Alert 
} from 'react-native';

import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { toggleBooked, removePost } from '../redux/actions/post';

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postId = navigation.getParam('postId');
  const post = useSelector(state => state.post.allPosts.find(post => post.id === postId));
  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const removeHandler = () => {
    Alert.alert(
      'Delete',
      'Delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress() {
            navigation.navigate('Main');
            dispatch(removePost(postId));
          }
        }
      ],
      { cancelable: false }
    );
  };

  if (!post) {
    return null;
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        style={styles.button}
        title='Delete' 
        color={THEME.DANGER_COLOR} 
        onPress={removeHandler} 
      />
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date');
  const booked = navigation.getParam('booked');
  const toggleHandler = navigation.getParam('toggleHandler');
  const iconName = booked ? 'ios-star' : 'ios-star-outline';

  return {
    headerTitle: `Post of ${new Date(date).toLocaleDateString()}`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName={iconName}
          onPress={toggleHandler}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textBlock: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  },
  button: {
    width: '40%'
  }
});