import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import React from 'react';
import { pencil, trash } from 'ionicons/icons';
import { Repository } from '../interfaces/Repository';

// Desestructuramos las propiedades directamente para que puedas usar 'repository' si tu interfaz viene envuelta,
// o desestructurar los campos directamente. Asumiendo que las props coinciden con la interfaz Repository:
const RepoItem: React.FC<{ repository: Repository }> = ({ repository }) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot='start'>
                    <img src={repository.owner.avatar_url} alt={repository.name} />
                </IonThumbnail>
                <IonLabel>
                    <h3>{repository.name}</h3>
                    <p>{repository.description}</p>
                    {repository.language !== null && repository.language !== "" && (
                        <p>
                            <strong>Lenguaje: </strong>
                            {repository.language}
                        </p>
                    )}
                </IonLabel>
            </IonItem>
            
            <IonItemOptions side="end">
                <IonItemOption>
                    <IonIcon icon={pencil} slot='icon-only' />
                </IonItemOption>
                <IonItemOption color='danger'>
                    <IonIcon icon={trash} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>    
    );
};

export default RepoItem;