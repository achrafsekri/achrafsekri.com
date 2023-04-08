import ProjectsContents from '@/contents/projects';
import HeaderImage from '@/contents/projects/HeaderImage';
import Page from '@/contents-layouts/Page';

function Projects() {
  return (
    <Page
      frontMatter={{
        title: 'Projects',
        description: 'Showcase of some of the projects I worked on.',
      }}
      headerImage={<HeaderImage />}
    >
      <ProjectsContents />
    </Page>
  );
}

export default Projects;
