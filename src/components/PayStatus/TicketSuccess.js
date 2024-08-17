import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../shared/baseurl';
import { TicketEmailGen } from '../../emails';

function TicketSuccess() {
    const { tranId, email } = useParams();
    const hasSentEmail = useRef(false);

    useEffect(() => {
        if (hasSentEmail.current) return;

        const sendEmail = async () => {
            try {
                console.log('Sending email...');
                const emailHtml = TicketEmailGen(tranId);
                const response = await axios.post(`${baseUrl}sendnews`, {
                    subject: "Event Ticket",
                    htmlContent: emailHtml,
                    email: email
                });
                console.log('Email sent successfully:', response.data);
                hasSentEmail.current = true;
            } catch (error) {
                console.error('Error sending email:', error);
            }
        };

        sendEmail();
    }, [tranId, email]); // Add dependencies

    return (
        <div style={{backgroundColor: "rgb(255, 193, 0)"}}>
            <h1 className='text-center p-4'>Ticket purchase Has Been Successful</h1>
        </div>
    );
}

export default TicketSuccess;
