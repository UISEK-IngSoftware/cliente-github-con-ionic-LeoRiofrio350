  import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
  import { IonInput,IonTextarea  } from '@ionic/react';
  import './Tab2.css';
  import { useHistory } from 'react-router';
  import { RepositoryItem } from '../interfaces/RepositoryItem';
  import { createdRepository } from '../services/GithubServices';

  const Tab2: React.FC = () => {

    const history = useHistory();

    const repoFormData : RepositoryItem = {
      name: '',
      description: '',
      imageUrl: null,
      owner: null,
      language: null,
    };
    const setRepoName = (value: string) => {
      repoFormData.name = value;
    };

    const setRepoDescripcion = (value: string) => {
      repoFormData.description = value;
    };

    const saveRepository = () => {

      if(repoFormData.name.trim() === '') {
        alert('El nombre del repositorio es obligatorio.');
        return;
      }
      createdRepository(repoFormData)
      .then(() => {history.push('/tab1');})
      .catch(() => {
        alert('Error al crear el repositorio. Inténtalo de nuevo.');
          });
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Formulario del Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div>
            <IonInput
              label="Nombre del Repositorio"
              labelPlacement="floating"
              fill="outline"
              placeholder="android-project"
              className="form-field"
              value={repoFormData.name}
              onIonChange={(e) => setRepoName(e.detail.value!)}
            />

            <IonTextarea
              label="Descripción del Repositorio"
              labelPlacement="floating"
              fill="outline"
              placeholder="Este es un repositorio de prueba para el proyecto móvil"
              className="form-field"
              rows={6}
              value={repoFormData.description}
              onIonChange={(e) => setRepoDescripcion(e.detail.value!)}
            />

            <IonButton expand="block" className="form-field"onClick={saveRepository}>
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  };

  export default Tab2;
