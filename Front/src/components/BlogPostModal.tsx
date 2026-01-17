import { X, Calendar, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
  content?: string;
  sections?: { title: string; content: string }[];
}

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogPostModal({ post, isOpen, onClose }: BlogPostModalProps) {
  const { t } = useTranslation();
  if (!isOpen || !post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">Article de blog</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={t('common.close')}
          >
            <X className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Header Image */}
          <div className="mb-6 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
              decoding="async"
              width="800"
              height="400"
            />
          </div>

          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{post.summary}</p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {post.content && (
              <div className="text-gray-700 leading-relaxed mb-8">
                <p className="text-lg mb-4">{post.content}</p>
              </div>
            )}

            {post.sections && post.sections.map((section, index) => (
              <div key={index} className="mb-8 pb-6 border-b border-gray-200 last:border-b-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-blue-600">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Besoin de conseils personnalisés ?</h3>
            <p className="text-gray-600 mb-4">
              Contactez nos experts pour obtenir des recommandations adaptées à votre véhicule.
            </p>
            <button
              onClick={() => {
                onClose();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Nous contacter
            </button>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Retour aux articles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

