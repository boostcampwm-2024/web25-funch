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
    const socketUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_CHAT_SERVER_URL
        : process.env.NEXT_PUBLIC_CHAT_SERVER_URL_DEV;

    const socketQuery = {
      broadcastId,
    } as any;

    if (loggedinUser) {
      socketQuery.name = loggedinUser.name;
    }

    const socket = io(socketUrl, {
      path: '/live',
      query: socketQuery,
    });

    socketRef.current = socket;

    socket.on(SOCKET_EVENT.CONNECT, () => {
      console.log('✅ SOCKET CONNECTED');
      setIsSocketConnected(true);
    });

    socket.on(SOCKET_EVENT.CHAT, (receivedData: { name: string; content: string }) => {
      // 상태 업데이트
      console.log('😇 RECEIVING : ', receivedData);
      setChatList((prev) => [...prev, receivedData]);
    });

    socket.on(SOCKET_EVENT.SET_ANONYMOUS_NAME, (data) => {
      console.log('🚀 SETTING ANONYMOUS NAME : ', data);
      setChatname(data.name);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [broadcastId, loggedinUser]);

  const sendChat = useCallback(
    ({ socketRef, name, content }: { socketRef: MutableRefObject<Socket | null>; name: string; content: string }) => {
      if (!socketRef.current) return;

      console.log('🚀 EMITING TO SERVER : ', {
        name,
        content,
      });

      socketRef.current.emit(
        SOCKET_EVENT.CHAT,
        Buffer.from(
          JSON.stringify({
            name,
            content,
          }),
        ),
      );
    },
    [],
  );

  return (
    <aside className={clsx('flex h-full w-[22rem] flex-col', 'border-border-neutral-weak border-x border-solid')}>
      <div
        className={clsx('h-chat-header flex w-full items-center justify-center border-y', 'border-border-neutral-weak')}
      >
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
    <div className="flex h-full flex-1 flex-col px-2 py-1">
      <div className="relative h-full w-full">
        <div className={clsx('h-chat absolute bottom-0 left-0 flex w-full flex-col')}>
          <div className="funch-scrollable absolute bottom-0 max-h-full w-full">
            {chatList.map((chat, index) => (
              <p key={index} className="funch-medium14">
                <span>{chat.name}</span>
                <span>{chat.content}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
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
    <div className="h-chat-form flex flex-col px-2.5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendChat({
            socketRef,
            name: chatname,
            content: inputValue,
          });
          setInputValue('');
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
