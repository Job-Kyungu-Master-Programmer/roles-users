import React, { useState } from 'react';
import { updateStatus } from '../api/Base' // Assurez-vous d'importer la fonction updateStatus

const ChangeStatusForm = ({ todoId, onChangeStatus, onClose }) => {
    const [newStatus, setNewStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStatus(todoId, newStatus); // Assurez-vous que todoId est défini ici
            onChangeStatus(newStatus);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut:', error);
        }
    };
    
   

 const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
 };

 return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="status">Nouveau statut :</label>
      <select name="status" value={newStatus} onChange={handleStatusChange}>
        <option value="">Sélectionnez un statut</option>
        <option value="en attente">En attente</option>
        <option value="en cours">En cours</option>
        <option value="terminé">Terminé</option>
        <option value="annulé">Annulé</option>
      </select>
      <button type="submit">Changer le statut</button>
      <button type="button" onClick={onClose}>Annuler</button>
    </form>
 );
};

export default ChangeStatusForm;
