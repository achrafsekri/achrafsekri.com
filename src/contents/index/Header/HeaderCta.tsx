import clsx from "clsx";
import { m } from "framer-motion";
import Link from "next/link";

import { DocumentIcon } from "@/components/Icons";

const animation = {
  hide: {
    x: -16,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

function ButtonContactMe() {
  return (
    <Link
      href="/work/contact"
      className={clsx("button button--solid min-w-[128px]", "md:button--big")}
    >
      Get in Touch
    </Link>
  );
}

function ButtonResume() {
  return (
    <a
      target="_blank"
      rel="noreferrer nofollow"
      href="https://drive.google.com/file/d/1hiU29CwFhM8VZ1UVhV8von9Ce-78Gg6r/view?usp=sharing"
      className={clsx("button button--ghost px-2", "md:button--big md:px-2")}
    >
      <DocumentIcon className={clsx("h-5 w-5")} />
      CHECKOUT MY RESUME
    </a>
  );
}

function HeaderCta() {
  return (
    <m.div className={clsx("flex gap-2")} initial="hide" animate="show">
      <m.div
        className={clsx("relative z-20")}
        variants={animation}
        transition={{ delay: 0.4 }}
      >
        <ButtonContactMe />
      </m.div>
      <m.div variants={animation} transition={{ delay: 0.5 }}>
        <ButtonResume />
      </m.div>
    </m.div>
  );
}

export default HeaderCta;
