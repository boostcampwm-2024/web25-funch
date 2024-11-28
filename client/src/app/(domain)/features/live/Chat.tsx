'use client';

import Button from '@components/Button';
import useLiveContext from '@hooks/useLiveContext';
import useUser from '@hooks/useUser';
import { SOCKET_EVENT } from '@libs/constants';
import clsx from 'clsx';
import {
  ChangeEvent,
  memo,
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, type Socket } from 'socket.io-client';

type ChatType = {
  name: string;
  content: string;
  color?: string;
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
  const { isLivePage } = useLiveContext();
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

    socket.on(SOCKET_EVENT.CHAT, (receivedData: ChatType) => {
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
    <aside
      className={clsx(
        {
          'absolute h-0 w-0 overflow-hidden': !isLivePage,
          'h-full w-[22rem]': isLivePage,
        },
        'flex flex-col',
        'border-border-neutral-weak border-x border-solid',
      )}
    >
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
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      if (!isUserScrolling) {
        chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatList]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = chatListRef.current;
        const isScrolledToBottom = scrollHeight - scrollTop < clientHeight + 20;
        setIsUserScrolling(!isScrolledToBottom);
      }
    };

    if (chatListRef.current) {
      chatListRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatListRef.current) {
        chatListRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatListRef]);

  return (
    <div className="flex h-full flex-1 flex-col px-2 pb-4 pt-2">
      <div className="relative h-full w-full overflow-hidden">
        <div className={clsx('h-chat funch-scrollable w-full')} ref={chatListRef}>
          {chatList.map((chat, index) => (
            <ChatItem key={index} name={chat.name} content={chat.content} color={chat.color} />
          ))}
          <div ref={chatBottomRef} className="h-1" />
        </div>
      </div>
    </div>
  );
};

const ChatItem = memo(
  ({ name, color = 'var(--content-neutral-primary)', content }: { name: string; color?: string; content: string }) => {
    console.log('🚀 RENDERING CHAT ITEM : ', name, content);
    return (
      <p>
        <span
          className="funch-bold14 mr-2 whitespace-nowrap"
          style={{
            color,
          }}
        >
          {name}
        </span>
        <span className="funch-medium14 text-content-neutral-primary break-words">{content}</span>
      </p>
    );
  },
);

type ChatFormProps = {
  socketRef: MutableRefObject<Socket | null>;
  chatname: string;
  sendChat: SendChat;
};

const ChatForm = memo(({ socketRef, chatname, sendChat }: ChatFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trimStart().replace(/\s+/g, ' ');
    if (value.length > 120) {
      value = value.slice(0, 120);
    }
    setInputValue(value);
  };
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
        <div
          className={clsx(
            'h-10 w-full overflow-hidden',
            'focus-within:border-border-brand-base rounded-md border border-solid border-transparent',
          )}
        >
          <input
            type="text"
            className={clsx('h-full w-full px-2 py-2', 'bg-surface-neutral-weak outline-none')}
            placeholder="채팅을 입력해주세요"
            value={inputValue}
            onChange={handleChage}
            maxLength={120}
            minLength={1}
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
