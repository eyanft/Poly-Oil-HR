import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact.successMessage'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.sendMessage')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  {t('contact.fullName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder={t('contact.fullNamePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder={t('contact.subjectPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2"
              >
                <span>{t('contact.sendButton')}</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.location')}</h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6261.748834788783!2d9.912615391083442!3d36.722419723726645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd293e4289399b%3A0x652e0524247b35d!2sSte%20poly%20oil%20plus!5e0!3m2!1sfr!2stn!4v1737063075803!5m2!1sfr!2stn"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <Mail className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{t('contact.emailLabel')}</span>
          </div>
          <div className={`flex items-center justify-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Phone className={`h-6 w-6 text-red-600 flex-shrink-0 ${i18n.language === 'ar' ? 'ml-3' : 'mr-3'}`} />
            <span className="text-gray-700 font-medium">{t('contact.phoneLabel')}</span>
          </div>
          <div className={`flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <MapPin className={`h-6 w-6 text-blue-600 flex-shrink-0 ${i18n.language === 'ar' ? 'ml-3' : 'mr-3'}`} />
            <span className="text-gray-700 font-medium text-center">{i18n.language === 'ar' ? t('contact.addressLabelAr') : t('contact.addressLabel')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
