import clsx from 'clsx';
import Link from 'next/link';

import SectionTitle from '@/components/sections/SectionTitle';
import SectionContent from '@/components/sections/SectionContent';

const posts = [
  {
    title: 'Building Production RAG Systems',
    description:
      'Lessons from processing 10K+ financial documents daily at enterprise scale.',
    href: '/blog/building-production-rag-systems',
    date: '2025-04-15',
  },
  {
    title: 'Temporal Orchestration for AI Pipelines',
    description:
      'Why your AI system needs a workflow engine for reliability and observability.',
    href: '/blog/temporal-orchestration-for-ai-pipelines',
    date: '2025-03-20',
  },
  {
    title: 'LLM Evaluation in Production',
    description:
      'Building evaluation infrastructure that catches regressions before users do.',
    href: '/blog/llm-evaluation-in-production',
    date: '2025-05-01',
  },
  {
    title: 'Multi-Agent Architectures',
    description:
      'When to use them and when to keep it simple — a practical framework.',
    href: '/blog/multi-agent-architectures',
    date: '2025-02-10',
  },
];

function CleanIntuitive() {
  return (
    <>
      <header className={clsx('mb-8')}>
        <SectionTitle
          title="Writing About AI Engineering."
          caption="Blog"
          description="Sharing lessons from building production AI systems — RAG pipelines, orchestration, evaluation, and architectural decisions."
          button={{
            title: 'view all posts',
            href: '/blog',
          }}
        />
      </header>
      <SectionContent>
        <div className={clsx('flex flex-col gap-4 mt-8', 'lg:mt-12')}>
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className={clsx(
                'group rounded-xl border border-divider-light p-4 transition',
                'hover:border-accent-400 hover:bg-slate-50',
                'dark:border-divider-dark dark:hover:border-accent-400 dark:hover:bg-slate-800/50',
                'md:p-6'
              )}
            >
              <div
                className={clsx(
                  'mb-1 text-xs text-slate-500',
                  'dark:text-slate-400'
                )}
              >
                {post.date}
              </div>
              <h3
                className={clsx(
                  'mb-1 text-lg font-bold text-slate-700',
                  'group-hover:text-accent-600',
                  'dark:text-slate-300 dark:group-hover:text-accent-400'
                )}
              >
                {post.title}
              </h3>
              <p
                className={clsx(
                  'text-sm text-slate-600',
                  'dark:text-slate-400'
                )}
              >
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </SectionContent>
    </>
  );
}

export default CleanIntuitive;
