import React from "react";
import DOMPurify from "dompurify";
import "animate.css";

const NewsCard = ({ title, link, pubDate, content }) => {
  //Sanitize
  const snitizedTitle = DOMPurify.sanitize(title);

  const date = new Date(pubDate);
  const formattedDate = new Intl.DateTimeFormat("en-IN").format(date);

  return (
    <div className="w-[70%] flex flex-col gap-y-2 rounded-lg mt-5 m-auto p-3 bg-white drop-shadow-lg/20 animate__animated animate__fadeIn">
      <h4
        className="font-semibold text-2xl"
        dangerouslySetInnerHTML={{ __html: snitizedTitle }}
      />
      <p className="text-sm text-gray-400">updated on {formattedDate}</p>
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
