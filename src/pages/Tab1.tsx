import { 
  IonContent, 
  IonHeader, 
  IonList, 
  IonPage, 
  IonText, 
  IonTitle, 
  IonToolbar, 
  useIonViewWillEnter,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItem
} from '@ionic/react';
import { trash, pencil } from 'ionicons/icons';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import { fetchRepositories, deleteRepository } from '../services/GithubService'; 
import React from 'react';
import { useHistory } from 'react-router';
import './Tab1.css';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const loadRepos = async () => {
    setLoading(true);
    setErrorMsg("");
    fetchRepositories()
      .then((reposData) => setRepositoryList(reposData)) 
      .catch((error) => {
        const err = error as Error;
        setErrorMsg("Error al cargar repositorios: " + err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (owner: string, repoName: string, slidingItem: HTMLIonItemSlidingElement) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el repositorio "${repoName}"?`)) {
      setLoading(true);
      setErrorMsg("");
      
      try {
        await deleteRepository(owner, repoName);
        alert("¡Repositorio eliminado con éxito!");
        if (slidingItem) slidingItem.close(); 
        setRepositoryList(prevList => prevList.filter(repo => repo.name !== repoName));
      } catch (error) { 
        const err = error as Error;
        setErrorMsg("Error al eliminar: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (slidingItem) slidingItem.close(); 
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
      <IonContent fullscreen className='ion-padding'>
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
              {repositoryList.map((repo) => {
                let mySlidingRef: HTMLIonItemSlidingElement;

                return (
                  <IonItemSliding key={repo.id} ref={(el) => { if(el) mySlidingRef = el; }}>
                    <IonItem lines="none" style={{ '--background': 'transparent' }}>
                      <RepoItem repository={repo} /> 
                    </IonItem>

                    <IonItemOptions side="end">
                      {/* BOTÓN DEL LÁPIZ (MÉTODO PATCH) */}
                      <IonItemOption 
                        color="primary" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (mySlidingRef) mySlidingRef.close(); 
                          // SOLUCIÓN: Pasamos el nombre por URL para forzar la actualización
                          history.push(`/tab2/${repo.name}`);
                        }}
                      >
                        <IonIcon slot="icon-only" icon={pencil} />
                      </IonItemOption>

                      {/* BOTÓN DE LA BASURA (MÉTODO DELETE) */}
                      <IonItemOption 
                        color="danger" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(repo.owner.login, repo.name, mySlidingRef);
                        }}
                      >
                        <IonIcon slot="icon-only" icon={trash} />
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                );
              })}
            </IonList>

            {errorMsg !== "" && (
              <IonText color="danger" className="ion-padding text-center">
                <p>{errorMsg}</p>
              </IonText>
            )}

            {repositoryList.length === 0 && !loading && !errorMsg && (
              <IonText color="dark" className="ion-padding text-center">
                <p>No hay repositorios disponibles.</p>
              </IonText>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;