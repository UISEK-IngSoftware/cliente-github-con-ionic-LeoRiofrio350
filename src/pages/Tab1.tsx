import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardSubtitle,
  useIonViewDidEnter
} from '@ionic/react';

import { useState } from 'react';
import './Tab1.css';

import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories } from '../services/GithubServices';

import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);

  const loadRepos = async () => {
    const repoData = await fetchRepositories();
    setRepos(repoData);
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
        <IonCardSubtitle>Estos son los Repositorios:</IonCardSubtitle>
      </IonHeader>

      <IonContent>
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              repo={repo }
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
