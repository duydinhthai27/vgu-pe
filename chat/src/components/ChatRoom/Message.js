import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';

// Styled component for the message wrapper
const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 8px;
  background-color: #f4f5f7;

  .header {
    display: flex;
    align-items: center;

    .author {
      margin-left: 8px;
      font-weight: 600;
    }

    .date {
      margin-left: auto;
      font-size: 12px;
      color: #9e9e9e;
    }
  }

  .content {
    margin-top: 4px;
    margin-left: 48px; // Adjusted to align with the text starting point
  }
`;

// Function to format the date
function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

// Message component
export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div className="header">
        <Avatar size="small" src={photoURL}>{!photoURL && displayName ? displayName.charAt(0).toUpperCase() : ''}</Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{formatDate(createdAt?.seconds)}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}
