import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { PostList } from '../components/PostList';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { loadPosts } from '../redux/actions/post';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate('Post', { 
      postId: post.id, 
      date: post.date, 
      booked: post.booked 
    });
  };

  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.post.allPosts);
  const isLoading = useSelector(state => state.post.isLoading);

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} />
      </View>
    );
  }

  return (
    <PostList data={allPosts} onOpen={openPostHandler} />
  );
};

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Blog',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Take photo'
        iconName='ios-camera'
        onPress={() => navigation.push('Create')}
      />
    </HeaderButtons>
  ),
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});