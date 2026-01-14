import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { logoGithub } from "ionicons/icons"
import './login.css'; 
import { useState } from "react";
import AuthService from "../services/AuthServices";

const Login: React.FC = () => {
    const [userName, setUserName] =  useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!userName || !token) {
            setError('Por favor ingrese usuario y token de Github');
            return;
        }
        const success = AuthService.login(userName, token);
        if (success) {
            window.location.href='tab1';
        } else {
            setError('Error al iniciar sesión. Verifique sus credenciales.');
            return;
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div className="login-container">
                    <IonIcon icon={logoGithub} className="login-logo" />
                    <h1>Inicio de sesion de Github</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <IonInput 
                            className="login-field"
                            label="Usuario"
                            labelPlacement="floating"
                            fill="outline"
                            type="text"
                            value={userName}
                            onIonChange={(e) => setUserName(e.detail.value!)}
                            required
                        />
                        <IonInput
                            className="login-field"
                            label="Token de Github"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonChange={(e) => setToken(e.detail.value!)}
                            required
                        />
                        {error && (
                            <IonText color="danger" className="error-message">
                                {error}
                            </IonText>
                        )}
                        <IonButton expand="block"  type="submit">
                            Iniciar sesión
                        </IonButton>
                        <IonText color="medium" className="login-hint">
                            <p>Ingresa tu usuario de GitHub para iniciar sesión</p>
                        </IonText>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;