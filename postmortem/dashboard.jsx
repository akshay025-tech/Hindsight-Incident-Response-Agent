import IncidentCard from "../components/IncidentCard";

function Dashboard() {
    const incidents = [
        {
            id: 1,
            title: "Database Connection Failure",
            severity: "Critical",
            status: "Open",
        },
        {
            id: 2,
            title: "API Latency Spike",
            severity: "High",
            status: "Investigating",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Incident Response Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incidents.map((incident) => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;