import { useState, useEffect } from 'react';
import summitLogo from './assets/Summit_Logo-with-tagline.svg';
import './App.css';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

const initialCardsData = [
  { id: 1, title: 'Why Summit?', text: 'Guiding your clients to the right workers\' compensation company is a responsibility we know you take seriously, and that\'s why we work hard to be the right workers\' comp choice for you and your clients.\n\nWith the advantage of time and experience on our side, we know how to deliver the right workers\' comp programs and services to meet your clients\' needs and to make it easy for you to do business with us.', isTextBehindButton: false },
  { id: 2, title: 'Agent Training', text: 'Want to know more about the ins and outs of workers’ comp?\n\nWe’re here to help! As the people who know workers’ comp®, we’ve developed various training modules—available both in-person and virtually—to help you and your agency learn more about comp and the products we can offer your clients.', isTextBehindButton: false },
  { id: 3, title: 'Commission Rates', text: '[FLAG REDACTED]', isTextBehindButton: true }
];

function App() {
  const [cardsData, setCardsData] = useState(initialCardsData);

  const fetchData = () => {
    fetch('https://summit-admin-backend.fozzyfrommuppetsstudio.workers.dev/api/auth', {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) throw new Error(`Request to check isAuthorized failed.`);
      return response.json();
    })
    .then(response => {
      if (response.isAuthorizedToFlag) {
        fetch('https://summit-admin-backend.fozzyfrommuppetsstudio.workers.dev/api/flag', {
          method: 'GET',
          headers: { 
            'x-api-key': `${import.meta.env.VITE_API_SECRET}`
          }
        })
        .then(response => response.json())
        .then(response => {
          setCardsData(prevCards =>
            prevCards.map(card => 
              card.id === 3 ? { ...card, text: response.errorMessage ? response.errorMessage : response.flagText } : card
            )
          );
        })
        .catch(error => console.error('Request to retrieve flag text failed:', error));
      } else {
        setCardsData(prevCards =>
          prevCards.map(card => 
            card.id === 3 ? { ...card, text: 'You are not authorized to view commission rates!' } : card
          )
        );
      }
    })
    .catch(error => console.error('Request to check isAuthorized failed:', error));
  };

  useEffect(() => {
    fetchData();
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
          <h1 id="content--header">Agent Resources</h1>
          <div id="content--card-container">
            {cardsData.map((card) => (
              <Card key={card.id} {...card} fetchData={fetchData} />
            ))}
          </div>
          <div id="content--hint-container">
            <Accordion>
              <AccordionSummary>
                <Typography>Hint #1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><a href={import.meta.env.VITE_HINT2}>{import.meta.env.VITE_HINT1}</a></Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <Typography>Hint #2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{import.meta.env.VITE_HINT2}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <Typography>Hint #3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{import.meta.env.VITE_HINT3}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <Typography>Hint #4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{import.meta.env.VITE_HINT4}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>
                <Typography>Hint #5</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{import.meta.env.VITE_HINT5}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div id="footer--container" className="blue-background">
          <span></span>
        </div>
      </div>
    </>
  );
}

interface CardProps {
  title: string;
  text: string;
  isTextBehindButton: boolean;
  fetchData: () => void;
}

function Card({ title, text, isTextBehindButton, fetchData }: CardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    if (expanded) fetchData();
  };

  return (
    <div className="card">
      {isTextBehindButton ? (
        <div className="card--content-container">
          <h3>{title}</h3>
          {expanded && <div className="card--text">{text}</div>}
          <button onClick={handleToggle}>
            {expanded ? 'Try Again' : 'Show'}
          </button>
        </div>
      ) : (
        <div>
          <h3>{title}</h3>
          <div className="card--text">{text}</div>
        </div>
      )}
    </div>
  );
}

export default App;
