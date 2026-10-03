import { create } from 'zustand';
import { ArticleItem } from '../data/articles';
import { OpportunityItem } from '../data/opportunities';

export interface ToastData {
  id: string;
  title: string;
  desc?: string;
  type: 'success' | 'error' | 'info';
}

interface UiState {
  adZonesVisible: boolean;
  acfVisible: boolean;
  demoBannerVisible: boolean;
  searchModalOpen: boolean;
  enquireModalOpen: boolean;
  selectedOpportunity: OpportunityItem | null;
  tourActive: boolean;
  tourStep: number;
  seoDrawerOpen: boolean;
  selectedArticleForSeo: ArticleItem | null;
  toasts: ToastData[];

  toggleAdZones: () => void;
  toggleAcf: () => void;
  dismissBanner: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openEnquire: (opp?: OpportunityItem) => void;
  closeEnquire: () => void;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  skipTour: () => void;
  openSeoDrawer: (article: ArticleItem) => void;
  closeSeoDrawer: () => void;
  showToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  adZonesVisible: false,
  acfVisible: false,
  demoBannerVisible: true,
  searchModalOpen: false,
  enquireModalOpen: false,
  selectedOpportunity: null,
  tourActive: false,
  tourStep: 1,
  seoDrawerOpen: false,
  selectedArticleForSeo: null,
  toasts: [],

  toggleAdZones: () => set((s) => ({ adZonesVisible: !s.adZonesVisible })),
  toggleAcf: () => set((s) => ({ acfVisible: !s.acfVisible })),
  dismissBanner: () => set({ demoBannerVisible: false }),
  openSearch: () => set({ searchModalOpen: true }),
  closeSearch: () => set({ searchModalOpen: false }),
  openEnquire: (opp) => set({ enquireModalOpen: true, selectedOpportunity: opp || null }),
  closeEnquire: () => set({ enquireModalOpen: false, selectedOpportunity: null }),
  startTour: () => set({ tourActive: true, tourStep: 1 }),
  nextTourStep: () => set((s) => ({ tourStep: Math.min(s.tourStep + 1, 5) })),
  prevTourStep: () => set((s) => ({ tourStep: Math.max(s.tourStep - 1, 1) })),
  skipTour: () => set({ tourActive: false }),
  openSeoDrawer: (article) => set({ seoDrawerOpen: true, selectedArticleForSeo: article }),
  closeSeoDrawer: () => set({ seoDrawerOpen: false }),
  showToast: (title, desc, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((s) => ({
      toasts: [...s.toasts, { id, title, desc, type }],
    }));
    setTimeout(() => {
      set((s) => ({
        toasts: s.toasts.filter((t) => t.id !== id),
      }));
    }, 4500);
  },
  removeToast: (id) =>
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    })),
}));
