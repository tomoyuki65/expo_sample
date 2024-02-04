/* ユーザー情報共有用のコンテキスト */
import { ReactNode, createContext, useContext } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import { User } from 'firebase/auth'

// AuthContextのインターフェース定義
interface AuthContext {
    firebaseUser: User | null;
    loading: boolean;
    signupWithEmail: (args: {
        email: string,
        password: string
    }) => Promise<void>;
    loginWithEmail: (args: {
        email: string,
        password: string
    }) => Promise<void>;
    logout: () => Promise<void>;
    destroyUser: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

// ユーザー情報共有用のコンテキスト「AuthCtx」を作成
export const AuthCtx = createContext({} as AuthContext);

// ユーザー情報共有用のコンポーネント
export function AuthContextProvider({ children }: AuthProviderProps) {
    // FirebaseAuthの状態を取得
    const {
        firebaseUser,
        loading,
        signupWithEmail,
        loginWithEmail,
        logout,
        destroyUser,
    } = useFirebaseAuth();
  
    // AuthContextオブジェクトの定義
    const AuthContext: AuthContext = {
        firebaseUser: firebaseUser,
        loading: loading,
        signupWithEmail: signupWithEmail,
        loginWithEmail: loginWithEmail,
        logout: logout,
        destroyUser: destroyUser,
    };

    return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}

// ユーザー情報共有用の関数
export const useAuthContext = () => useContext(AuthCtx);