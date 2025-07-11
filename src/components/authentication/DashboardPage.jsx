import "./dashboard.css"

export default function DashboardPage() {


    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Users</h2>
                    <p>Manage users</p>
                    <a href="/admin/users">Go to Users</a>
                </div>
                <div className="card">
                    <h2>FAQs</h2>
                    <p>Manage FAQs</p>
                    <a href="/admin/faqs">Go to FAQs</a>
                </div>
                <div className="card">
                    <h2>PDF Files</h2>
                    <p>Manage PDF files</p>
                    <a href="/admin/pdfs">Go to PDF Files</a>
                </div>
            </div>
        </div>
    )
}