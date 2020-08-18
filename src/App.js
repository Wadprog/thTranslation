import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";
function App() {
  const [langs, setlangs] = useState([]);

  let loading = false;
  useEffect(() => {
    const test = async () => {
      loading = true;
      try {
        const res = await axios.get("https://sheetdb.io/api/v1/q8ucp01mfmiqm");

        setlangs(res.data);
        setselectLang(res.data[0]);

        loading = false;
      } catch (error) {
        console.log(error);
      }
    };
    test();
    return () => {
      console.log("done for now");
    };
  }, []);
  const languagesInitials = ["EN", "FR"];
  const getBylanguage = (lang, MacrosArray) => {
    const [correctMacro] = MacrosArray.filter(
      macro => macro.Name.indexOf(lang) > -1
    );

    if (typeof correctMacro === "object") return correctMacro;
    else {
      if (lang.indexOf("EN") == -1) {
        return false;
      }
      //sometime english version is save without the EN
      else {
        //we are searching for a macro with no lang(EN, FR ....)
        const [response] = MacrosArray.filter(
          //IF there are no languange there is no :
          macro => macro.Name.indexOf(":") == -1
        );
        return response ? response : false;
      }
    }
  };
  const [selectLang, setselectLang] = useState([]);
  const [engVer, setEngVer] = useState({});
  const [macroLanguage, setMacroLanguage] = useState([]);
  //second Macro
  const [secondMacroLang, setSecondMacroLang] = useState([]);
  const [secondMacro, setSecondMacro] = useState([]);

  const handleChangeLanguage = ({ target: { value } }) => {
    const mainValue = value.split(":")[1];

    const selectedLanguage = langs.filter(
      language => language.Name.indexOf(mainValue) > -1
    );

    const engVersion = getBylanguage("EN", selectedLanguage);

    // const [engversion] = selectedLanguage.filter(
    //   language => language.Name.trim() == value.split(":")[1].trim()
    // );

    // const allLanguangeForMacro = selectedLanguage.reduce((res, macro) => {
    //   if (macro.Name.indexOf(":") > -1) {
    //     res.push(macro.Name.split(":")[1]);
    //   }
    // }, "");

    // console.log(allLanguangeForMacro);
    console.log({ engVersion });
    console.log(selectedLanguage);
    setselectLang(selectedLanguage);
    if (engVersion) setEngVer(engVersion);
    else setEngVer({ Name: "No English version" });
  };

  const handleLanguageTotransalate = ({ target: { value } }) => {
    const secondMacroInCorrectLanguage = getBylanguage(value, selectLang);
    setSecondMacro(secondMacroInCorrectLanguage);
  };

  return (
    <div className='App'>
      <div>
        {!loading ? (
          <Fragment>
            <h1> Languages</h1>
            <h2>select a version below</h2>
            {console.log(selectLang)}
            <Form>
              <Form.Control as='select' onChange={handleChangeLanguage}>
                <option value='0'>Choose...</option>
                {langs.length > 0 &&
                  langs.map(lang => (
                    <option value={lang.Name}>{lang.Name}</option>
                  ))}
                <option value='0'>Choose...</option>
              </Form.Control>
            </Form>

            <Row>
              <Col>
                <h3>English Version</h3>
                <article>
                  <h4>{engVer.Name}</h4>

                  <CKEditor
                    editor={ClassicEditor}
                    data={engVer["Email Reply"]}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </article>
              </Col>
              <Col>
                <h3>Choose a Language</h3>
                <Form>
                  <Form.Control
                    as='select'
                    onChange={handleLanguageTotransalate}
                  >
                    {languagesInitials.map(lang => (
                      <option value={lang}>{lang}</option>
                    ))}
                  </Form.Control>
                </Form>
                <article>
                  <p>{secondMacro.Name}</p>
                  <CKEditor
                    editor={ClassicEditor}
                    data={secondMacro["Email Reply"]}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </article>
              </Col>
            </Row>
          </Fragment>
        ) : (
          <h4>Loading</h4>
        )}
      </div>
    </div>
  );
}

export default App;
