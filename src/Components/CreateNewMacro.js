import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import script_url from "../helpers/baseUrl";
import axios from "axios";
const CreateNewMacro = ({
  title,
  handleClose,
  setIsloading,
  setSuccess,
  success,
}) => {
  const [formData, setFormdata] = useState({
    text: "<small>Do not forget to say hi</small>",
    title,
    MacroId: title,
    setIsloading,
  });
  useEffect(() => {
    if (success.show)
      var timeout = setTimeout(() => {
        setSuccess({ ...success, good: true, show: false });
        clearTimeout(timeout);
      }, 700);
  }, [success.show]);
  const handleSubmit = async () => {
    setIsloading(true);

    var url = script_url + "?action=create";
    const config = {
      crossDomain: true,
    };
    const body = JSON.stringify({ ...formData });

    try {
      const res = await axios.post(url, body, config);
      setSuccess({ ...success, good: true, show: true });
      window.location.reload();
    } catch (error) {
      console.error({ error });
      setSuccess({ ...success, good: false, show: true });
    }

    setIsloading(false);
  };
  return (
    <div>
      <div className='d-flex justify-content-between my-2'>
        <h4>Creating {title} Macro</h4>
        <aside>
          <Button
            className='mr-2'
            variant='outline-primary'
            onClick={handleSubmit}
          >
            <i className=' fa fa-floppy-o'></i>
          </Button>
          <Button variant='outline-secondary' onClick={handleClose}>
            <i className=' fa fa-times'></i>
          </Button>
        </aside>
      </div>
      <hr />

      <div>
        <CKEditor
          editor={ClassicEditor}
          data={formData.text}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            //console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setFormdata({
              ...formData,
              text: data,
            });
          }}
          onBlur={(event, editor) => {
            //console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            //console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
};

export default CreateNewMacro;
