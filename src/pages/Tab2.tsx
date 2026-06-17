import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
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
          />
          <IonTextarea
             className="form-field"
             label="Descripcion del Repositorio"
             labelPlacement="floating"
             placeholder="Ingrese la descripcion del Repositorio"
             rows={6}
          />
          <IonButton
             className="form-field"
             expand="block"
             shape="round"
             color="primary"
          >
             Guardar

          </IonButton>
          
        </div>
        

      </IonContent>
    </IonPage>
  );
};

export default Tab2;

