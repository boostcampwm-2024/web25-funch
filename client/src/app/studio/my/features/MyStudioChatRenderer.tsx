'use client';

import StudioChat from './StudioChat';

const MyStudioChatRenderer = () => {
  return (
    <StudioChat>
      {({ chatList, socketRef, chatname, sendChat, isLoading, isError }) => (
        <>
          {isError ? (
            <StudioChat.Error />
          ) : isLoading ? (
            <StudioChat.Loading />
          ) : (
            <>
              <StudioChat.List chatList={chatList} />
              <StudioChat.Form socketRef={socketRef} chatname={chatname} sendChat={sendChat} />
            </>
          )}
        </>
      )}
    </StudioChat>
  );
};

export default MyStudioChatRenderer;
