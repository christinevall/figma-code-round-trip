import { Controls, Description, Heading, Primary, Source, Stories, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks'
import { ComponentCss } from './component-css'
import { sourceFor } from './sources'

/** Autodocs page: the usual blocks, then the component source and the CSS Tailwind generated for it. */
export function ComponentDocsPage() {
  const { preparedMeta } = useOf('meta', ['meta'])
  const { file, code } = sourceFor(preparedMeta.parameters)

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories />
      {code && (
        <>
          <Heading>Component source</Heading>
          <p>
            <code>{file}</code> — the full implementation, including every variant.
          </p>
          <Source code={code} language="tsx" dark />
          <ComponentCss source={code} />
        </>
      )}
    </>
  )
}
