import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen
                  name='Home'
                  component={Home}
                  options={{ 
                     headerShown: false,
                     cardStyle: {
                      backgroundColor: '#f0f0f5'
                  }}}
                  
                 />
                <AppStack.Screen 
                  name='Points' 
                  component={Points}
                  options={{ 
                    headerShown: false,
                    cardStyle: {
                     backgroundColor: '#f0f0f5'
                 }}} 
                  />
                <AppStack.Screen 
                  name='Detail' 
                  component={Detail}
                  options={{ 
                    headerShown: false,
                    cardStyle: {
                     backgroundColor: '#f0f0f5'
                 }}} 
                  />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;