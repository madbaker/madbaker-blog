---
layout: layouts/base.njk
title: Writing
permalink: /writing/index.html
eleventyNavigation:
  key: Writing
  order: 3
---


{% set currentCollection = collections.posts %}

{% include 'partials/postsByMonth.njk' %}

