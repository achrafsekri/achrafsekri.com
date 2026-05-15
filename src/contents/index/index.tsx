import clsx from 'clsx';

import { BrainIcon, CodeIcon, ServerIcon } from '@/components/Icons';

import CleanIntuitive from '@/contents/index/CleanIntuitive';
import FeaturedCard from '@/contents/index/FeaturedCard';
import Header from '@/contents/index/Header';
import Quote from '@/contents/index/Quote';

function FeaturedCardSection() {
  return (
    <div className={clsx('content-wrapper')}>
      <div className={clsx('flex flex-col gap-4', 'lg:flex-row lg:gap-8')}>
        <FeaturedCard
          icon={
            <div
              className={clsx(
                'rounded-full bg-amber-300 p-3.5',
                'dark:bg-amber-900'
              )}
            >
              <BrainIcon className={clsx('h-5 w-5 text-white')} />
            </div>
          }
          title="AI Infrastructure"
          desc="Designing scalable AI pipelines and LLM-powered systems for production."
        />
        <FeaturedCard
          icon={
            <div
              className={clsx(
                'rounded-full bg-pink-300 p-3.5',
                'dark:bg-pink-900'
              )}
            >
              <CodeIcon className={clsx('h-5 w-5 text-white')} />
            </div>
          }
          title="LLM Systems & Pipelines"
          desc="Building RAG, extraction, and orchestration systems at enterprise scale."
        />
        <FeaturedCard
          icon={
            <div
              className={clsx(
                'rounded-full bg-sky-300 p-3.5',
                'dark:bg-sky-900'
              )}
            >
              <ServerIcon className={clsx('h-5 w-5 text-white')} />
            </div>
          }
          title="Distributed Systems"
          desc="Event-driven architectures with Temporal, async services, and cloud-native infrastructure."
        />
      </div>
    </div>
  );
}

function QuoteSection() {
  return (
    <div className={clsx('content-wrapper')}>
      <div className={clsx('flex items-center justify-center py-8')}>
        <Quote />
      </div>
    </div>
  );
}

function IndexContents() {
  return (
    <>
      <Header />
      <div className={clsx('hidden', 'lg:-mt-16 lg:mb-24 lg:block')}>
        <FeaturedCardSection />
      </div>
      <div className={clsx('-mt-12 mb-12', 'md:mt-0 md:mb-24')}>
        <QuoteSection />
      </div>
      <section className={clsx('mb-12', 'lg:mb-24')}>
        <CleanIntuitive />
      </section>
    </>
  );
}

export default IndexContents;
