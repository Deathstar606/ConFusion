import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../shared/baseurl';
import { GiftEmailGen } from '../../emails';

function GiftSuccess() {
    const { tranId, value, email } = useParams();
    const hasSentEmail = useRef(false);

    useEffect(() => {
        if (hasSentEmail.current) return;

        const sendEmail = async () => {
            try {
                console.log('Sending email...');
                const emailHtml = GiftEmailGen(tranId, value);
                const response = await axios.post(`${baseUrl}sendnews`, {
                    subject: "Gift Card",
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
    }, [tranId, value, email]); // Add dependencies

    return (
        <div style={{backgroundColor: "rgb(255, 193, 0)"}}>
            <h1 className='text-center p-4'>Gift purchase Has Been Successful</h1>
        </div>
    );
}

export default GiftSuccess;
