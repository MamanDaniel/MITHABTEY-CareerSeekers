import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const GeneticAlgorithm = () => {
    const [professions, setProfessions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const res = await fetch('/server/geneticAlgorithm/findSuitableProfessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: currentUser._id })
                });

                const data = await res.json();
                console.log(data); // Ensure data is logged correctly

                setProfessions(data); // Assuming data is already an array of professions
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProfessions();
    }, [currentUser._id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Top 3 Professions for You</h1>
            <div className="grid grid-cols-1 gap-4">
                {professions.map((profession, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-2">{profession}</h2>
                        {/* Add more details about each profession if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GeneticAlgorithm;
