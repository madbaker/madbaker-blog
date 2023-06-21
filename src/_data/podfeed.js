const EleventyFetch = require("@11ty/eleventy-fetch");
const {XMLParser} = require('fast-xml-parser');

module.exports = async function() {

// get the feed: https://riseuppod.com/rss/?include-libsyn-metadata=true

let xml = await EleventyFetch("https://riseuppod.com/rss/?include-libsyn-metadata=true", {
    duration: '0s',
    type: "text" // also supports 'json' or 'buffer'
});

// can add extra parsing options here:

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    transformTagName: (tagName) => tagName.replace(':', '_')
    } ;

// Create a JSON object

const parser = new XMLParser(options);

let json = parser.parse(xml);

// console.log(json.rss.channel.item[0]);

return json;
};