import React, { useState } from 'react';
import styled from 'styled-components';

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

  &.user {
    background-color: #dcf8c6;
    align-self: flex-end;
  }

  &.assistant {
    background-color: #fff;
    align-self: flex-start;
  }
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
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { role: 'user', content: userInput, timestamp: Date.now() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', 
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userInput }],
        model: 'mixtral-8x7b-32768',
      }),
    });

    const data = await response.json();

    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      const assistantContent = data.choices[0].message.content; 
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: assistantContent, timestamp: Date.now() }]);
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
          <React.Fragment key={index}>
            <Message className={message.role}>
              <MessageRole>{message.role}:</MessageRole>
              <MessageContent>{message.content}</MessageContent>
              <Timestamp>{formatTimestamp(message.timestamp)}</Timestamp>
            </Message>
          </React.Fragment>
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