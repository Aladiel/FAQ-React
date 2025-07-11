import "./login.css"

export default function LoginButton() {

    
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/auth/login/google-oauth2/";
    };

    return (
        <button className="login-button" onClick={handleLogin}>
            Login with Google
        </button>
        
    );

}