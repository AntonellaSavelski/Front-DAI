
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='LogIn'
                    component={LogIn}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default MainStack