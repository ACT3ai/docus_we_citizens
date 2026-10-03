import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
 * Footer bottom strip, swizzled to carry the "View on GitHub" button above the
 * copyright line. The footer renders on every page through @theme/Layout, so
 * this one component puts the button on the whole site.
 *
 * Modelled on the GitHub button on deepseek.com/en/harness: a pill, the GitHub
 * mark in front of the label, and a circle that fills outward on hover.
 * Styling: "View on GitHub" section of internal/css/custom.css.
 * The URL comes from customFields.githubUrl in docusaurus.config.ts.
 */
export default function FooterCopyright({ copyright }: { copyright: string }) {
  const { siteConfig } = useDocusaurusContext();
  const githubUrl = siteConfig.customFields?.githubUrl as string | undefined;

  return (
    <>
      {githubUrl && (
        <div className="wcGithubBand">
          <div className="wcGithubBand__text">
            <span className="wcGithubBand__title">Open source, out in the open</span>
            <span className="wcGithubBand__sub">
              The We The Citizens app is open source. Read the code, check the
              math, run it yourself.
            </span>
          </div>
          <a
            className="wcGithubButton"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="wcGithubButton__content">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </span>
          </a>
        </div>
      )}
      <div
        className="footer__copyright"
        // Developer provided the HTML, so assume it's safe.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: copyright }}
      />
    </>
  );
}
