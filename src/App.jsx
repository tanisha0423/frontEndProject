import React, { useState } from 'react';
import './Gallery.css';
import './Quiz.css';  // Add this import for quiz-specific styles

const zodiacs = [
  { name: "Aries", src: "images/Aries.webp", date: "Mar 21 – Apr 19", link: "https://www.vogue.in/content/aries-horoscope-today-april-24-2025" },
  { name: "Taurus", src: "images/Taurus.webp", date: "Apr 20 – May 20", link: "https://www.vogue.in/content/taurus-horoscope-today-april-24-2025" },
  { name: "Gemini", src: "images/Gemini.webp", date: "May 21 – Jun 20", link: "https://www.vogue.in/content/gemini-horoscope-today-april-24-2025" },
  { name: "Cancer", src: "images/Cancer.webp", date: "Jun 21 – Jul 22", link: "https://www.vogue.in/content/cancer-horoscope-today-april-24-2025" },
  { name: "Leo", src: "images/Leo.webp", date: "Jul 23 – Aug 22", link: "https://www.vogue.in/content/leo-horoscope-today-april-24-2025" },
  { name: "Virgo", src: "images/Virgo.webp", date: "Aug 23 – Sep 22", link: "https://www.vogue.in/content/virgo-horoscope-today-april-24-2025" },
  { name: "Libra", src: "images/Libra.webp", date: "Sep 23 – Oct 22", link: "https://www.vogue.in/content/libra-horoscope-today-april-24-2025" },
  { name: "Scorpio", src: "images/Scorpio.webp", date: "Oct 23 – Nov 21", link: "https://www.vogue.in/content/scorpio-horoscope-today-april-24-2025" },
  { name: "Sagittarius", src: "images/Sagittarius.webp", date: "Nov 22 – Dec 21", link: "https://www.vogue.in/content/sagittarius-horoscope-today-april-24-2025" },
  { name: "Capricorn", src: "images/Capricorn.webp", date: "Dec 22 – Jan 19", link: "https://www.vogue.in/content/capricorn-horoscope-today-april-24-2025" },
  { name: "Aquarius", src: "images/Aquarius.webp", date: "Jan 20 – Feb 18", link: "https://www.vogue.in/content/aquarius-horoscope-today-april-24-2025" },
  { name: "Pisces", src: "images/Pisces.webp", date: "Feb 19 – Mar 20", link: "https://www.vogue.in/content/pisces-horoscope-today-april-24-2025" }
];

const questions = [
  { label: 'Date of Birth:', name: 'dob', type: 'date' },
  { label: 'What defines your core strength?', name: 'coreStrength', type: 'radio', options: ['Patience & Grounding', 'Charisma & Charm', 'Creativity & Depth', 'Focus & Strategy'] },
  { label: 'How do you make decisions?', name: 'decisionFlow', type: 'radio', options: ['Facts & logic', 'Emotions & feelings', 'Gut instincts', 'Social impact'] },
  { label: 'How do you respond to chaos or stress?', name: 'stormResponse', type: 'radio', options: ['Retreat inward', 'Charge forward', 'Talk it out', 'Stay calm and analyze'] },
  { label: 'Which dream symbol resonates most with you?', name: 'dreamSymbol', type: 'radio', options: ['Stars', 'Ocean', 'Forest', 'Fire'] },
  { label: 'Which element do you feel most aligned with?', name: 'celestialElement', type: 'radio', options: ['Moonlight', 'Sunfire', 'Starlight', 'Twilight Mist'] }
];

export default function ZodiacApp() {
  const [formData, setFormData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [revealAnalysis, setRevealAnalysis] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData[questions[currentQuestion].name]) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRevealAnalysis = () => {
    setRevealAnalysis(true);
  };

  const handleRetakeQuiz = () => {
    // Reset all states when retaking the quiz
    setFormData({});
    setCurrentQuestion(0);
    setRevealAnalysis(false);
    setShowQuiz(true);
  };

  const handleNavigateToGallery = () => {
    // Reset the quiz when navigating to the gallery
    setFormData({});
    setCurrentQuestion(0);
    setRevealAnalysis(false);
    setShowQuiz(false);
  };

  const getZodiacFromDOB = (dob) => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    return 'Capricorn';
  };

  const getQuizZodiac = () => {
    const strength = formData.coreStrength || '';
    const decision = formData.decisionFlow || '';
    if (strength === 'Patience & Grounding' && decision === 'Facts & logic') {
      return 'Taurus'; // Example, customize as needed
    }
    return 'Gemini'; // Default for now
  };

  return (
    <div className="zodiac-app">
      <nav className="navbar">
        <ul>
          <li><button onClick={handleNavigateToGallery}>Gallery</button></li>
          <li><button onClick={() => setShowQuiz(true)}>Take Quiz</button></li>
        </ul>
      </nav>

      {/* Quiz Title */}
      <h1 className="quiz-title">Find Your Zodiac Combo</h1>

      {!showQuiz ? (
        <div className="gallery">
          <h1 className="title">🌙 Mystic Zodiac Gallery 🌙</h1>
          <p className="subtitle">Let the stars speak to you... hover to hear their whisper</p>
          <div className="zodiac-container">
            {zodiacs.map((sign) => (
              <a key={sign.name} href={sign.link} target="_blank" rel="noopener noreferrer" className="zodiac-card">
                <img src={sign.src} alt={sign.name} />
                <h2>{sign.name}</h2>
                <p>{sign.date}</p>
              </a>
            ))}
          </div>
        </div>
      ) : revealAnalysis ? (
        <div className="result">
          <h3 className="result-title">✨ Zodiac Combo Quiz ✨</h3>
          <h4>Your Zodiac Combo is:</h4>
          <div className="zodiac-combo">
            <div className="zodiac">
              <img src={zodiacs.find(z => z.name === getZodiacFromDOB(formData.dob)).src} alt="Zodiac 1" />
              <h5>{getZodiacFromDOB(formData.dob)}</h5>
            </div>
            <span>+</span>
            <div className="zodiac">
              <img src={zodiacs.find(z => z.name === getQuizZodiac()).src} alt="Zodiac 2" />
              <h5>{getQuizZodiac()}</h5>
            </div>
          </div>
          <div className='analysis-text'>
            <p>Combo Personality Traits:</p>
            <span>{Object.values(formData).slice(1).join(', ')}</span>
            <button onClick={handleRetakeQuiz}>Take Quiz Again</button>
          </div>

        </div>

      ) : (
        <div className="quiz-box">
          <h2>{questions[currentQuestion].label}</h2>
          {currentQuestion < questions.length - 1 ? (
            questions[currentQuestion].type === 'date' ? (
              <input
                type="date"
                name="dob"
                value={formData.dob || ''}
                onChange={handleChange}
              />
            ) : (
              questions[currentQuestion].type === 'radio' &&
              questions[currentQuestion].options.map(option => (
                <div key={option} className="option-box">
                  <label>
                    <input
                      type="radio"
                      name={questions[currentQuestion].name}
                      value={option}
                      checked={formData[questions[currentQuestion].name] === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                </div>
              ))
            )
          ) : (
            <div className="final-question">
              <h3>Click below to reveal your analysis!</h3>
              <button onClick={handleRevealAnalysis}>Reveal Analysis</button>
            </div>
          )}

          <div className="buttons">
            {currentQuestion > 0 && <button onClick={handleBack}>Back</button>}
            {currentQuestion < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
