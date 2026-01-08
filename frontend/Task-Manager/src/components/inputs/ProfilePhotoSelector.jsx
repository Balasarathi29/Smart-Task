import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const [prevUrl, setPrevUrl] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPrevUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPrevUrl(null);
  };

  const handleChooseImage = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    return () => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
    };
  }, [prevUrl]);

  return (
    <div className="flex justify-center mb-8">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex justify-center items-center rounded-full bg-blue-100/50 relative cursor-pointer">
          <LuUser className="text-4xl text-primary" />
          <button
            className="w-8 h-8 absolute flex items-center justify-center rounded-full bg-primary text-white -right-1 -bottom-1 cursor-pointer"
            type="button"
            onClick={handleChooseImage}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={prevUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            className="w-8 h-8 absolute flex items-center justify-center rounded-full bg-red-500 text-white -right-1 -bottom-1 cursor-pointer"
            type="button"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
