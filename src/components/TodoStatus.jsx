import React from 'react';
import OutboxIcon from '@mui/icons-material/Outbox';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FoundationIcon from '@mui/icons-material/Foundation';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useParams } from 'react-router-dom';

const TodoStatus = ({ todos }) => {
    const { id } = useParams();
    const tod = todos.find(t => t.id === id);

    if (!tod) {
        return <div>Aucun "todo" trouvé avec cet ID.</div>;
    }

    const getLastStatus = (statusHistory) => {
        if (statusHistory.length === 0) {
            return 'Statut inconnu';
        }
        return statusHistory[statusHistory.length - 1].status;
    };

    const lastStatus = getLastStatus(tod.statusHistory);

    return (
        <div className="track">
            <div className="container track__container">
                <h2 className="track__title">Suivie du dossier en ligne</h2>
                <div className="track__top">
                    <div className="track__id">
                        <span>ID du dossier</span> : {id}
                    </div>
                    <div className="track__dates">
                        <span className="track__dates__p">Date d'envoi: </span>
                        <strong className="track__dates__date">18-05-2024</strong>
                    </div>
                </div>
                <div className="track__track">
                    <ul className="track__steps">
                        {['en attente', 'en cours', 'terminé', 'annulé'].map((status, index) => (
                            <li key={index} className={`track__step ${status === lastStatus ? 'current-step' : ''}`}>
                                {status === 'en attente' && <OutboxIcon className="track__step__item" />}
                                {status === 'en cours' && <DoneAllIcon className="track__step__item" />}
                                {status === 'terminé' && <PendingActionsIcon className="track__step__item" />}
                                {status === 'annulé' && <FoundationIcon className="track__step__item" />}
                                <div className="track__step__item track__rounded">
                                    <strong
                                        className={`track__round ${status === lastStatus ? 'current-step' : ''}`}
                                        style={{
                                            width: '0.5em',
                                            height: '0.5em',
                                            borderRadius: '50%',
                                            backgroundColor: status === lastStatus ? 'red' : 'rgb(155, 155, 155)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    ></strong>

                                </div>
                                <div className="track__step__item">{status}</div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoStatus;
