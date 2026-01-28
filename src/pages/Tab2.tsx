import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonInput, 
  IonTextarea,
  IonSpinner,
  useIonToast,
  IonText
} from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubServices';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();

  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    general: ''
  });

  const validateForm = (): boolean => {
    const newErrors = { name: '', general: '' };
    let isValid = true;

    if (repoName.trim() === '') {
      newErrors.name = 'El nombre del repositorio es obligatorio';
      isValid = false;
    } else if (repoName.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(repoName)) {
      newErrors.name = 'El nombre solo puede contener letras, números, guiones y puntos';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveRepository = async () => {
    if (!validateForm()) {
      return;
    }

    const repoFormData: RepositoryItem = {
      name: repoName.trim(),
      description: repoDescription.trim() || null,
      imageUrl: null,
      owner: null,
      language: null,
    };

    try {
      setLoading(true);
      setErrors({ name: '', general: '' });
      
      await createRepository(repoFormData);
      
      presentToast({
        message: 'Repositorio creado exitosamente',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });

      setRepoName('');
      setRepoDescription('');
      
      history.push('/tab1');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear el repositorio. Inténtalo de nuevo.';
      setErrors({
        ...errors,
        general: errorMessage,
      });
      
      presentToast({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="form-container">
          <IonInput
            label="Nombre del Repositorio *"
            labelPlacement="floating"
            fill="outline"
            placeholder="mi-proyecto-awesome"
            className={`form-field ${errors.name ? 'ion-invalid ion-touched' : ''}`}
            value={repoName}
            onIonChange={(e) => setRepoName(e.detail.value!)}
            disabled={loading}
            errorText={errors.name}
          />

          <IonTextarea
            label="Descripción del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripcion del proyecto..."
            className="form-field"
            rows={6}
            value={repoDescription}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
            disabled={loading}
          />

          {errors.general && (
            <IonText color="danger" className="error-message">
              <p>{errors.general}</p>
            </IonText>
          )}

          <IonButton
            expand="block"
            className="form-field"
            onClick={saveRepository}
            disabled={loading}
          >
            {loading ? (
              <>
                <IonSpinner name="crescent" className="button-spinner" />
                Creando...
              </>
            ) : (
              'Crear Repositorio'
            )}
          </IonButton>


        </div>
      </IonContent>
      <LoadingSpinner isOpen={loading} />
    </IonPage>
  );
};

export default Tab2;