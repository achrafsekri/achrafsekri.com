import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import { GitHubIcon, NpmIcon, WebsiteIcon } from "@/components/Icons";
import { SectionButton } from "@/components/sections/SectionButton";
import SectionContent from "@/components/sections/SectionContent";
import SectionTitle from "@/components/sections/SectionTitle";
import AppWindow from "@/components/wireframes/AppWindow";
import GitHubWireframe from "@/components/wireframes/GitHub";
import NpmWireframe from "@/components/wireframes/Npm";

import blueHouse from "public/assets/images/blueHouse.png";
import explainthis from "public/assets/images/explainthis.png";
import hoopooh from "public/assets/images/hoopooh.png";
import rtu from "public/assets/images/rtu.png";
import under18 from "public/assets/images/under18.png";
import xaam from "public/assets/images/xaam.png";

const sections = [
  {
    title: "Hoopooh",
    displayUrl: "www.hoopooh.com",
    description:
      "hoopooh is an online platform that facilitates communication between kindergarten teachers and parents.",
    href: "https://www.hoopooh.com/en/",
    icon: <WebsiteIcon className={clsx("my-2 h-16 w-16")} />,
    github: "https://github.com/achrafsekri",
    image: hoopooh,
    id: "hoopooh",
  },
  {
    title: "Xaam",
    displayUrl: "www.xaam.app",
    description:
      "Xaam is a platform that allows teachers and parents to generate exercises and assigments with the help of ai algorithms.",
    href: "https://www.xaam.app",
    icon: <WebsiteIcon className={clsx("my-2 h-16 w-16")} />,
    github: "https://github.com/achrafsekri",
    id: "xaam",
    image: xaam,
  },
  {
    title: "bluehouse",
    displayUrl: "www.bluehouse.is",
    description:
      "bluehouse is a platform that allows you to book accomendations and/or experiances in the city of Reykjavik, Iceland .",
    href: "https://www.bluehouse.is",
    icon: <WebsiteIcon className={clsx("my-2 h-16 w-16")} />,
    github: "https://github.com/achrafsekri",
    id: "bluehouse",
    image: blueHouse,
  },
  {
    title: "RTU",
    displayUrl: "www.github.com/achrafsekri/RTU",
    description: "RTU is the first university radio in paris .",
    href: null,
    icon: <WebsiteIcon className={clsx("my-2 h-16 w-16")} />,
    github: "https://github.com/achrafsekri/RTU",
    id: "rtu",
    image: rtu,
  },
  {
    title: "under-18",
    displayUrl: "www.github.com/achrafsekri/under-18",
    description: "Under18 is a clothing collective e-commerce website.",
    href: null,
    icon: <WebsiteIcon className={clsx("my-2 h-16 w-16")} />,
    github: "https://github.com/achrafsekri/under-18",
    id: "under18",
    image: under18,
  },
  {
    title: "Explain-this",
    displayUrl: "www.github.com/achrafsekri/Explain-this",
    description:
      "Explain-this is a a website that uses artificial intelligence to generate short, concise explanations on any topic.",
    href: "https://explain-this.vercel.app",
    icon: <WebsiteIcon className={clsx("my-2 h-16 w-16")} />,
    github: "https://github.com/achrafsekri/Explain-this",
    id: "explainthis",
    image: explainthis,
  },
];

function ProjectsContents() {
  const [currentState, setCurrentState] = useState("hoopooh");

  return (
    <>
      <SectionTitle
        title="Hoopooh admin dashboard."
        caption="Hoopooh"
        description="hoopooh is an online platform that facilitates communication between kindergarten teachers and parents."
        button={{
          title: "learn more",
          href: "https://www.hoopooh.com/en/",
        }}
      />
      <SectionContent>
        <div className={clsx("flex", "lg:gap-12")}>
          <div className={clsx("hidden flex-1 flex-col gap-3 pt-8", "lg:flex")}>
            <div
              className={clsx(
                " scrollbar-thin scrollbar-thumb-orange-500  scrollbar-track-gray-100 flex max-h-96 flex-col gap-3 overflow-auto px-3"
              )}
            >
              {sections.map((section, index) => (
                <SectionButton
                  key={index}
                  title={section.title}
                  icon={<GitHubIcon />}
                  github={section.github}
                  description={section.description}
                  active={currentState === section.id}
                  onClick={() => setCurrentState(section.id)}
                />
              ))}
            </div>
          </div>
          <div className={clsx("w-full", "lg:w-auto")}>
            <div className={clsx("sticky -mt-[41px]")}>
              <div className={clsx("w-full", "lg:h-[400px] lg:w-[600px]")}>
                <AppWindow
                  type="browser"
                  browserTabs={[
                    {
                      icon: <WebsiteIcon className="w-4 h-4" />,
                      title:
                        sections.find((section) => section.id === currentState)
                          ?.displayUrl || "about:blank",
                      url:
                        sections.find((section) => section.id === currentState)
                          ?.href || "#",
                      isActive: true,
                    },
                  ]}
                >
                  <a
                    href={
                      sections.find((section) => section.id === currentState)
                        ?.href || "#"
                    }
                    className="relative w-full h-full bg-orange-500"
                  >
                    {/* {currentState === 'github' && (
                    <GitHubWireframe
                      author="achrafsekri"
                      license="MIT"
                      repository="tailwindcss-accent"
                      description="Adds accent colors for more dynamic and flexible color utilization."
                    />
                  )}
                  {currentState === 'npm' && (
                    <NpmWireframe
                      packageName="tailwindcss-accent"
                      description="Adds accent colors for more dynamic and flexible color utilization."
                      isWithTypeScript
                    />
                  )} */}
                    <Image
                      src={
                        sections.find((section) => section.id === currentState)
                          ?.image || "about:blank"
                      }
                      className="w-full "
                      alt={
                        sections.find((section) => section.id === currentState)
                          ?.title || "about:blank"
                      }
                    />
                  </a>
                </AppWindow>
              </div>
            </div>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default ProjectsContents;
