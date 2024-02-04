import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuthContext } from '../../contexts/AuthContext'
import { View, Text, Pressable, PressableStateCallbackType, StyleSheet } from 'react-native'

export default function Footer() {
    const { firebaseUser, logout } = useAuthContext();
    const [isHoverdSignup, setIsHoverdSignup] = useState(false);
    const [isHoverdLogin, setIsHoverdLogin] = useState(false);
    const [isHoverdLogout, setIsHoverdLogout] = useState(false);
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 50,
            backgroundColor: '#00a968',
        },
        pressableContainer: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
        },
        pressableSignup: {
            width: '50%',
            borderRightWidth: 0.5,
            borderRightColor: '#FBFBFB',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isHoverdSignup ? "#119864" : '#00a968',
        },
        pressableLogin: {
            width: '50%',
            borderRightWidth: 0.5,
            borderRightColor: '#FBFBFB',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isHoverdLogin ? "#119864" : '#00a968',
        },
        pressablePress: {
            width: '50%',
            borderRightWidth: 0.5,
            borderRightColor: '#FBFBFB',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#119864",
        },
        pressableText: {
            color: 'white',
            fontSize: 16,
        },
        pressableLogoutContainer: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
        },
        pressableLogout: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isHoverdLogout ? "gray" : 'dimgray',
        },
        pressablePressLogout: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#119864",
        },
        pressableLogoutText: {
            color: 'white',
            fontSize: 16,
        },
    });

    const pressTab = (path: any) => {
        router.push(path);
    };

    const pressLogout = async () => {
        await logout();
    };

    return (
        <View style={styles.container}>
            { !firebaseUser &&
                <View style={styles.pressableContainer}>
                    <Pressable
                        style={({ pressed } : PressableStateCallbackType) => [
                            pressed
                                ? styles.pressablePress
                                : styles.pressableSignup
                        ]}
                        onHoverIn={() => setIsHoverdSignup(true)}
                        onHoverOut={() => setIsHoverdSignup(false)}
                        onPress={() => pressTab('(auth)/signup')}
                    >
                        <Text style={styles.pressableText}>
                            サインアップ
                        </Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed } : PressableStateCallbackType) => [
                            pressed
                                ? styles.pressablePress
                                : styles.pressableLogin
                        ]}
                        onHoverIn={() => setIsHoverdLogin(true)}
                        onHoverOut={() => setIsHoverdLogin(false)}
                        onPress={() => pressTab('(auth)/login')}
                    >
                        <Text style={styles.pressableText}>
                            ログイン
                        </Text>
                    </Pressable>
                </View>
            }
            { firebaseUser &&
                <View style={styles.pressableLogoutContainer}>
                    <Pressable
                        style={({ pressed } : PressableStateCallbackType) => [
                            pressed
                                ? styles.pressablePressLogout
                                : styles.pressableLogout
                        ]}
                        onHoverIn={() => setIsHoverdLogout(true)}
                        onHoverOut={() => setIsHoverdLogout(false)}
                        onPress={() => logout()}
                    >
                        <Text style={styles.pressableLogoutText}>
                            ログアウト
                        </Text>
                    </Pressable>
                </View>
            }
        </View>
    );
};