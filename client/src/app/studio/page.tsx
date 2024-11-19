import StudioInput from '@components/studio/StudioInput';
import { TextareaRendererForTest } from '@components/studio/StudioTextarea';

const StudioPage = () => {
  return (
    <div className="w-80">
      <StudioInput />
      <TextareaRendererForTest />
    </div>
  );
};

export default StudioPage;
