import { Target, Eye, Award, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Mission() {
  const { t } = useTranslation();
  return (
    <section id="mission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('mission.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('mission.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 rounded-full p-4 mr-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{t('mission.missionTitle')}</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('mission.missionText')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-red-600 rounded-full p-4 mr-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{t('mission.visionTitle')}</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('mission.visionText')}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">{t('mission.valuesTitle')}</h3>
            <p className="text-xl text-blue-100">
              {t('mission.valuesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Award className="h-8 w-8 flex-shrink-0 text-yellow-300" />
              <div>
                <h4 className="text-xl font-bold mb-2">{t('mission.qualityTitle')}</h4>
                <p className="text-blue-100">
                  {t('mission.qualityText')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Leaf className="h-8 w-8 flex-shrink-0 text-green-300" />
              <div>
                <h4 className="text-xl font-bold mb-2">{t('mission.environmentTitle')}</h4>
                <p className="text-blue-100">
                  {t('mission.environmentText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
