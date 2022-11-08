import React from "react";
import "./DDFileUpload.css";

export default function DDFileUpload({
  onFileSelect = (f) => {},
  onUploadClick = () => {},
  acceptExt = [".csv"],
  labelText = null,
}) {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileuploadRef = React.createRef();

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedExt = e.dataTransfer.files[0].name.split(".").reverse()[0];
      if (acceptExt.includes("." + selectedExt)) {
        handleFiles(e.dataTransfer.files);
      } else {
        setSelectedFile(null);
        fileuploadRef.current.value = "";
        alert("File extension is now allowed.");
      }
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = function (files) {
    onFileSelect(files[0]);
    setSelectedFile(files[0]);
  };

  function csvToArray(str, delimiter = ",") {
    const headers = str.trim().slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n")).split("\r\n");
    var arr = rows.map(function (row, index) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    return JSON.parse(JSON.stringify(arr));
  }

  const handleUploadClick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    alert(selectedFile.name);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const data = e.target.result;
      console.log(csvToArray(data));
    });
    reader.readAsText(selectedFile);
  };

  const handleCancelClick = function (e) {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFile(null);
    fileuploadRef.current.value = "";
  };

  return (
    <div>
      <input
        accept={acceptExt.join(", ")}
        ref={fileuploadRef}
        type="file"
        id="ddfileupload-input-file-upload"
        multiple={false}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className="ddfileupload-container"
          onClick={(e) => {
            fileuploadRef.current.click();
          }}
        >
          <div>
            {selectedFile
              ? `Sure to upload "${selectedFile.name}"`
              : labelText
              ? labelText
              : "Drag and drop your file here or"}
          </div>
          {!selectedFile && (
            <div className="ddfileupload-selectbtn">Select File</div>
          )}
          {selectedFile && (
            <div className="ddfileupload-actiongroup">
              <button className="upload-button" onClick={handleUploadClick}>
                Yes, Upload
              </button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
