import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function ArticlePage({
  params,
}: {
  params: { title: string };
}) {
  // Destructure params directly
  const { title } = params;

  // Decode the title from the URL
  const decodedTitle = decodeURIComponent(title);

  // Fetch the article from Supabase
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('title', decodedTitle)
    .single();

  // Handle errors or missing articles
  if (error || !article) {
    console.error('Error fetching article:', error);
    return notFound();
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>{article.writer}</span> on{' '}
        <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
      <Image
        src={article.image_url}
        alt={article.title}
        width={1200} // Set appropriate width
        height={400} // Set appropriate height
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-700">{article.content}</p>
    </div>
  );
}