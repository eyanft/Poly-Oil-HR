import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comment choisir la bonne huile moteur ?",
    summary: "Découvrez les critères essentiels pour sélectionner l'huile moteur adaptée à votre véhicule et optimiser ses performances.",
    date: "15 Mars 2025",
    image: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "L'importance du graissage régulier",
    summary: "Le graissage préventif est crucial pour la longévité de votre véhicule. Apprenez quand et comment effectuer cette maintenance.",
    date: "10 Mars 2025",
    image: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Les innovations dans les lubrifiants automobiles",
    summary: "Explorez les dernières avancées technologiques dans le domaine des lubrifiants et leurs impacts sur la performance des moteurs.",
    date: "5 Mars 2025",
    image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Notre Blog</h2>
          <p className="text-xl text-gray-600">Conseils et actualités sur l'entretien automobile</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group">
                  <span>Lire plus</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
