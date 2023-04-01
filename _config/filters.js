/**
 * Filters
 * @link https://www.11ty.dev/docs/filters/
 * @see https://github.com/11ta/11ta-template/blob/main/utils/filters.js
 */

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

module.exports = {
    groupByYear,
    groupByMonth,
    padStart
};
