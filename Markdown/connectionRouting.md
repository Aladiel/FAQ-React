- Clic sur le bouton "Se connecter avec Google"
  --> redirige vers le backend pour démarrer l'authentification Google via Django avec la ligne :  
  window.location.href = "http://localhost:8000/api/login/google-oauth2/"  
  (Testé & Fonctionnel)

- L'URL api/login/google-oauth2/ redirige vers les serveurs de Google, qui affiche sa page de sélection de compte et
  demande les permissions.  
  python-social-auth associe ou crée un user dans la base Django ave les données du compte Google, et connecte ce user dans une session Django.

- L'utilisateur choisit son compte, et une fois authentifié, Google appelle une URL de callback
  (définie dans les Setting de Django, dans LOGIN_REDIRECT_URL = /api/token/google/)

- api/token/google/ est une view de Django protégée par IsAuthenticated.  
  Génère les tokens JWT d'access et de refresh, et redirige vers une URL en les transmettant dedans : redirect(f"http://localhost:5173/auth/callback?access={access}&refresh={refresh}")

- C'est le fichier AuthCallback qui prend le relais au Front, en récupérant les tokens transmis par le back.
  Il extrait les tokens de l'URL pour les stocker dans le localStorage. Puis, redirige vers une page protégée /protected (pour tester).

- Le composant TestProtected.jsx est appelé. Celui-ci teste la validité du token d'accès en le récupérant dans le headers de la page.

- Dans le Backend, dans ma ProtectedView, je vois le message final : "You are authenticated" si ça fonctionne, erreur 401 Unauthorized sinon (+ erreur du catch)

La route complète donne :  
[1] /login (React) → Clic  
↓  
[2] /api/login/google-oauth2/ (Django) → Redirige vers Google  
↓  
[3] Google OAuth → Authentifie l'utilisateur  
↓  
[4] /auth/complete/google-oauth2/ (Django) → Gère OAuth et redirige  
↓  
[5] /api/token/google/ (Django) → Crée les JWT, redirige vers React  
↓  
[6] /auth/callback (React) → Stocke les tokens  
↓  
[7] /protected (React) → Envoie token → /api/protected  
↓  
[8] /api/protected/ (Django) → Renvoie message si token valide
