import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {fetchWithAuth} from '../utils/fetchWithAuth';


type QuestionProps = {
    question: string;
    index: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    onAnswer: (index: number, answer: number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, index, totalQuestions, selectedAnswer, onAnswer }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-right">שאלה {index + 1} מתוך {totalQuestions}</h3>
            <p className="mb-4 text-right">{question}</p>
            <div className="flex justify-between">
                {['לא', 'לא בטוח', 'כן'].map((option, optionIndex) => (
                    <button
                        key={optionIndex}
                        className={`px-6 py-2 rounded-full transition-colors duration-200 ${selectedAnswer === optionIndex
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => onAnswer(index, optionIndex)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const RamakQuestionnaire: React.FC = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const res = await fetchWithAuth('/server/questionnaires/getQuestionnaire', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Questionnaire_Name: 'RAMAK' })
                });
                const questionnaire = await res.json();
                setQuestions(questionnaire.Questions.map((q: any) => q.question_he));
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

        // Move to the next question if there is one
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const calculateScore = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth('/server/questionnaires/calculateScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answers })
            });
            const score = await res.json();
            const updateRes = await fetchWithAuth(`/server/questionnaires/updateUserTraits/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ traits: score })
            });
            const data = await updateRes.json();
            if (data.success === false) {
                setError('Failed to update user traits');
                console.log(data.message);
                setLoading(false);
                return;
            }
            // update user professions
            const geneticAlgorithm = await fetchWithAuth('/server/geneticAlgorithm/findSuitableProfessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: currentUser._id })
            });
            const professions = await geneticAlgorithm.json();
            console.log(professions);
            navigate('/geneticAlgorithm');
        } catch (err) {
            console.log(err);
            setError('Failed to calculate or update score');
            setLoading(false);
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
        <div className="max-w-2xl mx-auto px-4 py-8 mt-16">
            <h1 className="text-3xl font-bold text-center mb-8">שאלון לבחינת אישיות</h1>
            <p className="text-gray-600 text-center mb-5">
                אנא סמן את התשובות שמתארות אותך בצורה הטובה ביותר
            </p>
            {questions[currentQuestionIndex] && (
                <Question
                    question={questions[currentQuestionIndex]}
                    index={currentQuestionIndex}
                    totalQuestions={questions.length}
                    selectedAnswer={answers[currentQuestionIndex] === 'Y' ? 2 : answers[currentQuestionIndex] === 'N' ? 0 : answers[currentQuestionIndex] === '?' ? 1 : null}
                    onAnswer={handleAnswer}
                />
            )}
            <div className="flex justify-between mt-8">
                <button
                    className={`bg-gray-300 font-bold py-2 px-6 rounded-xl transition-colors duration-200 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400 text-gray-800'}`}
                    onClick={() => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    disabled={currentQuestionIndex === questions.length - 1}
                >
                    הבא
                </button>

                {isComplete && (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-200"
                        onClick={calculateScore}
                        disabled={loading}
                    >
                        {loading ? 'Calculating...' : 'מצא מקצועות'}
                    </button>
                )}

                <button
                    className={`bg-gray-300 font-bold py-2 px-6 rounded-xl transition-colors duration-200 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400 text-gray-800'}`}
                    onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                >
                    הקודם
                </button>

            </div>
        </div>
    );
};

export default RamakQuestionnaire;
