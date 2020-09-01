import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import helper from ".././helpers/helper";
import languagesInitials from "../helpers/languagesInit";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Button } from "react-bootstrap";
import script_url from "../helpers/baseUrl";
import axios from "axios";

const SecondMacro = ({
  selectedMacros,
  secondMacro,
  setSecondMacro,
  engVer,
  isloading,
  setIsloading,
  setSuccess,
  success,
  setCreatingNewMacro,
  setNewMacroTitle,
}) => {
  const [actualLang, setActuaLang] = useState("");
  useEffect(() => {
    if (selectedMacros.length > 0) {
      var e = {};
      e.target = { value: "EN:" };
      e.target.value = actualLang == "" ? "EN:" : actualLang;
      //let us check to see if there is anything on localStorage
      var previousLanguage = localStorage.getItem("selectedLanguage");
      e.target.value =
        previousLanguage !== null ? previousLanguage : e.target.value;
      handleLanguageTotransalate(e);
    }
  }, [selectedMacros]);
  useEffect(() => {
    if (success.show)
      var timeout = setTimeout(() => {
        setSuccess({ ...success, show: false });
        clearTimeout(timeout);
      }, 450);
  }, [success.show]);
  //const [actualLang, setActuaLang] = useState("");

  const handleLanguageTotransalate = ({ target: { value } }) => {
    setActuaLang(value);
    console.log({ value });
    const secondMacroInCorrectLanguage = helper.filterMacrosBylanguage(
      value,
      selectedMacros
    );
    if (secondMacroInCorrectLanguage)
      setSecondMacro(secondMacroInCorrectLanguage);
    else {
      const error = {
        Name: `No ${value} version`,
        error: true,
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
    setIsloading(true);

    var url = script_url + "?action=update";
    const config = {
      crossDomain: true,
    };
    const body = JSON.stringify({ ...formData });

    try {
      const res = await axios.post(url, body, config);
      setSuccess({ ...success, show: true });
    } catch (error) {
      console.log({ error });
    }

    setIsloading(false);
  };

  const handleCreateNewMacro = () => {
    var title = actualLang;
    title +=
      engVer.Name.charAt(2) === ":" ? engVer.Name.substring(3) : engVer.Name;
    setFormdata({ ...formData, title: title });
    console.log(formData);
    setNewMacroTitle(title);
    localStorage.setItem("selectedLanguage", actualLang);
    setCreatingNewMacro(true);
  };

  return (
    <>
      <h3>Change selected Language</h3>
      <Form onSubmit={handleSumbmit}>
        <Row>
          <Col>
            <Form.Control
              as='select'
              value={actualLang}
              onChange={handleLanguageTotransalate}
            >
              <option disabled selected>
                Select a Language
              </option>
              {selectedMacros.length > 0 &&
                languagesInitials.map(lang => (
                  <option value={lang}>{lang}</option>
                ))}
            </Form.Control>
          </Col>
          <Col>
            {formData.text != "" && (
              <>
                {!secondMacro.error && (
                  <Button
                    className=' btn btn-success'
                    type='submit'
                    size='sm'
                    variant='success'
                    value='Save Changes'
                  >
                    Save changes
                  </Button>
                )}
              </>
            )}
          </Col>
          <Col>{1 === 2 && <Button>Create Macro </Button>}</Col>
        </Row>
      </Form>
      <article>
        {secondMacro.error ? (
          <>
            <p className='my-3'>
              {" "}
              This Macro is'nt available in the selected language click{" "}
              <b>
                <a className='text-primary' onClick={handleCreateNewMacro}>
                  here
                </a>{" "}
              </b>
              to create it
            </p>
          </>
        ) : (
          //<Button onClick={handleCreateNewMacro}> Create missing macro</Button>
          <p>{secondMacro.Name}</p>
        )}
        {!secondMacro.error ? (
          <CKEditor
            editor={ClassicEditor}
            data={secondMacro.Email_Reply}
            disabled={isloading || secondMacro.error}
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              //console.log("Editor is ready to use!", editor);
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
              //console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              //console.log("Focus.", editor);
            }}
          />
        ) : (
          <p>{secondMacro.Email_Reply}</p>
        )}
      </article>
    </>
  );
};

export default SecondMacro;
