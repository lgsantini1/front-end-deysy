import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const primaryColor = '#b356a6';
const secondaryColor = '#d1b3d4';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const ChatHistory = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  display: flex;
  background-color: ${props => props.index % 2 === 0 ? primaryColor : secondaryColor};
  color: ${props => props.index % 2 === 0 ? 'white' : 'black'};
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
`;

const MessageRole = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const MessageContent = styled.span`
  // No specific styles needed here
`;

const Timestamp = styled.span`
  font-size: 0.8em;
  color: gray;
  margin-left: auto;
`;

const ChatInput = styled.form`
  display: flex;
`;

const InputField = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px;
  background-color: ${primaryColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = user.nome;
    const newMessage = { role: usuario, content: userInput, timestamp: Date.now() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', 
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userInput }],
        model: 'llama3-70b-8192',
      }),
    });

    const data = await response.json();

    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      const assistantContent = data.choices[0].message.content; 
      setMessages((prevMessages) => [...prevMessages, { role: 'Nome do Cliente', content: assistantContent, timestamp: Date.now() }]);
    } else {
      console.error('Unexpected response format from OpenAI API');
    }

    setUserInput(''); // Clear the input field
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ChatContainer>
      <ChatHistory>
        {messages.map((message, index) => (
          <Message key={index} role={message.role} index={index}>
            <MessageRole>{message.role}:</MessageRole>
            <MessageContent>{message.content}</MessageContent>
            <Timestamp>{formatTimestamp(message.timestamp)}</Timestamp>
          </Message>
        ))}
      </ChatHistory>

      <ChatInput onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton type="submit">Send</SendButton>
      </ChatInput>
    </ChatContainer>
  );
}

export default Chat;
