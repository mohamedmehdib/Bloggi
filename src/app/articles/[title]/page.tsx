import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: { title: string } }) {
  // Assurez-vous que `params` est bien awaited avant d'accéder à ses propriétés
  const { title } = await params;

  // Décoder le titre depuis l'URL
  const decodedTitle = decodeURIComponent(title);

  // Récupérer l'article depuis Supabase
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("title", decodedTitle)
    .single();

  if (error || !article) {
    return notFound();
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>{article.writer}</span> on <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
      <img src={article.image_url} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <p className="text-lg text-gray-700">{article.content}</p>
    </div>
  );
}
