import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
 const navigate = useNavigate();
 const user = JSON.parse(window.localStorage.getItem('userIn')) || null;

 useEffect(() => {
    if (!user || !user.roles.includes('admin')) {
      // Redirigez l'utilisateur si il n'est pas connecté ou s'il n'a pas le rôle admin
      navigate('/sign');
      console.log("Vous n'etes pas autoriser a aceedes a la page ")
    }
 }, [user, navigate]);

 return user && user.roles.includes('admin') ? children : null;

};

export default ProtectedRoute