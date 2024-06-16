import {useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/RamakQuestionnaire');
  };
  return (
    <div className="relative isolate ">
    <main>
        <section className="hero-section" id="home">
          <div className="hero-content font-bold 100% 'Poppins', sans-serif;
" >
            <h2>Find Your Perfect Career Path</h2>
            <p>Match your character traits with the most suitable profession.</p>
            <button className="cta-button" onClick={handleClick} >Get Started</button>
          </div>
        </section>

        <section className="features-section" id="about">
          <h2>Why Choose Us?</h2>
          <div className="features">
            <div className="feature">
              <h3>Personalized Matching</h3>
              <p>We use advanced algorithms to match your traits with the best professions.</p>
            </div>
            <div className="feature">
              <h3>Expert Guidance</h3>
              <p>Get insights from career experts and make informed decisions.</p>
            </div>
            <div className="feature">
              <h3>Comprehensive Resources</h3>
              <p>Access a wealth of information about various career paths and industries.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <p>© 2024 CareerSeeker. All rights reserved.</p>
        <ul className="social-links">
          <li><a href="#facebook">Facebook</a></li>
          <li><a href="#twitter">Twitter</a></li>
          <li><a href="#linkedin">LinkedIn</a></li>
        </ul>
      </footer>
    </div >
  )
}
export default Home