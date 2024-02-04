import { View, Text, StyleSheet } from 'react-native'
import { useAuthContext } from '../../contexts/AuthContext'

export default function Index() {
    const { firebaseUser } = useAuthContext();

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
        loginCheckContainer: {
            width: '100%',
            alignItems: 'center',
        },
        loginCheckTitle: {
            marginBottom: 10,
        },
        loginCheckTitleText: {
            fontSize: 16,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    TOPページ
                </Text>
            </View>
            <View style={styles.loginCheckContainer}>
                <View style={styles.loginCheckTitle}>
                    <Text style={styles.loginCheckTitleText}>
                        ログイン状況
                    </Text>
                </View>
                <View>
                    <Text>
                        ステータス：{firebaseUser ? "ログイン済み" : "未ログイン"}
                    </Text>
                    { firebaseUser &&
                        <View>
                            <Text>
                                uid: { firebaseUser.uid }
                            </Text>
                            <Text>
                                email: { firebaseUser.email }
                            </Text>
                            <Text>
                                emailVerified: { String(firebaseUser?.emailVerified) }
                            </Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};