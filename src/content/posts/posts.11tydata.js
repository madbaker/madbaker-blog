export default {
	tags: [
		"posts"
	],
	layout: "layouts/post.njk",
	permalink: "/blog/{{title | slugify}}/",
	schema: "blog"
};
