export interface Drawing {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
  likesCount: number;
  commentsCount: number;
}