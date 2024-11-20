import clsx from 'clsx';

import { FormEvent, useState } from 'react';
import StudioAddButton from '@components/studio/StudioAddButton';
import StudioUpdateButton from '@components/studio/StudioUpdateButton';
import StudioRows from './StudioRows';

import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import { StudioDropdownRendererForTest } from '@components/studio/StudioDropdown';
import StudioImageInput from '@components/studio/StudioImageInput';
import StudioInput from '@components/studio/StudioInput';
import StudioBadge from '@components/studio/StudioBadge';

interface MyStudioFormProps {
  onSubmit: (FormData: MyStudioFormData) => void;
}

interface MyStudioFormData {
  title: string;
  category: string;
  mood: string;
  tags: string[];
  previewImage: File | null;
}

const MyStudioForm = ({ onSubmit }: MyStudioFormProps) => {
  const [formData, setFormData] = useState<MyStudioFormData>({
    title: '',
    category: '',
    mood: '',
    tags: [],
    previewImage: null,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTag = () => {
    if (tagInput) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index: number) => {
    console.log(index);
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setFormData({
      ...formData,
      tags: newTags,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full space-y-8 p-[30px]">
        <StudioRows labelName="방송 제목">
          <TextareaRendererForTest setText={(text) => setFormData((prev) => ({ ...prev, title: text }))} />
        </StudioRows>
        <StudioRows labelName="카테고리">
          <StudioDropdownRendererForTest />
        </StudioRows>
        <StudioRows labelName="분위기">
          <StudioDropdownRendererForTest />
        </StudioRows>
        <StudioRows isFlex labelName="태그">
          <div className="flex-1">
            <StudioInput onChange={(e) => setTagInput(e.target.value)} placeholder="태그를 입력하세요" />
          </div>
          <StudioAddButton
            onClick={() => {
              handleAddTag();
            }}
          >
            추가
          </StudioAddButton>
        </StudioRows>
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <StudioBadge key={index} onClick={() => handleDeleteTag(index)}>
              {tag}
            </StudioBadge>
          ))}
        <StudioRows labelName="미리보기 이미지">
          <StudioImageInput setImage={(file) => setFormData((prev) => ({ ...prev, previewImage: file }))}>
            <StudioImageInput.Upload />
            <StudioImageInput.Preview />
            <StudioImageInput.Controls />
          </StudioImageInput>
        </StudioRows>
        <StudioUpdateButton type="submit">업데이트</StudioUpdateButton>
      </div>
    </form>
  );
};

export default MyStudioForm;
