import StudioSvg from '@components/svgs/StudioSvg';

const StudioBtn = () => {
  return (
    <button
      className="hover:bg-surface-neutral-weak text-content-static-white group relative rounded-md p-2"
      aria-label="스튜디오 페이지로"
    >
      <StudioSvg />
      <span className="bg-surface-neutral-strong absolute left-[-30%] top-14 w-20 rounded-md p-1 text-center opacity-0 group-hover:opacity-100">
        스튜디오
      </span>
    </button>
  );
};

export default StudioBtn;
