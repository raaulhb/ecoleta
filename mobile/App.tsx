import { StatusBar, View } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold,useFonts } from '@expo-google-fonts/ubuntu'

import Home from './src/pages/home';

export default function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent></StatusBar>
     <Home/>
    </>
   
  );
}

