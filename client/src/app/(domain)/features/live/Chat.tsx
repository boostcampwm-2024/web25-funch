'use client';

import Button from '@components/Button';
import useLiveContext from '@hooks/useLiveContext';
import useUser from '@hooks/useUser';
import { SOCKET_EVENT } from '@libs/constants';
import clsx from 'clsx';
import { memo, type MutableRefObject, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

type ChatType = {
  name: string;
  content: string;
};

type SendChat = (args: { socketRef: MutableRefObject<Socket | null>; name: string; content: string }) => void;

type ChildrenArgs = {
  chatList: ChatType[];
  isSocketConnected: boolean;
  socketRef: MutableRefObject<Socket | null>;
  chatname: string;
  sendChat: SendChat;
};

type Props = {
  children: (args: ChildrenArgs) => ReactNode;
};

const ChatWrapper = ({ children }: Props) => {
  const { broadcastId } = useLiveContext();
  const { loggedinUser } = useUser();
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [chatname, setChatname] = useState(loggedinUser?.name || '익명');

  useEffect(() => {
    setIsSocketConnected(false);
    const socket = io('ws://localhost:8000', {
      path: '/live',
      query: {
        broadcastId,
        name: loggedinUser?.name || null,
      },
    });
    socketRef.current = socket;

    socket.on(SOCKET_EVENT.CONNECT, () => {
      console.log('✅ SOCKET CONNECTED');
      setIsSocketConnected(true);
    });

    socket.on(SOCKET_EVENT.CHAT, (receivedData: { name: string; content: string }) => {
      // 상태 업데이트
      setChatList((prev) => [...prev, receivedData]);
    });

    socket.on(SOCKET_EVENT.SET_ANONYMOUS_NAME, (data) => {
      setChatname(data);
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [broadcastId, loggedinUser]);

  const sendChat = useCallback(
    ({ socketRef, name, content }: { socketRef: MutableRefObject<Socket | null>; name: string; content: string }) => {
      if (!socketRef.current) return;

      socketRef.current.emit(SOCKET_EVENT.CHAT, {
        name,
        content,
      });
    },
    [],
  );

  return (
    <aside className={clsx('flex h-full w-[22rem] flex-col', 'border-border-neutral-weak border-x border-solid')}>
      <div className={clsx('flex h-11 w-full items-center justify-center border-y', 'border-border-neutral-weak')}>
        <strong className={clsx('text-content-neutral-primary')}>채팅</strong>
      </div>
      {children({
        chatList,
        isSocketConnected,
        socketRef,
        chatname,
        sendChat,
      })}
    </aside>
  );
};

type ChatListProps = {
  chatList: ChatType[];
};

const ChatList = ({ chatList }: ChatListProps) => {
  return (
    <div className="flex flex-1 flex-col">
      {chatList.map((chat, index) => (
        <p key={index}>{chat.content}</p>
      ))}
    </div>
  );
};

type ChatFormProps = {
  socketRef: MutableRefObject<Socket | null>;
  chatname: string;
  sendChat: SendChat;
};

const ChatForm = memo(({ socketRef, chatname, sendChat }: ChatFormProps) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="flex h-[82px] flex-col px-[10px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendChat({
            socketRef,
            name: chatname,
            content: '채팅',
          });
        }}
      >
        <div className="h-10 w-full">
          <input
            type="text"
            className={clsx('h-full w-full resize-none rounded-md border-none px-2 py-2', 'bg-surface-neutral-weak')}
            placeholder="채팅을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end py-1">
          <Button type="submit">채팅</Button>
        </div>
      </form>
    </div>
  );
});

const Chat = Object.assign(ChatWrapper, {
  List: ChatList,
  Form: ChatForm,
});

export default Chat;
