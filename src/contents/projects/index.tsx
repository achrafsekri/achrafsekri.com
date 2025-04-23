import clsx from 'clsx';
import Image from 'next/image';
import { WebsiteIcon } from '@/components/Icons';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';
import AppWindow from '@/components/wireframes/AppWindow';
import blueHouse from 'public/assets/images/bluehouse.png';
import hoopooh from 'public/assets/images/hoopooh.png';
import xaam from 'public/assets/images/xaam.png';
import portfolio from 'public/assets/images/portfolio.png';
import bookme from 'public/assets/images/bookme.png';
import hoopoohAdmin from 'public/assets/images/hoopooh-admin.png';
import soccersat from 'public/assets/images/soccersat.png';
import SeeAdvertising from 'public/assets/images/SeeAdvertising.png';
import allofacture from 'public/assets/images/allofacture.png';
import lameh from 'public/assets/images/lamehai.png';
import cruxhire from 'public/assets/images/cruxhire.png';
const sections = [
  {
    title: 'LamehAi',
    displayUrl: 'www.core.lameh.ai',
    description:
      'LamehAi is a platform that allows content-creators, influencers, services providers to sell 1-on-1 sessions to their fans.',
    href: 'http://core.lameh.ai/',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    image: lameh,
    id: 'lamehai',
  },
  {
    title: 'cruxHire',
    displayUrl: 'www.cruxhire.com',
    description:
      'cruxHire is an ai powered platform that allows recruiters to streamline their hiring process using a powerful ai agent',
    href: 'https://www.cruxhire.com',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    image: cruxhire,
    id: 'cruxhire',
  },
  {
    title: 'BookMe',
    displayUrl: 'www.bookme.fans',
    description:
      'BookMe is a platform that allows content-creators, influencers, services providers to sell 1-on-1 sessions to their fans.',
    href: 'https://www.bookme.fans',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    image: bookme,
    id: 'bookme',
  },
  {
    title: 'Allofacture',
    displayUrl: 'www.allofacture.com',
    description:
      'AlloFacture is a simple and efficient invoice management system for the handyman.',
    href: 'https://www.allofacture.com',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    image: allofacture,
    id: 'allofacture',
  },
  {
    title: 'Hoopooh',
    displayUrl: 'www.hoopooh.com',
    description:
      'hoopooh is an online platform that facilitates communication between kindergarten teachers and parents.',
    href: 'https://www.hoopooh.com/en/',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    image: hoopooh,
    id: 'hoopooh',
  },
  {
    title: 'Soccersat',
    displayUrl: 'www.soccersat.com',
    description:
      'Soccersat is dedicated to offering the most up-to-date and comprehensive listings of live football matches broadcasted on television worldwide.',
    href: 'https://www.soccersat.com',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    id: 'soccersat',
    image: soccersat,
  },
  {
    title: 'SeeAdvertising',
    displayUrl: 'www.seeadvertisingtn.com',
    description:
      'SeeAdvertising is the biggest advertising panels provider in Monastir,Tunisia.',
    href: 'https://www.seeadvertisingtn.com',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    id: 'see-advertising',
    image: SeeAdvertising,
  },
  {
    title: 'Xaam',
    displayUrl: 'www.xaam.app',
    description:
      'Xaam is a platform that allows teachers and parents to generate exercises and assigments with the help of ai algorithms.',
    href: 'https://www.xaam.app',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    id: 'xaam',
    image: xaam,
  },
  {
    title: 'bluehouse',
    displayUrl: 'www.bluehouse.is',
    description:
      'bluehouse is a platform that allows you to book accomendations and/or experiances in the city of Reykjavik, Iceland .',
    href: 'https://www.bluehouse.is',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    id: 'bluehouse',
    image: blueHouse,
  },
  {
    title: 'This website',
    displayUrl: 'https://www.achrafsekri.com',
    description: 'This website is my personal website.',
    href: 'https://www.achrafsekri.com',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'www.github.com/achrafsekri/achrafsekri.com',
    id: 'achrafsekri.com',
    image: portfolio,
  },

  {
    title: 'Hoopooh admin dashboard',
    displayUrl: 'www.app.hoopooh.com',
    description:
      'hoopooh is an online platform that facilitates communication between kindergarten teachers and parents.',
    href: 'https://www.hoopooh.com/en/',
    icon: <WebsiteIcon className={clsx('my-2 h-16 w-16')} />,
    github: 'https://github.com/achrafsekri',
    image: hoopoohAdmin,
    id: 'hoopooh-admin',
  },
];

function ProjectsContents() {
  return (
    <>
      <SectionTitle
        title='SeeAdvertising Landing Page.'
        caption='Latest project'
        description='SeeAdvertising is the biggest advertising panels provider in Monastir,Tunisia.'
        button={{
          title: 'learn more',
          href: 'https://www.seeadvertisingtn.com',
        }}
      />
      <SectionContent>
        <div className={clsx('flex', 'lg:gap-12')}>
          <div className={clsx('w-full', 'lg:w-auto')}>
            <div
              className={clsx(
                'w-full py-12 grid grid-cols-1 lg:grid-cols-2 gap-12',
                ''
              )}
            >
              {sections.map((section, index) => (
                <AppWindow
                  key={index}
                  type='browser'
                  projectId={section.id}
                  browserTabs={[
                    {
                      icon: <WebsiteIcon className='w-4 h-4' />,
                      title: section.displayUrl || 'about:blank',
                      url: section.href || '#',
                      isActive: true,
                    },
                  ]}
                >
                  <a
                    href={`/projects/${section.id}`}
                    className='relative w-full h-full bg-orange-500 select-none'
                  >
                    <Image
                      src={section.image}
                      className='w-full transition duration-300 select-none hover:scale-105 '
                      alt={section.title || 'about:blank'}
                    />
                  </a>
                </AppWindow>
              ))}
            </div>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default ProjectsContents;
