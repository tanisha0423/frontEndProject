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
    const storm = formData.stormResponse || '';
    const dream = formData.dreamSymbol || '';
    const element = formData.celestialElement || '';

    // Core strength primary determinant
    if (strength === 'Patience & Grounding') {
      if (decision === 'Facts & logic') return 'Taurus';
      if (decision === 'Emotions & feelings') return 'Virgo';
      if (decision === 'Gut instincts') return 'Capricorn';
      if (decision === 'Social impact') return 'Cancer';
    }

    if (strength === 'Charisma & Charm') {
      if (dream === 'Stars') return 'Leo';
      if (dream === 'Ocean') return 'Libra';
      if (dream === 'Forest') return 'Gemini';
      if (dream === 'Fire') return 'Sagittarius';
    }

    if (strength === 'Creativity & Depth') {
      if (element === 'Moonlight') return 'Pisces';
      if (element === 'Sunfire') return 'Scorpio';
      if (element === 'Starlight') return 'Cancer';
      if (element === 'Twilight Mist') return 'Aquarius';
    }

    if (strength === 'Focus & Strategy') {
      if (storm === 'Retreat inward') return 'Capricorn';
      if (storm === 'Charge forward') return 'Aries';
      if (storm === 'Talk it out') return 'Aquarius';
      if (storm === 'Stay calm and analyze') return 'Virgo';
    }

    // Secondary determinants for edge cases
    if (dream === 'Fire' && element === 'Sunfire') return 'Leo';
    if (dream === 'Ocean' && storm === 'Stay calm and analyze') return 'Pisces';
    if (element === 'Starlight' && decision === 'Gut instincts') return 'Sagittarius';

    // Default fallback
    return 'Gemini';
  };


  const getPersonalityAnalysis = () => {
    const birthSign = getZodiacFromDOB(formData.dob);
    const quizSign = getQuizZodiac();

    // Create unique analysis based on the combination

    const combinations = {
      // Aries combinations
      'Aries+Taurus': "A powerful blend of fire and earth. Your Aries drive combined with Taurus grounding creates a personality that's both ambitious and practical. You excel at turning visions into tangible realities.",
      'Aries+Gemini': "A dynamic spirit that never stops moving. With Aries courage and Gemini adaptability, you're always seeking new adventures and intellectual stimulation. Communication is your superpower.",
      'Aries+Cancer': "Fire meets water in this emotional powerhouse. Your Aries boldness is tempered by Cancer's sensitivity, making you a passionate protector of those you love.",
      'Aries+Leo': "Double fire energy! This combination creates a charismatic leader with unlimited confidence. You naturally inspire others and aren't afraid to take center stage.",
      'Aries+Virgo': "Impulsive meets analytical in this fascinating blend. Your Aries enthusiasm is refined by Virgo's attention to detail, making you exceptional at executing plans with precision.",
      'Aries+Libra': "A combination of action and consideration. Your Aries drive to move forward is balanced by Libra's need for harmony, creating a diplomatic yet assertive approach to life.",
      'Aries+Scorpio': "Intensity squared! This powerful combination pairs Aries' straightforward courage with Scorpio's emotional depth, creating a personality that's both passionate and transformative.",
      'Aries+Sagittarius': "The ultimate freedom-seeker. This fire-sign combination blends Aries' pioneering spirit with Sagittarius' philosophical worldview, creating an adventurous truth-seeker.",
      'Aries+Capricorn': "Ambition meets discipline in this powerful blend. Your Aries initiative combined with Capricorn's persistence creates someone who can accomplish anything they set their mind to.",
      'Aries+Aquarius': "Revolutionary energy! This combination merges Aries' courage with Aquarius' innovation, creating a personality that's not afraid to break boundaries for the greater good.",
      'Aries+Pisces': "Warrior meets dreamer in this complex blend. You combine Aries' direct action with Pisces' intuitive understanding, allowing you to fight for causes with compassion.",

      // Taurus combinations
      'Taurus+Gemini': "Stability meets versatility. Your Taurus practicality combined with Gemini's adaptability allows you to build solid foundations while remaining flexible enough to evolve.",
      'Taurus+Cancer': "Double nurturing energy. This earth-water combination creates a deeply caring individual who provides both emotional and material security to loved ones.",
      'Taurus+Leo': "Loyal determination. Combining Taurus' persistence with Leo's confidence creates a personality that's both dependable and charismatic.",
      'Taurus+Virgo': "Earth sign harmony. Your practical Taurus nature combined with Virgo's analytical mind makes you exceptionally good at creating systems that bring order to chaos.",
      'Taurus+Libra': "Beauty and balance. This combination unites Taurus' appreciation for sensory pleasure with Libra's need for harmony, creating someone who creates beauty in all aspects of life.",
      'Taurus+Scorpio': "Deep intensity. Both fixed signs, this combination pairs Taurus' steadfastness with Scorpio's emotional depth, creating powerful determination and loyalty.",
      'Taurus+Sagittarius': "Grounded explorer. Your Taurus stability combined with Sagittarius' adventurous spirit creates someone who builds meaningful adventures with practical foundations.",
      'Taurus+Capricorn': "Earthy powerhouse. This double earth combination creates exceptional determination and practicality, with Taurus providing patience and Capricorn bringing ambition.",
      'Taurus+Aquarius': "Tradition meets innovation. This combination balances Taurus' appreciation for the tried-and-true with Aquarius' forward-thinking approach.",
      'Taurus+Pisces': "Sensual dreamer. Combining Taurus' connection to the physical world with Pisces' spiritual awareness creates someone who finds magic in everyday experiences.",

      // Gemini combinations
      'Gemini+Cancer': "Communicative nurturer. Your Gemini expressiveness combined with Cancer's emotional sensitivity creates someone who understands and articulates feelings beautifully.",
      'Gemini+Leo': "Charismatic communicator. This air-fire combination blends Gemini's quick wit with Leo's confidence, creating a magnetic personality that captivates audiences.",
      'Gemini+Virgo': "Analytical thinker. Both Mercury-ruled, this combination creates an exceptionally intelligent person who combines Gemini's quick thinking with Virgo's precision.",
      'Gemini+Libra': "Social butterfly. This double air sign combination creates someone who thrives in social settings, combining Gemini's conversational skills with Libra's diplomacy.",
      'Gemini+Scorpio': "Deep investigator. Your Gemini curiosity paired with Scorpio's intensity creates someone who seeks to understand life's mysteries through constant questioning.",
      'Gemini+Sagittarius': "Philosophical explorer. This combination unites Gemini's love of information with Sagittarius' quest for meaning, creating an eternal student of life.",
      'Gemini+Capricorn': "Practical communicator. Your Gemini expressiveness combined with Capricorn's practicality creates someone who can explain complex concepts with clarity.",
      'Gemini+Aquarius': "Innovative thinker. This air sign harmony creates someone who combines Gemini's mental agility with Aquarius' visionary perspective.",
      'Gemini+Pisces': "Imaginative communicator. Combining Gemini's gift for words with Pisces' creativity creates someone who can bring fantastical worlds to life through storytelling.",

      // Cancer combinations
      'Cancer+Leo': "Warm-hearted protector. Your Cancer nurturing combined with Leo's generosity creates someone who leads with heart and inspires loyalty in others.",
      'Cancer+Virgo': "Thoughtful caretaker. This combination unites Cancer's emotional intelligence with Virgo's attention to detail, creating someone who knows exactly how to support others.",
      'Cancer+Libra': "Harmonious nurturer. Your Cancer empathy combined with Libra's sense of fairness creates someone who fosters peaceful relationships and emotional balance.",
      'Cancer+Scorpio': "Emotional depth. This water sign combination creates powerful intuition and deep feelings, with an uncanny ability to understand hidden motivations.",
      'Cancer+Sagittarius': "Compassionate explorer. Combining Cancer's emotional depth with Sagittarius' optimism creates someone who finds meaning through authentic connections.",
      'Cancer+Capricorn': "Nurturing achiever. This combination balances Cancer's care for others with Capricorn's ambition, creating someone who builds secure foundations for loved ones.",
      'Cancer+Aquarius': "Humanitarian heart. Your Cancer compassion combined with Aquarius' vision for humanity creates someone dedicated to emotional and social progress.",
      'Cancer+Pisces': "Dreamy nurturer. This double water sign combination creates exceptional empathy and intuition, with a natural gift for emotional and spiritual healing.",

      // Leo combinations
      'Leo+Virgo': "Charismatic organizer. Your Leo flair combined with Virgo's meticulousness creates someone who shines while keeping everything perfectly in order.",
      'Leo+Libra': "Charming leader. This combination blends Leo's boldness with Libra's social grace, making you a natural at winning hearts and leading by inspiration.",
      'Leo+Scorpio': "Magnetic powerhouse. Leo's confidence and Scorpio's intensity create a personality that's both mesmerizing and fiercely driven.",
      'Leo+Sagittarius': "Adventurous optimist. Both fire signs, this blend creates someone full of life, optimism, and a thirst for exploring the world.",
      'Leo+Capricorn': "Strategic dreamer. Leo's grand visions paired with Capricorn's methodical approach create someone who turns bold dreams into lasting achievements.",
      'Leo+Aquarius': "Visionary leader. Combining Leo's charisma with Aquarius' progressive thinking creates someone who leads innovative changes with style.",
      'Leo+Pisces': "Romantic idealist. Leo's passion and Pisces' imagination create someone who dreams big and loves deeply, often inspiring others through creative pursuits.",

      // Virgo combinations
      'Virgo+Libra': "Balanced perfectionist. Virgo's precision and Libra's sense of fairness create someone who strives for excellence while maintaining harmony.",
      'Virgo+Scorpio': "Insightful planner. Virgo's analytical mind combined with Scorpio's deep intuition creates a strategist who can see and plan for all possibilities.",
      'Virgo+Sagittarius': "Curious realist. Virgo's practicality combined with Sagittarius' love of learning makes you someone who seeks both knowledge and real-world application.",
      'Virgo+Capricorn': "Master builder. This double earth sign combination ensures incredible work ethic, patience, and practical achievement over time.",
      'Virgo+Aquarius': "Innovative analyst. Virgo's detail-oriented mind merges with Aquarius' futuristic thinking, leading to practical innovations.",
      'Virgo+Pisces': "Dreamy realist. Combining Virgo's grounding with Pisces' imagination creates someone who can bring creative visions to life with precision.",

      // Libra combinations
      'Libra+Scorpio': "Diplomatic powerhouse. Libra's diplomacy balanced by Scorpio's emotional depth creates someone who negotiates from a place of quiet strength.",
      'Libra+Sagittarius': "Charming adventurer. Libra's social ease combined with Sagittarius' love of freedom creates someone who charms their way through life’s many adventures.",
      'Libra+Capricorn': "Graceful achiever. Libra's refinement coupled with Capricorn's ambition creates someone who succeeds with elegance and integrity.",
      'Libra+Aquarius': "Progressive idealist. Both air signs, this combination creates someone who dreams of a better world and works diplomatically to make it happen.",
      'Libra+Pisces': "Romantic visionary. Libra's love of beauty and Pisces' dreaminess combine to create someone who views life through a poetic, compassionate lens.",

      // Scorpio combinations
      'Scorpio+Sagittarius': "Intense explorer. Scorpio's depth and Sagittarius' adventurous spirit combine to create someone who seeks life's profound truths fearlessly.",
      'Scorpio+Capricorn': "Relentless achiever. Scorpio's passion and Capricorn's discipline make you unstoppable when you set your sights on a goal.",
      'Scorpio+Aquarius': "Radical thinker. Scorpio's intensity combined with Aquarius' innovation creates someone who challenges norms and drives transformation.",
      'Scorpio+Pisces': "Mystical empath. Double water sign energy creates deep emotional and intuitive capacities, leading to profound understanding of the unseen.",

      // Sagittarius combinations
      'Sagittarius+Capricorn': "Visionary realist. Sagittarius' optimism meets Capricorn's practicality, creating someone who dreams big and makes it happen step by step.",
      'Sagittarius+Aquarius': "Trailblazing visionary. Both forward-thinking signs, this combination creates someone destined to push society forward with bold new ideas.",
      'Sagittarius+Pisces': "Spiritual seeker. Sagittarius' quest for truth combines with Pisces' search for spiritual connection, making you a traveler of both the world and the soul.",

      // Capricorn combinations
      'Capricorn+Aquarius': "Pragmatic visionary. Capricorn's strategy combined with Aquarius' innovation creates someone who builds new worlds on solid foundations.",
      'Capricorn+Pisces': "Structured dreamer. Capricorn's focus provides the discipline to turn Pisces' creative dreams into reality.",

      // Aquarius combinations
      'Aquarius+Pisces': "Otherworldly innovator. Aquarius' visionary mind meets Pisces' boundless imagination, creating someone who dreams what others cannot even fathom.",

      // Default fallback
      'default': "Your unique zodiac combination reveals fascinating contradictions and complementary energies. While your birth sign forms your core identity, your quiz result illuminates aspects of your personality that may be less obvious but equally important."
    };
    // Create key for the combination
    const combinationKey = `${birthSign}+${quizSign}`;

    // Return the specific combination analysis or the default
    return combinations[combinationKey] || combinations['default'];
  };

  return (
    <div className="zodiac-app">
      <nav className="navbar">
        <ul>
          <li><button onClick={() => setShowQuiz(true)}><a href='#'>Zodiac Combo Quiz</a></button></li>
          <li><button onClick={handleNavigateToGallery}><a href='#'>Gallery</a></button></li>
          <li><button><a href="public\CompatibilityCalculator.html" target="_blank" rel="noopener noreferrer">Compatibility Calculator</a></button></li>
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
            <p>Your Cosmic Personality Analysis:</p>
            <span>{getPersonalityAnalysis()}</span>
            <p className="choices-text">Based on your choices: {Object.values(formData).slice(1).join(', ')}</p>
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
