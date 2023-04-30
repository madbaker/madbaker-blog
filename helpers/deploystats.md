Local:

Initial 'npm run start'
copied 42 files / wrote 65 files in 2.24 seconds (34.5ms each, v2.0.0)

#2: after deleting _site (to rebuild all images)
[11ty] Copied 42 files / Wrote 65 files in 294.48 seconds (4530.5ms each, v2.0.0)
(4m 55s)

#3: add 1 blog post and 24 images
[11ty] Copied 42 files / Wrote 66 files in 21.62 seconds (327.6ms each, v2.0.0)

#4: edit the blog post (no new images)

[11ty] Benchmark     64ms  11%   161× (Configuration) "slugify" Nunjucks Filter
[11ty] Benchmark    167ms  30%    54× (Configuration) "transformWithHtmlBase" Nunjucks Async Filter
[11ty] Copied 42 files / Wrote 66 files in 0.56 seconds (8.5ms each, v2.0.0)

Netlify (deploying via github)

Initial Deploy:

55 generated pages and 839 assets changed
Build time: 4m 48s
Time between npx @11ty/eleventy and first write: 3m 50s

Deploy #2: (added two blog posts)

56 generated pages and 13 assets changed
Build time: 4m 52 s
Time between npx @11ty/eleventy and first write: 4m 16s

Deploy #3: (new blog post w/ ~10 images, added caching plugin)

60 generated pages and 172 assets changed
Build time: 5m 18s
Time between npx @11ty/eleventy and first write: 4m 38s
Note: A cache of 'img' does not exist (yet). Makes sense.  

Deploy #4 (new blog post w/ 24 new images, cache _should_ be there)

9 generated pages and 138 assets changed.
Build time: 5m 27s
Time between npx @11ty/eleventy and first write: 4m 38s
Note: A cache of 'img' does not exist (yet). Argh.  What happened?