import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { NewsroomLayout } from './layouts/NewsroomLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { NewsHubPage } from '../pages/public/NewsHubPage';
import { ArticleDetailPage } from '../pages/public/ArticleDetailPage';
import { OpportunitiesPage } from '../pages/public/OpportunitiesPage';
import { OpportunityDetailPage } from '../pages/public/OpportunityDetailPage';
import { SectionPage } from '../pages/public/SectionPage';

// Newsroom Pages
import { OverviewPage } from '../pages/newsroom/OverviewPage';
import { SourcesPage } from '../pages/newsroom/SourcesPage';
import { PipelinePage } from '../pages/newsroom/PipelinePage';
import { DraftsInboxPage } from '../pages/newsroom/DraftsInboxPage';
import { DraftReviewPage } from '../pages/newsroom/DraftReviewPage';
import { LogPage } from '../pages/newsroom/LogPage';
import { PromptsPage } from '../pages/newsroom/PromptsPage';
import { ApiInspectorPage } from '../pages/newsroom/ApiInspectorPage';
import { StructurePage } from '../pages/newsroom/StructurePage';
import { HandoverPage } from '../pages/newsroom/HandoverPage';

export const router = createBrowserRouter([
  // Default root redirects to Arabic /ar (Assumption A4)
  {
    path: '/',
    element: <Navigate to="/ar" replace />,
  },

  // Public Experience Routes (Arabic default /ar, English /en)
  {
    path: '/:lang',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'news',
        element: <NewsHubPage />,
      },
      {
        path: 'news/:slug',
        element: <ArticleDetailPage />,
      },
      {
        path: 'opportunities',
        element: <OpportunitiesPage />,
      },
      {
        path: 'opportunities/:slug',
        element: <OpportunityDetailPage />,
      },
      {
        path: 'features',
        element: <SectionPage sectionKey="features" />,
      },
      {
        path: 'interviews',
        element: <SectionPage sectionKey="interviews" />,
      },
      {
        path: 'reports',
        element: <SectionPage sectionKey="reports" />,
      },
      {
        path: 'events',
        element: <SectionPage sectionKey="events" />,
      },
      {
        path: 'video',
        element: <SectionPage sectionKey="video" />,
      },
      {
        path: 'podcast',
        element: <SectionPage sectionKey="podcast" />,
      },
    ],
  },

  // Newsroom Console Experience Routes
  {
    path: '/newsroom',
    element: <NewsroomLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'sources',
        element: <SourcesPage />,
      },
      {
        path: 'pipeline',
        element: <PipelinePage />,
      },
      {
        path: 'drafts',
        element: <DraftsInboxPage />,
      },
      {
        path: 'drafts/:id',
        element: <DraftReviewPage />,
      },
      {
        path: 'log',
        element: <LogPage />,
      },
      {
        path: 'prompts',
        element: <PromptsPage />,
      },
      {
        path: 'api',
        element: <ApiInspectorPage />,
      },
      {
        path: 'structure',
        element: <StructurePage />,
      },
      {
        path: 'handover',
        element: <HandoverPage />,
      },
    ],
  },

  // Fallback route
  {
    path: '*',
    element: <Navigate to="/ar" replace />,
  },
]);
