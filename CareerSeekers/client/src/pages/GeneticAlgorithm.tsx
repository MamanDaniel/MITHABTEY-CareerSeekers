import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GeneticAlgorithm = () => {
    const [professions, setProfessions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const [userTraits, setUserTraits] = useState<any[]>([]);
    const [needRAMAK, setNeedRAMAK] = useState(false);

    // get all user traits
    useEffect(() => {
        console.log("needRAMAK: ", needRAMAK); 
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
                console.log(data);
                // Ensure data is converted to an array of trait objects
                const arrayData = Object.values<number>(data).map((value: number) => ({ value }));
                console.log(arrayData);
                setUserTraits(arrayData);
                // If all traits are 0, set need RAMAK to true
                if (arrayData.every((trait) => trait.value === 0)) {
                    setNeedRAMAK(true);
                    setLoading(false);
                    return;
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserTraits();
    }, [currentUser._id]);

    // Fetch suitable professions if userTraits are not all 0
    useEffect(() => {
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
                if (data.message === 'Suitable jobs not found') {
                    console.log('Suitable jobs not found');
                    setNeedRAMAK(true);
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

        if (needRAMAK) {
            console.log('All traits are 0 or userTraits is empty');
            setLoading(false);
        } else {
            fetchProfessions();
            console.log('Fetching professions');
        }
    }, [userTraits, currentUser._id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Show message to complete the RAMAK questionnaire first
    if (needRAMAK) {
        console.log('inside userTraits.every');
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">RAMAK first</h1>
                <Link to="/RamakQuestionnaire" className="text-blue-500 underline">Go to RAMAK Questionnaire</Link>
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
