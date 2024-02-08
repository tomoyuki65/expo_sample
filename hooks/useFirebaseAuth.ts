/* FirebaseAuthの状態管理用フック */
import { useState, useEffect } from 'react'
import { auth } from '../libs/firebaseConfig'
import {
    User,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
} from 'firebase/auth'
import { useRouter } from 'expo-router'

// useFirebaseAuth関数
export default function useFirebaseAuth() {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Signup関数
    const signupWithEmail = async (args: {
        email: string,
        password: string,
    }): Promise<void> => {
        setLoading(true);

        let createUser;
        try {
            const credential = await createUserWithEmailAndPassword(auth, args.email, args.password);
            createUser = credential.user;

            setLoading(false);
            router.push('/');
            return;
    
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            };

            if (createUser) {
                deleteUser(createUser);
            };
    
            console.log("Signup処理ができませんでした。");
            setLoading(false);
            return;
    
            throw error;
        }
    };

    // Login関数
    const loginWithEmail = async (args: {
        email: string,
        password: string,
    }): Promise<void> => {
        setLoading(true);
  
        try {
            const credential = await signInWithEmailAndPassword(auth, args.email, args.password);
    
            setLoading(false);
            router.push('/');
            return;
    
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
    
            console.log("Loginできませんでした。");
            setLoading(false);
            return;

            throw error;
        }
    };

    // Logout関数
    const logout = async (): Promise<void> => {
        setLoading(true);
  
        if (!firebaseUser) {
            setLoading(false);
            return;
        };
    
        try {
            await signOut(auth);
            setFirebaseUser(null);

            setLoading(false);
            router.push('/');
            return;
    
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
    
            console.log("ログアウトに失敗しました。");
            setLoading(false);
            return;
    
            throw error;
        }
    };

    // 退会用関数
    const destroyUser = async (): Promise<void> => {
        setLoading(true);
    
        if (!firebaseUser) {
            setLoading(false);
            return;
        };
    
        try {
            // Firebaseのユーザー削除
            await deleteUser(firebaseUser);
      
            // ログアウト処理
            await logout();
      
            setLoading(false);
            router.push('/');
            return;
    
        } catch (error) {
            if (error instanceof Error) {
              console.error(error.message);
            }
      
            setLoading(false);
            return;
      
            throw error;
        };
    };

    // onAuthStateChanged関数における、
    // ユーザーの状態管理用パラメータの設定
    const nextOrObserver = async (user: User | null): Promise<void> => {
        setLoading(true);
  
        if (!user) {
            setLoading(false);
            return;
        }
  
        setFirebaseUser(user);
  
        setLoading(false);
       return;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, nextOrObserver);
        return unsubscribe;
    }, []);

    return {
        firebaseUser,
        loading,
        signupWithEmail,
        loginWithEmail,
        logout,
        destroyUser,
    };
};
