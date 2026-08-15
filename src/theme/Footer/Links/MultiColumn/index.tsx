import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { ThemeClassNames } from "@docusaurus/theme-common";
import LinkItem from "@theme/Footer/LinkItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type FooterItem = {
  to?: string;
  href?: string;
  html?: string;
  label?: string;
  className?: string;
  prependBaseUrlToHref?: string;
};

type FooterColumn = {
  title?: string;
  className?: string;
  items: FooterItem[];
};

/**
 * Docusaurus's footer schema does not allow a link target on the column header
 * itself. Rather than repeat the URLs here, the title → route map is built in
 * internal/nav.ts from the same Level 2 registry that builds the columns, and
 * handed to the browser through siteConfig.customFields. The footer therefore
 * cannot drift from the top bar.
 */
function useColumnTitleLinks(): Record<string, string> {
  const { siteConfig } = useDocusaurusContext();
  return (siteConfig.customFields?.footerColumnLinks ?? {}) as Record<
    string,
    string
  >;
}

function ColumnLinkItem({ item }: { item: FooterItem }) {
  return item.html ? (
    <li
      className={clsx("footer__item", item.className)}
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function ColumnTitle({ title }: { title?: string }) {
  const columnTitleLinks = useColumnTitleLinks();
  if (!title) {
    return null;
  }
  const target = columnTitleLinks[title];
  if (target) {
    return (
      <Link className="footer__title footer__title--link" to={target}>
        {title}
      </Link>
    );
  }
  return <div className="footer__title">{title}</div>;
}

function Column({ column }: { column: FooterColumn }) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        "col footer__col",
        column.className,
      )}
    >
      <ColumnTitle title={column.title} />
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({
  columns,
}: {
  columns: FooterColumn[];
}) {
  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
