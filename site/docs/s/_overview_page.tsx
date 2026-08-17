import type {ReactNode} from 'react';

/* The We The Citizens S front door — WeCitizensSocialism.com.

   A thin per-edition entry point. The whole page lives in the shared
   PartyFrontDoor component, written once and parameterized by the edition code,
   so the mirror-symmetry rule of pm/r_vs_d.mdx §5 is enforced by construction
   instead of depending on four people remembering to make four identical edits.
   S's pair partner on the economic axis is L: site/docs/l/_overview_page.tsx is
   this file with one letter changed and nothing else, which is exactly what §5
   asks of a pair.

   Named with a leading underscore so the docs plugin ignores it as a page of its
   own; it is rendered by ./overview.mdx. */
import PartyFrontDoor from '@site/src/components/PartyFrontDoor';

export default function WeTheCitizensSOverview(): ReactNode {
  return <PartyFrontDoor edition="S" />;
}
