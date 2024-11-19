import { useRef, useState } from 'react';

const useInputFiles = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        if (!imageRef.current) return;

        setFileName(file.name);
        imageRef.current.src = reader.result as string;
      };

      setIsLoaded(true);
    }
  };

  return { imageRef, fileName, isLoaded, handleChangeFile, setIsLoaded };
};

export default useInputFiles;
