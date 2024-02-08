import { useState } from 'react'
import { View, Text, TextInput, Pressable, PressableStateCallbackType, StyleSheet } from 'react-native'
import { useAuthContext } from '../../contexts/AuthContext'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form'

type FormData = {
    email: string,
    password: string,
};

export default function Signup() {
    const { signupWithEmail } = useAuthContext();
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
        errorText: {
            color: 'red',
        },
    });

    // バリデーションの設定
    const validationSchema = Yup.object().shape({
        email: Yup.string()
                  .required('メールアドレスを入力して下さい。')
                  .email('メールアドレスは有効なアドレス形式で入力して下さい。'),
        password: Yup.string()
                     .required('パスワードを入力して下さい。')
                     .matches(/^[0-9a-zA-Z]+$/, 'パスワードは半角英数字で入力して下さい。')
                     .min(6, 'パスワードは6文字以上で入力して下さい。'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm(formOptions);

    // バリデーションチェックで正常時
    const onSubmit: SubmitHandler<FormData> = async (
        data: any,
    ) => {
        await signupWithEmail({email: data.email, password: data.password});
    };

    // バリデーションチェックでエラー時
    const onError: SubmitErrorHandler<FormData> = async (
        errors: any
    ) => {
        console.log('バリデーションチェックでエラー');
        console.log(errors);
    };

    const submit = async () => {
        const values = getValues();
        setEmail(values.email);
        setPassword(values.password);
        handleSubmit(onSubmit, onError)()
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    サインアップページ
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputItem}>
                    <Text style={styles.inputItemLabel}>
                        メールアドレス
                    </Text>
                    <Controller
                        control={control}
                        name={'email'}
                        defaultValue={email}
                        render={({
                           field: { onChange, value, name },
                           formState: { errors },
                        }) => (
                            <View>
                                <TextInput
                                    style={styles.inputItemText}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="xxxx@example.com"
                                    placeholderTextColor={'gray'}
                                />
                                { errors[name]?.message && (
                                    <Text style={styles.errorText}>
                                        { String(errors[name]?.message) }
                                    </Text>
                                )}
                            </View>
                        )}
                    />
                </View>
                <View style={styles.inputItem}>
                    <Text style={styles.inputItemLabel}>
                        パスワード
                    </Text>
                    <Controller
                        control={control}
                        name={'password'}
                        defaultValue={password}
                        render={({
                           field: { onChange, value, name },
                           formState: { errors },
                        }) => (
                            <View>
                                <TextInput
                                    style={styles.inputItemText}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                { errors[name]?.message && (
                                    <Text style={styles.errorText}>
                                        { String(errors[name]?.message) }
                                    </Text>
                                )}
                            </View>
                        )}
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
                onPress={() => submit()}
            >
                <View style={styles.pressableItem}>
                    <Text style={styles.pressableItemText}>
                        登録
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};
