import { useState } from 'react';
import summitLogo from './assets/Summit_Logo-with-tagline.svg';
import './App.css';

const cardsData = [
  { id: 1, title: 'Policy', text: 'Policies are sold by agents to cover insureds.' },
  { id: 2, title: 'Claim', text: 'When a worker becomes injured the insured files a claim.' },
  { id: 3, title: 'Flag', text: 'You are not authorized to view the flag!' }
];

interface CardProperties {
  title: string;
  text: string;
}

function Card({ title, text }: CardProperties) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <h3>{title}</h3>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide' : 'Show'}
      </button>
      {expanded && <p className="card-text">{text}</p>}
    </div>
  );
}

function App() {
  return (
    <>
      <div id="app--container">
        <div id="header--container">
          <img id="header--logo" src={summitLogo} alt="Summit Logo" />
          <div className="blue-background">
            <span><em>Know</em> the people who know workers' comp.</span>
          </div>
        </div>
        <div id="content--container">
          {cardsData.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <div id="footer--container" className="blue-background">
          <span></span>
        </div>
      </div>

    </>
  );
}

export default App;
