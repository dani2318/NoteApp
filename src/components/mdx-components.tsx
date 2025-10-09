import { MDXComponents } from 'mdx/types' // or from your MDX setup

const components: MDXComponents = {
  strong: ({ children, ...props }) => {
    return (
      <span
        className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance block"
        {...props}
      >
        {children}
      </span>
    );
  },
  // you can put other overrides here as needed
};

// If you want to merge with existing/default components:
export function useMDXComponents(
  baseComponents?: MDXComponents
): MDXComponents {
  return {
    ...(baseComponents ?? {}),
    ...components,
  } satisfies MDXComponents;
}
