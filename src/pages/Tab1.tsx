import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import { fecthRepositories } from '../services/GithubService'; 
import React from 'react';
import './Tab1.css';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadRepos = async () => {
    setLoading(true);
    try {
      const reposData = await fecthRepositories();
      setRepositoryList(reposData);
    } catch (error) {
      console.error("Error al cargar repositorios:", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <IonList>
              {repositoryList.map((repo) => (
                <RepoItem key={repo.id} repository={repo} />
              ))}
            </IonList>

            {repositoryList.length === 0 && (
              <IonText color="danger" className="ion-padding text-center">
                <p>No se pudieron cargar los repositorios o la lista está vacía.</p>
              </IonText>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;