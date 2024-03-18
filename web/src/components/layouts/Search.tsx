'use client';
import { useRouter } from 'next/navigation';
import { FC, KeyboardEvent, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { HiOutlineSearch } from 'react-icons/hi';

export interface ISearchProps {}
const Search: FC<ISearchProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    const value = (event.target as any).value;
    router.push(`/posts?search=${value}`);
  };

  return (
    <>
      {isOpen && (
        <input
          autoFocus
          className="mr-2 text-sm outline-none border-b px-2 h-[32px]"
          onKeyDown={handleEnterPress}
        />
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
        {isOpen ? (
          <GrClose style={{ opacity: 0.5 }} />
        ) : (
          <HiOutlineSearch style={{ fontSize: 20 }} />
        )}
      </button>
    </>
  );
};

export default Search;
