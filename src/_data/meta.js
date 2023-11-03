module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Mark Dyck',
  siteDescription:
    'This is the home base of Mark Dyck - baker, writer, coach and podcast host.',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: 'Mark Dyck', // i.e. Lene Saile - author's name. Must be set.
  authorEmail: 'mark@madbaker.com', // i.e. hola@lenesaile.com - email of the author
  authorWebsite: 'https://madbaker.com', // i.e. https.://www.lenesaile.com - the personal site of the author
  themeColor: '#F0CB67', //  Manifest: defines the default theme color for the application
  themeBgColor: '#F3F3F3', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg', // fallback/default meta image
    opengraph_default_alt:
      'Mark Dyck: making the good stuff and bringing it to the people', // alt text for default meta image
    mastodonProfile: '@madbaker@c.im' // i.e. https://front-end.social/@lene - url to your mastodon instance/profile
  },
  blog: {
    // this is for the rss feed
    name: "Mark Dyck's Blog",
    description:
      'making the good stuff and bringing it to the people.'
  },
  pagination: {
    itemsPerPage: 20
  },
  address: {
    // edit all presets or leave empty. They are being used in the pages for privacy.md and imprint.md
    firma: 'Mark Dyck Community Projects',
    street: '#404, 655 Douglas Street',
    city: 'Victoria',
    state: 'BC',
    zip: 'V8V 0B6',
    mobileDisplay: ' ',
    mobileCall: ' ',
    email: 'mark@madbaker.com',
    cif: ''
  },
  menu: {
    closedText: 'Menu'
  },
  feed: {
    subtitle: "Baker. Writer. Confused Human.",
    filename: "feed.xml",
    path: "/feed/feed.xml",
    url: "https://madbaker.com/feed/feed.xml",
    id: "https://madbaker.com/"
   },
};
