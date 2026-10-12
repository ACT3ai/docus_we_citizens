// Move an IPFS video to its next gateway when the current one STALLS.
//
// A <video> with several <source> children only falls through to the next one
// when a source ERRORS (HTTP error, DNS failure). A public gateway that accepts
// the connection and then sits there never errors, so the player hangs on a
// black poster forever while a working gateway is listed right below it.
//
// This watches every video whose sources point at /ipfs/. If no metadata has
// arrived STALL_MS after loading began, the stalled source is removed and the
// player reloads, which makes the browser try the next one. Sources that error
// are removed too, so a later reload never walks back into a dead host.
// The gateway order is the one in ~/BGit/CLAUDE.md -> "IPFS Gateways for Video
// Embeds"; this repo has no gateway list file of its own yet. Copied from
// ~/BGit/Bryan_git/charlie-kirk/site/internals/src/clientModules/ on 2026-10-12.

const STALL_MS = 9000;

function isIpfsVideo(video) {
  const sources = video.querySelectorAll('source');
  return sources.length > 1 && [...sources].some((s) => (s.getAttribute('src') || '').includes('/ipfs/'));
}

function arm(video) {
  if (video.dataset.wcIpfsFallback) return;
  if (!isIpfsVideo(video)) return;
  video.dataset.wcIpfsFallback = '1';

  let timer = null;
  const clear = () => {
    clearTimeout(timer);
    timer = null;
  };

  const dropCurrentAndReload = () => {
    clear();
    const sources = [...video.querySelectorAll('source')];
    if (sources.length < 2) return; // last one left: let the browser keep trying it
    const stalled = sources.find((s) => s.src === video.currentSrc) || sources[0];
    const resume = !video.paused;
    stalled.remove();
    video.load();
    if (resume) video.play().catch(() => {});
  };

  const watch = () => {
    clear();
    timer = setTimeout(() => {
      if (video.readyState < 1) dropCurrentAndReload();
    }, STALL_MS);
  };

  video.addEventListener('loadstart', watch);
  video.addEventListener('loadedmetadata', clear);
  video.addEventListener('emptied', clear);
  video.querySelectorAll('source').forEach((s) => {
    s.addEventListener('error', () => {
      if (video.querySelectorAll('source').length > 1) s.remove();
    });
  });

  // preload="metadata" pages start fetching before this module runs.
  if (video.networkState === 2 && video.readyState < 1) watch();
}

function scan() {
  document.querySelectorAll('video').forEach(arm);
}

export function onRouteDidUpdate() {
  // Let React finish painting the new route before looking for players.
  setTimeout(scan, 0);
}
