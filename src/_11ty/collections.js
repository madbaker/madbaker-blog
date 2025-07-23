

// this is all taken from photogabble
   //const padStart = require('./filters.js');

   const padStart =  (str, len, filler) => String(str).padStart(len, filler);
   const post =  (collection) => ([...collection.getFilteredByGlob('./src/content/posts/**/*.md')]);
   const contentPaginatedByYearMonth = (collection) => Array.from(post(collection)
     .reduce((carry, post) => {
      const key = `${post.date.getFullYear()}/${post.date.getMonth()}`;
      const month = (post.date.getMonth() + 1);
      const segment = carry.get(key) ?? {
        title: `Posted in ${post.date.toLocaleString('en-us', { month: 'long' })}/${post.date.getFullYear()}`,
        slug: `${post.date.getFullYear()}/${padStart(month, 2, '0')}`,
        pageNumber: 1,
        totalPages: 1,
        items: [],
      };

      segment.items.push(post);

      carry.set(key, segment);
      return carry;
    }, new Map()).values());

  // addCollection receives the new collection's name and a
  // callback that can return any arbitrary data (since v0.5.3)


  const bySize = async (collectionsApi) => {
    // see https://www.11ty.dev/docs/collections/#getall()
    const allPosts = collectionsApi.getAll()

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    const countPostsByTag = new Map()
    allPosts.forEach((post) => {
      // short circuit eval sets tags to an empty array if there are no tags set
      const tags = post.data.tags || []
      tags.forEach((tag) => {
        const count = countPostsByTag.get(tag) || 0
        countPostsByTag.set(tag, count + 1)
      })
    })

    // Maps are iterators so we spread it into an array to sort
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const sortedArray = [...countPostsByTag].sort((a, b) => b[1] - a[1])
    
    // this function returns an array of [tag, count] pairs sorted by count
    // [['bonfires', 4], ['books', 3], ['boats', 2], ...]
    return sortedArray
  }

    export {post, contentPaginatedByYearMonth, bySize};
