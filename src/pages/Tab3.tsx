import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubServices';
import { logOutOutline } from 'ionicons/icons';
import AuthService from '../services/AuthServices';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';


const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const loadUserInfo = async () => {
    try {
      setLoading(true);
      const info = await getUserInfo();
      setUserInfo(info);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  const handleLogout = () => {
    AuthService.logout();
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt={userInfo?.name}
       src={userInfo?.avatar_url} />
      <IonCardHeader>
        <IonCardTitle>{userInfo?.name}</IonCardTitle>
        <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{userInfo?.bio}</IonCardContent>
    </IonCard>
    <IonButton expand="block" color="danger" onClick={handleLogout}>
      <IonIcon slot="start" icon={logOutOutline} />
      Cerrar Sesión
    </IonButton>
      </IonContent>
      <LoadingSpinner isOpen={loading} />
    </IonPage>
  );
};

export default Tab3;
