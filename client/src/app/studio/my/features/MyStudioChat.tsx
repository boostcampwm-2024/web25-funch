'use client';

// import StudioChatHeader from './StudioChatHeader';
// import StudioChatBody from './StudioChatBody';
import StudioChatDemo from './StudioChatDemo';

const MyStudioChat = () => {
  return (
    // <section className="border-border-neutral-weak border-l">
    //   <StudioChatHeader />
    //   <StudioChatBody />
    // </section>
    <StudioChatDemo>
      {({ chatList, socketRef, chatname, sendChat, isLoading, isError }) => (
        <>
          {isError ? (
            <StudioChatDemo.Error />
          ) : isLoading ? (
            <StudioChatDemo.Loading />
          ) : (
            <>
              <StudioChatDemo.List chatList={chatList} />
              <StudioChatDemo.Form socketRef={socketRef} chatname={chatname} sendChat={sendChat} />
            </>
          )}
        </>
      )}
    </StudioChatDemo>
  );
};

export default MyStudioChat;
