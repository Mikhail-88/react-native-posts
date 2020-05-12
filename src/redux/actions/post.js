import * as FileSystem from 'expo-file-system';

import { 
  LOAD_POSTS, 
  TOGGLE_BOOKED, 
  REMOVE_POST, 
  ADD_POST 
} from '../types';
import { DataBase } from '../../db';

export const loadPosts = () => async dispatch => {
  const posts = await DataBase.getPosts();

  dispatch({
    type: LOAD_POSTS,
    payload: posts
  });
};

export const toggleBooked = post => async dispatch => {
  await DataBase.updatePost(post);

  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id
  });
};

export const removePost = id => async dispatch => {
  await DataBase.removePost(id);

  dispatch({
    type: REMOVE_POST,
    payload: id
  });
};

export const addPost = post => async dispatch => {
  let image = 'https://www.bizexpert.in/business_image/noimagefound.png';

  if (post.img) {
    const fileName = post.img.split('/').pop();
    image = FileSystem.documentDirectory + fileName;
  
    try {
      await FileSystem.moveAsync({
        to: image,
        from: post.img
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

  const payload = { ...post, img: image };
  const id = await DataBase.createPost(payload);
  payload.id = id;

  dispatch({
    type: ADD_POST,
    payload
  });
};