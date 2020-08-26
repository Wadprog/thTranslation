import React, { useEffect } from "react";
import axios from "axios";
import script_url from "../helpers/baseUrl";
import { Form, Spinner } from "react-bootstrap";

const MacroSelector = ({
  setMacros,
  setSelectedMacros,
  macros,
  handleChangeLanguage,
  setIsloading,
}) => {
  let loading = true;
  useEffect(() => {
    const test = async () => {
      try {
        var url = script_url + "?action=read";
        const res = await axios.get(url);
        console.log(res.data.records);
        setMacros(res.data.records);
        setSelectedMacros(res.data.records[0]);
      } catch (error) {
        console.log(error);
      }
    };
    test();
    setIsloading(false)

    return () => {
      console.log("done for now");
    };
  }, [setIsloading]);

  return (
    <>
      
        <Form>
          <Form.Control as='select' onChange={handleChangeLanguage}>
            <option disabled selected>
              Select a Macro
            </option>
            {macros.length > 0 &&
            macros.filter(macro=> macro.Name.includes("EN:")).map(macro => (
                <option value={macro.Name}>{
                  macro.Name.charAt(2)==':'?macro.Name.substring(3):macro.Name
                  }</option>
              ))}
          </Form.Control>
        </Form>
     
    </>
  );
};

export default MacroSelector;
