// site/pages/home3/home.html is imported as a string (webpack rule html-source in
// docusaurus.config.ts).
declare module '*.html' {
  const html: string;
  export default html;
}
