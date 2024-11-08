// RichTextEditor.js
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill styles

const RichTextEditor = ({ product, handleEditorChange }) => {
  const handleChange = (content) => {
    handleEditorChange(content);
  };

  return (
    <div className="custom-quill">
      <ReactQuill
        value={product.description}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
      />
    </div>
  );
};

// Configure the toolbar options
RichTextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["link"],
    ["undo", "redo"],
  ],
};

// Configure the formats allowed in the editor
RichTextEditor.formats = [
  "header",
  "font",
  "list",
  "bold",
  "italic",
  "underline",
  "align",
  "link",
];

export default RichTextEditor;
