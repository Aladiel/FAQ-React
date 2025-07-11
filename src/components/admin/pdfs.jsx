import "./pdfs.css"

export default function Pdfs(){
    return (
        <div className="page-card">
            <h1>Liste des PDFs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom du fichier</th>
                        <th>Chemin du fichier</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>document1.pdf</td>
                        <td>/path/to/document1.pdf</td>
                        <td><button>Modifier</button></td>
                        <td><button>Supprimer</button></td>
                    </tr>
                    <tr>
                        <td>document2.pdf</td>
                        <td>/path/to/document2.pdf</td>
                        <td><button>Modifier</button></td>
                        <td><button>Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}