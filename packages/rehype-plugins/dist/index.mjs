// src/index.ts
import rehypePrismPlus from "rehype-prism-plus";

// src/withCodeAttributes.ts
import { visit } from "unist-util-visit";
var withCodeAttributes = () => (tree) => {
  visit(tree, "element", (node) => {
    var _a, _b;
    if (node.tagName === "pre") {
      const attributes = {};
      const firstNode = node.children[0];
      if (firstNode && firstNode.tagName === "code") {
        const linesCount = firstNode.children.length;
        if (linesCount) {
          attributes.lines = linesCount;
        }
        const lang = ((_a = node.properties.className[0]) == null ? void 0 : _a.replace("language-", "")) || "";
        if (lang) {
          attributes.language = lang;
        }
        const meta = ((_b = firstNode.data) == null ? void 0 : _b.meta) || "";
        const metas = meta.match(/[^{}]+(?=})/g) || [];
        metas.forEach((attr) => {
          if (attr.indexOf(":")) {
            const key = attr.split(":")[0];
            const val = attr.split(":")[1];
            attributes[key] = val;
          }
        });
        Object.keys(attributes).forEach((key) => {
          node.properties[`data-${key}`] = attributes[key];
        });
      }
    }
  });
};
var withCodeAttributes_default = withCodeAttributes;

// src/withInlineHighlights.ts
import { visit as visit2 } from "unist-util-visit";
var withInlineHighlights = () => (tree) => {
  visit2(tree, "element", (codeElement, _index, parent) => {
    var _a;
    if (!parent || parent.tagName !== "pre" || codeElement.tagName !== "code") {
      return;
    }
    const meta = ((_a = codeElement.data) == null ? void 0 : _a.meta) || "";
    const metas = meta.match(/[^{}]+(?=})/g) || [];
    metas.forEach((attr) => {
      if (attr.indexOf(":")) {
        const [key, val] = attr.split(":");
        if (key.toLowerCase() === "inlineHighlight".toLowerCase()) {
          const [keyword, selected = 0, className = void 0] = val.split("|");
          const selectedIdx = selected && selected.split(",") || [];
          let idx = 0;
          visit2(codeElement, "text", (textNode, index, parentNode) => {
            if (textNode.value === keyword) {
              idx += 1;
              if (selected !== "0" && selectedIdx.length > 0 && selectedIdx.indexOf(idx.toString()) === -1)
                return;
              parentNode.children[index] = {
                type: "element",
                tagName: "span",
                properties: {
                  className: ["inline-highlight", className]
                },
                children: [textNode]
              };
            }
          });
        }
      }
    });
  });
};
var withInlineHighlights_default = withInlineHighlights;

// src/index.ts
var plugins = [
  rehypePrismPlus,
  withInlineHighlights_default,
  withCodeAttributes_default
];
var src_default = plugins;
export {
  src_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93aXRoQ29kZUF0dHJpYnV0ZXMudHMiLCAiLi4vc3JjL3dpdGhJbmxpbmVIaWdobGlnaHRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgcmVoeXBlUHJpc21QbHVzIGZyb20gJ3JlaHlwZS1wcmlzbS1wbHVzJztcclxuXHJcbmltcG9ydCB3aXRoQ29kZUF0dHJpYnV0ZXMgZnJvbSAnLi93aXRoQ29kZUF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgd2l0aElubGluZUhpZ2hsaWdodHMgZnJvbSAnLi93aXRoSW5saW5lSGlnaGxpZ2h0cyc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IFBsdWdnYWJsZUxpc3QgfSBmcm9tICd1bmlmaWVkJztcclxuXHJcbmNvbnN0IHBsdWdpbnM6IFBsdWdnYWJsZUxpc3QgPSBbXHJcbiAgcmVoeXBlUHJpc21QbHVzLFxyXG4gIHdpdGhJbmxpbmVIaWdobGlnaHRzLFxyXG4gIHdpdGhDb2RlQXR0cmlidXRlcyxcclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XHJcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xyXG5cclxuaW1wb3J0IHsgdmlzaXQgfSBmcm9tICd1bmlzdC11dGlsLXZpc2l0JztcclxuXHJcbmNvbnN0IHdpdGhDb2RlQXR0cmlidXRlcyA9ICgpID0+ICh0cmVlOiBhbnkpID0+IHtcclxuICB2aXNpdCh0cmVlLCAnZWxlbWVudCcsIChub2RlKSA9PiB7XHJcbiAgICBpZiAobm9kZS50YWdOYW1lID09PSAncHJlJykge1xyXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xyXG4gICAgICB9ID0ge307XHJcblxyXG4gICAgICBjb25zdCBmaXJzdE5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xyXG5cclxuICAgICAgaWYgKGZpcnN0Tm9kZSAmJiBmaXJzdE5vZGUudGFnTmFtZSA9PT0gJ2NvZGUnKSB7XHJcbiAgICAgICAgLy8gbGluZXMgYXR0cmlidXRlXHJcbiAgICAgICAgY29uc3QgbGluZXNDb3VudCA9IGZpcnN0Tm9kZS5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxpbmVzQ291bnQpIHtcclxuICAgICAgICAgIGF0dHJpYnV0ZXMubGluZXMgPSBsaW5lc0NvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGFuZ3VhZ2UgYXR0cmlidXRlXHJcbiAgICAgICAgY29uc3QgbGFuZyA9XHJcbiAgICAgICAgICBub2RlLnByb3BlcnRpZXMuY2xhc3NOYW1lWzBdPy5yZXBsYWNlKCdsYW5ndWFnZS0nLCAnJykgfHwgJyc7XHJcbiAgICAgICAgaWYgKGxhbmcpIHtcclxuICAgICAgICAgIGF0dHJpYnV0ZXMubGFuZ3VhZ2UgPSBsYW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWV0YSA9IGZpcnN0Tm9kZS5kYXRhPy5tZXRhIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IG1ldGFzID0gbWV0YS5tYXRjaCgvW157fV0rKD89fSkvZykgfHwgW107XHJcblxyXG4gICAgICAgIC8vIGR5bmFtaWMgYXR0cmlidXRlc1xyXG4gICAgICAgIG1ldGFzLmZvckVhY2goKGF0dHI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgaWYgKGF0dHIuaW5kZXhPZignOicpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGF0dHIuc3BsaXQoJzonKVswXTtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gYXR0ci5zcGxpdCgnOicpWzFdO1xyXG5cclxuICAgICAgICAgICAgYXR0cmlidXRlc1trZXldID0gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhcHBseSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICBub2RlLnByb3BlcnRpZXNbYGRhdGEtJHtrZXl9YF0gPSBhdHRyaWJ1dGVzW2tleV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhDb2RlQXR0cmlidXRlcztcclxuIiwgIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXHJcbmltcG9ydCB7IHZpc2l0IH0gZnJvbSAndW5pc3QtdXRpbC12aXNpdCc7XHJcblxyXG5jb25zdCB3aXRoSW5saW5lSGlnaGxpZ2h0cyA9ICgpID0+ICh0cmVlOiBhbnkpID0+IHtcclxuICB2aXNpdCh0cmVlLCAnZWxlbWVudCcsIChjb2RlRWxlbWVudCwgX2luZGV4LCBwYXJlbnQpID0+IHtcclxuICAgIGlmICghcGFyZW50IHx8IHBhcmVudC50YWdOYW1lICE9PSAncHJlJyB8fCBjb2RlRWxlbWVudC50YWdOYW1lICE9PSAnY29kZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ldGEgPSBjb2RlRWxlbWVudC5kYXRhPy5tZXRhIHx8ICcnO1xyXG4gICAgY29uc3QgbWV0YXMgPSBtZXRhLm1hdGNoKC9bXnt9XSsoPz19KS9nKSB8fCBbXTtcclxuXHJcbiAgICBtZXRhcy5mb3JFYWNoKChhdHRyOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKGF0dHIuaW5kZXhPZignOicpKSB7XHJcbiAgICAgICAgY29uc3QgW2tleSwgdmFsXSA9IGF0dHIuc3BsaXQoJzonKTtcclxuXHJcbiAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSAnaW5saW5lSGlnaGxpZ2h0Jy50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICBjb25zdCBba2V5d29yZCwgc2VsZWN0ZWQgPSAwLCBjbGFzc05hbWUgPSB1bmRlZmluZWRdID0gdmFsLnNwbGl0KCd8Jyk7XHJcblxyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJZHggPSAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQuc3BsaXQoJywnKSkgfHwgW107XHJcblxyXG4gICAgICAgICAgbGV0IGlkeCA9IDA7XHJcbiAgICAgICAgICB2aXNpdChjb2RlRWxlbWVudCwgJ3RleHQnLCAodGV4dE5vZGUsIGluZGV4LCBwYXJlbnROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0Tm9kZS52YWx1ZSA9PT0ga2V5d29yZCkge1xyXG4gICAgICAgICAgICAgIGlkeCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCAhPT0gJzAnICYmXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkeC5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkeC5pbmRleE9mKGlkeC50b1N0cmluZygpKSA9PT0gLTFcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW5baW5kZXghXSA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdlbGVtZW50JyxcclxuICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdzcGFuJyxcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBbJ2lubGluZS1oaWdobGlnaHQnLCBjbGFzc05hbWVdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbdGV4dE5vZGVdLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJc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