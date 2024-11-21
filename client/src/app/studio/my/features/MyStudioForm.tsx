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
import { updateInfo } from '@libs/actions';

interface MyStudioFormProps {
  onSubmit: (FormData: MyStudioFormData) => void;
}

interface MyStudioFormData {
  title: string;
  contentCategory: string;
  moodCategory: string;
  tags: string[];
  thumbnail?: string | null;
}

const MyStudioForm = ({ onSubmit }: MyStudioFormProps) => {
  const [formData, setFormData] = useState<MyStudioFormData>({
    title: '',
    contentCategory: '',
    moodCategory: '',
    tags: [],
    thumbnail: null,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTag = () => {
    if (tagInput && tags.length < 5) {
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

  const UpdateInfo = async () => {
    try {
      await updateInfo(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full space-y-8 p-[30px]">
        <StudioRows labelName="방송 제목">
          <TextareaRendererForTest setText={(text) => setFormData((prev) => ({ ...prev, title: text }))} />
        </StudioRows>
        <StudioRows labelName="카테고리">
          <StudioDropdownRendererForTest
            setData={(category) => setFormData((prev) => ({ ...prev, contentCategory: category }))}
          />
        </StudioRows>
        <StudioRows labelName="분위기">
          <StudioDropdownRendererForTest setData={(mood) => setFormData((prev) => ({ ...prev, moodCategory: mood }))} />
        </StudioRows>
        <StudioRows componentType="TAG" labelName="태그">
          <div className="flex-1">
            <StudioInput
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 입력하세요"
            />
          </div>
          <StudioAddButton
            onClick={() => {
              handleAddTag();
            }}
          >
            추가
          </StudioAddButton>
        </StudioRows>
        <StudioRows labelName="">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <div className="mr-1 inline-flex">
                <StudioBadge key={index} onClick={() => handleDeleteTag(index)}>
                  {tag}
                </StudioBadge>
              </div>
            ))}
        </StudioRows>
        <StudioRows labelName="미리보기 이미지">
          <StudioImageInput setImage={(file) => setFormData((prev) => ({ ...prev, thumbnail: file }))}>
            <StudioImageInput.Upload />
            <StudioImageInput.Preview />
            <StudioImageInput.Controls />
          </StudioImageInput>
        </StudioRows>
        <StudioUpdateButton type="submit" onClick={UpdateInfo}>
          업데이트
        </StudioUpdateButton>
      </div>
    </form>
  );
};

export default MyStudioForm;
