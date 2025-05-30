import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react'; // Lucide AI/bot icon

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {open && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/nQ93BUEe_oietzSxEtiuz"
          width="350"
          height="500"
          style={{ border: 'none', borderRadius: '10px' }}
          allow="microphone;"
          title="Chatbot"
        ></iframe>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{
          marginTop: '10px',
          background: '#fff',       // white background
          color: '#4A4A4A',         // icon color
          padding: '10px',
          borderRadius: '25px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MessageSquare size={30} />
      </button>
    </div>
  );
};

export default Chatbot;
