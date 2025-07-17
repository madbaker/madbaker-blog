//
//
//  Right now, this parses the rss feed and makes a JSON file with all the feed info.  
//  In future, it might make more sense to turn this into a collection, like blog posts are a collection.  
//  That would involve mapping the dozens of rss fields into more of a blog post set of data.
//
//
import EleventyFetch from "@11ty/eleventy-fetch";
import {XMLParser} from 'fast-xml-parser';

export default async function() {

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

const episodes = json.rss.channel.item;

// construct an episode ID from my mess of episode types

const feed = episodes.map((episode) => {

    let episodeID = ""
    let result
    if (episode.itunes_episodeType == 'bonus') {  result = "[Bonus]" }
    else {
        if (episode.itunes_season) {
            result = episodeID.concat("[S", episode.itunes_season, "E", episode.itunes_episode, "]")
        }

        else {  result = episodeID.concat("[EP", episode.itunes_episode , "]")}
    }
    return {...episode, episodeID: result}
      
});



return feed;

};