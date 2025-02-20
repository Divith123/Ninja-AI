import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";

// Add display name for better React DevTools visibility
const MemoizedReactMarkdownComponent: FC<Options> = (props) => (
  <ReactMarkdown
    {...props}
    components={{
      pre({ node, ...props }) {
        const codeString = props.children[0]?.props.children || "";
        return (
          <div className="relative">
            <CopyToClipboard text={codeString}>
              <button className="absolute top-2 right-2 p-1 bg-gray-200 rounded shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                <FiCopy className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
            </CopyToClipboard>
            <pre
              {...props}
              style={{
                color: "var(--foreground-light)", // Light mode text color
                backgroundColor: "var(--background-light)", // Light mode background color
              }}
              className="dark:text-foreground-dark dark:bg-background-dark"
            />
          </div>
        );
      },
      ...props.components,
    }}
  />
);
MemoizedReactMarkdownComponent.displayName = "MemoizedReactMarkdown";

// Enhanced comparison function
const propsAreEqual = (prevProps: Options, nextProps: Options) => {
  const keys = new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  
  // Development-only render tracking
  if (process.env.NODE_ENV === "development") {
    const changes = Array.from(keys).filter(key => 
      prevProps[key as keyof Options] !== nextProps[key as keyof Options]
    );
    if (changes.length > 0) {
      console.log("[ReactMarkdown] Re-render triggered by:", changes);
    }
  }

  // Core comparison logic
  return (
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className &&
    prevProps.components === nextProps.components &&
    JSON.stringify(prevProps.remarkPlugins) === JSON.stringify(nextProps.remarkPlugins) &&
    JSON.stringify(prevProps.rehypePlugins) === JSON.stringify(nextProps.rehypePlugins)
  );
};

export const MemoizedReactMarkdown = memo(
  MemoizedReactMarkdownComponent,
  propsAreEqual
) as FC<Options>;