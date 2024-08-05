import firebase from 'firebase';
import admin, {ServiceAccount} from 'firebase-admin';

const firestoreConfigs= {
    apiKey: 'AIzaSyBn5YtupyTn9YWf75-kLFdBLd7wzw7G9kY',
    authDomain: 'ebuddy-dev-test.firebaseapp.com',
    projectId: 'ebuddy-dev-test',
    storageBucket: 'ebuddy-dev-test.appspot.com',
    messagingSenderId: '117377693412',
    appId: '1:117377693412:web:83a63a97462c4ebd099ef1',
    measurementId: 'G-E2X1236XNG'
};

const firebaseCredentials: ServiceAccount = {
    projectId: 'ebuddy-dev-test',
    clientEmail: 'firebase-adminsdk-b2hbz@ebuddy-dev-test.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAHOy3XSDApT2e\nkmWhKEFVAMyYkCfKiNmJ165rJosLg9LyTwS59ELkYL1iUuGemM91zIrwInM7oUZ1\nVPo161sY1ie0z/HNnn3bsebC0kN1HRhPPhLQlWLQa8puv0IP5FvSsj0mYNI2uTnS\nH4JZEC3grjbLPQyLc4RefK8GIuRNKJvRGwO5uOv0h7TYvvr98EAytDd/iwWr1P00\nlSx9yIYkBMDPDKOjG6YFO2m/fWWa0Dt3AW4BdjC5oyN7FE0gnYxMggNHUF/9YfEC\ncuqiqaQrarqoFrOeVjB2xeBx4qJQcm4HpdOB7CXKDRe4TMJmIj2u8xpEfQjISuzW\nA/4MUBDDAgMBAAECggEANkk2Hs5jDezjj6aAr1xnsbRrHAVIKTQofIoE0GRw0A0t\nE6l+hWlfaZdojJstBBrcLMZi0F57v3LgLRGZLplWAZuqVq6X/ml12RnZQl4WD8br\n8qBwwp4j8Q80gbzr1v/Jbq1NGEYtwKbwjs62j6JBxIaWFzImFFXNJsIG1y4O4zpC\nzbRKvFmJ33I7FJrHC/QJB5lpt4P5BGHQHF4hApNum8FeTS6dQyo70KsJOVhkr1yI\naaUi//yQtRrE6kawARaWTlK5U3VJ9rAw8MiJHJrQhAmqU1S/FAGIplDjhIr+7Q3H\nE4wUZekPgzaY+R1bJWjpLINB6KJI/4a2BNQdGi/tUQKBgQD/hQHRH/pGAwKnLBMd\nO8UYHyZj9nEpoc8wlsGSuy/jEiEOq49MlgVgpf6tAqmGVGIBaWMEC3jLduneqIOU\nWZI5XU9hPDV5WnqI/cV/m8mAboqLIzUs629yDrBV3THjSnPNILlJPLfj0AoPz4Xs\ntVVOd2Izz0fOsBLNT9gz77UZmwKBgQDAeWWtgvIcTTluSkpb7jkwEk3DYG+nzvv2\nv5u02EB0FKsWVq4BxrCua1I4ftHvuohGDLZxve1ZvH1USmFbratwD+Bfk6kLKKG2\ncKzInGgpnWkeGfC2cvjtNysteP6bt5dPD8VLqcdSU4ErRi2xXYawPpimQynlibqq\ng2sWwnmL+QKBgQDrirOTEHRIJ6xBaGqyTw+v3b8o9Nt6MjPpKX+FgFJzcpnQiSuO\nwNhyMHKlD8gwEQdLH9fruZt/i72oyBSLI0qc4Lw0+SieFl7Qe4aczIIih0PlYO46\n20kfjhTVAhNj35UCKcFDlto5AeTUkEt3We0qaPi4o8Ig8MRUSN8XeUerMwKBgQCT\nS9QeRznVotuypbPmSpcFTNyqCmEogOSeXuBgM6aPr0mHHOqpfU61DHitt5Ad8Bhd\n01jEDt9Xb0JSgWGkcXHjnqLNQgl5+qxXHD9+fwPP5SEO4jcuySnrD+9BK3ld3dAz\ntxP75YAeZr1RSrGpLLPoqN7VTkz/1rk9yLjpgAbYsQKBgC5x8DUaT2GHNTWw1RTG\n5kkkToi3r2p1nNROV4vIY+8oHj3BWcMYLRGTynOrGcZDPERgBFFNbyDqtXYkJONW\n0KHG4eYUGYSPyNMWrGRg63ywa73IwNQk/UcloKMBW5HbZZFliv3qKGWpEwTGVDuD\nO6AXDBGrDY52STaUUFh2bTvi\n-----END PRIVATE KEY-----\n',
}

firebase.initializeApp(firestoreConfigs);
admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    databaseURL: 'https://ebuddy-dev-test.firebaseio.com',
});

const db = admin.firestore();
export default {firebaseApp: firebase, firebaseAppAdmin: admin, db};