export default {
	tags: [
		"diary", "posts"
	],
	"layout": "layouts/post.njk",
	"permalink": "/diary/{{title | slugify}}/",
};