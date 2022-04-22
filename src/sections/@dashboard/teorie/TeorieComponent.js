import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import RehypeKatexPlugin from 'rehype-katex';
import RemarkMathPlugin from 'remark-math';

const _mapProps = (props) => ({
  ...props,
  // escapeHtml: false,
  remarkPlugins: [RemarkMathPlugin],
  rehypePlugins: [RehypeKatexPlugin]
  // components: {
  //   ...props.renderers,
  //   math: ({ props }) => <BlockMath>{props.value}</BlockMath>,
  //   inlineMath: ({ props }) => <InlineMath>{props.value}</InlineMath>
  // }
});

function Markdown(props) {
  console.log('am ajuns in functie');
  return <ReactMarkdown {..._mapProps(props)} />;
}

export default Markdown;
