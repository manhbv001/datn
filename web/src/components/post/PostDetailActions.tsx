'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import { PostActionTypes, PostModel } from '@/models/post';
import postServices from '@/services/post.service';
import { Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import SharePopup from '../common/SharePopup';

export interface IPostDetailActionProps {
  data: PostModel;
}
const PostDetailAction: FC<IPostDetailActionProps> = ({ data }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(data.likes || 0);
  const [dislikes, setDislikes] = useState(data.dislikes || 0);
  const [bookmarks, setBookmarks] = useState(data.bookmarks || 0);
  const [sharePopupVisible, setSharePopupVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const reactPost = (type: PostActionTypes) => {
    if (!user)
      return router.replace(`/sign-in?redirect=${window.location.href}`);
    postServices
      .reactPost(data.id, { type })
      .then((response) => {
        if (response.success) {
          switch (type) {
            case PostActionTypes.Like: {
              setLikes(liked ? likes - 1 : likes + 1);
              setDislikes(disliked ? dislikes - 1 : dislikes);
              setLiked(!liked);
              setDisliked(false);
              break;
            }
            case PostActionTypes.Dislike: {
              setDislikes(disliked ? dislikes - 1 : dislikes + 1);
              setLikes(liked ? likes - 1 : likes);
              setDisliked(!disliked);
              setLiked(false);
              break;
            }
            case PostActionTypes.Bookmark: {
              setBookmarks(bookmarked ? bookmarks - 1 : bookmarks + 1);
              setBookmarked(!bookmarked);
              break;
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user && data) {
      postServices
        .getReactStatus(data.id)
        .then((response) => {
          if (response.success) {
            setLiked(Boolean(response.data.liked));
            setDisliked(Boolean(response.data.disliked));
            setBookmarked(Boolean(response.data.bookmarked));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mt-0 lg:mt-12 flex justify-center lg:justify-start lg:flex-col gap-6">
      {isClient && (
        <SharePopup
          url={window.location.href}
          open={sharePopupVisible}
          onClose={() => setSharePopupVisible(false)}
        />
      )}
      <button
        className="flex items-end opacity-60"
        onClick={() => reactPost(PostActionTypes.Like)}
      >
        {liked ? (
          <AiFillLike
            size={27}
            style={{ paddingBottom: 2, paddingLeft: 1, marginRight: 6 }}
          />
        ) : (
          <AiOutlineLike size={29} style={{ paddingTop: 6, marginRight: 4 }} />
        )}
        {' ' + likes}
      </button>
      <button
        className="flex items-end opacity-60"
        onClick={() => reactPost(PostActionTypes.Dislike)}
      >
        {disliked ? (
          <AiFillDislike
            size={27}
            style={{ paddingBottom: 2, paddingLeft: 1, marginRight: 6 }}
          />
        ) : (
          <AiOutlineDislike
            size={29}
            style={{ paddingTop: 6, marginRight: 4 }}
          />
        )}
        {' ' + dislikes}
      </button>
      <button
        className="flex items-end opacity-60"
        onClick={() => reactPost(PostActionTypes.Bookmark)}
      >
        {bookmarked ? (
          <BsBookmarkFill
            size={24}
            style={{ paddingLeft: 4, marginRight: 10 }}
          />
        ) : (
          <BsBookmark size={24} style={{ paddingLeft: 4, marginRight: 9 }} />
        )}
        {' ' + bookmarks}
      </button>
      <button
        onClick={() => setSharePopupVisible(true)}
        className="flex items-end opacity-60"
      >
        <Tooltip title="Chia sẻ">
          <PiShareFat size={28} style={{ paddingLeft: 4, marginRight: 8 }} />
        </Tooltip>
      </button>
    </div>
  );
};

export default PostDetailAction;
