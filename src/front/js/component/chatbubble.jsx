import React, { useState } from 'react';
import Chatgptlogo from "../../img/chatgptlogo.png";
import Onlypawsp from "../../img/onlypawsp.jpeg";
import Chatbubble from "../../styles/chatbubbles.css";

const ChatBubble = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState('');

    const handleBubbleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3001/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from the server');
            }

            const responseData = await response.json();

            // Add user's message and generated response to the messages list
            setMessages([
                ...messages,
                { text: inputMessage, sender: 'user' },
                { text: responseData.reply, sender: 'bot' },
            ]);

            // Set the chatbot response
            // setChatbotResponse(responseData.reply);

            // Clear the input message
            setInputMessage('');
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
        }
    };

    return (
        <div className="container py-5">
            <div className="row d-flex justify-content-end">
                <div className="col-md-8 col-lg-6 col-xl-4">
                    {isExpanded && (
                        <div className="card chat-card" id="chat1" style={{ borderRadius: '15px' }}>
                            <div className="card-header d-flex justify-content-between align-items-center p-3 bg-custom text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', }} onClick={handleBubbleClick}>
                                <p className="mb-0 fw-bold">Live chat</p>
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="card-body" style={{ width: "450px", overflowY: "auto", padding: "10px", margin: "0", }}>
                                {messages.map((message, index) => {
                                    const { text, sender } = message;

                                    return (
                                        <div key={index} className={`d-flex flex-row justify-content-${sender === 'user' ? 'start' : 'end'} mb-4`}>
                                            {sender === 'user' ? (
                                                <div className="p-3 ms-3" style={{ borderRadius: '15px', background: 'rgba(57, 192, 237, 0.2)' }}>
                                                    <p className="small mb-0">{text}</p>
                                                </div>
                                            ) : (
                                                <div className="p-3 me-3 border" style={{ borderRadius: '15px', background: '#fbfbfb' }}>
                                                    <p className="small mb-0">{text}</p>
                                                </div>
                                            )}
                                            {sender === 'user' ? (
                                                <img src={Onlypawsp} alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                            ) : (
                                                <img src={Chatgptlogo} alt="avatar 2" style={{ width: '45px', height: '100%' }} />
                                            )}
                                        </div>
                                    );
                                })}
                                {/* Display chatbot response */}
                                {chatbotResponse && (
                                    <div className="d-flex flex-row justify-content-end mb-4">
                                        <div className="p-3 me-3 border" style={{ borderRadius: '15px', background: '#fbfbfb' }}>
                                            <p className="small mb-0">{chatbotResponse}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="card-footer">
                                <div className="card-footer">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your message..."
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                            />
                                            <button type="submit" className="btn btn-trasparent send">Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={`chat-bubble ${isExpanded ? 'expanded' : ''}`} onClick={handleBubbleClick}>
                        <i className="fas fa-comments"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ChatBubble;
