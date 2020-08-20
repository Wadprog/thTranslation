import React, { useState } from "react";
import { Form } from "react-bootstrap";
import helper from ".././helpers/helper";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Button } from "react-bootstrap";
import script_url from "../helpers/baseUrl";
import axios from "axios";
const SecondMacro = ({ selectedMacros, secondMacro, setSecondMacro }) => {
  const [languagesInitials, setLanguagesInitials] = useState([
    "EN:",
    "FR:",
    "DE:",
    "ES:",
    "PT:",
  ]);
  const handleLanguageTotransalate = ({ target: { value } }) => {
    const secondMacroInCorrectLanguage = helper.filterMacrosBylanguage(
      value,
      selectedMacros
    );
    if (secondMacroInCorrectLanguage)
      setSecondMacro(secondMacroInCorrectLanguage);
    else {
      const error = {
        Name: `No ${value} version`,
      };
      error.Email_Reply = `No ${value} version found for the selected macro`;
      setSecondMacro(error);
    }

    setFormdata({
      MacroId: "",
      text: "",
      title: "",
    });
  };

  const [formData, setFormdata] = useState({
    title: "",
    text: "",
    MacroId: "",
  });

  const handleSumbmit = async e => {
    e.preventDefault();

    var url =
      script_url +
      "?name=" +
      formData.text +
      "&id=" +
      formData.MacroId +
      "&action=update";
    url =
      "https://script.google.com/macros/s/AKfycbwiXqdCMBlUsibpS6nf0EaOHUFa3vtMdAL7wpY7nxJ28ROLrw4/exec?action=update";

    const config = {
      crossDomain: true,
    };
    const body = JSON.stringify({ ...formData });

    try {
      const res = await axios.post(url, body, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };

  return (
    <>
      <h3>Choose a Language</h3>
      <Form onSubmit={handleSumbmit}>
        <Row>
          <Col>
            <Form.Control as='select' onChange={handleLanguageTotransalate}>
              <option disabled selected>
                Select a Language
              </option>
              {languagesInitials.map(lang => (
                <option value={lang}>{lang}</option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            {formData.text != "" && (
              <input
                className=' btn btn-success'
                type='submit'
                size='sm'
                variant='success'
                value='Save Changes'
              />
            )}
          </Col>
          <Col>{1 === 2 && <Button>Create Macro </Button>}</Col>
        </Row>
      </Form>
      <article>
        <p>{secondMacro.Name}</p>
        <CKEditor
          editor={ClassicEditor}
          data={secondMacro.Email_Reply}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setFormdata({
              ...formData,
              text: data,
              title: secondMacro.Name,
              MacroId: secondMacro.Name,
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </article>
    </>
  );
};

export default SecondMacro;
