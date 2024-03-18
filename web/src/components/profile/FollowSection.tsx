'use client';

import { UserModel } from '@/models/user';
import userServices from '@/services/user.service';
import { FC, useEffect, useState } from 'react';
import AuthorItem from '../common/AuthorItem';

export interface IProfileFollowSectionProps {
  profileId: number;
  type: 'follower' | 'following';
}
const ProfileFollowSection: FC<IProfileFollowSectionProps> = ({
  profileId,
  type,
}) => {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (type === 'follower') {
        const { data: followers } = await userServices.getProfileFollowers(
          profileId,
        );
        setUsers(followers);
      } else if (type === 'following') {
        const { data: followers } = await userServices.getProfileFollowings(
          profileId,
        );
        setUsers(followers);
      }
    }
    fetchData();
  }, [profileId, type]);

  return (
    <ul className="grid grid-cols-2 gap-y-10 gap-x-16">
      {users.map((user) => (
        <li key={`profile-followers-${user.id}`} className="col-span-1">
          <AuthorItem data={user} />
        </li>
      ))}
    </ul>
  );
};

export default ProfileFollowSection;
