export default {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Mark Dyck',
  siteDescription: "The home base of Mark Dyck, a baker who writes",
  intro: "Welcome to my personal website, where I share conversations, thoughts, rants and love notes.",
  homepageTitle: "Mark Dyck -- a baker who writes",
  author: 'Mark Dyck', 
  authorEmail: 'mark@madbaker.com', 
  authorUrl: 'https://madbaker.com', 
  mainSiteNav:  [
    { url: "/", text: "Home" },
    { url: "/about/", text: "About" },
    { url: "/diary/", text: "Nature Diary" },
    { url: "/writing/", text: "Writing" },
    { url: "/podcast/", text: "Podcast" },
    { url: "/tags/", text: "Tags" },
    { url: "/search/", text: "Search" }
  ],
  footerNav:  [
    { url: "/", text: "Home" },
    { url: "/subscribe/", text: "Subscribe" },
    { url: "/contact/", text: "Contact" },
    { url: "/colophon/", text: "Colophon" }
  ],
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  themeColor: '#F0CB67', //  Manifest: defines the default theme color for the application
  themeBgColor: '#F3F3F3', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg', // fallback/default meta image
    opengraph_default_alt:
      'Mark Dyck: making the good stuff and bringing it to the people', // alt text for default meta image
    mastodonProfile: '@madbaker@c.im' // i.e. https://front-end.social/@lene - url to your mastodon instance/profile
  },
  pagination: {
    itemsPerPage: 20
  },
  menu: {
    closedText: 'Menu'
  },
  outposts: {
    "twitterHandle": "@madbaker66",
    "twitterUrl": "https://twitter.com/madbaker66",
    "instagramHandle": "madbaker",
    "instagramUrl": "http://instagram.com/madbaker",
    "githubUrl": "https://github.com/madbaker/",
    "smugmugUrl": "https://madbaker.smugmug.com",
    "mastodonUrl": "https://c.im/@madbaker",
    "linkedInUrl": "https://www.linkedin.com/in/markdyck/",
    "myPodcastTitle": "Rise Up! the Baker Podcast",
    "myPodcastUrl": "https://riseuppod.com"
  }
};


