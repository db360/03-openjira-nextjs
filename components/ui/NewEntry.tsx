import { ChangeEvent, useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext); // Llamar el context del entriescontext

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext); // UIContext

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    // llamarr addNewEntry(inputValue)
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            label="Nueva Entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un Valor"} // para error hay que haberlo tocado
            error={inputValue.length <= 0 && touched} // si no hay nada escrito = error
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setTouched(true)} // Cuando pierde el focus
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              color="warning"
              variant="text"
              endIcon={<CancelIcon />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
