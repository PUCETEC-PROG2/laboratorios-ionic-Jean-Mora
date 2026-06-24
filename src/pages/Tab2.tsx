import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { RepositoryPayload } from '../interfaces/RepositoryPayloads';
import React from 'react';
import { createRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repositoryData, setRepositoryData] = useSate <RepositoryPayload>({
    name: "",
    description: ""
  })
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const saveRepo = async() => {
    if(repositoryData.name.trim() === ''){
      setErrorMsg("el nobre del repositorio es obligatorio");
      return;
    }
    setLoading(true);
    createRepository(repositoryData)
      .then(()=> history.push("/tab1"))
      .catch((error) => setErrorMsg("error al crear repositorio." + error))
      .finally(() => { 
        setLoading(false);
        setRepositoryData({
          name: "",
          descrription:""
        });
      });  
  };

  useIonViewWillEnter(() =>{
    setErrorMsg("");
  })

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
             className="form-field"
             label="Nombre del Repositorio"
             labelPlacement="floating"
             placeholder="Ingrese nombre del Repositorio"
             value={repositoryData}
             onIonChange={(e) => setRepositoryData({...repositoryData,description: e.detail.value!})}
          />
          <IonTextarea
             className="form-field"
             label="Descripcion del Repositorio"
             labelPlacement="floating"
             placeholder="Ingrese la descripcion del Repositorio"
             onIonChange={(e) => setRepositoryData({...repositoryData,description: e.detail.value!})}
             rows={6}
          />
          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton
             className="form-field"
             expand="block"
             shape="round"
             color="primary"
             onClick={saveRepo}
          >
             Guardar

          </IonButton>
          
        </div>
        {loading && <LoadingSpinner />}

      </IonContent>
    </IonPage>
  );
};

export default Tab2;



function useSate<T>(arg0: { name: string; description: string; }): [any, any] {
  throw new Error('Function not implemented.');
}

