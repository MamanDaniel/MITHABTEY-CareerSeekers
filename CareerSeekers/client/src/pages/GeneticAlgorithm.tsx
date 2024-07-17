import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GeneticAlgorithm = () => {
    const [professions, setProfessions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const [userTraits, setUserTraits] = useState<any[]>([]);

    // get all user traits
    useEffect(() => {
        const fetchUserTraits = async () => {
            try {
                const res = await fetch('/server/user/getUserTraits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: currentUser._id })
                });
                const data = await res.json();
                setUserTraits(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserTraits();
    }, [currentUser._id]);

    useEffect(() => {
        // Fetch suitable professions for the current user
        const fetchProfessions = async () => {
            try {
                const res = await fetch('/server/geneticAlgorithm/getSuitableJobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: currentUser._id })
                });
                const data = await res.json();
                console.log(data);
                if (data.success === false) {
                    setError('You need to complete the RAMAK questionnaire first');
                    setLoading(false);
                    return;
                }
                setProfessions(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (userTraits.length > 0 && userTraits.every(trait => trait === 0)) {
            setLoading(false);
        } else {
            fetchProfessions();
        }
    }, [currentUser._id, userTraits]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (userTraits.length > 0 && userTraits.every(trait => trait === 0)) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">You need to complete the RAMAK questionnaire first</h1>
                <Link to="/pages/RamakQuestionnaire" className="text-blue-500 underline">Go to RAMAK Questionnaire</Link>
            </div>
        );
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
