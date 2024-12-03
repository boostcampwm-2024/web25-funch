'use client';

import Button from '@components/Button';
import UpArrowSvg from '@components/svgs/UpArrowSvg';
import useClickOutside from '@hooks/useClickOutside';
import useLiveContext from '@hooks/useLiveContext';
import useUser from '@hooks/useUser';
import { SOCKET_EVENT } from '@libs/constants';
import { translationList } from '@libs/data';
import type { TranslationCode } from '@libs/internalTypes';
import clsx from 'clsx';
import {
  type ChangeEvent,
  type MutableRefObject,
  type ReactNode,
  memo,
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

type SendChat = (args: {
  socketRef: MutableRefObject<Socket | null>;
  name: string;
  content: string;
  translation: TranslationCode;
}) => void;

type ChildrenArgs = {
  chatList: ChatType[];
  isLoading: boolean;
  isError: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [chatname, setChatname] = useState(loggedinUser?.name || '익명');

  useEffect(() => {
    const connectSocket = () => {
      setIsError(false);
      setIsLoading(true);
      setChatList([]);

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
        reconnectionDelay: 1000 * 10,
      });

      socketRef.current = socket;

      socket.on(SOCKET_EVENT.CONNECT_ERROR, () => {
        console.log('❌ SOCKET CONNECT ERROR');
        setIsError(true);
      });
      socket.on(SOCKET_EVENT.CONNECT_TIMEOUT, () => {
        console.log('❌ SOCKET CONNECT TIMEOUT');
        setIsError(true);
      });
      socket.on(SOCKET_EVENT.DISCONNECT, () => {
        console.log('❌ SOCKET DISCONNECTED');
      });
      socket.on(SOCKET_EVENT.RECONNECT_FAILED, () => {
        console.log('❌ SOCKET RECONNECT FAILED');
      });
      socket.on(SOCKET_EVENT.ERROR, () => {
        console.log('❌ SOCKET ERROR');
        setIsError(true);
      });

      socket.on(SOCKET_EVENT.CONNECT, () => {
        console.log('✅ SOCKET CONNECTED');
        setIsLoading(false);
        setIsError(false);
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
    };

    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [broadcastId, loggedinUser]);

  const sendChat = useCallback(
    ({
      socketRef,
      name,
      content,
      translation,
    }: {
      socketRef: MutableRefObject<Socket | null>;
      name: string;
      content: string;
      translation: TranslationCode;
    }) => {
      if (!socketRef.current) return;

      console.log('🚀 EMITING TO SERVER : ', {
        name,
        content,
        translation,
      });

      socketRef.current.emit(
        SOCKET_EVENT.CHAT,
        Buffer.from(
          JSON.stringify({
            name,
            content,
            translation,
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
        socketRef,
        chatname,
        sendChat,
        isLoading,
        isError,
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
          <div className="mb-1.5 flex h-10 w-full items-center justify-center">
            <p className="bg-surface-neutral-base funch-medium14 text-content-neutral-strong rounded-lg px-4 py-2">
              아름다운 채팅 문화를 만들어보아요.
            </p>
          </div>
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
  const [selectedTranslation, setSelectedTranslation] = useState<TranslationCode>(null);
  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trimStart().replace(/\s+/g, ' ');
    if (value.length > 120) {
      value = value.slice(0, 120);
    }
    setInputValue(value);
  };
  const handleClickTranslation = (code: TranslationCode) => {
    setSelectedTranslation(code);
  };
  return (
    <div className="h-chat-form flex flex-col px-2.5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputValue) return;
          sendChat({
            socketRef,
            name: chatname,
            content: inputValue,
            translation: selectedTranslation,
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
        <div className="flex justify-end gap-2 py-1">
          <TranslationDropdown
            handleClickTranslation={handleClickTranslation}
            selectedTranslation={selectedTranslation}
          />
          <Button type="submit" disabled={!inputValue}>
            채팅
          </Button>
        </div>
      </form>
    </div>
  );
});

const TranslationDropdown = ({
  selectedTranslation,
  handleClickTranslation,
}: {
  selectedTranslation: TranslationCode;
  handleClickTranslation: (code: TranslationCode) => void;
}) => {
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  useClickOutside(dropdownWrapperRef, closeDropdown);
  const selectedTranslationName =
    translationList.find((item) => item.code === selectedTranslation)?.name || '선택 안 함';
  return (
    <div className={clsx('flex items-center gap-1')}>
      <p className={clsx('funch-medium12 text-content-neutral-base')}>번역 모드</p>
      <div ref={dropdownWrapperRef} className={clsx('relative flex w-[6rem] items-center')}>
        <button
          type="button"
          onClick={toggleDropdown}
          aria-label={`번역 모드 선택 드롭다운 ${isOpen ? '닫기' : '열기'}. 현재 '${selectedTranslationName}'이 선택됨.`}
          className={clsx(
            'hover:bg-surface-neutral-weak focus:bg-surface-neutral-weak inline-flex w-full items-center gap-0.5 rounded-md bg-transparent outline-none',
          )}
        >
          <span
            className={clsx('inline-flex h-6 w-6 items-center justify-center', {
              'rotate-180': isOpen,
            })}
          >
            <UpArrowSvg />
          </span>
          <span aria-hidden className={clsx('funch-meta12')}>
            {selectedTranslationName}
          </span>
        </button>
        {isOpen && (
          <ul
            className={clsx(
              'bg-surface-neutral-primary absolute bottom-full left-0 w-full -translate-y-1 rounded-md py-2',
            )}
          >
            {translationList.map((translationItem, index) => (
              <li key={index} className="px-0.5">
                <button
                  type="button"
                  onClick={() => {
                    handleClickTranslation(translationItem.code);
                    setIsOpen(false);
                  }}
                  className="funch-medium12 hover:bg-surface-neutral-weak focus:bg-surface-neutral-base w-full items-center justify-center rounded-sm py-0.5 outline-none"
                >
                  {translationItem.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ChatError = () => {
  return (
    <p className="funch-bold16 text-content-neutral-strong flex h-full w-full items-center justify-center">
      채팅 서버에 연결할 수 없어요.
    </p>
  );
};
const ChatLoading = () => {
  return (
    <p className="funch-bold16 text-content-neutral-strong flex h-full w-full items-center justify-center">
      채팅 서버에 연결 중이에요.
    </p>
  );
};

const Chat = Object.assign(ChatWrapper, {
  List: ChatList,
  Form: ChatForm,
  Error: ChatError,
  Loading: ChatLoading,
});

export default Chat;
