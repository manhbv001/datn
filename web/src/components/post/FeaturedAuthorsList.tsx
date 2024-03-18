'use client';
import { UserModel } from '@/models/user';
import userServices from '@/services/user.service';
import { FC, useEffect, useState } from 'react';
import AuthorItem from '../common/AuthorItem';

export interface IFeaturedAuthorsListProps {}
const FeaturedAuthorsList: FC<IFeaturedAuthorsListProps> = () => {
  const [authors, setAuthors] = useState<UserModel[]>([]);

  useEffect(() => {
    userServices.getFeaturedAuthors().then((response) => {
      if (response.success) setAuthors(response.data);
    });
  }, []);

  return (
    <ul className="flex flex-col gap-8">
      {authors.map((author) => (
        <li key={`featured_author_${author.id}`}>
          <AuthorItem data={author} />
        </li>
      ))}
    </ul>
  );
};

export default FeaturedAuthorsList;
