
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginNavigation from "@11ty/eleventy-navigation";
import { HtmlBasePlugin } from "@11ty/eleventy";


// importing the drafts stuff to use in a plugin

import {
    readableDate,
    htmlDateString,
	RFC2822ToHtmlDateString,
	RFC2822ToReadableDate,
    toIsoString,
    head,
    min,
    getAllTags,
    filterTagList,
    groupByYear,
    groupByMonth,
    padStart,
	cssmin
  } from './src/_11ty/filters.js';

import {post, contentPaginatedByYearMonth} from './src/_11ty/collections.js'


// module import shortcodes
import imageShortcodePlaceholder from './src/_11ty/images.js';
import liteYoutube from './src/_11ty/youtube-lite.js';


import draft from './eleventy.config.drafts.js';

// Eleventy 3.0 supports async configuration callbacks:
export default async function(eleventyConfig) {


	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/
	// NOTE:  the prismjs css is for syntax highlighting in code blocks`

	eleventyConfig.addPassthroughCopy({
		"./src/assets/": "/",
		"./src/static/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css",
		"./src/content/robots.txt": "/robots.txt"
	});


	// App plugins
	eleventyConfig.addPlugin(draft);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);


	
	// Filters
	
	eleventyConfig.addFilter('readableDate', readableDate);
	eleventyConfig.addFilter('htmlDateString', htmlDateString);
	eleventyConfig.addFilter('toIsoString', toIsoString);
	eleventyConfig.addFilter('RFC2822ToHtmlDateString', RFC2822ToHtmlDateString);
	eleventyConfig.addFilter('RFC2822ToReadableDate', RFC2822ToReadableDate);
	eleventyConfig.addFilter('head', head);
	eleventyConfig.addFilter('min', min);
	eleventyConfig.addFilter('getAllTags', getAllTags);
	eleventyConfig.addFilter('filterTagList', filterTagList);
	eleventyConfig.addFilter('groupByYear', groupByYear);
	eleventyConfig.addFilter('groupByMonth', groupByMonth);
	eleventyConfig.addFilter('padStart', padStart);
	eleventyConfig.addFilter('cssmin', cssmin);
	
		
	// Collections

	eleventyConfig.addCollection('post', post);
	eleventyConfig.addCollection('contentPaginatedByYearMonth', contentPaginatedByYearMonth);

// Custom Shortcodes

	eleventyConfig.addNunjucksAsyncShortcode('imagePlaceholder', imageShortcodePlaceholder);
	eleventyConfig.addShortcode('youtube', liteYoutube);
	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles


	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItFootnote));




	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid"
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "src",         // default: "."
			includes: "_includes",  // default: "_includes"
			data: "_data",          // default: "_data"
			output: "_site"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
