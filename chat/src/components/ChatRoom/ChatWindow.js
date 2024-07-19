import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Tooltip, Avatar, Form, Input, Alert } from "antd";
import Message from "./Message";
import { AppContext } from "../context/AppProvider";
import { addDocument } from "../firebase/service";
import { AuthContext } from "../context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

// Styled components for layout and styling
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
  flex-grow: 1;
`;

export default function ChatWindow() {
  const { members, selectedRoom, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      await addDocument("messages", {
        text: inputValue,
        uid,
        photoURL: photoURL || null,
        roomId: selectedRoom.id,
        displayName,
        createdAt: new Date() // Ensure createdAt field is added
      });

      form.resetFields(["message"]);
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);

  const sortedMessages = [...messages].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [sortedMessages]);

  return (
    <WrapperStyled>
      {selectedRoom ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Invite
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {sortedMessages.length > 0 ? (
                sortedMessages.map((mes) => (
                  <Message
                    key={mes.id}
                    text={mes.text}
                    photoURL={mes.photoURL}
                    displayName={mes.displayName}
                    createdAt={mes.createdAt}
                  />
                ))
              ) : (
                <div>No messages to display</div>
              )}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Enter your message..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="No room selected"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
