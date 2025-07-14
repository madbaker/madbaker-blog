---
layout: layouts/base.njk
title: Nature Diary
permalink: /diary/index.html
---

{% set currentCollection = collections.diary %}

{% include 'partials/postsByMonth.njk' %}