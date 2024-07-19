import React, { useEffect } from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { getAuth, signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { generateKeywords } from '../firebase/service';

const { Title } = Typography;
const googleProvider = new GoogleAuthProvider();

export default function Login() {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleGoogleLogin = async () => {
        try {
            const { _tokenResponse, user } = await signInWithPopup(auth, googleProvider);
            if (_tokenResponse?.isNewUser) {
                await addDoc(collection(db, 'users'), {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    providerId: _tokenResponse.providerId,
                    keywords: generateKeywords(user.displayName)
                });
            }
        } catch (error) {
            console.error("Error during sign-in with Google: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log('User is signed in, navigating to home');
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate, auth]);

    return (
        <Row justify="center" style={{ height: '800px' }}>
            <Col span={8}>
                <Title style={{ textAlign: 'center' }} level={3}>Fun Chat</Title>
                <Button style={{ width: '100%', marginBottom: '5px' }} onClick={handleGoogleLogin}>
                    Sign in with Google
                </Button>
            </Col>
        </Row>
    );
}