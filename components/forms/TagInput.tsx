//@ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function TagInput() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTag = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
      event.preventDefault();
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="w-full rounded-lg  relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tags
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={addTag}
        placeholder="Enter tags..."
        className=" border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />

      <div className="flex flex-wrap gap-2 p-2 rounded-md mt-2">
        {tags.length != 0 &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(index)}
                className="ml-1 text-blue-700 hover:text-blue-900"
              >
                <AiOutlineClose size={14} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

