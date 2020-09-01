import React, { useState } from "react";
/** Importing Bootstrap Components */
import { Row, Col } from "react-bootstrap";
/** Importing customs components */
import MacroSelector from "../Components/MacroSelector";
import MainMacro from "../Components/MainMacro";
import SecondMacro from "../Components/SecondMacro";
import Loading from "../Components/Loading";
import StatusAlert from "../Components/StatusAlert";
import CreateNewMacro from "../Components/CreateNewMacro";
/** Importing helper Function */
import helper from "../helpers/helper";
import { Link } from "react-router-dom";
const Home = () => {
  const [macros, setMacros] = useState([]);
  const [selectedMacros, setSelectedMacros] = useState([]);
  const [engVer, setEngVer] = useState({});
  const [secondMacro, setSecondMacro] = useState([]);

  /**Loading  */
  const [isloading, setIsloading] = useState(true);
  const [success, setSuccess] = useState({
    show: false,
    good: true,
  });

  // Handle Show/Hide for the modal To create new Macro
  const [creatingNewMacro, setCreatingNewMacro] = useState(false);
  // Handle Title for the new Macro
  const [newMacroTitle, setNewMacroTitle] = useState("");

  const handleChangeLanguage = ({ target: { value } }) => {
    setSelectedMacros([]);
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
    <>
      {/* {<Link to='/spreadsheets'>spreadsheets</Link>} */}
      <div className='App p-5'>
        <div>
          <h1> Macro Translator</h1>
          <h2>Choose Macro Below </h2>

          <MacroSelector
            setMacros={setMacros}
            setSelectedMacros={setSelectedMacros}
            macros={macros}
            handleChangeLanguage={handleChangeLanguage}
            setIsloading={setIsloading}
            isloading={isloading}
          />
          <Row>
            <Col>
              <MainMacro engVer={engVer} />
            </Col>
            <Col>
              {!creatingNewMacro ? (
                <SecondMacro
                  selectedMacros={selectedMacros}
                  secondMacro={secondMacro}
                  setSecondMacro={setSecondMacro}
                  engVer={engVer}
                  isloading={isloading}
                  setIsloading={setIsloading}
                  setSuccess={setSuccess}
                  success={success}
                  setCreatingNewMacro={setCreatingNewMacro}
                  setNewMacroTitle={setNewMacroTitle}
                />
              ) : (
                <CreateNewMacro
                  title={newMacroTitle}
                  isloading={isloading}
                  setIsloading={setIsloading}
                  setSuccess={setSuccess}
                  success={success}
                  handleClose={() => setCreatingNewMacro(false)}
                />
              )}
            </Col>
          </Row>
        </div>
        <Loading show={isloading} />
        <StatusAlert {...success} />
        {/* {<CreateNewMacro
          title={newMacroTitle}
          show={creatingNewMacro}
          handleClose={() => setCreatingNewMacro(false)}
        />} */}
      </div>
    </>
  );
};

export default Home;
