import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const InputField = styled.input`
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px; // Example font size
`;

const SendButton = styled.button`
  padding: 8px 12px;
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; // Example font size
  transition: background-color 0.3s ease; // Example transition effect

  &:hover {
    background-color: #007bff; // Example hover effect
  }
`;

const ChatInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      onSendMessage({
        id: Date.now(),
        sender: 'user',
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <InputWrapper>
      <form onSubmit={handleSubmit}>
        {/* Label for accessibility */}
        <label htmlFor="chat-input" style={{ display: 'none' }}>
          Type your message
        </label>
        <InputField
          id="chat-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton type="submit">Send</SendButton>
      </form>
    </InputWrapper>
  );
};

export default ChatInput;