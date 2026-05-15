import clsx from 'clsx';
import fs from 'fs';
import fm from 'front-matter';
import path from 'path';
import Link from 'next/link';

import Head from '@/components/meta/Head';
import SkipNavigation from '@/components/navigations/SkipNavigation';
import PageHeader from '@/components/PageHeader';
import { getBaseUrl } from '@/helpers/url';

import type { GetStaticProps } from 'next';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
}

interface BlogPageProps {
  posts: BlogPost[];
}

function Blog({ posts }: BlogPageProps) {
  return (
    <>
      <Head
        title="Blog"
        description="Writing about AI engineering, production systems, and architectural decisions."
        ogImage={`${getBaseUrl()}/assets/images/og-image.png`}
      />
      <SkipNavigation skipTableOfContents={false} />
      <PageHeader
        title="Blog"
        description="Writing about AI engineering, production systems, and architectural decisions."
        caption="Writing"
      />
      <div className={clsx('content-wrapper')}>
        <div className={clsx('flex flex-col gap-6 py-8', 'md:py-12')}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={clsx(
                'group rounded-xl border border-divider-light p-5 transition',
                'hover:border-accent-400 hover:bg-slate-50',
                'dark:border-divider-dark dark:hover:border-accent-400 dark:hover:bg-slate-800/50',
                'md:p-6'
              )}
            >
              <div
                className={clsx(
                  'mb-2 flex items-center gap-3 text-xs text-slate-500',
                  'dark:text-slate-400'
                )}
              >
                <time dateTime={post.date}>{post.date}</time>
                <span className={clsx('flex gap-2')}>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={clsx(
                        'rounded-full bg-slate-100 px-2 py-0.5',
                        'dark:bg-slate-800'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
              <h2
                className={clsx(
                  'mb-1 text-xl font-bold text-slate-700',
                  'group-hover:text-accent-600',
                  'dark:text-slate-300 dark:group-hover:text-accent-400'
                )}
              >
                {post.title}
              </h2>
              <p
                className={clsx(
                  'text-sm leading-relaxed text-slate-600',
                  'dark:text-slate-400'
                )}
              >
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const blogDir = path.join(process.cwd(), 'src/pages/blog');
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));

  const posts: BlogPost[] = files
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { attributes } = fm<Record<string, unknown>>(fileContent);

      return {
        slug: filename.replace('.mdx', ''),
        title: (attributes.title as string) || '',
        description: (attributes.description as string) || '',
        date: (attributes.date as string) || '',
        tags: (attributes.tags as string[]) || [],
        category: (attributes.category as string) || '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
