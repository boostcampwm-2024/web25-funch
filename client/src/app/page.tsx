import Ping from './components/Ping';
import SunSvg from '@components/svgs/SunSvg';

const HomePage = () => {
  return (
    <>
      <h1 className="bg-surface-brand-base font-light">
        <span>FUNCH</span>
        <Ping />
      </h1>
      <div>
        <p className="funch-bold24 bg-surface-neutral-primary">helloworld</p>
        <p className="funch-bold16 text-content-brand-base">helloworld</p>
        <p className="funch-bold14 text-content-brand-weak">helloworld</p>
        <p className="funch-bold12">helloworld</p>
        <p className="funch-medium16">helloworld</p>
        <p className="funch-medium14">helloworld</p>
        <p className="funch-medium12">helloworld</p>
        <button className="bg-red">
          <SunSvg />
        </button>
      </div>
    </>
  );
};

export default HomePage;
