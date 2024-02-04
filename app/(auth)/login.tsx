import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TextInput, Pressable, PressableStateCallbackType, StyleSheet } from 'react-native'
import { useAuthContext } from '../../contexts/AuthContext'

export default function Login() {
    const router = useRouter();
    const { loginWithEmail } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isHoverd, setIsHoverd] = useState(false);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
        },
        titleContainer: {
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 30,
        },
        titleText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        inputContainer: {
            justifyContent: 'center',
            marginBottom: 20,
        },
        inputItem: {
            width: 250,
            marginBottom: 20,
        },
        inputItemLabel: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        inputItemText: {
            fontSize: 16,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 5,
        },
        pressableContainer: {
            width: 100,
            backgroundColor: '#00a968',
            borderRadius: 5,
            opacity: isHoverd ? 0.6 : 1,
        },
        pressableContainerPress: {
            width: 100,
            backgroundColor: '#119864',
            borderRadius: 5,
            opacity: isHoverd ? 0.6 : 1,
        },
        pressableItem: {
            margin: 5,
        },
        pressableItemText: {
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
        },
    });

    const submit = async () => {
        await loginWithEmail({email: email, password: password});
        router.push('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    ログインページ
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputItem}>
                    <Text style={styles.inputItemLabel}>
                        メールアドレス
                    </Text>
                    <TextInput
                        style={styles.inputItemText}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="xxxx@example.com"
                        placeholderTextColor={'gray'}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputItemLabel}>
                        パスワード
                    </Text>
                    <TextInput
                        style={styles.inputItemText}
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>
            </View>
            <Pressable
                style={({ pressed } : PressableStateCallbackType) => [
                    pressed
                        ? styles.pressableContainerPress
                        : styles.pressableContainer
                ]}
                onHoverIn={() => setIsHoverd(true) }
                onHoverOut={() => setIsHoverd(false) }
                onPress={() => submit() }
            >
                <View style={styles.pressableItem}>
                    <Text style={styles.pressableItemText}>
                        ログイン
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};
