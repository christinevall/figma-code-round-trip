import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    // Exposes an MCP server at http://localhost:6006/mcp while Storybook runs
    '@storybook/addon-mcp',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  features: {
    // Component manifest powers the docs tools of the Storybook MCP server
    experimentalComponentsManifest: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Keep our own props and the cva variant props; drop the hundreds of inherited HTML attributes
      propFilter: (prop) =>
        !prop.parent || !/node_modules/.test(prop.parent.fileName) || ['variant', 'size', 'asChild'].includes(prop.name),
    },
  },
}

export default config
