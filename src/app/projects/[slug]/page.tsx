import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, PROJECTS } from '@/data/projects';
import { CaseStudyDetailView } from '@/components/projects/CaseStudyDetailView';
import { SiteFooter } from '@/components/layout/SiteFooter';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} — Case Study`,
    description: `${project.type}. ${project.tagline}`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = PROJECTS[currentIndex];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <CaseStudyDetailView
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </Suspense>
      <SiteFooter />
    </>
  );
}
