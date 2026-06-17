import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="className">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/216222909?v=4" alt="avatar" />
            <IonCardHeader>
              <IonCardTitle>Jean Mora</IonCardTitle>
              <IonCardSubtitle>jeanmora</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Desarollo de software</p>
            </IonCardContent>

          </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
