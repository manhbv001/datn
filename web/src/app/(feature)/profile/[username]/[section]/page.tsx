import PostList from '@/components/common/PostList';
import ProfileFollowSection from '@/components/profile/FollowSection';
import { PROFILE_MENU } from '@/components/profile/data';
import postServices from '@/services/post.service';
import userServices from '@/services/user.service';
import { notFound } from 'next/navigation';

interface IProfileSectionProps {
  params: {
    section: string;
    username: string;
  };
}

async function ProfileSection(props: IProfileSectionProps) {
  const section = props.params.section;
  const username = props.params.username;
  const { data: profile } = await userServices.getUserProfile(username);

  if (PROFILE_MENU.every((item) => item.path !== props.params.section)) {
    return notFound();
  }

  if (section === 'posts') {
    const {
      data: { posts },
    } = await postServices.getAuthorPosts(profile.id);

    return <PostList data={posts} />;
  } else if (section === 'followers') {
    return <ProfileFollowSection profileId={profile.id} type="follower" />;
  } else if (section === 'followings') {
    return <ProfileFollowSection profileId={profile.id} type="following" />;
  }

  return <div>{props.params.section}</div>;
}

export default ProfileSection;
