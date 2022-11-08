import React, { useEffect, useState } from "react";
import "./DDFileUpload.css";

export default function DDUploader({ children, key="" }) {
  const ddf_inputRef = React.createRef();
  if (typeof children !== "function")
    return <p>Child element should be a function.</p>;

  return (
    <div>
      <input type={"file"} id={`dd_fileuploader${key}`} />
      {children()}
    </div>
  );
}
