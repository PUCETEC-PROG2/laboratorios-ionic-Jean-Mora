import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory, useParams } from 'react-router';
import { RepositoryPayload } from '../interfaces/RepositoryPayloads';
import React from 'react';
import { createRepository, updateRepository, fetchRepositories } from '../services/GithubService'; 
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const { repoName } = useParams<{ repoName?: string }>(); 
  
  const [repositoryData, setRepositoryData] = React.useState<RepositoryPayload>({
    name: "",
    description: ""
  });
  
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [ownerName, setOwnerName] = React.useState("");

  const checkMode = async () => {
    setErrorMsg("");
    
    if (repoName) {
      setLoading(true);
      setIsEditing(true);
      try {
        const currentRepos = await fetchRepositories();
        const found = currentRepos.find(r => r.name === repoName);
        if (found) {
          setOwnerName(found.owner.login);
          setRepositoryData({
            name: found.name,
            description: found.description || ""
          });
        } else {
          // Si tenía parámetro pero ya no existe en GitHub, reseteamos a modo creación automáticamente sin dar error
          setIsEditing(false);
          setOwnerName("");
          setRepositoryData({ name: "", description: "" });
        }
      } catch (error) {
        setErrorMsg("Error al cargar datos del repositorio a editar");
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(false);
      setOwnerName("");
      setRepositoryData({ name: "", description: "" });
    }
  };

  useIonViewWillEnter(() => {
    checkMode();
  });

  const saveRepo = async () => {
    if (repositoryData.name.trim() === '') {
      setErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }

    setLoading(true);
    setErrorMsg(""); 

    if (isEditing && repoName) {
      // CASO PATCH: Editar repositorio existente
      updateRepository(ownerName || "owner", repoName, repositoryData)
        .then(() => {
          alert("¡Repositorio actualizado con éxito!"); 
          setRepositoryData({ name: "", description: "" });
          history.push("/tab1"); 
        })
        .catch((error) => {
          setErrorMsg("Error al actualizar (PATCH): " + error.message);
        })
        .finally(() => setLoading(false));
    } else {
      // CASO POST: Crear repositorio nuevo
      createRepository(repositoryData)
        .then(() => {
          alert("¡Repositorio creado con éxito!"); 
          setRepositoryData({ name: "", description: "" });
          history.push("/tab1"); 
        })
        .catch((error) => {
          setErrorMsg("Error al crear (POST): " + error.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? "Editar Repositorio" : "Formulario de Repositorio"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditing ? "Editar Repositorio" : "Formulario de Repositorio"}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
             className="form-field"
             label="Nombre del Repositorio"
             labelPlacement="floating"
             placeholder="Ingrese nombre del Repositorio"
             value={repositoryData.name}
             onIonChange={(e) => setRepositoryData({...repositoryData, name: e.detail.value!})}
             disabled={isEditing} 
          />
          
          <IonTextarea
             className="form-field"
             label="Descripción del Repositorio"
             labelPlacement="floating"
             placeholder="Ingrese la descripción del Repositorio"
             value={repositoryData.description}
             onIonChange={(e) => setRepositoryData({...repositoryData, description: e.detail.value!})}
             rows={6}
          />
          
          {errorMsg !== "" && (
            <IonText color="danger" className="ion-padding">
              <p>{errorMsg}</p>
            </IonText>
          )}
          
          <IonButton
             className="form-field"
             expand="block"
             shape="round"
             color={isEditing ? "success" : "primary"}
             onClick={saveRepo}
          >
             {isEditing ? "Actualizar Cambios" : "Guardar"}
          </IonButton>
        </div>
        
        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;