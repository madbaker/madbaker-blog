export default {
	tags: [
		"dispatches"
	], 
	"layout": "layouts/post.njk",
	"permalink": "/dispatches/{{date | htmlDateString}}-{{title | slugify}}/",
};