import React, { useState, useEffect, FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";

type CodeFieldProps = {
  inputStyle: any;
  setCodeAccepted: any;
  setCodeError?: any;
  codeError?: boolean;
};

export const CodeField: FunctionComponent<CodeFieldProps> = ({
  inputStyle,
  setCodeAccepted,
  setCodeError,
  codeError = false,
}) => {
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (password === process.env.REACT_APP_CODE) {
      setCodeAccepted(true);
    } else {
      setCodeError(false);
    }
  }, [password, setCodeAccepted, setCodeError]);

  return (
    <TextField
      id="outlined-basic"
      label="code"
      variant="outlined"
      type="password"
      error={codeError}
      helperText={codeError ? "Incorrect code" : ""}
      data-testid="add-player-password"
      style={inputStyle}
      onChange={(e) => setPassword(e.target.value)}
    />
  );
};
