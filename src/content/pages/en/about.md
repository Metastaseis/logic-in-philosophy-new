---
import { getEntry } from "astro:content";

// collection key: "ruthmanor"  (from config.ts)
// slug (filename without extension): "about-en"
const entry = await getEntry("ruthmanor", "about-en");
if (!entry) {
  throw new Error("Missing content: src/content/ruthmanor/about-en.md");
}

const { Content } = await entry.render();
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Ruth Manor — About</title>
  </head>
  <body>
    <main class="container">
      <h1>Ruth Manor — About</h1>
      <Content />
    </main>
  </body>
</html>
