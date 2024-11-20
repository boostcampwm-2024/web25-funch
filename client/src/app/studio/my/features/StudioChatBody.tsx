import StudioChatButton from './StudioChatButton';

const StudioChatBody = () => {
  return (
    <div className="h-studio-chat flex w-full flex-col">
      <div className="flex-1"></div>
      <StudioChatControls />
    </div>
  );
};

const StudioChatControls = () => {
  return (
    <div className="flex h-20 w-full flex-col">
      <div className="flex w-full justify-center">
        <input
          type="text"
          className="bg-surface-neutral-strong funch-bold12 mx-4 flex h-10 w-full rounded-lg px-4"
          placeholder="채팅을 입력해주세요"
        />
      </div>
      <div className="flex h-10 items-center justify-end px-4">
        <StudioChatButton>채팅</StudioChatButton>
      </div>
    </div>
  );
};

export default StudioChatBody;
