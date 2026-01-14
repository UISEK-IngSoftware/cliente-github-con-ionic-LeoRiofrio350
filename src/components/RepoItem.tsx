import { 
  IonItem, 
  IonLabel, 
  IonThumbnail, 
  IonItemSliding, 
  IonItemOptions, 
  IonItemOption,
  IonIcon,
  useIonAlert,
  useIonToast
} from '@ionic/react';
import { trash, pencil } from 'ionicons/icons';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { deleteRepository } from '../services/GithubServices';

interface RepoItemProps {
  repo: RepositoryItem;
  onEdit: (repo: RepositoryItem) => void;
  onDelete: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const handleDelete = () => {
    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar el repositorio "${repo.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              if (repo.owner) {
                await deleteRepository(repo.owner, repo.name);
                presentToast({
                  message: 'Repositorio eliminado correctamente',
                  duration: 2000,
                  color: 'success',
                  position: 'bottom'
                });
                onDelete();
              }
            } catch (error: any) {
              presentToast({
                message: error.message || 'Error al eliminar el repositorio',
                duration: 3000,
                color: 'danger',
                position: 'bottom'
              });
            }
          }
        }
      ]
    });
  };

  const handleEdit = () => {
    onEdit(repo);
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img 
            src={repo.imageUrl || "https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/importar-imagen-r.png"} 
            alt={repo.name} 
          />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description || 'Sin descripción'}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language || 'No especificado'}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={handleEdit}>
          <IonIcon slot="icon-only" icon={pencil} />
        </IonItemOption>
      </IonItemOptions>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={handleDelete}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;