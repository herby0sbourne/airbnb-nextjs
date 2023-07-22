'use client';

import { useState } from 'react';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

interface UserMenuProps {
  currentUser?: User | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className=" flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar imgUrl={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="My trips" handleClick={() => {}} />
                <MenuItem label="My favorite" handleClick={() => {}} />
                <MenuItem label="My reservations" handleClick={() => {}} />
                <MenuItem label="My properties" handleClick={() => {}} />
                <MenuItem label="Airbnb my home" handleClick={() => {}} />
                <hr />
                <MenuItem label="Logout" handleClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" handleClick={loginModal.onOpen} />
                <MenuItem label="Sign up" handleClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
