export default {
	tags: [
		"dispatches", "posts"
	], 
	"layout": "layouts/post.njk",
	"permalink": "/dispatches/{{date | htmlDateString}}-{{title | slugify}}/",
};