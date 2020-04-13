import React, { useState, useEffect, FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";

type CodeFieldProps = {
  inputStyle: any;
  setCodeAccepted: any;
};

export const CodeField: FunctionComponent<CodeFieldProps> = ({
  inputStyle,
  setCodeAccepted,
}) => {
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (password === process.env.REACT_APP_CODE) {
      setCodeAccepted(true);
    }
  }, [password, setCodeAccepted]);

  return (
    <TextField
      id="outlined-basic"
      label="code"
      variant="outlined"
      type="password"
      data-testid="add-player-password"
      style={inputStyle}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
};
