import { View, Text, ScrollView, RefreshControl, Image, Dimensions, StyleSheet } from 'react-native'
import { useAuthContext } from '../../contexts/AuthContext'
import { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 外部API実行処理
const getCatImage = async () => {
    const url = "https://api.thecatapi.com/v1/images/search";

    try {

        const res = await fetch(url);

        return res.json();

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }

        console.log("データフェッチに失敗しました。");
        return;

        throw error;
    }
};

export default function Index() {
    const { firebaseUser } = useAuthContext();
    const [refreshing, setRefreshing] = useState(false);
    const [image, setImage] = useState<string>();
    const windowHeight = Dimensions.get('window').height;

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            height: windowHeight,
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
        image: {
            marginTop: 50,
        },
    });

    // 画面を下スワイプした時の更新処理
    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        // 猫画像を取得
        const data = await getCatImage();
        setImage(data[0].url);

        // AsyncStorageにデータ保存
        AsyncStorage.setItem('image', data[0].url);
        
        setRefreshing(false);
    }, []);

    useEffect(() => {
        (async() => {
            const imageUrl = await AsyncStorage.getItem('image');
            if (imageUrl) {
                setImage(imageUrl);
            };
          })();
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
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
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                    height={250}
                    width={250}
                />
            </View>
        </ScrollView>
    );
};