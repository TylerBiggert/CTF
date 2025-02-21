import { useState, useEffect } from 'react';
import summitLogo from './assets/Summit_Logo-with-tagline.svg';
import './App.css';

const initialCardsData = [
  { id: 1, title: 'Policy', text: 'Policies are sold by agents to cover insureds.' },
  { id: 2, title: 'Claim', text: 'When a worker becomes injured the insured files a claim.' },
  { id: 3, title: 'Flag', text: '' }
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
  const [cardsData, setCardsData] = useState(initialCardsData);

  useEffect(() => {
    fetch('https://summit-admin-backend.fozzyfrommuppetsstudio.workers.dev/api/auth', { method: 'GET', mode: 'no-cors' })
      .then((response: Response) => response.json())
      .then((response) => {
        if (response.isAuthorizedToFlag) {
          fetch('https://summit-admin-backend.fozzyfrommuppetsstudio.workers.dev/api/flag', { method: 'GET', mode: 'no-cors', headers: { 'x-api-key': `${process.env.shared_secret_for_requests}` }})
          .then((response: Response) => response.json())
          .then((flagText: string) => {
            setCardsData(prevCards =>
              prevCards.map(card =>
                card.id === 3 ? { ...card, text: flagText } : card
              )
            );
          })
          .catch(error => console.error('Request to retrieve flag text failed:', error));
        } else {
          setCardsData(prevCards =>
            prevCards.map(card =>
              card.id === 3 ? { ...card, text: 'You are not authorized to view the flag!!'} : card
            )
          );
          console.error('You are not authorized to view the flag!!');
        }
      })
      .catch(error => console.error('Request to check isAuthorized failed:', error));
  }, []);

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
