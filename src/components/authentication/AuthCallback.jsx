import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
            navigate('/');
            return
        }

        // Version pour récupérer les tokens s'ils sont transmis par l'URL -- Deprecated
        // const params = new URLSearchParams(window.location.search);
        // const access = params.get("access");
        // const refresh = params.get("refresh");



        if (access && refresh) {
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            console.log("Tokens stored in localStorage");
            navigate('/');  // ou page d'accueil
        } else {
            console.warn("Tokens not found in URL")
            navigate('/login');
        }
    }, [navigate]);

    return <p>Connexion en cours...</p>;
}
