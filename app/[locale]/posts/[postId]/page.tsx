import PostDetailPage from '../../../components/pages/PostDetailPage';

export default function Page({ params }: { params: { postId: string } }) {
  return <PostDetailPage params={params} />;
}
