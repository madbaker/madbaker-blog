// this is all taken from photogabble
   //const padStart = require('./filters.js');

   const padStart =  (str, len, filler) => String(str).padStart(len, filler);
   const post =  (collection) => ([...collection.getFilteredByGlob('./content/**/*.md')]);
 
   const contentPaginatedByYearMonth = (collection) => Array.from(post(collection)
     .reduce((carry, post) => {
      const key = `${post.date.getFullYear()}/${post.date.getMonth()}`;
      const month = (post.date.getMonth() + 1);
      const segment = carry.get(key) ?? {
        title: `Planted in ${post.date.toLocaleString('en-us', { month: 'long' })}/${post.date.getFullYear()}`,
        slug: `${post.date.getFullYear()}/${padStart(month, 2, '0')}`,
        pageNumber: 1,
        totalPages: 1,
        items: [],
      };

      segment.items.push(post);

      carry.set(key, segment);
      return carry;
    }, new Map()).values());

    module.exports = {post, contentPaginatedByYearMonth};
