import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import RehypeKatexPlugin from 'rehype-katex';
import RemarkMathPlugin from 'remark-math';
import RehypeRaw from 'rehype-raw';
import RehypeSanitize from 'rehype-sanitize';

const _mapProps = (props) => ({
  ...props,
  // escapeHtml: false,
  remarkPlugins: [RemarkMathPlugin],
  rehypePlugins: [RehypeKatexPlugin, RehypeRaw]
  // rehypePlugins={[RehypeRaw, RehypeSanitize]}
  // components: {
  //   ...props.renderers,
  //   math: ({ props }) => <BlockMath>{props.value}</BlockMath>,
  //   inlineMath: ({ props }) => <InlineMath>{props.value}</InlineMath>
  // }
});

function Markdown(props) {
  return <ReactMarkdown {..._mapProps(props)} />;
}

export default Markdown;
