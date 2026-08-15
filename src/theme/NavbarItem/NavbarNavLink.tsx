import React from "react";
import NavbarNavLink from "@theme-original/NavbarItem/NavbarNavLink";

/**
 * Wrapper around the theme's NavbarNavLink that adds a `subLabel` prop.
 *
 * Why a wrapper, and why here
 * ---------------------------
 * Docusaurus navbar labels are plain strings, so "We The Citizens R" cannot
 * carry "Republicans" on a second line. But EVERY navbar link — top-level items,
 * dropdown parents (desktop and mobile), and dropdown children — funnels through
 * `@theme/NavbarItem/NavbarNavLink`. Wrapping that one component is therefore the
 * single deepest place where a two-line label works site-wide, on every page,
 * without touching any page.
 *
 * `NavbarItemBaseSchema` in @docusaurus/theme-classic is declared `.unknown()`,
 * so arbitrary props such as `subLabel` pass config validation untouched and
 * arrive here. We consume `subLabel` rather than forwarding it, so it never
 * reaches the DOM as an invalid attribute.
 *
 * Implementation note: the upstream component builds its children from `label`
 * (or from `html`) and OVERRIDES any children passed to it. So handing it JSX
 * children would be discarded — the supported escape hatch is `html`, which the
 * upstream component renders via dangerouslySetInnerHTML. The label text is
 * escaped below before it is interpolated.
 */

type Props = React.ComponentProps<typeof NavbarNavLink> & {
  label?: string;
  html?: string;
  subLabel?: string;
  className?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function NavbarNavLinkWrapper(props: Props): React.ReactElement {
  const { subLabel, ...rest } = props;

  if (!subLabel) {
    return <NavbarNavLink {...(rest as Props)} />;
  }

  // Drop `children` and `label`: upstream reads `html` XOR `label`, and any
  // children it receives would collide with dangerouslySetInnerHTML.
  const { label, html, children, className, ...passthrough } = rest as Props & {
    children?: React.ReactNode;
  };

  const top = html ?? escapeHtml(String(label ?? ""));
  const stacked =
    `<span class="wcNavStack">` +
    `<span class="wcNavStackTop">${top}</span>` +
    `<span class="wcNavStackSub">${escapeHtml(subLabel)}</span>` +
    `</span>`;

  return (
    <NavbarNavLink
      {...(passthrough as Props)}
      className={[className, "wcNavStacked"].filter(Boolean).join(" ")}
      html={stacked}
    />
  );
}
