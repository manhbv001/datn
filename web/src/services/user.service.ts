import fetcher from '@/libs/fetcher';
import { UpdateAccountPayload, UserModel } from '@/models/user';

const userServices = {
  updateAccount(payload: UpdateAccountPayload) {
    const formdata = new FormData();
    formdata.append('fullname', payload.fullname);
    formdata.append('username', payload.username);
    if (payload.avatar) formdata.append('avatar', payload.avatar);

    return fetcher.clientReq(`users`, {
      method: 'put',
      body: formdata,
      headers: undefined,
    });
  },
  getUserProfile(username: string) {
    return fetcher.serverReq<UserModel>(`users/${username}`, {
      next: {
        revalidate: 60,
      },
    });
  },
  getFeaturedAuthors() {
    return fetcher.clientReq<UserModel[]>(`users/authors`);
  },
  follow(payload: { author_id: number }) {
    return fetcher.clientReq(`users/follow`, {
      body: JSON.stringify(payload),
      method: 'POST',
    });
  },
  followStatus(authorId: number) {
    return fetcher.clientReq<{ followed: boolean }>(
      `users/authors/${authorId}/status`,
    );
  },
  getProfileFollowers(profileId: number) {
    return fetcher.clientReq<UserModel[]>(
      `users/profile/${profileId}/followers`,
    );
  },
  getProfileFollowings(profileId: number) {
    return fetcher.clientReq<UserModel[]>(
      `users/profile/${profileId}/followings`,
    );
  },
};

export default userServices;
