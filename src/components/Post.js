import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

export const Post = ({ post, onOpen }) => {

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
      <View style={styles.post}>
        <ImageBackground style={styles.image} source={{ uri: post.img }}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {new Date(post.date).toLocaleDateString()}
          </Text>
        </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    overflow: "hidden"
  },
  textBlock: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: "center",
    paddingVertical: 5
  },
  image: {
    width: '100%',
    height: 200
  },
  title: {
    color: '#fff',
    fontFamily: 'open-regular'
  }
});