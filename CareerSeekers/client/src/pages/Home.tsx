import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Link, Element } from 'react-scroll';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import the arrow icons
import section1Image from '../assets/job.jpg';
import section2Image from '../assets/question.jpg';
import section3Image from '../assets/job.jpg';

export default function Home() {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleGetStartedClick = () => {
        navigate('/RamakQuestionnaire');
    };

    const sectionAnimation = (delay: number) => useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        delay,
        config: { duration: 1000 },
    });

    const sections = [
        {
            id: 'section1',
            title: '',
            content: (
                <div className="text-center mx-auto max-w-2xl py-12 sm:py-32 lg:py-38">
                    <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        ברוך הבא לאתר של 
                        <br />קבוצת הפייסבוק מתחבטי מקצוע
                    </h1>
                    <h2 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600'>
                        מזמינים אותך למצוא את העבודה שמתאימה לך
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        כל מה שנדרש ממך הוא לענות על שאלון קצר
                        <br />בסופו תימצא ההתאמה הטובה ביותר עבורך
                    </p>
                    <p className="mt-6 text-2xl leading-8 text-gray-600">
                        <strong>בהצלחה!</strong>
                    </p>
                </div>
            ),
            image: section1Image
        },
        { id: 'section2', title: 'RAMAK שאלון ', content: 'שאלון RAMAK נועד לסייע לכם למצוא את העבודה שהכי מתאימה לאופי שלכם.', image: section2Image, button: true },
        { id: 'section3', title: 'מידע כללי על מקצועות', content: 'למידע נוסף על מקצועות שונים, ניתן להסתכל על מאגר המידע שלנו .', image: section3Image, link: '/ProfessionsInfo' },
        // Add four more sections as needed
    ];

    // Rotate animation
    const rotateAnimation = useSpring({
        transform: isNavOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        config: { duration: 300 }
    });

    return (
        <div className="bg-gray-250" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="relative isolate">
                {sections.map((section, index) => (
                    <Element name={section.id} key={section.id}>
                        <animated.div style={{ ...sectionAnimation(index * 500), position: 'relative', backgroundImage: `url(${section.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', padding: '20px', direction: 'rtl' }} className="min-h-screen flex flex-col items-center justify-center text-center">
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: index === 1 ? 'rgba(255, 255, 255, 0.5)' : 'transparent', zIndex: 0 }}></div>
                            {section.title && <h2 className="text-3xl font-bold text-gray-900" style={{ position: 'relative', zIndex: 1 }}>{section.title}</h2>}
                            <div className="mt-6 text-lg leading-8 text-gray-600" style={{ position: 'relative', zIndex: 1 }}>{section.content}</div>
                            {section.button && (
                                <div className="mt-10 flex items-center justify-center gap-x-6" style={{ position: 'relative', zIndex: 1 }}>
                                    <button
                                        onClick={handleGetStartedClick}
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        מילוי השאלון
                                    </button>
                                    <a href="/Jobs" className="text-sm font-semibold leading-6 text-gray-900">
                                         מאגר המקצועות התואם לשאלון ← <span aria-hidden="true"></span>
                                    </a>
                                </div>
                            )}
                            {section.link && (
                                <div className="mt-10 flex items-center justify-center gap-x-6" style={{ position: 'relative', zIndex: 1 }}>
                                    <a href={section.link} className="text-sm font-semibold leading-6 text-gray-900">
                                         מידע כללי על מקצועות ← <span aria-hidden="true"></span>
                                    </a>
                                </div>
                            )}
                        </animated.div>
                    </Element>
                ))}

                <div className="fixed bottom-10 right-10 flex flex-col space-y-2 bg-white p-1 rounded shadow-lg">
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="flex items-center justify-between rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        
                        <animated.div style={rotateAnimation} className="mr-2">
                            {isNavOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </animated.div>
                        <span>ניווט</span>
                    </button>
                    {isNavOpen && (
                        <div className="mt-1 flex flex-col space-y-2">
                            {sections.map((section) => (
                                <Link key={section.id} to={section.id} smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-600 text-right">
                                    {section.title || 'מידע כללי'}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
