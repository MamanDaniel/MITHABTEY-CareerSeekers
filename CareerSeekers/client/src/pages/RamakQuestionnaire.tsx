import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

type QuestionProps = {
    question: string;
    index: number;
    selectedAnswer: number | null;
    onAnswer: (index: number, answer: number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, index, selectedAnswer, onAnswer }) => {
    return (
        <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p>{index + 1}) {question}</p>
            <div>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input
                        type="radio"
                        name={`question-${index}`}
                        value="2"
                        checked={selectedAnswer === 2}
                        onChange={() => onAnswer(index, 2)}
                        style={{ marginRight: '7px' }}
                    />
                    Yes
                </label>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input
                        type="radio"
                        name={`question-${index}`}
                        value="0"
                        checked={selectedAnswer === 0}
                        onChange={() => onAnswer(index, 0)}
                        style={{ marginRight: '7px' }}
                    />
                    No
                </label>
                <label style={{ display: 'block', margin: '5px 0' }}>
                    <input
                        type="radio"
                        name={`question-${index}`}
                        value="1"
                        checked={selectedAnswer === 1}
                        onChange={() => onAnswer(index, 1)}
                        style={{ marginRight: '7px' }}
                    />
                    Not sure
                </label>
            </div>
        </div>
    );
};


const RamakQuestionnaire: React.FC = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentTripletIndex, setCurrentTripletIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [calculatedScore, setCalculatedScore] = useState<{ [key: string]: number } | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const res = await fetch('/server/questionnaires/getQuestionnaire', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Questionnaire_Name: 'RAMAK' })
                });
                const questionnaire = await res.json();
                setQuestions(questionnaire.Questions.map((q: any) => q.question_en));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch questionnaire');
                setLoading(false);
            }
        };

        fetchQuestionnaire();
    }, []);

    const handleAnswer = (index: number, answer: number) => {
        const newAnswers = { ...answers };
        newAnswers[index] = answer === 2 ? 'Y' : answer === 0 ? 'N' : '?';
        setAnswers(newAnswers);
    
        if ((index + 1) % 3 === 0 && index + 1 < questions.length) {
            setCurrentTripletIndex(currentTripletIndex + 1);
        }
    };

    const calculateScore = async () => {
        try {
            console.log(answers);
            const res = await fetch('/server/questionnaires/calculateScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answers })
            });
            const score = await res.json();
            setCalculatedScore(score);

            // Assuming the user ID is stored in a variable userId
            const updateRes = await fetch(`/server/questionnaires/updateUserTraits/${currentUser._id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ traits: score })
            });
            const data = await updateRes.json();
            if (data.success === false) {
                setError('Failed to update user traits');
                console.log(data.message);
            }
          
        } catch (err) {
            console.log(err);
            setError('Failed to calculate or update score');
        }
    };

    const isComplete = Object.keys(answers).length === questions.length;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
            <div>
                {questions.slice(currentTripletIndex * 3, currentTripletIndex * 3 + 3).map((question, index) => (
                    <Question
                        key={currentTripletIndex * 3 + index}
                        question={question}
                        index={currentTripletIndex * 3 + index}
                        selectedAnswer={answers[currentTripletIndex * 3 + index] === 'Y' ? 2 : answers[currentTripletIndex * 3 + index] === 'N' ? 0 : answers[currentTripletIndex * 3 + index] === '?' ? 1: 3}
                        onAnswer={handleAnswer}
                    />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={() => setCurrentTripletIndex(currentTripletIndex - 1)}
                    disabled={currentTripletIndex === 0}
                >
                    Prev
                </button>

                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={() => setCurrentTripletIndex(currentTripletIndex + 1)}
                    disabled={currentTripletIndex === Math.ceil(questions.length / 3) - 1}
                >
                    Next
                </button>
            </div>
            {isComplete && (
                <div>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                        onClick={calculateScore}>Calculate score</button>
                    {calculatedScore !== null && (
                        <div>
                            <h2 className='font-bold'>These are your character traits:</h2>
                            {Object.keys(calculatedScore).map((trait) => (
                                <div key={trait}>
                                    {trait}: {calculatedScore[trait]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RamakQuestionnaire;
