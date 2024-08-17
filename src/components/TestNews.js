import { useState } from 'react';
import { generateEmailHtml } from '../emails';
import {OrderEmail} from '../emails';
import axios from 'axios';
import { baseUrl } from '../shared/baseurl';
import styled from 'styled-components';

// Styled components
const SidebarContainer = styled.div`
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const SidebarLink = styled.div`
    color: ${props => props.active ? 'rgb(0, 0, 0)' : 'rgb(243, 196, 5)'};
    background-color: ${props => props.active ? 'rgb(243, 196, 5)' : 'transparent'};
    padding: 15px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin: 5px 0;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.active ? 'rgb(243, 196, 5)' : 'rgba(243, 196, 5, 0.8)'};
        color: rgb(0, 0, 0);
    }
`;

const ContentContainer = styled.div`
    background-color: rgb(255, 249, 225);
    flex-grow: 1;
    padding: 20px;
    margin-left: 250px; /* Add this margin to prevent content overlap with the fixed sidebar */
`;

export const Users = () => {
    return <div style={{ minHeight: "100vh" }}>Users Page</div>;
};

export const SendNewsletter = ({ subscribers }) => {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const emailPromises = subscribers.Subscribers.map(async (sub) => {
                const emailHtml = generateEmailHtml(sub.firstname, formData.message, formData.imageUrl);
                return axios.post( baseUrl + 'sendnews', {
                    subject: formData.subject,
                    htmlContent: emailHtml,
                    email: sub.email
                });
            });
            await Promise.all(emailPromises);
            alert('Emails sent successfully');
        } catch (error) {
            console.error('There was an error sending the emails:', error);
        }
    };

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif', minHeight: "100vh" }}>
            <h1 style={{ textAlign: 'center' }}>Send Newsletter</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0
            }}>
                <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <form onSubmit={handleSend}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: 'bold'
                            }}>Subject:</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: "transparent",
                                    border: '2px solid black',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: 'bold'
                            }}>Message:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: "transparent",
                                    border: '2px solid black',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box',
                                    height: '100px'
                                }}
                            ></textarea>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: 'bold'
                            }}>Image URL:</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: "transparent",
                                    border: '2px solid black',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className='butt'>Send Email</button>
                        </div>                       
                    </form>
                </div>
            </div>
            <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Preview</h2>
            <OrderEmail name={"First Name"} message={formData.message} imageUrl={formData.imageUrl} />
        </div>
    );
};

// Sidebar component
const Sidebar = (props) => {
    const [activeLink, setActiveLink] = useState('Users');
    const [Comp, setComp] = useState(<Users />);

    const handleLinkClick = (link, component) => {
        setActiveLink(link);
        setComp(component);
    };

    return (
        <div style={{ display: 'flex' }}>
            <SidebarContainer>
                <SidebarLink 
                    active={activeLink === 'Users'} 
                    onClick={() => handleLinkClick('Users', <Users />)}
                >
                    Users
                </SidebarLink>
                <SidebarLink 
                    active={activeLink === 'SendNewsletter'} 
                    onClick={() => handleLinkClick('SendNewsletter', <SendNewsletter subscribers={props.subscribers} />)}
                >
                    Send Newsletter
                </SidebarLink>
            </SidebarContainer>
            <ContentContainer>
                {Comp}
            </ContentContainer>
        </div>
    );
};

export default Sidebar;
