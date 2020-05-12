import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { DATA } from '../data';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId');
  const post = DATA.find(post => post.id === postId);

  const removeHandler = () => {
    Alert.alert(
      'Delete',
      'Delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title='Delete' color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date');
  const booked = navigation.getParam('booked');
  const iconName = booked ? 'ios-star' : 'ios-star-outline';

  return {
    headerTitle: `Post of ${new Date(date).toLocaleDateString()}`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName={iconName}
          onPress={() => console.log('OK Pressed')}
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
  }
});