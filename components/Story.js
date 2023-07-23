import React from 'react';
import moment from 'moment';

const tagColors = ['tag-green', 'tag-blue', 'tag-orange', 'tag-purple', 'tag-red', 'tag-yellow', 'tag-orange',];

export default function Story({ story }) {

  function extractSrcFromHTML(htmlString) {
    console.log(htmlString)
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = htmlString.match(regex);

    if (match && match.length > 1) {
      return match[1];
    } else {
      return null; // If the src attribute is not found or the HTML format is invalid
    }
  }

  const srcImg = extractSrcFromHTML(story && story.content);

  // Use moment.js to format the dates
  const formattedDate = moment(story.pubDate).fromNow();

  return (
    <a href={story.link} target="_blank" rel="noopener noreferrer" >
      <div className="w-full flex story-container md:flex-row flex-col">
        <div className="md:w-1/3 flex justify-center grayscale hover:grayscale-0">
          <img src={srcImg} className="md:pr-9" alt="Story Image" />

        </div>
        <div className="md:w-2/3 flex flex-col justify-center h-100 pt-4 md:pt-0">
          <div>{story.creator} - {formattedDate}</div>
          <div className="display-font text-4xl">{story.title}</div>
          <div className="pb-4 pt-2">{story.contentSnippet}</div>
          <div className="flex">
            {story.tags?.map((tag, index) => (
              <div key={index} className={`${tagColors[index]} px-2 mr-5`}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}
