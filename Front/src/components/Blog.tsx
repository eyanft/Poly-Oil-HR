import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import BlogPostModal from './BlogPostModal';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
  content?: string;
  sections?: { title: string; content: string }[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comment choisir la bonne huile moteur ?",
    summary: "Découvrez les critères essentiels pour sélectionner l'huile moteur adaptée à votre véhicule et optimiser ses performances.",
    date: "15 Mars 2025",
    image: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "Choisir la bonne huile moteur est essentiel pour garantir la longévité et les performances optimales de votre véhicule. Avec tant d'options disponibles sur le marché, il peut être difficile de savoir quelle huile convient le mieux à votre moteur. Dans cet article, nous vous guidons à travers les critères essentiels à prendre en compte lors de la sélection de votre huile moteur.",
    sections: [
      {
        title: "Comprendre la viscosité",
        content: "La viscosité est l'un des facteurs les plus importants à considérer. Elle est indiquée par des codes comme 5W-30, 10W-40 ou 20W-50. Le premier nombre (précédé de W pour Winter/hiver) indique la fluidité de l'huile à froid, tandis que le second nombre indique sa viscosité à chaud.\n\n• 5W-30 : Idéale pour les climats froids, offre une excellente fluidité à froid\n• 10W-40 : Polyvalente, convient à la plupart des conditions climatiques\n• 20W-50 : Recommandée pour les climats chauds et les moteurs anciens"
      },
      {
        title: "Les normes API et ACEA",
        content: "Les normes API (American Petroleum Institute) et ACEA (Association des Constructeurs Européens d'Automobiles) garantissent la qualité et la compatibilité de l'huile avec votre moteur.\n\n• API SN : Norme actuelle pour les moteurs essence modernes\n• API CF : Pour les moteurs diesel\n• ACEA A3/B3 : Pour les moteurs essence et diesel haute performance\n\nConsultez toujours le manuel de votre véhicule pour connaître les normes recommandées par le constructeur."
      },
      {
        title: "Type d'huile : Minérale, Semi-synthétique ou Synthétique",
        content: "Le type d'huile détermine ses performances et sa durée de vie :\n\n• Huile minérale : Économique, convient aux moteurs anciens avec des intervalles de vidange courts\n• Semi-synthétique : Bon compromis qualité/prix, offre une meilleure protection que la minérale\n• 100% Synthétique : Performance maximale, intervalles de vidange plus longs, protection optimale même dans des conditions extrêmes"
      },
      {
        title: "Quand changer l'huile ?",
        content: "Les intervalles de vidange varient selon plusieurs facteurs :\n\n• Moteurs essence : Tous les 10 000 à 15 000 km ou une fois par an\n• Moteurs diesel : Tous les 7 000 à 10 000 km\n• Conduite urbaine intensive : Réduire les intervalles de 20%\n• Conduite sportive : Réduire les intervalles de 30%\n\nN'oubliez pas de vérifier régulièrement le niveau d'huile entre les vidanges et d'utiliser un filtre à huile de qualité."
      },
      {
        title: "Conseils pratiques",
        content: "• Consultez toujours le manuel de votre véhicule pour les recommandations spécifiques\n• Utilisez la même marque et le même type d'huile à chaque vidange\n• Ne mélangez jamais différents types d'huile\n• Vérifiez le niveau d'huile mensuellement\n• Gardez une bouteille d'huile de secours dans votre coffre\n• En cas de doute, consultez un professionnel"
      }
    ]
  },
  {
    id: 2,
    title: "L'importance du graissage régulier",
    summary: "Le graissage préventif est crucial pour la longévité de votre véhicule. Apprenez quand et comment effectuer cette maintenance.",
    date: "10 Mars 2025",
    image: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "Le graissage régulier est une opération de maintenance préventive souvent négligée, mais qui joue un rôle crucial dans la longévité et le bon fonctionnement de votre véhicule. Les points de graissage permettent de réduire l'usure, les frottements et les bruits, tout en améliorant les performances globales de votre automobile.",
    sections: [
      {
        title: "Pourquoi le graissage est essentiel",
        content: "Le graissage prévient l'usure prématurée des pièces mécaniques en créant une couche protectrice entre les surfaces métalliques. Sans graissage adéquat :\n\n• Les pièces s'usent plus rapidement\n• Les frottements augmentent la consommation de carburant\n• Les bruits et vibrations s'intensifient\n• Les réparations deviennent plus coûteuses\n• La sécurité peut être compromise"
      },
      {
        title: "Points de graissage à vérifier",
        content: "Plusieurs éléments de votre véhicule nécessitent un graissage régulier :\n\n• Cardans et transmissions : Tous les 20 000 km ou lors de bruits anormaux\n• Charnières de portes : Tous les 6 mois pour éviter les grincements\n• Système de direction : Vérification lors de chaque révision\n• Articulations de suspension : Tous les 15 000 à 20 000 km\n• Câbles de frein et d'embrayage : Vérification annuelle\n• Serrures et mécanismes d'ouverture : Tous les 3 mois"
      },
      {
        title: "Types de graisses et leurs applications",
        content: "Chaque type de graisse a ses spécificités :\n\n• Graisse lithium EP2 : Usage général, résistante à l'eau et aux températures modérées\n• Graisse haute température : Pour les freins et zones très chaudes\n• Graisse silicone : Pour les joints en caoutchouc et les joints d'étanchéité\n• Graisse marine : Pour les véhicules exposés à l'humidité\n\nConsultez toujours les spécifications du constructeur avant d'appliquer une graisse."
      },
      {
        title: "Signes indiquant un besoin de graissage",
        content: "Soyez attentif à ces signaux d'alarme :\n\n• Grincements lors de l'ouverture des portes\n• Bruits métalliques provenant de la suspension\n• Difficulté à tourner le volant\n• Vibrations anormales\n• Augmentation de la consommation de carburant\n• Usure prématurée des pneus\n\nSi vous remarquez ces symptômes, consultez rapidement un professionnel."
      },
      {
        title: "Maintenance préventive",
        content: "Un programme de graissage régulier peut considérablement prolonger la vie de votre véhicule :\n\n• Planifiez un graissage complet tous les 10 000 km\n• Vérifiez les niveaux de graisse lors de chaque révision\n• Utilisez des produits de qualité conformes aux normes\n• Nettoyez les zones avant d'appliquer la graisse\n• Documentez vos interventions dans le carnet d'entretien\n\nInvestir dans la maintenance préventive est toujours plus économique que les réparations d'urgence."
      }
    ]
  },
  {
    id: 3,
    title: "Les innovations dans les lubrifiants automobiles",
    summary: "Explorez les dernières avancées technologiques dans le domaine des lubrifiants et leurs impacts sur la performance des moteurs.",
    date: "5 Mars 2025",
    image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: "L'industrie des lubrifiants automobiles connaît une révolution technologique sans précédent. Les innovations récentes transforment non seulement les performances des moteurs, mais aussi leur impact environnemental. Découvrez comment les dernières avancées technologiques révolutionnent le domaine des lubrifiants automobiles.",
    sections: [
      {
        title: "Technologies de synthèse avancées",
        content: "Les huiles synthétiques modernes utilisent des technologies de pointe :\n\n• Technologie ESTER : Offre une protection supérieure à très haute température et une meilleure stabilité\n• Formulations à base de polyalphaoléfines (PAO) : Performance exceptionnelle dans des conditions extrêmes\n• Additifs nanotechnologiques : Réduisent significativement les frottements\n• Formulations hybrides : Combinent les avantages de plusieurs technologies\n\nCes innovations permettent des intervalles de vidange plus longs tout en maintenant une protection optimale."
      },
      {
        title: "Lubrifiants écologiques et durables",
        content: "L'industrie s'oriente vers des solutions plus respectueuses de l'environnement :\n\n• Huiles biosourcées : Produites à partir de ressources renouvelables\n• Formulations réduisant les émissions : Contribuent à réduire les particules fines\n• Recyclabilité améliorée : Processus de recyclage plus efficaces\n• Réduction des déchets : Intervalles de vidange plus longs\n\nCes innovations répondent aux exigences environnementales croissantes tout en maintenant les performances."
      },
      {
        title: "Intelligence et connectivité",
        content: "Les lubrifiants intelligents intègrent des capteurs et des systèmes de monitoring :\n\n• Capteurs de qualité d'huile : Analyse en temps réel de l'état de l'huile\n• Systèmes de suivi prédictif : Alertent avant les problèmes\n• Applications mobiles : Suivi de l'entretien et recommandations\n• Compatibilité IoT : Intégration avec les systèmes de diagnostic du véhicule\n\nCes technologies permettent une maintenance prédictive et optimisée."
      },
      {
        title: "Performance et économie de carburant",
        content: "Les nouvelles formulations offrent des avantages mesurables :\n\n• Réduction de la consommation : Jusqu'à 5% d'économie de carburant\n• Protection améliorée : Réduction de l'usure jusqu'à 30%\n• Viscosité adaptative : S'adapte aux conditions de conduite\n• Nettoyage actif : Maintient le moteur propre plus longtemps\n\nCes améliorations se traduisent par des économies significatives sur le long terme."
      },
      {
        title: "L'avenir des lubrifiants",
        content: "Les tendances futures incluent :\n\n• Lubrifiants pour véhicules électriques : Besoins spécifiques des moteurs électriques\n• Formulations pour moteurs hybrides : Adaptation aux deux types de motorisation\n• Recherche sur les matériaux : Nouvelles bases huileuses encore plus performantes\n• Personnalisation : Formulations adaptées à chaque type de conduite\n\nL'industrie continue d'évoluer pour répondre aux défis futurs de l'automobile."
      }
    ]
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <>
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
                  <button
                    onClick={() => handleReadMore(post)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                  >
                    <span>Lire plus</span>
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
