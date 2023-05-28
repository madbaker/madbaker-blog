const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");

/**
 * Filters
 * @link https://www.11ty.dev/docs/filters/
 * @see https://github.com/11ta/11ta-template/blob/main/utils/filters.js
 */

const readableDate = (dateObj, format, zone) => {
  // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
};
const htmlDateString = (dateObj) => {
  // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
};
const RFC2822ToReadableDate = (dateObj, format, zone) => {
  // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  return DateTime.fromRFC2822(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
};

const RFC2822ToHtmlDateString = (dateObj) => {
  // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  return DateTime.fromRFC2822(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
};


const toIsoString = (dateObj) => {
  // convert to an ISO 8601 string for schema 
  return DateTime.fromJSDate(dateObj).toISO();
};

// Get the first `n` elements of a collection.
const head = (array, n) => {
  if(!Array.isArray(array) || array.length === 0) {
    return [];
  }
  if( n < 0 ) {
    return array.slice(n);
  }
  
  return array.slice(0, n);
};

// Return the smallest number argument
const min = (...numbers) => {
  return Math.min.apply(null, numbers);
};

// Return all the tags used in a collection

const getAllTags = collection => {
  let tagSet = new Set();
  for(let item of collection) {
    (item.data.tags || []).forEach(tag => tagSet.add(tag));
  }
  return Array.from(tagSet);
};

// remove 'internal' tags

const filterTagList = (tags) => {
  return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
};

/**
   * Group a collection by year.
   *
   * @param collection
   * @returns {*}
   */
  const groupByYear = (collection) => collection
  .reduce((carry, post) => {
    const year = post.date.getFullYear();
    const group = carry.get(year) ?? [];
    group.push(post);
      carry.set(year, group);
      return carry;
    }, new Map());
    
  /**
   * Group a collection by month.
   * @param collection
   * @returns {*}
  */
 const groupByMonth = (collection) => collection
 .reduce((carry, post) => {
   const month = post.date.getMonth();
   const group = carry.get(month) ?? [];
   group.push(post);
      carry.set(month, group);
      return carry;
    }, new Map());

    const padStart =  (str, len, filler) => String(str).padStart(len, filler);
  
  const cssmin = (code) => {
    return new CleanCSS({}).minify(code).styles;
  };
    
    module.exports = {
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
};
