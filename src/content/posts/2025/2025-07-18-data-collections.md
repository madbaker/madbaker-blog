---
title: "Data vs. Collections in Eleventy"
date: 2025-07-18
tags: ["Website", "Eleventy"]

---
**The main point:**  This post explains a key difference between Eleventy global data files and Eleventy collections, which caused me untold grief as I tried to make a 'simple' change to this website.

## Disclaimer

I may have a been a professional computer programmer, but that was in the 1990's.  So my use of technical language is quite loose.  If folks want to point out my most egregious errors, I'll update the post.

## Starting Over

My [website update project](https://madbaker.com/blog/its-time-to-look-at-the-website-again/) is well underway.  While most of my changes are in the background (refactoring code, simplifying the build process, etc.) I made one visible change to my home page, which was supposed to be extremely simple.  Instead, it took me two days to implement.

It turns out I didn't really understand the difference between Eleventy collections and Global data files.  I think I understand it now. In the spirit of helping other people learn from my fumbling around, I'm going to share my work with you here. 

## One home for all my creations

This site is built using the [Eleventy](https://11ty.dev) static site generator.  What this means is nearly every page of content is stored in simple markdown files.  Then Eleventy runs all the markdown text through a series of templates and builds a complete set of very fast, good looking, linked together web pages.  

I assign `tags` to each piece of content and, when Eleventy processes all the files, content is grouped into `collections` based on the tags.  So I have a **Writing** collection, a **Diary** collection, a **Dispatches** collection, and so on.  And there are all kinds of cool things you can do with collections.

But my podcast episodes? They are not in markdown files.  Instead, they are all hosted on a completely different platform via the podcast host [Libsyn](https://libsyn.com).  

So how can I bring all my podcast episodes over here, to be part of my creative canon?  And can I get the episodes into a `collection` like my other content?

## Eleventy Global Data Files

Eleventy anticipates this scenario and lets us bring external data into the site using Global Data Files.  In a nutshell:

- Get the podcast data out of Libsyn.  That's easy as, like all podcasts, I have an RSS feed of my episodes ready to feed your podcast player of choice.  
- Parse the RSS feed and extract episode information.
- Export the parsed feed as a Javascript object.  
- put this fetch/parse/export-as-JS function in my `_data` folder so Eleventy will run it at build time.

That's what I did.  I have a file called `podfeed.js` in my `_data` folder and I have access to all the podcast data via a global variable called `podfeed`.

(My parser function is based on [this excellent article by Mike Street](https://www.mikestreety.co.uk/blog/making-an-11ty-collection-from-a-remote-xml-file/) if you want to dig into it.)

`podfeed` is an array with one episode per element.  Here's an example of all the data I can access for each episode:

{% raw %}
```js
{
  title: 'Rise Up! #223 - Mark Gavigan and Kristin Ryall',
  itunes_title: 'Mark Gavigan and Kristin Ryall, owners of Bread and Flours in Palm Springs, CA',
  pubDate: 'Wed, 16 Apr 2025 11:00:00 +0000',
  guid: {
      '#text': '9595a3e0-93a0-4170-8440-4c6b7487b6a0',
    '@_isPermaLink': 'false'
  },
  link: 'http://riseuppod.com/rise-up-223-mark-gavigan-and-kristin-ryall',
  description: `<p>There are times when family is bigger than career and you need to figure things out.  And often, bread and baking becomes the way forward.  That's what happened to Mark Gavigan and Kristin Ryall, who gave up careers in the wine trade to relocate to Palm Springs to be closer to their family, and Mark fell into baking in a big way.</p> <p>In this episode, Mark, Kristin and your host Mark talk about the experience of giving it all up to move cross country, how baking started small and then grew and grew until they opened their brick and mortar location, and the challenging reality of baking in an extremely hot, extremely seasonal location.</p> <p>There is also talk about the <a href= "https://bbga.org/BLC/">Bakery Leadership Circle</a>, Mark's new project offered via the BBGA</p> <p><strong>Helpful Links</strong></p> <p><a href="https://www.breadandflours.com/">Bread and Flours</a></p> <p><a href= "https://www.instagram.com/breadandflours/">@breadandflours on Instagram</a></p> <p><a href="https://donorbox.org/riseuppod">Support the Podcast Here!</a></p> <p><a href="http://riseuppod.com/">Rise Up! The Baker Podcast website</a></p> <p><a href="https://bakers4bakers.org/">The Bakers4Bakers Community</a></p> <p>Mark's Blog, with the <a href= "https://madbaker.com/">Bakernomics series</a></p> <p><a href="https://www.instagram.com/madbaker">Mark on Instagram</a></p> <h4>Credits:</h4> <p>Produced and hosted by Mark Dyck</p> <p>Theme song and music by Robyn Dyck</p> <p>Orange Boot Human logo by <a href= "http://www.unitecoop.com/">Fred Reibin</a></p> <p> </p>`,
  content_encoded: `<p>There are times when family is bigger than career and you need to figure things out.  And often, bread and baking becomes the way forward.  That's what happened to Mark Gavigan and Kristin Ryall, who gave up careers in the wine trade to relocate to Palm Springs to be closer to their family, and Mark fell into baking in a big way.</p> <p>In this episode, Mark, Kristin and your host Mark talk about the experience of giving it all up to move cross country, how baking started small and then grew and grew until they opened their brick and mortar location, and the challenging reality of baking in an extremely hot, extremely seasonal location.</p> <p>There is also talk about the <a href= "https://bbga.org/BLC/">Bakery Leadership Circle</a>, Mark's new project offered via the BBGA</p> <p>Helpful Links</p> <p><a href="https://www.breadandflours.com/">Bread and Flours</a></p> <p><a href= "https://www.instagram.com/breadandflours/">@breadandflours on Instagram</a></p> <p><a href="https://donorbox.org/riseuppod">Support the Podcast Here!</a></p> <p><a href="http://riseuppod.com/">Rise Up! The Baker Podcast website</a></p> <p><a href="https://bakers4bakers.org/">The Bakers4Bakers Community</a></p> <p>Mark's Blog, with the <a href= "https://madbaker.com/">Bakernomics series</a></p> <p><a href="https://www.instagram.com/madbaker">Mark on Instagram</a></p> Credits: <p>Produced and hosted by Mark Dyck</p> <p>Theme song and music by Robyn Dyck</p> <p>Orange Boot Human logo by <a href= "http://www.unitecoop.com/">Fred Reibin</a></p> <p> </p>`,
  enclosure: {
      '@_length': '60157786',
    '@_type': 'audio/mpeg',
    '@_url': 'https://traffic.libsyn.com/secure/riseuppod/EP223-MarkGavigan-KristinRyall.mp3?dest-id=623049'
  },
  itunes_duration: '01:02:11',
  itunes_explicit: false,
  libsyn_itemId: 36158845,
  libsyn_itemSlug: 'rise-up-223-mark-gavigan-and-kristin-ryall',
  itunes_keywords: '',
  itunes_subtitle: "There are times when family is bigger than career and you need to figure things out.  And often, bread and baking becomes the way forward.  That's what happened to Mark Gavigan and Kristin Ryall, who gave up careers in the wine trade to...",
  itunes_episode: 223,
  itunes_episodeType: 'full',
  itunes_author: 'Mark Dyck'
}
```
{% endraw%}

## Making the Collection

I now have access to all my podcast data, but I don't have an Eleventy collection yet.  The next step is building a template file to display all this information on a series of pages.  I accomplished this by making a **pagination template**, a special type of Eleventy template.

Here's `podfeed.njk` which is the pagination template:

{% raw %}
```md
---
layout: layouts/default.njk
pagination:
    data: podfeed
    size: 1
    alias: episode
    addAllPagesToCollections: true 
tags: ["riseuppod"]
permalink: "/riseuppod/{{ episode.title | slugify }}/"

---

{{ episode.itunes_title }}

<br/>
Published on: {{ episode.pubDate }}

{{episode.description | safe}}

{% include "partials/podcastplayer.njk" %}

```
{% endraw %}

The key parts of the front matter:

`data: podfeed` :  use the object I created in `podfeed.js` as input.

`size: 1` : make a web page for every element in `podfeed`   

`alias: episode` :  refer to each element being processes as an 'episode'

`addAllPagesToCollections: true` : add the new pages to an Eleventy collection

`tags: ["riseuppod"]` : call the collection 'riseuppod'  

The key point to remember is that I can access all the data in the `podfeed` object in the page template.  For example, `episode.itunes_title`  and `episode.description` refer to values in the `podfeed` object.

With this template in place, when Eleventy builds the site, it will use the template to build one page for every podcast episode in the `podfeed` object.

## But where's all the data?

I thought I had everything figured out, until I tried to do more with my new `riseuppod` collection.

- I tried to put the current episode on my homepage.
- I tried to make a list of all podcast episodes on one page.

No dice.  No matter what I tried, I could not access any of my episode details from within the `collections.riseuppod` object.  I would just see a blank space where the podcast episode should be.

I could still access the episode data via the `podfeed` data object (it's a **_global_** data object after all), but I wanted the podcast to be consistent with my other content.  Using collections seems to be the Eleventy way, and I want to do things the Eleventy way.

## What is _really_ in a collection?

Digging into the [Eleventy documentation](https://www.11ty.dev/docs/collections/#collection-item-data-structure), I see that collection items have the following information:

- `page`: information, like the url and the publish date
- `content`: the rendered content of the page
- `data`: **"all data for this piece of content"**

And that was the problem.  I thought 'all data' meant **ALL THE DATA**, including everything in the `podfeed` object for that page.  But it really means 'all the data in the content front matter.'  So if I wanted to access more of the podcast episode details, I needed to explicitly add it to the front matter.

## Adding more data into the collection

That's what I did. I added a special `EleventyComputed` section to the front matter and added all the values I want to show across the website.

Here's the new front matter:
{%raw%}

```md
---
layout: layouts/default.njk
pagination:
    data: podfeed
    size: 1
    alias: episode
    addAllPagesToCollections: true 
tags: ["riseuppod"]
permalink: "/riseuppod/{{ episode.title | slugify }}/"
eleventyComputed:
  title:           "{{episode.itunes_title}}"
  pubDate:         "{{episode.pubDate | RFC2822ToReadableDate}}" 
  libsynEpisodeID: "{{episode.libsyn_itemId}}"
  audioPlayer:     "{{episode.enclosure.@_url}}"
  episodeID:       "{{episode.episodeID}}" 
---    
```
{%endraw%}

And it worked!  I can now access the relevant details for any podcast episode via `collections.riseuppod`, including the information needed to embed the audio for the episode. 

In the future, if there is more data in the `podfeed` rss feed that I want to reference, I can always add it by adding another line to the `eleventyComputed` section in the front matter.

## Conclusion

This notion that the contents of `collection.[tag].data` referred to the data in the front matter was a revelation to me and it caught me out for a good long time.  But now that I see it, it makes good sense.

My stumble also helped me get used the term 'template' as used with Eleventy.  That `podfeed.njk` file is the template for the web page (the `content`), and the front matter is the data for the collection. My mental model is now something like, _this file defines the data in the collection, and the way each collection item is displayed on the page._

This also helps me read through github repos of other Eleventy sites.  Some of them are very front-matter heavy and I didn't understand why.  But it makes the difference between being able to reference a specific element on another page or not. It was especially important with my podcast episodes, since that content isn't hosted with the rest of the site.




