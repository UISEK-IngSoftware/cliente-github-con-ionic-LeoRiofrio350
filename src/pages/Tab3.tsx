import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';


const Tab3: React.FC = () => {
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
      <img alt="Silhouette of mountains" src="https://cdn.conmebol.com/wp-content/uploads/2023/06/000_334P84K-scaled.jpg" />
      <IonCardHeader>
        <IonCardTitle>Leo Riofrio</IonCardTitle>
        <IonCardSubtitle>LeoRiofrio350</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Soy un desarrollador de software apasionado a las tegnologias</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
