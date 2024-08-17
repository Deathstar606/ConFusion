import React from "react";
import { render } from "@react-email/render";

export const OrderEmail = ({ name, message, imageUrl }) => {
  return (
    <div style={{ backgroundColor: "rgb(255, 193, 0)", padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Hello, {name}</h1>
      <h3 style={{ textAlign: 'center', padding: '10px' }}>{message}</h3>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Uploaded Preview" 
          style={{ display: 'block', margin: '20px auto', maxWidth: '100%', maxHeight: "400px" }} 
        />
      )}
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <a 
          href="https://youtu.be/dQw4w9WgXcQ?si=zfjDpzT7HAfDG8Ev" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'yellow',
            textDecoration: 'none',
            borderRadius: '0px',
            cursor: 'pointer'
          }}
        >
          Press At Own Risk
        </a>
      </div>
    </div>
  );
};

const GiftEmail = ({ tranId, value }) => {
  return (
    <div style={{ backgroundColor: "rgb(255, 193, 0)", padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Gift Card For: {value}</h1>
      <h3 style={{ textAlign: 'center', padding: '10px' }}>{tranId}</h3>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <a 
          href="https://youtu.be/dQw4w9WgXcQ?si=zfjDpzT7HAfDG8Ev" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'yellow',
            textDecoration: 'none',
            borderRadius: '0px',
            cursor: 'pointer'
          }}
        >
          Press At Own Risk
        </a>
      </div>
    </div>
  );
};

const ReservationEmail = ({ tranId }) => {
  return (
    <div style={{ backgroundColor: "rgb(255, 193, 0)", padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Reservation Confirmed</h1>
      <h3 style={{ textAlign: 'center', padding: '10px' }}>{tranId}</h3>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <a 
          href="https://youtu.be/dQw4w9WgXcQ?si=zfjDpzT7HAfDG8Ev" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'yellow',
            textDecoration: 'none',
            borderRadius: '0px',
            cursor: 'pointer'
          }}
        >
          Press At Own Risk
        </a>
      </div>
    </div>
  );
};

const TicketEmail = ({ tranId }) => {
  return (
    <div style={{ backgroundColor: "rgb(255, 193, 0)", padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Ticket For Event</h1>
      <h3 style={{ textAlign: 'center', padding: '10px' }}>{tranId}</h3>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <a 
          href="https://youtu.be/dQw4w9WgXcQ?si=zfjDpzT7HAfDG8Ev" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'yellow',
            textDecoration: 'none',
            borderRadius: '0px',
            cursor: 'pointer'
          }}
        >
          Press At Own Risk
        </a>
      </div>
    </div>
  );
};

export const TicketEmailGen = (tranId) => {
  return render(<TicketEmail tranId={tranId}/>);
};

export const ReservationEmailGen = (tranId) => {
  return render(<ReservationEmail tranId={tranId}/>);
};

export const GiftEmailGen = (tranId, value) => {
  return render(<GiftEmail tranId={tranId} value={value}/>);
};

export const generateEmailHtml = (name, message, imageUrl) => {
  return render(<OrderEmail name={name} message={message} imageUrl={imageUrl} />);
};

