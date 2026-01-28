import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardSubtitle,
  useIonViewDidEnter,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonText,
  IonButton,
  IonModal,
  IonInput,
  IonTextarea,
  IonButtons,
  useIonToast,
  IonSpinner
} from '@ionic/react';

import { useState, useRef } from 'react';
import './Tab1.css';

import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, updateRepository } from '../services/GithubServices';

import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRepo, setEditingRepo] = useState<RepositoryItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [savingLoading, setSavingLoading] = useState(false);
  const [presentToast] = useIonToast();

  const modal = useRef<HTMLIonModalElement>(null);

  const loadRepos = async () => {
    try {
      setLoading(true);
      setError('');
      const repoData = await fetchRepositories();
      setRepos(repoData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los repositorios';
      setError(errorMessage);
      console.error('Error cargando repositorios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadRepos();
    event.detail.complete();
  };

  const handleEdit = (repo: RepositoryItem) => {
    setEditingRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || '');
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    loadRepos();
  };

  const saveEdit = async () => {
    if (!editingRepo || !editingRepo.owner) return;

    try {
      setSavingLoading(true);
      const updatedData: Partial<RepositoryItem> = {
        name: editName,
        description: editDescription
      };

      await updateRepository(editingRepo.owner, editingRepo.name, updatedData);

      presentToast({
        message: 'Repositorio actualizado correctamente',
        duration: 2000,
        color: 'success',
        position: 'bottom',
      });

      setIsEditModalOpen(false);
      loadRepos();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el repositorio';
      presentToast({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
    } finally {
      setSavingLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    console.log("IonViewDidEnter - Cargando Repositorios");
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
        <IonCardSubtitle className="ion-padding-start">
          Estos son los Repositorios:
        </IonCardSubtitle>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {error && !loading && (
          <div className="error-container ion-padding">
            <IonText color="danger">
              <h3>Error</h3>
              <p>{error}</p>
            </IonText>
            <IonButton onClick={loadRepos} color="primary">
              Reintentar
            </IonButton>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="empty-container ion-padding">
            <IonText color="medium">
              <h3>No hay repositorios</h3>
              <p>Crea tu primer repositorio en la pestaña "Crear"</p>
            </IonText>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <IonList>
            {repos.map((repo) => (
              <RepoItem
                key={repo.id}
                repo={repo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </IonList>
        )}

        <IonModal 
          ref={modal} 
          isOpen={isEditModalOpen}
          onDidDismiss={() => setIsEditModalOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Repositorio</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsEditModalOpen(false)}>
                  Cerrar
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Nombre del Repositorio"
              labelPlacement="floating"
              fill="outline"
              value={editName}
              onIonChange={(e) => setEditName(e.detail.value!)}
              className="ion-margin-bottom"
            />

            <IonTextarea
              label="Descripción"
              labelPlacement="floating"
              fill="outline"
              rows={6}
              value={editDescription}
              onIonChange={(e) => setEditDescription(e.detail.value!)}
              className="ion-margin-bottom"
            />

            <IonButton expand="block" onClick={saveEdit} disabled={savingLoading}>
              {savingLoading ? (
                <>
                  <IonSpinner name="crescent" style={{ marginRight: '10px' }} />
                  Guardando...
                </>
              ) : 'Guardar Cambios'}
            </IonButton>
          </IonContent>
          
        </IonModal>
      </IonContent>
      <LoadingSpinner isOpen={loading || savingLoading} />
      
    </IonPage>
  );
};

export default Tab1;