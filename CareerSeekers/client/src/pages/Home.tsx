import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/job.jpg';

export default function Home() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/RamakQuestionnaire');
    };

    return (
        <div className="bg-gray-250"    style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }} >
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                </div>
                <div className="mx-auto max-w-2xl py-12 sm:py-32 lg:py-38">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Welcome to the world of jobs opportunities
                        </h1>
                        <h2 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600'>
                            Come find the next job for you!
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Fill out a short questionnaire that will analyze your character
                            <br />and we will match you with the most suitable profession.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={handleGetStartedClick}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </button>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                </div>
            </div>
        </div>
    );
}
