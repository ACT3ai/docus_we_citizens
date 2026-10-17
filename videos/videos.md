# videos/

The MP4s in this directory are git-ignored. Each one is added and pinned on the
IPFS node on Bryan's Mac and embedded in the site by CID, through the public
gateways listed in ~/BGit/CLAUDE.md ("IPFS Gateways for Video Embeds").

To restore a file on another machine: `ipfs get -o videos/<file> <CID>`
To re-announce one that no gateway can find: `ipfs pin ls <CID>` then `ipfs routing provide <CID>`

| File | CID | Source | Embedded on |
|---|---|---|---|
| we_the_citizens_conferences.mp4 | bafybeidu3c7xuo5rtonut4eckqepu27ddxqwgyyjybwqi7els2bkhhtple | ~/_Mirror/video_creation/WeTheCitizens/compressed.mp4 (2026-10-12, 6:36, H.264 + AAC, 137 MB) | site/docs/conferences/overview.mdx; site/docs/r/yearly_conference/overview.mdx |

Embed the CIDv1 (bafy...) form, as charlie-kirk does. It is the same content and the same pin as the
CIDv0 (Qm...) form (`ipfs cid base32 <Qm>` converts), but on 2026-10-17 ipfs.filebase.io had cached a
504 for the Qm address while serving the bafy address in full. After embedding a new CID, warm it by
fetching the whole file once through every gateway, so a viewer who seeks mid-video does not hit a cold block.
