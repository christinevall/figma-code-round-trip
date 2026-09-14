/* The Docs page for every component.
   Same as Storybook's default, plus a "Code" section: each file the
   component is made of, folded, so you can open it and read along. */

import { createElement as h, Fragment } from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories, Source, useOf } from '@storybook/addon-docs/blocks';

const summaryStyle = {
  cursor: 'pointer',
  padding: '12px 16px',
  fontFamily: 'ui-monospace, Menlo, monospace',
  fontSize: 14,
  fontWeight: 600,
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: 8,
  marginBottom: 8,
};

function CodeFile({ name, code }) {
  const language = name.endsWith('.css') ? 'css' : 'jsx';
  return h('details', { style: { marginBottom: 8 } },
    h('summary', { style: summaryStyle }, name),
    h(Source, { code, language, dark: true }),
  );
}

function ComponentCode() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const files = preparedMeta.parameters.code;
  if (!files) return null;

  return h(Fragment, null,
    h('h3', null, 'Code'),
    h('p', null, 'The files this is made of. Click to open.'),
    ...files.map((file) => h(CodeFile, { key: file.name, ...file })),
  );
}

export function DocsPage() {
  return h(Fragment, null,
    h(Title),
    h(Subtitle),
    h(Description),
    h(Primary),
    h(Controls),
    h(ComponentCode),
    h(Stories),
  );
}
