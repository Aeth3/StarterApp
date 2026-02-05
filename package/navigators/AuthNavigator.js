import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { authRoutes } from "../routes/authRoutes"


const Stack = createStackNavigator()

export default function AuthNavigator() {
    return <Stack.Navigator
        detachInactiveScreens={true}
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {authRoutes.map(({ name, component, options }) => (
            <Stack.Screen
                key={name}
                name={name}
                component={component}
                options={options}
            />
        ))}
    </Stack.Navigator>
}