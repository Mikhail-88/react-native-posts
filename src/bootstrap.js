import * as Font from 'expo-font';
import { DataBase } from './db';

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf')
    });
  
    await DataBase.init();
  } catch (error) {
    console.log('Error', error);
  }
};