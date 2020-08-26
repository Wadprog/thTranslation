import React, { useState, Container } from "react";
import "./App.css";

import { Row, Col } from "react-bootstrap";
import MacroSelector from "./Components/MacroSelector";
import MainMacro from "./Components/MainMacro";
import SecondMacro from "./Components/SecondMacro";
import Loading from "./Components/Loading";
import helper from "./helpers/helper";

function App() {
  const [macros, setMacros] = useState([]);
  const [selectedMacros, setSelectedMacros] = useState([]);
  const [engVer, setEngVer] = useState({});
  const [secondMacro, setSecondMacro] = useState([]);

  /**Loading  */
  const [isloading, setIsloading] = useState(false);
  const handleChangeLanguage = ({ target: { value } }) => {
    const mainValue = helper.removeLanguageInitials(value);
    const selectedLanguage = macros.filter(
      language => language.Name.indexOf(mainValue) > -1
    );

    const engVersion = helper.filterMacrosBylanguage("EN:", selectedLanguage);

    setSelectedMacros(selectedLanguage);
    if (engVersion) setEngVer(engVersion);
    else {
      const error = {
        Name: "No English Version",
      };
      error["Email Reply"] = "No English version";
      setEngVer(error);
    }
  };

  return (
    <div className='App p-5'>
      {isloading ? (
        <Loading />
      ) : (
        <div>
          <h1> Macro Translator</h1>
          <h2>Choose Macro Below </h2>

          <MacroSelector
            setMacros={setMacros}
            setSelectedMacros={setSelectedMacros}
            macros={macros}
            handleChangeLanguage={handleChangeLanguage}
            setIsloading= {setIsloading}
          />
          <Row>
            <Col>
              <MainMacro engVer={engVer} />
            </Col>
            <Col>
              <SecondMacro
                selectedMacros={selectedMacros}
                secondMacro={secondMacro}
                setSecondMacro={setSecondMacro}
                engVer={engVer} 
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default App;
