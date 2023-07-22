'use client';

import Image from 'next/image';

interface AvatarProp {
  imgUrl?: string | null;
}

const Avatar = ({ imgUrl }: AvatarProp) => {
  return (
    <Image
      src={`${imgUrl || '/images/placeholder.jpeg'}`}
      alt="avatar"
      className="rounded-full"
      width={30}
      height={30}
    />
  );
};
export default Avatar;
