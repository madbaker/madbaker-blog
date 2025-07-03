import Image from '@11ty/eleventy-img';
import path from 'path';
import htmlmin from 'html-minifier-terser';

const imageShortcodePlaceholder = async function (src, alt, caption, sizes = '100vw') {
  if (!alt) {
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }


	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

  let file = "";
  if (src.startsWith('https')) {
    file = src;
  } else {

    file = relativeToInputPath(this.page.inputPath, src);
  }

  let metadata = await Image(file, {
    widths: [400, 700, 1280],
    formats: ['webp', 'jpeg'],
    urlPath: '/img/',
    outputDir: './_site/img/'
  });

  let lowsrc = metadata.jpeg[0];

  // getting the url  to use
  let imgSrc = file;
  if (!imgSrc.startsWith('.')) {
    const inputPath = this.page.inputPath;
    const pathParts = inputPath.split('/');
    pathParts.pop();
    imgSrc = pathParts.join('/') + '/' + src;
  }

  return htmlmin.minify(
    `<figure>
     <picture>
    ${Object.values(metadata)
      .map(imageFormat => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map(entry => entry.srcset)
          .join(', ')}" sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        src="/assets/images/image-placeholder.png"
        data-src="${lowsrc.url}"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${alt}"
				loading = 'lazy'
        decoding="async">
    </picture>
    ${
      caption
        ? `<figcaption class="cluster font-display"><p>${caption}</p>
	</figcaption>`
        : ``
    }
</figure>`,
    {collapseWhitespace: true}
  );
};

export default imageShortcodePlaceholder;