import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`;

const MessageItem = styled.div`
  background-color: ${({ isUser }) => (isUser ? '#dcf8c6' : '#fff')};
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 5px;
  max-width: 70%; // Example width
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

const MessageList = ({ messages }) => {
  return (
    <ListWrapper>
      {messages.map((message) => (
        <MessageItem key={message.id} isUser={message.sender === 'user'}>
          {message.content}
        </MessageItem>
      ))}
    </ListWrapper>
  );
};

export default MessageList;