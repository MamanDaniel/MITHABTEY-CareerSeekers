import React, { useState } from 'react';


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
                    />
                    Not sure
                </label>
            </div>
        </div>
    );
};

const RamakQuestionnaire: React.FC = () => {
    const questions = [
        'Would you be interested in working as a social worker?',
        'Would you be interested in working as a mining foreman?',
        'Would you be interested in working as a car salesperson?',
        'Would you be interested in working as a choreographer?',
        'Would you be interested in working as an elementary school teacher?',
        'Would you be interested in working as a furniture upholsterer?',
        'Would you be interested in working as a legal secretary?',
        'Would you be interested in working as a chemist?',
        'Would you be interested in working as a deckhand?',
    ];

    const [currentTripletIndex, setCurrentTripletIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(null));
    const [showLog, setShowLog] = useState(false);

    const handleAnswer = (index: number, answer: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);

        if ((index + 1) % 3 === 0 && index + 1 < questions.length) {
            setCurrentTripletIndex(currentTripletIndex + 1);
        }
    };

    const calculateScore = () => {
        return answers.reduce((acc, curr) => acc + (curr !== null ? curr : 0), 0);
    };

    const isComplete = answers.every(answer => answer !== null);
    const totalAnswered = answers.filter(answer => answer !== null).length;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
            <div style={{ margin: '20px 0' }}>
                <div
                    style={{
                        width: `${(totalAnswered / questions.length) * 100}%`,
                        height: '10px',
                        backgroundColor: '#2c40bf'
                    }}
                />
                <div style={{ textAlign: 'right', marginTop: '5px' }}>
                    {totalAnswered} / {questions.length}
                </div>
            </div>
            <div>
                {questions.slice(currentTripletIndex * 3, currentTripletIndex * 3 + 3).map((question, index) => (
                    <Question
                        key={index}
                        question={question}
                        index={currentTripletIndex * 3 + index}
                        selectedAnswer={answers[currentTripletIndex * 3 + index]}
                        onAnswer={handleAnswer}
                    />
                ))}
            </div>
            <div  style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
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
                    <div>Your score is: {calculateScore()}</div>
                    <button onClick={() => setShowLog(true)}>Watch your answers</button>
                    {showLog && (
                        <div>
                            <h3>RamakQuestionnaire Log:</h3>
                            <ul>
                                {questions.map((question, index) => (
                                    <li key={index}>
                                        <strong>{index + 1}) {question}</strong> - {answers[index] === 2 ? 'Yes' : answers[index] === 0 ? 'No' : "Not Sure"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RamakQuestionnaire;
