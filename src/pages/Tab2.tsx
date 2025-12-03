import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput,IonTextarea  } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario del Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
           <IonInput 
           label="Nombre del Repositorio" 
           labelPlacement="floating" 
           fill="outline" 
           placeholder="andorid-proyect"
            className='form-field'
            >
           </IonInput>
          <IonTextarea 
          label="Descripcion del Repositrio"
           labelPlacement="floating"
            fill="outline" 
            placeholder="Este es un Repositorio de prueba para el proyecto movil"
            className='form-field'
            rows={6}>
            
            </IonTextarea>
            
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
