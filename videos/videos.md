# videos/

The MP4s in this directory are git-ignored. Each one is added and pinned on the
IPFS node on Bryan's Mac and embedded in the site by CID, through the public
gateways listed in ~/BGit/CLAUDE.md ("IPFS Gateways for Video Embeds").

To restore a file on another machine: `ipfs get -o videos/<file> <CID>`
To re-announce one that no gateway can find: `ipfs pin ls <CID>` then `ipfs routing provide <CID>`

| File | CID | Source | Embedded on |
|---|---|---|---|
| we_the_citizens_conferences.mp4 | QmWCmhHpXjX3H2FyzoeUB5BoNfctCizuYS4ncBoXqDiTv8 | ~/_Mirror/video_creation/WeTheCitizens/compressed.mp4 (2026-10-12, 6:36, H.264 + AAC, 137 MB) | site/docs/conferences/overview.mdx; site/docs/r/yearly_conference/overview.mdx |
