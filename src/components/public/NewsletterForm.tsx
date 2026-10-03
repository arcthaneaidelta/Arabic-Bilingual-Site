import React, { useState } from 'react';
import { Mail, Check, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useT, useLang } from '../../i18n/useT';
import { useUiStore } from '../../store/uiStore';

interface NewsletterFormProps {
  variant?: 'band' | 'inline' | 'compact';
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ variant = 'band' }) => {
  const { t } = useT();
  const lang = useLang();
  const { showToast } = useUiStore();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage(lang === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صالح.' : 'Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      if (email.toLowerCase().includes('taken@demo.sa')) {
        setStatus('already');
        showToast(
          lang === 'ar' ? 'أنت مسجل بالفعل' : 'Already Subscribed',
          lang === 'ar' ? t.newsletter.already : 'You are already registered on our list.',
          'info'
        );
      } else if (email.toLowerCase().includes('fail')) {
        setStatus('error');
        setErrorMessage(
          lang === 'ar'
            ? 'خطأ في الاتصال بخدمة Brevo. يرجى المحاولة لاحقاً.'
            : 'Connection error with Brevo API. Please try again.'
        );
        showToast('Brevo API Error', 'Simulated network failure', 'error');
      } else {
        setStatus('success');
        showToast(
          lang === 'ar' ? 'تم الاشتراك بنجاح' : 'Subscribed Successfully',
          t.newsletter.success,
          'success'
        );
      }
    }, 900);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="w-full text-start">
        <h5 className="font-headline font-semibold text-sm text-[#EAE6DB] mb-1">
          {t.newsletter.compactTitle}
        </h5>
        <p className="text-xs text-[#76827E] mb-2.5 font-arabic">
          {t.newsletter.sub}
        </p>

        {status === 'success' ? (
          <div className="p-2.5 bg-[#3F7D58]/20 border border-[#3F7D58] rounded text-xs text-[#EAE6DB] flex items-center gap-2">
            <Check size={16} className="text-[#3F7D58]" />
            <span>{t.newsletter.success}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="px-3 py-1.5 text-xs bg-[#16241F] text-[#EAE6DB] border border-[#1F4D45] rounded focus:outline-none focus:border-[#B08A4A] placeholder:text-[#76827E]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-3 py-1.5 text-xs font-semibold bg-[#B08A4A] text-[#0F1A18] hover:bg-[#C29D5D] rounded transition-colors"
            >
              {status === 'loading' ? '...' : t.newsletter.cta}
            </button>
          </div>
        )}
      </form>
    );
  }

  // Variant: Band (Homepage full dark band)
  return (
    <section className="py-14 bg-[#0F1A18] text-[#EAE6DB] border-y border-[#1F4D45]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[#16241F] border border-[#B08A4A]/40 text-[#B08A4A] text-xs font-mono mb-4">
            <Mail size={12} />
            <span>Brevo Newsletter Integration</span>
          </div>

          <h2 className="font-headline font-semibold text-2xl sm:text-3xl text-[#EAE6DB] mb-2">
            {t.newsletter.title}
          </h2>
          <p className="text-sm text-[#CFC8B8] mb-6 font-arabic max-w-lg mx-auto">
            {t.newsletter.sub}
          </p>

          {status === 'success' ? (
            <div className="p-4 bg-[#16241F] border border-[#3F7D58] rounded-md text-sm text-[#EAE6DB] flex items-center justify-center gap-3 animate-in fade-in">
              <Check className="w-5 h-5 text-[#3F7D58]" />
              <span className="font-arabic">{t.newsletter.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder={t.newsletter.placeholder}
                  className={`w-full px-4 py-2.5 bg-[#16241F] text-[#EAE6DB] text-sm border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B08A4A] placeholder:text-[#76827E] transition-all ${
                    status === 'error'
                      ? 'border-[#B5473A]'
                      : 'border-[#1F4D45] hover:border-[#2F6B74]'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2.5 bg-[#B08A4A] text-[#0F1A18] hover:bg-[#C29D5D] active:bg-[#9B773E] font-semibold text-sm rounded-sm transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#0F1A18]" />
                ) : (
                  <span>{t.newsletter.cta}</span>
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-xs text-[#B5473A] mt-2 flex items-center justify-center gap-1">
              <AlertCircle size={14} />
              <span>{errorMessage}</span>
            </p>
          )}

          {status === 'already' && (
            <p className="text-xs text-[#B08A4A] mt-2 flex items-center justify-center gap-1">
              <Info size={14} />
              <span>{t.newsletter.already}</span>
            </p>
          )}

          <div className="text-[11px] font-mono text-[#76827E] mt-4">
            Test triggers: <span className="text-[#B08A4A]">taken@demo.sa</span> (already) | <span className="text-[#B5473A]">fail@demo.sa</span> (error)
          </div>
        </div>
      </div>
    </section>
  );
};
