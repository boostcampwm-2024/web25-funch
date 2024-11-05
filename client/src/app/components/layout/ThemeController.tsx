import MoonSvg from '@components/svgs/MoonSvg';

const ThemeController = () => {
  return (
    // button으로 바꾸기!
    <div
      className="hover:bg-surface-neutral-weak text-content-static-white group relative flex rounded-md bg-inherit"
      aria-label="밝은 테마로 변경"
    >
      <MoonSvg />
      <span className="bg-surface-neutral-strong absolute left-[-30%] top-14 w-20 rounded-md p-1 text-center opacity-0 group-hover:opacity-100">
        밝은 테마
      </span>
    </div>
  );
};

export default ThemeController;
