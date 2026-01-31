import CategoryDetailPage from '../../../components/pages/CategoryDetailPage';

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryDetailPage params={params} />;
}
