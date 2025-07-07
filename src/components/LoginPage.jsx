export default function LoginPage() {

    const handleLogin = () => {
        window.location.href = "http://localhost:8000/auth/login/google-oauth2/";
        // window.location.href = "http://localhost:8000/api/token/google/";  // pour test
    };

    return (
        <div>
            <h2>Connexion</h2>
            <button onClick={handleLogin}>Se connecter avec Google</button>

        </div>
    );

}