import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

if (!process.argv.includes("--skip-build")) {
  const build = spawnSync("pnpm build", {
    cwd: root,
    encoding: "utf8",
    shell: true,
    stdio: "inherit",
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

function read(relativePath) {
  return readFileSync(resolve(root, ".next/server/app", relativePath), "utf8");
}

function requirePattern(content, pattern, label) {
  if (!pattern.test(content)) throw new Error(`SEO check failed: ${label}`);
}

function rejectPattern(content, pattern, label) {
  if (pattern.test(content)) throw new Error(`SEO check failed: ${label}`);
}

const home = read("index.html");
const projects = read("projects.html");
const admin = read("admin/login.html");
const docs = read("docs.html");
const businessOS = read("businessos.html");
const sitemap = read("sitemap.xml.body");
const robots = read("robots.txt.body");

requirePattern(home, /rel="canonical" href="https:\/\/kingsley\.bespoketech\.com\.ng"/, "home canonical");
requirePattern(projects, /rel="canonical" href="https:\/\/kingsley\.bespoketech\.com\.ng\/projects"/, "projects canonical");
requirePattern(projects, /name="twitter:title" content="Projects/, "projects Twitter title");

for (const [name, html, noarchive] of [
  ["admin", admin, true],
  ["docs", docs, false],
  ["businessOS", businessOS, false],
]) {
  requirePattern(html, /name="robots" content="[^"]*noindex[^"]*nofollow/, `${name} robots`);
  if (noarchive) requirePattern(html, /name="robots" content="[^"]*noarchive/, `${name} noarchive`);
  rejectPattern(html, /rel="canonical"/, `${name} must not inherit a canonical`);
}

rejectPattern(sitemap, /<lastmod>/, "sitemap must not invent modification dates");
rejectPattern(sitemap, /\/(docs|businessos)<\/loc>/, "internal routes must stay out of sitemap");
requirePattern(robots, /User-Agent: \*/, "robots.txt user agent");

console.log("SEO check passed: canonicals, robots, social metadata, and sitemap.");
