export default function DashboardPage() {


    return (
        <div>
            <h2>Dashboard</h2>
            <p>Bienvenue user {localStorage.getItem("user_name")}</p>
        </div>
    )
}