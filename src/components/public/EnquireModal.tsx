import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useT, useLang } from '../../i18n/useT';

export const EnquireModal: React.FC = () => {
  const { enquireModalOpen, closeEnquire, selectedOpportunity, showToast } = useUiStore();
  const { t } = useT();
  const lang = useLang();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [market, setMarket] = useState('saudi');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!enquireModalOpen) return null;

  const brandName = selectedOpportunity
    ? lang === 'ar'
      ? selectedOpportunity.brand_name.ar
      : selectedOpportunity.brand_name.en
    : 'العلامة التجارية';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      setError(lang === 'ar' ? 'يرجى تعبئة كافة الحقول المطلوبة.' : 'Please fill all required fields.');
      return;
    }
    if (message.trim().length < 10) {
      setError(
        lang === 'ar'
          ? 'يرجى كتابة رسالة توضيحية لا تقل عن 10 أحرف.'
          : 'Please enter a message of at least 10 characters.'
      );
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      showToast(
        lang === 'ar' ? 'تم استلام طلب الامتياز' : 'Enquiry Sent Successfully',
        lang === 'ar'
          ? `تم توجيه طلبك بنجاح لممثل امتياز ${brandName}.`
          : `Your request has been forwarded to the franchise representative of ${brandName}.`,
        'success'
      );
      closeEnquire();
    }, 700);
  };

  const marketOptions = [
    { value: 'saudi', label: lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    { value: 'uae', label: lang === 'ar' ? 'دولة الإمارات العربية المتحدة' : 'United Arab Emirates' },
    { value: 'kuwait', label: lang === 'ar' ? 'دولة الكويت' : 'Kuwait' },
    { value: 'qatar', label: lang === 'ar' ? 'دولة قطر' : 'Qatar' },
    { value: 'oman', label: lang === 'ar' ? 'سلطنة عُمان' : 'Oman' },
    { value: 'bahrain', label: lang === 'ar' ? 'مملكة البحرين' : 'Bahrain' },
  ];

  return (
    <Modal
      isOpen={enquireModalOpen}
      onClose={closeEnquire}
      title={`${t.opportunitiesPage.modalTitle}: ${brandName}`}
      subtitle={t.opportunitiesPage.modalSub}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-start">
        <Input
          label={t.opportunitiesPage.formName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. ناصر القحطاني / Nasser Al-Qahtani"
          required
        />

        <Input
          label={t.opportunitiesPage.formCompany}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. مجموعة الضو للاستثمار / Al-Dhow Group"
          required
        />

        <Input
          label={t.opportunitiesPage.formEmail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. investment@aldhow.com"
          required
        />

        <Select
          label={t.opportunitiesPage.formMarket}
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          options={marketOptions}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#14201D]">
            {t.opportunitiesPage.formMessage}
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'حدد خطة التوسع وعدد الفروع المستهدفة والقدرة المالية التقديرية...'
                : 'Outline your expansion plan, target unit rollout, and capital readiness...'
            }
            className="w-full px-3.5 py-2 text-sm bg-white text-[#14201D] border border-[#CFC8B8] rounded-sm focus:outline-none focus:border-[#1F4D45] focus:ring-2 focus:ring-[#E5EEEB] placeholder:text-[#76827E]"
          />
        </div>

        {error && <p className="text-xs text-[#B5473A]">{error}</p>}

        <div className="pt-3 border-t border-[#E4DFD3] flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" onClick={closeEnquire}>
            {t.common.cancel}
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {t.opportunitiesPage.formSubmit}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
