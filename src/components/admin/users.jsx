import "./users.css"

export default function Users() {
    return (
        <div className="page-card">
            <h1>Liste des Utilisateurs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Nom d'utilisateur</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john.doe</td>
                        <td>john.doe@example.com</td>
                        <td>Admin</td>
                        <td><button>Modifier</button></td>
                        <td><button>Supprimer</button></td>
                    </tr>
                    <tr>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>jane.smith</td>
                        <td>jane.smith@example.com</td>
                        <td>User</td>
                        <td><button>Modifier</button></td>
                        <td><button>Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}