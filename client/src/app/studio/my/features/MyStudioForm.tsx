import { FormEvent, useEffect, useState } from 'react';
import StudioAddButton from '@components/studio/StudioAddButton';
import StudioUpdateButton from '@components/studio/StudioUpdateButton';
import StudioRows from './StudioRows';

import { TextareaRendererForTest } from '@components/studio/StudioTextarea';
import StudioImageInput from '@components/studio/StudioImageInput';
import StudioInput from '@components/studio/StudioInput';
import StudioBadge from '@components/studio/StudioBadge';
import { getPlaylist, updateInfo } from '@libs/actions';
import useUserContext from '@hooks/useUserContext';
import StudioCategoryDropdown from '@components/studio/StudioCategoryDropdown';
import StudioMoodDropdown from '@components/studio/StudioMoodDropdown';

interface MyStudioFormProps {
  onSubmit: (FormData: MyStudioFormData) => void;
}

export interface MyStudioFormData {
  title: string;
  contentCategory: string;
  moodCategory: string;
  tags: string[];
  thumbnail?: string | null;
}

const MyStudioForm = ({ onSubmit }: MyStudioFormProps) => {
  const { userSession } = useUserContext();
  const myId = userSession?.user?.broadcastId;

  useEffect(() => {
    if (myId) {
      getMyStudioFormData(myId);
    }
  }, [myId]);

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

  const trimmingInputBlank = (input: string) => {
    const trimmedInput = input.trim().replace(/\s+/g, ' ');

    return trimmedInput;
  };

  const handleAddTag = (trimmedInput: string) => {
    if (trimmedInput && tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (index: number) => {
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

  const getMyStudioFormData = async (data: string) => {
    try {
      const myStudioData = await getPlaylist(data);
      await setFormData({
        title: myStudioData.broadcastData.title,
        contentCategory: myStudioData.broadcastData.contentCategory,
        moodCategory: myStudioData.broadcastData.moodCategory,
        tags: myStudioData.broadcastData.tags,
        thumbnail: myStudioData.broadcastData.thumbnailUrl || '',
      });
      await setTags(myStudioData.broadcastData.tags);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full p-[30px]">
        <StudioRows labelName="방송 제목">
          <TextareaRendererForTest
            text={formData.title}
            setText={(text) => setFormData((prev) => ({ ...prev, title: text }))}
          />
        </StudioRows>
        <StudioRows labelName="카테고리">
          <StudioCategoryDropdown
            placeHolder="카테고리 검색"
            data={formData.contentCategory}
            setData={(category) => setFormData((prev) => ({ ...prev, contentCategory: category }))}
          />
        </StudioRows>
        <StudioRows labelName="분위기">
          <StudioMoodDropdown
            placeHolder="분위기 검색"
            data={formData.moodCategory}
            setData={(mood) => setFormData((prev) => ({ ...prev, moodCategory: mood }))}
          />
        </StudioRows>
        <StudioRows componentType="TAG" labelName="태그">
          <div className="flex-1">
            <StudioInput
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그 입력 후 Enter 혹은 추가"
              maxLength={15}
            />
          </div>
          <StudioAddButton
            onClick={() => {
              handleAddTag(trimmingInputBlank(tagInput));
            }}
          >
            추가
          </StudioAddButton>
        </StudioRows>
        {tags.length > 0 && (
          <StudioRows labelName="" componentType="TAG_WRAPPER">
            {tags.map((tag, index) => (
              <div className="mr-1 inline-flex" key={index}>
                <StudioBadge onClick={() => handleDeleteTag(index)}>{tag}</StudioBadge>
              </div>
            ))}
          </StudioRows>
        )}
        <StudioRows labelName="" componentType="TAG">
          <div className="flex flex-col">
            <p className="text-content-neutral-weak funch-medium12">
              {'· ' + '공백 없이 15자까지 입력할 수 있습니다.'}
            </p>
            <p className="text-content-neutral-weak funch-medium12">
              {'· ' + '등록한 순서대로 방송 정보에 노출됩니다.'}
            </p>
          </div>
        </StudioRows>
        <StudioRows labelName="미리보기 이미지" componentType="IMAGE_INPUT">
          <StudioImageInput setImage={(file) => setFormData((prev) => ({ ...prev, thumbnail: file }))}>
            <StudioImageInput.Upload />
            <StudioImageInput.Preview />
            <StudioImageInput.Controls />
          </StudioImageInput>
        </StudioRows>
        <StudioRows labelName="" componentType="TAG">
          <div className="flex flex-col">
            <p className="text-content-neutral-weak funch-medium12">
              {'· ' + '이미지는 최대 2MB까지 업로드 가능합니다.'}
            </p>
          </div>
        </StudioRows>
        <StudioUpdateButton type="submit" onClick={UpdateInfo} data={formData}>
          업데이트
        </StudioUpdateButton>
      </div>
    </form>
  );
};

export default MyStudioForm;
