import type { Chat } from '@libs/internalTypes';

export const mockedChats: Chat[] = [
  // 30개 만들어줘
  ...Array.from({ length: 30 }, (_, index) => ({
    name: `User${index}`,
    content: `Content${index}`,
  })),
];
