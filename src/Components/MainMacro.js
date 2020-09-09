import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MainMacro = ({ engVer }) => {
  return (
    <>
      <h3>English Version</h3>
      <article>
        <h4>{engVer.Name ? engVer.Name : "No Macro selected"}</h4>
    

        <CKEditor
          disabled={true}
          editor={ClassicEditor}
          data={engVer.Email_Reply}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            //console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            //console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            //console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
           // console.log("Focus.", editor);
          }}
        />
      </article>
    </>
  );
};

export default MainMacro;
