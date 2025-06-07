import React from "react";
import DOMPurify from "dompurify";

const NewsCard = ({ title, link, pubDate, content }) => {
  console.log(title, link);

  //Sanitize
  const snitizedTitle = DOMPurify.sanitize(title);

  return (
    <div className="w-[70%] flex flex-col gap-y-2 rounded-lg mt-5 m-auto p-3 bg-white drop-shadow-lg/20">
      <h4
        className="font-semibold text-2xl"
        dangerouslySetInnerHTML={{ __html: snitizedTitle }}
      />
      <p className="text-sm text-gray-400">{pubDate}</p>
      <p>{content}</p>
      <hr className="border-gray-300 border-1 mt-4" />
      <a
        href={link}
        target="_blank"
        className="text-blue-500 text-sm block text-center "
      >
        Read full article
      </a>
    </div>
  );
};

export default NewsCard;
