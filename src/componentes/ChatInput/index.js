import React, { useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const roxoRosado = '#b356a6';

const InputWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const InputField = styled.input`
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  margin-right: 10px; /* Espaço entre o campo de entrada e o botão */
`;

const SendButton = styled.button`
  padding: 8px 12px;
  background-color: ${roxoRosado};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => darken(0.1, roxoRosado)};
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
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
