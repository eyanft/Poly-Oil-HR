import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendQuoteRequest } from '../services/quote';

type Product = { name: string } | null;

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  productName: '',
  message: '',
};

export default function QuoteFormModal({ isOpen, onClose, product }: QuoteFormModalProps) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const productName = product?.name ?? '';

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, productName: product?.name ?? '' }));
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen, product?.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleClose = () => {
    setForm({ ...initialForm, productName });
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      await sendQuoteRequest({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        company: form.company.trim() || undefined,
        productName: form.productName.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : t('quoteForm.errorGeneric'));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">{t('quoteForm.title')}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={t('common.close')}
          >
            <X className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {status === 'success' && (
            <div className="p-4 bg-green-50 text-green-800 rounded-lg" role="alert">
              {t('quoteForm.successMessage')}
            </div>
          )}
          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-800 rounded-lg" role="alert">
              {errorMessage}
            </div>
          )}

          <div>
            <label htmlFor="quote-name" className="block text-gray-700 font-medium mb-1">
              {t('quoteForm.fullName')} <span className="text-red-500">*</span>
            </label>
            <input
              id="quote-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder={t('quoteForm.fullNamePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="quote-email" className="block text-gray-700 font-medium mb-1">
              {t('quoteForm.email')} <span className="text-red-500">*</span>
            </label>
            <input
              id="quote-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder={t('quoteForm.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="quote-phone" className="block text-gray-700 font-medium mb-1">
              {t('quoteForm.phone')}
            </label>
            <input
              id="quote-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder={t('quoteForm.phonePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="quote-company" className="block text-gray-700 font-medium mb-1">
              {t('quoteForm.company')}
            </label>
            <input
              id="quote-company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder={t('quoteForm.companyPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="quote-product" className="block text-gray-700 font-medium mb-1">
              {t('quoteForm.product')}
            </label>
            <input
              id="quote-product"
              type="text"
              name="productName"
              value={form.productName || productName}
              onChange={handleChange}
              readOnly={!!productName}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50"
              placeholder={t('quoteForm.productPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="quote-message" className="block text-gray-700 font-medium mb-1">
              {t('quoteForm.message')}
            </label>
            <textarea
              id="quote-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
              placeholder={t('quoteForm.messagePlaceholder')}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-bold disabled:opacity-70 min-h-[44px]"
            >
              {status === 'sending' ? t('quoteForm.sending') : t('quoteForm.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
