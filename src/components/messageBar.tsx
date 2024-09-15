/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DismissRegular } from "@fluentui/react-icons";
import {
  Button,
  MessageBar,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
  MessageBarGroupProps,
  MessageBarActions,
  MessageBarIntent,
  makeStyles,
} from "@fluentui/react-components";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";

export declare interface Message {
  title: string;
  content: string;
  intent: MessageBarIntent;
  id: number;
}

export interface MessageBarHandle {
  addMessage: (
    title: string,
    content: string,
    intent: MessageBarIntent
  ) => void;
}

const theStyles = makeStyles({
  messageBarGroup: {
    position: "fixed",
    top: "10px",
    width: "100%",
    height: "auto",
    left: "10px",
    zIndex: "calc(infinity *1)",
  },
  messageBar: {
    margin: "10px auto",
    width: "fit-content",
  },
  messageBarBody: {
    whiteSpace: "pre-wrap",
  },
});

const MessageComponent = forwardRef((props: any, ref: any) => {
  const styles = theStyles();
  const counterRef = useRef(0);
  const [animate, setAnimate] =
    useState<MessageBarGroupProps["animate"]>("both");
  const [messages, setMessages] = useState<Message[]>([]);
  const addMessage = (
    title: string,
    content: string,
    intent: MessageBarIntent
  ) => {
    const newMessage: Message = {
      title: title,
      content: content,
      intent: intent,
      id: counterRef.current++,
    };
    setMessages((s) => [newMessage, ...s].slice(0, 3));
    setTimeout(() => {
      dismissMessage(newMessage.id);
    }, 3000);
  };
  useImperativeHandle(ref, () => ({
    addMessage,
  }));
  const dismissMessage = (messageId: number) =>
    setMessages((s) => s.filter((entry) => entry.id !== messageId));
  return (
    <MessageBarGroup className={styles.messageBarGroup} animate={animate}>
      {messages.map((item: Message) => (
        <MessageBar className={styles.messageBar} key={`${item.intent}-${item.id}`} intent={item.intent}>
          <MessageBarBody className={styles.messageBarBody}>
            <MessageBarTitle>{item.title}</MessageBarTitle>
            {item.content}
          </MessageBarBody>
          <MessageBarActions
            containerAction={
              <Button
                onClick={() => dismissMessage(item.id)}
                aria-label="dismiss"
                appearance="transparent"
                icon={<DismissRegular />}
              />
            }
          />
        </MessageBar>
      ))}
    </MessageBarGroup>
  );
});

export default MessageComponent;
