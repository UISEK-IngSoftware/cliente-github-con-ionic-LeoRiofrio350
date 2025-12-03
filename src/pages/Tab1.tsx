import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  IonCard,  IonCardContent,  IonCardHeader,  IonCardSubtitle,  IonCardTitle,  IonItem,  IonLabel,  IonThumbnail,} from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
          
        </IonToolbar>
        <IonCardSubtitle>.        Estos son los Repositorios:</IonCardSubtitle>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
           <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Repo1</IonLabel>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Repo2</IonLabel>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Repo3</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Repo4</IonLabel>
          </IonItem>
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
