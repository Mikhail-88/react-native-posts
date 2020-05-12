import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { DATA } from '../data';
import { PostList } from '../components/PostList';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const BookedScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate('Post', { 
      postId: post.id, 
      date: post.date, 
      booked: post.booked 
    });
  };

  const data = DATA.filter(post => post.booked);

  return (
    <PostList data={data} onOpen={openPostHandler} />
  );
};

BookedScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Favorite',
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