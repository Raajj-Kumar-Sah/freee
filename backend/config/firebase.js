import admin from 'firebase-admin';

const initFirebase = () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }),
        });

        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Firebase Admin Init Error:', error.message);
    }
};

export default initFirebase;