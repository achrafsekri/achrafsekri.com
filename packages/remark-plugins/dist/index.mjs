// src/index.ts
import remarkFrontMatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

// src/withFrontMatter.ts
import { z } from "zod";

// src/utils.ts
import { Parser } from "acorn";
import acornJsx from "acorn-jsx";
import fm from "front-matter";
import slug from "slug";
var ParserWithJSX = Parser.extend(acornJsx());
var parse = (content) => ParserWithJSX.parse(content, {
  ecmaVersion: 2020,
  sourceType: "module"
});
var getFrontMatter = (content) => fm(content).attributes;
var addImport = (tree, name, location) => {
  tree.children.unshift({
    type: "mdxjsEsm",
    data: {
      estree: parse(`import ${name} from '${location}'`)
    }
  });
};
var addContent = (tree, content) => {
  tree.children.push({
    type: "mdxjsEsm",
    data: {
      estree: parse(content)
    }
  });
};
var getTableOfContents = (tree) => {
  const contents = [];
  for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex++) {
    const node = tree.children[nodeIndex];
    if (node.type === "heading" && [2, 3].includes(node.depth)) {
      const depth = node.depth - 1;
      const title = node.children.filter((n) => n.type === "text").map((n) => n.value).join("");
      contents.push({
        title,
        slug: slug(title),
        depth
      });
    }
  }
  return contents;
};

// src/withFrontMatter.ts
var dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
var BaseFrontMatter = z.object({
  title: z.string().max(110),
  description: z.string().max(120),
  caption: z.string().default(""),
  layout: z.string().default("Post")
});
var PostFrontMatter = z.object({
  date: z.string().regex(dateRegex, "Date format MUST be YYYY-MM-DD"),
  lang: z.enum(["id", "en"]),
  tags: z.array(z.string()).min(2).max(5),
  category: z.string()
});
var ProjectFrontMatter = z.object({
  githubUrl: z.string().url().optional(),
  npmUrl: z.string().url().optional(),
  type: z.enum(["package"]).default("package")
});
var validate = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(JSON.stringify(err.issues, null, 2));
    }
    return null;
  }
};
var withFrontMatter = () => (_tree, file) => {
  const data = getFrontMatter(file.value);
  if (Object.keys(data).length === 0)
    return;
  const base = validate(BaseFrontMatter, data);
  let frontMatter;
  switch (base.layout) {
    case "Post": {
      const post = validate(PostFrontMatter, data);
      frontMatter = { ...base, ...post };
      break;
    }
    case "Project": {
      const project = validate(ProjectFrontMatter, data);
      frontMatter = { ...base, ...project };
      break;
    }
    default: {
      frontMatter = base;
      break;
    }
  }
  file.data["front-matter"] = frontMatter;
};
var withFrontMatter_default = withFrontMatter;

// src/withLayout.ts
var withLayout = () => (tree, file) => {
  const data = file.data["front-matter"] || {};
  if (Object.keys(data).length === 0)
    return;
  const { layout, ...frontMatter } = file.data["front-matter"];
  const tableOfContents = getTableOfContents(tree);
  addImport(tree, layout, `@/contents-layouts/${layout}`);
  addContent(
    tree,
    `export default ({ children }) => (
      <${layout}
        frontMatter={${JSON.stringify(frontMatter)}}
        tableOfContents={${JSON.stringify(tableOfContents)}}
      >
        {children}
      </${layout}>
     )`
  );
};
var withLayout_default = withLayout;

// src/withStrict.ts
var withStrict = () => (tree) => {
  for (let nodeIndex = 0; nodeIndex < tree.children.length; nodeIndex++) {
    const node = tree.children[nodeIndex];
    if (node.type === "heading" && ![2, 3].includes(node.depth) || node.type === "mdxJsxFlowElement" && ["h1", "h4", "h5", "h6"].includes(node.name)) {
      throw new Error("Headings depths other than 2 or 3 are not allowed.");
    }
  }
};
var withStrict_default = withStrict;

// src/index.ts
var plugins = [
  remarkFrontMatter,
  remarkGfm,
  withFrontMatter_default,
  withStrict_default,
  withLayout_default
];
var src_default = plugins;
export {
  src_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93aXRoRnJvbnRNYXR0ZXIudHMiLCAiLi4vc3JjL3V0aWxzLnRzIiwgIi4uL3NyYy93aXRoTGF5b3V0LnRzIiwgIi4uL3NyYy93aXRoU3RyaWN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgcmVtYXJrRnJvbnRNYXR0ZXIgZnJvbSAncmVtYXJrLWZyb250bWF0dGVyJztcclxuaW1wb3J0IHJlbWFya0dmbSBmcm9tICdyZW1hcmstZ2ZtJztcclxuXHJcbmltcG9ydCB3aXRoRnJvbnRNYXR0ZXIgZnJvbSAnLi93aXRoRnJvbnRNYXR0ZXInO1xyXG5pbXBvcnQgd2l0aExheW91dCBmcm9tICcuL3dpdGhMYXlvdXQnO1xyXG5pbXBvcnQgd2l0aFN0cmljdCBmcm9tICcuL3dpdGhTdHJpY3QnO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBQbHVnZ2FibGVMaXN0IH0gZnJvbSAndW5pZmllZCc7XHJcblxyXG5jb25zdCBwbHVnaW5zOiBQbHVnZ2FibGVMaXN0ID0gW1xyXG4gIHJlbWFya0Zyb250TWF0dGVyLFxyXG4gIHJlbWFya0dmbSxcclxuICB3aXRoRnJvbnRNYXR0ZXIsXHJcbiAgd2l0aFN0cmljdCxcclxuICB3aXRoTGF5b3V0LFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcclxuIiwgImltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RnJvbnRNYXR0ZXIgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmNvbnN0IGRhdGVSZWdleCA9IC9eXFxkezR9LSgwWzEtOV18MVswMTJdKS0oMFsxLTldfFsxMl1bMC05XXwzWzAxXSkkLztcclxuXHJcbmNvbnN0IEJhc2VGcm9udE1hdHRlciA9IHoub2JqZWN0KHtcclxuICB0aXRsZTogei5zdHJpbmcoKS5tYXgoMTEwKSxcclxuICBkZXNjcmlwdGlvbjogei5zdHJpbmcoKS5tYXgoMTIwKSxcclxuICBjYXB0aW9uOiB6LnN0cmluZygpLmRlZmF1bHQoJycpLFxyXG4gIGxheW91dDogei5zdHJpbmcoKS5kZWZhdWx0KCdQb3N0JyksXHJcbn0pO1xyXG5cclxuY29uc3QgUG9zdEZyb250TWF0dGVyID0gei5vYmplY3Qoe1xyXG4gIGRhdGU6IHouc3RyaW5nKCkucmVnZXgoZGF0ZVJlZ2V4LCAnRGF0ZSBmb3JtYXQgTVVTVCBiZSBZWVlZLU1NLUREJyksXHJcbiAgbGFuZzogei5lbnVtKFsnaWQnLCAnZW4nXSksXHJcbiAgdGFnczogei5hcnJheSh6LnN0cmluZygpKS5taW4oMikubWF4KDUpLFxyXG4gIGNhdGVnb3J5OiB6LnN0cmluZygpLFxyXG59KTtcclxuXHJcbmNvbnN0IFByb2plY3RGcm9udE1hdHRlciA9IHoub2JqZWN0KHtcclxuICBnaXRodWJVcmw6IHouc3RyaW5nKCkudXJsKCkub3B0aW9uYWwoKSxcclxuICBucG1Vcmw6IHouc3RyaW5nKCkudXJsKCkub3B0aW9uYWwoKSxcclxuICB0eXBlOiB6LmVudW0oWydwYWNrYWdlJ10pLmRlZmF1bHQoJ3BhY2thZ2UnKSxcclxufSk7XHJcblxyXG5jb25zdCB2YWxpZGF0ZSA9IChzY2hlbWEsIGRhdGEpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHNjaGVtYS5wYXJzZShkYXRhKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGlmIChlcnIgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShlcnIuaXNzdWVzLCBudWxsLCAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgd2l0aEZyb250TWF0dGVyID0gKCkgPT4gKF90cmVlLCBmaWxlKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGdldEZyb250TWF0dGVyKGZpbGUudmFsdWUpO1xyXG5cclxuICAvLyBza2lwIGZyb250IG1hdHRlciB2YWxpZGF0aW9uXHJcbiAgaWYgKE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBiYXNlID0gdmFsaWRhdGUoQmFzZUZyb250TWF0dGVyLCBkYXRhKTtcclxuXHJcbiAgbGV0IGZyb250TWF0dGVyO1xyXG5cclxuICBzd2l0Y2ggKGJhc2UubGF5b3V0KSB7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmljIHBvc3QgZnJvbnRNYXR0ZXJcclxuICAgICAqL1xyXG4gICAgY2FzZSAnUG9zdCc6IHtcclxuICAgICAgY29uc3QgcG9zdCA9IHZhbGlkYXRlKFBvc3RGcm9udE1hdHRlciwgZGF0YSk7XHJcbiAgICAgIGZyb250TWF0dGVyID0geyAuLi5iYXNlLCAuLi5wb3N0IH07XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpYyBwcm9qZWN0IGZyb250TWF0dGVyXHJcbiAgICAgKi9cclxuICAgIGNhc2UgJ1Byb2plY3QnOiB7XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSB2YWxpZGF0ZShQcm9qZWN0RnJvbnRNYXR0ZXIsIGRhdGEpO1xyXG4gICAgICBmcm9udE1hdHRlciA9IHsgLi4uYmFzZSwgLi4ucHJvamVjdCB9O1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBmcm9udE1hdHRlclxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0OiB7XHJcbiAgICAgIGZyb250TWF0dGVyID0gYmFzZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICBmaWxlLmRhdGFbJ2Zyb250LW1hdHRlciddID0gZnJvbnRNYXR0ZXI7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoRnJvbnRNYXR0ZXI7XHJcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xyXG5cclxuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSAnYWNvcm4nO1xyXG5pbXBvcnQgYWNvcm5Kc3ggZnJvbSAnYWNvcm4tanN4JztcclxuaW1wb3J0IGZtIGZyb20gJ2Zyb250LW1hdHRlcic7XHJcbmltcG9ydCBzbHVnIGZyb20gJ3NsdWcnO1xyXG5cclxuY29uc3QgUGFyc2VyV2l0aEpTWCA9IFBhcnNlci5leHRlbmQoYWNvcm5Kc3goKSk7XHJcblxyXG5jb25zdCBwYXJzZSA9IChjb250ZW50KSA9PlxyXG4gIFBhcnNlcldpdGhKU1gucGFyc2UoY29udGVudCwge1xyXG4gICAgZWNtYVZlcnNpb246IDIwMjAsXHJcbiAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcclxuICB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGcm9udE1hdHRlciA9IChjb250ZW50KSA9PiBmbShjb250ZW50KS5hdHRyaWJ1dGVzO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEltcG9ydCA9ICh0cmVlLCBuYW1lLCBsb2NhdGlvbikgPT4ge1xyXG4gIHRyZWUuY2hpbGRyZW4udW5zaGlmdCh7XHJcbiAgICB0eXBlOiAnbWR4anNFc20nLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBlc3RyZWU6IHBhcnNlKGBpbXBvcnQgJHtuYW1lfSBmcm9tICcke2xvY2F0aW9ufSdgKSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYWRkQ29udGVudCA9ICh0cmVlLCBjb250ZW50KSA9PiB7XHJcbiAgdHJlZS5jaGlsZHJlbi5wdXNoKHtcclxuICAgIHR5cGU6ICdtZHhqc0VzbScsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGVzdHJlZTogcGFyc2UoY29udGVudCksXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFRhYmxlT2ZDb250ZW50cyA9ICh0cmVlKSA9PiB7XHJcbiAgY29uc3QgY29udGVudHMgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgbm9kZUluZGV4ID0gMDsgbm9kZUluZGV4IDwgdHJlZS5jaGlsZHJlbi5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XHJcbiAgICBjb25zdCBub2RlID0gdHJlZS5jaGlsZHJlbltub2RlSW5kZXhdO1xyXG5cclxuICAgIGlmIChub2RlLnR5cGUgPT09ICdoZWFkaW5nJyAmJiBbMiwgM10uaW5jbHVkZXMobm9kZS5kZXB0aCkpIHtcclxuICAgICAgY29uc3QgZGVwdGggPSBub2RlLmRlcHRoIC0gMTtcclxuICAgICAgY29uc3QgdGl0bGUgPSBub2RlLmNoaWxkcmVuXHJcbiAgICAgICAgLmZpbHRlcigobikgPT4gbi50eXBlID09PSAndGV4dCcpXHJcbiAgICAgICAgLm1hcCgobikgPT4gbi52YWx1ZSlcclxuICAgICAgICAuam9pbignJyk7XHJcblxyXG4gICAgICBjb250ZW50cy5wdXNoKHtcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBzbHVnOiBzbHVnKHRpdGxlKSxcclxuICAgICAgICBkZXB0aCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY29udGVudHM7XHJcbn07XHJcbiIsICJpbXBvcnQgeyBhZGRDb250ZW50LCBhZGRJbXBvcnQsIGdldFRhYmxlT2ZDb250ZW50cyB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuY29uc3Qgd2l0aExheW91dCA9ICgpID0+ICh0cmVlLCBmaWxlKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGZpbGUuZGF0YVsnZnJvbnQtbWF0dGVyJ10gfHwge307XHJcblxyXG4gIC8vIHNraXAgYWRkaW5nIGxheW91dFxyXG4gIGlmIChPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgY29uc3QgeyBsYXlvdXQsIC4uLmZyb250TWF0dGVyIH0gPSBmaWxlLmRhdGFbJ2Zyb250LW1hdHRlciddO1xyXG4gIGNvbnN0IHRhYmxlT2ZDb250ZW50cyA9IGdldFRhYmxlT2ZDb250ZW50cyh0cmVlKTtcclxuXHJcbiAgLy8gaW1wb3J0IGZyb250LW1hdHRlciBzcGVjaWZpZWQgbGF5b3V0XHJcbiAgYWRkSW1wb3J0KHRyZWUsIGxheW91dCwgYEAvY29udGVudHMtbGF5b3V0cy8ke2xheW91dH1gKTtcclxuXHJcbiAgLy8gZXhwb3J0IGxheW91dFxyXG4gIGFkZENvbnRlbnQoXHJcbiAgICB0cmVlLFxyXG4gICAgYGV4cG9ydCBkZWZhdWx0ICh7IGNoaWxkcmVuIH0pID0+IChcclxuICAgICAgPCR7bGF5b3V0fVxyXG4gICAgICAgIGZyb250TWF0dGVyPXske0pTT04uc3RyaW5naWZ5KGZyb250TWF0dGVyKX19XHJcbiAgICAgICAgdGFibGVPZkNvbnRlbnRzPXske0pTT04uc3RyaW5naWZ5KHRhYmxlT2ZDb250ZW50cyl9fVxyXG4gICAgICA+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8LyR7bGF5b3V0fT5cclxuICAgICApYFxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoTGF5b3V0O1xyXG4iLCAiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cclxuXHJcbmNvbnN0IHdpdGhTdHJpY3QgPSAoKSA9PiAodHJlZSkgPT4ge1xyXG4gIGZvciAobGV0IG5vZGVJbmRleCA9IDA7IG5vZGVJbmRleCA8IHRyZWUuY2hpbGRyZW4ubGVuZ3RoOyBub2RlSW5kZXgrKykge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRyZWUuY2hpbGRyZW5bbm9kZUluZGV4XTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChub2RlLnR5cGUgPT09ICdoZWFkaW5nJyAmJiAhWzIsIDNdLmluY2x1ZGVzKG5vZGUuZGVwdGgpKSB8fFxyXG4gICAgICAobm9kZS50eXBlID09PSAnbWR4SnN4Rmxvd0VsZW1lbnQnICYmXHJcbiAgICAgICAgWydoMScsICdoNCcsICdoNScsICdoNiddLmluY2x1ZGVzKG5vZGUubmFtZSkpXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdIZWFkaW5ncyBkZXB0aHMgb3RoZXIgdGhhbiAyIG9yIDMgYXJlIG5vdCBhbGxvd2VkLicpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHJpY3Q7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPLHVCQUF1QjtBQUM5QixPQUFPLGVBQWU7OztBQ0R0QixTQUFTLFNBQVM7OztBQ0VsQixTQUFTLGNBQWM7QUFDdkIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUVqQixJQUFNLGdCQUFnQixPQUFPLE9BQU8sU0FBUyxDQUFDO0FBRTlDLElBQU0sUUFBUSxDQUFDLFlBQ2IsY0FBYyxNQUFNLFNBQVM7QUFBQSxFQUMzQixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQ2QsQ0FBQztBQUVJLElBQU0saUJBQWlCLENBQUMsWUFBWSxHQUFHLE9BQU8sRUFBRTtBQUVoRCxJQUFNLFlBQVksQ0FBQyxNQUFNLE1BQU0sYUFBYTtBQUNqRCxPQUFLLFNBQVMsUUFBUTtBQUFBLElBQ3BCLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxNQUNKLFFBQVEsTUFBTSxVQUFVLGNBQWMsV0FBVztBQUFBLElBQ25EO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFTyxJQUFNLGFBQWEsQ0FBQyxNQUFNLFlBQVk7QUFDM0MsT0FBSyxTQUFTLEtBQUs7QUFBQSxJQUNqQixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsTUFDSixRQUFRLE1BQU0sT0FBTztBQUFBLElBQ3ZCO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFTyxJQUFNLHFCQUFxQixDQUFDLFNBQVM7QUFDMUMsUUFBTSxXQUFXLENBQUM7QUFFbEIsV0FBUyxZQUFZLEdBQUcsWUFBWSxLQUFLLFNBQVMsUUFBUSxhQUFhO0FBQ3JFLFVBQU0sT0FBTyxLQUFLLFNBQVM7QUFFM0IsUUFBSSxLQUFLLFNBQVMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsS0FBSyxLQUFLLEdBQUc7QUFDMUQsWUFBTSxRQUFRLEtBQUssUUFBUTtBQUMzQixZQUFNLFFBQVEsS0FBSyxTQUNoQixPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsTUFBTSxFQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFDbEIsS0FBSyxFQUFFO0FBRVYsZUFBUyxLQUFLO0FBQUEsUUFDWjtBQUFBLFFBQ0EsTUFBTSxLQUFLLEtBQUs7QUFBQSxRQUNoQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUOzs7QURyREEsSUFBTSxZQUFZO0FBRWxCLElBQU0sa0JBQWtCLEVBQUUsT0FBTztBQUFBLEVBQy9CLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFHO0FBQUEsRUFDekIsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUc7QUFBQSxFQUMvQixTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUFBLEVBQzlCLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxNQUFNO0FBQ25DLENBQUM7QUFFRCxJQUFNLGtCQUFrQixFQUFFLE9BQU87QUFBQSxFQUMvQixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxnQ0FBZ0M7QUFBQSxFQUNsRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDO0FBQUEsRUFDekIsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUM7QUFBQSxFQUN0QyxVQUFVLEVBQUUsT0FBTztBQUNyQixDQUFDO0FBRUQsSUFBTSxxQkFBcUIsRUFBRSxPQUFPO0FBQUEsRUFDbEMsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUztBQUFBLEVBQ3JDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVM7QUFBQSxFQUNsQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsU0FBUztBQUM3QyxDQUFDO0FBRUQsSUFBTSxXQUFXLENBQUMsUUFBUSxTQUFTO0FBQ2pDLE1BQUk7QUFDRixXQUFPLE9BQU8sTUFBTSxJQUFJO0FBQUEsRUFDMUIsU0FBUyxLQUFQO0FBQ0EsUUFBSSxlQUFlLEVBQUUsVUFBVTtBQUM3QixZQUFNLElBQUksTUFBTSxLQUFLLFVBQVUsSUFBSSxRQUFRLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDckQ7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsSUFBTSxrQkFBa0IsTUFBTSxDQUFDLE9BQU8sU0FBUztBQUM3QyxRQUFNLE9BQU8sZUFBZSxLQUFLLEtBQUs7QUFHdEMsTUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLFdBQVc7QUFBRztBQUVwQyxRQUFNLE9BQU8sU0FBUyxpQkFBaUIsSUFBSTtBQUUzQyxNQUFJO0FBRUosVUFBUSxLQUFLLFFBQVE7QUFBQSxJQUluQixLQUFLLFFBQVE7QUFDWCxZQUFNLE9BQU8sU0FBUyxpQkFBaUIsSUFBSTtBQUMzQyxvQkFBYyxFQUFFLEdBQUcsTUFBTSxHQUFHLEtBQUs7QUFDakM7QUFBQSxJQUNGO0FBQUEsSUFJQSxLQUFLLFdBQVc7QUFDZCxZQUFNLFVBQVUsU0FBUyxvQkFBb0IsSUFBSTtBQUNqRCxvQkFBYyxFQUFFLEdBQUcsTUFBTSxHQUFHLFFBQVE7QUFDcEM7QUFBQSxJQUNGO0FBQUEsSUFJQSxTQUFTO0FBQ1Asb0JBQWM7QUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBR0EsT0FBSyxLQUFLLGtCQUFrQjtBQUM5QjtBQUVBLElBQU8sMEJBQVE7OztBRTVFZixJQUFNLGFBQWEsTUFBTSxDQUFDLE1BQU0sU0FBUztBQUN2QyxRQUFNLE9BQU8sS0FBSyxLQUFLLG1CQUFtQixDQUFDO0FBRzNDLE1BQUksT0FBTyxLQUFLLElBQUksRUFBRSxXQUFXO0FBQUc7QUFFcEMsUUFBTSxFQUFFLFdBQVcsWUFBWSxJQUFJLEtBQUssS0FBSztBQUM3QyxRQUFNLGtCQUFrQixtQkFBbUIsSUFBSTtBQUcvQyxZQUFVLE1BQU0sUUFBUSxzQkFBc0IsUUFBUTtBQUd0RDtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsU0FDSztBQUFBLHVCQUNjLEtBQUssVUFBVSxXQUFXO0FBQUEsMkJBQ3RCLEtBQUssVUFBVSxlQUFlO0FBQUE7QUFBQTtBQUFBLFVBRy9DO0FBQUE7QUFBQSxFQUVSO0FBQ0Y7QUFFQSxJQUFPLHFCQUFROzs7QUMxQmYsSUFBTSxhQUFhLE1BQU0sQ0FBQyxTQUFTO0FBQ2pDLFdBQVMsWUFBWSxHQUFHLFlBQVksS0FBSyxTQUFTLFFBQVEsYUFBYTtBQUNyRSxVQUFNLE9BQU8sS0FBSyxTQUFTO0FBRTNCLFFBQ0csS0FBSyxTQUFTLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsS0FBSyxLQUFLLEtBQ3RELEtBQUssU0FBUyx1QkFDYixDQUFDLE1BQU0sTUFBTSxNQUFNLElBQUksRUFBRSxTQUFTLEtBQUssSUFBSSxHQUM3QztBQUNBLFlBQU0sSUFBSSxNQUFNLG9EQUFvRDtBQUFBLElBQ3RFO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxxQkFBUTs7O0FKUGYsSUFBTSxVQUF5QjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsSUFBTyxjQUFROyIsCiAgIm5hbWVzIjogW10KfQo=