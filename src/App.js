import "./index.css";
import React, { useState } from "react";
import TagsInput from "./TagsInput";

export default function App() {
  const selectedTags = (tags) => {
    console.log(tags);
  };
  return (
    <div className="App">
      <TagsInput selectedTags={selectedTags} />
    </div>
  );
}