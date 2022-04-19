import React from 'react';
import { Container } from '@mui/material';
import { BlockMath, InlineMath } from 'react-katex';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
import Page from '../components/Page';

export default function Teorie() {
  const content = `
# Welcome to StackEdit!

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.

# Files

Given a **formula** below
$$
s = ut + \\frac{1}{2}at^{2}
$$
Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$
`;
  const blockMath = `
s = ut + \\frac{1}{2}at^{2}
`;
  const inlineMath = `
s = ut + \\frac{1}{2}at^{2}
`;
  return (
    <Page title="Dashboard: Teorie">
      <Container>
        <Markdown>{content}</Markdown>
        <BlockMath>{blockMath}</BlockMath>
        <InlineMath>{inlineMath}</InlineMath>
      </Container>
    </Page>
  );
}
