import { Tabs } from 'expo-router'

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarStyle: {display: 'none'},
                }}
            />
        </Tabs>
    );
};