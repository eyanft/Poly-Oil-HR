import { useState, useMemo } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BlogPostModal from './BlogPostModal';

import huileImg from "../assets/huile.png";
import bannerB1 from "../assets/b1.png";

const POST_IDS = [1, 2, 3] as const;
const POST_IMAGES: Record<number, string> = {
  1: bannerB1,
  2: huileImg,
  3: "https://images.pexels.com/photos/16234303/pexels-photo-16234303.jpeg?_gl=1*19laqby*_ga*MjA4NzAxODgwNi4xNzQ1NDgxMjEz*_ga_8JE65Q40S6*czE3Njk4ODI1MzUkbzQkZzEkdDE3Njk4ODI1OTkkajU5JGwwJGgw",
};

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
}

export default function Blog() {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blogPosts: BlogPost[] = useMemo(() =>
    POST_IDS.map((id) => ({
      id,
      title: t(`blog.posts.${id}.title`),
      summary: t(`blog.posts.${id}.summary`),
      date: t(`blog.posts.${id}.date`),
      image: POST_IMAGES[id],
    })),
    [t]
  );

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('blog.title')}</h2>
            <p className="text-xl text-gray-600">{t('blog.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="200"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.summary}</p>
                  <button
                    onClick={() => handleReadMore(post)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                  >
                    <span>{t('blog.readMore')}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BlogPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
