import "./faqs.css"

export default function Faqs(){
    return (
        // Generate a table that displays FAQs with these columns Question, Answer, generation, Modify and delete buttons, 
        <div className="page-card">
            <h1>Liste des FAQs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Generation</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Question 1</td>
                        <td>Answer 1</td>
                        <td>Gen 1</td>
                        <td><button>Modify</button></td>
                        <td><button>Delete</button></td>
                    </tr>
                    <tr>
                        <td>Question 2</td>
                        <td>Answer 2</td>
                        <td>Gen 2</td>
                        <td><button>Modify</button></td>
                        <td><button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}