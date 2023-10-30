---
title: 'Post with podcast embed'
summary: 'where I try to embed a podcast episode'
tags: podcast
date: 2023-04-01
podcastEpisodeId: '26373927'
---
## The HTML Tag

{% set episode = podfeed.rss.channel.item[0] %}

<figure>
    <figcaption>{{ episode.itunes_title }}</figcaption>
    <audio
        controls
        src="{{episode.enclosure.@_url}}">
            <a href="{{episode.enclosure.@_url}}">
                Download audio
            </a>
    </audio>
</figure>

<audio controls>
  <source src="{{episode.enclosure.@_url}}" type="audio/mpeg" />
</audio>

  <p>
    Download <a href="{{episode.enclosure.@_url}}">MP3</a> audio.
  </p>

## The oEmbed method

https://oembed.libsyn.com/embed?item_id=26373927

## The nunjucks template method...


