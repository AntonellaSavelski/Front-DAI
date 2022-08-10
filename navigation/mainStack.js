import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn'
import Home from '../screens/Home';
import Detalle from '../screens/Detalle';

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown:false
            }
            }>
                <Stack.Screen
                    name='LogIn'
                    component={LogIn}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                    
                />
                <Stack.Screen
                    name='Detalle'
                >
                    {(props) => <Detalle {...props} 
                />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default MainStack