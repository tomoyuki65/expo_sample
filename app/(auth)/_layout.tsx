import { Tabs } from 'expo-router';

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="signup"
                options={{
                    title: '',
                    tabBarStyle: {display: 'none'},
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: '',
                    tabBarStyle: {display: 'none'},
                }}
            />
        </Tabs>
    );
};