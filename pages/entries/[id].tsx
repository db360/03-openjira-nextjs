import { ChangeEvent, useMemo, useState } from "react";
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, useTheme } from "@mui/material";
import { EntryStatus } from "../../interfaces";

import { Layout } from "../../components/layouts";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

export const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    };

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        console.log({ inputValue, status});
    }

    const theme = useTheme();

  return (

    <Layout title="....... . . .. . .....">
        <Grid
            container
            justifyContent="center"
            sx={{ marginTop: 2}}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title={`Entrada: ${inputValue}`}
                        subheader={`Creada hace: pollas minutos`}
                    />
                    <CardContent>
                        <TextField
                            sx={{ marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder="Nueva Entrada..."
                            autoFocus
                            multiline
                            label="Nueva Entrada"
                            value={ inputValue }
                            onChange={ onInputChange }
                            helperText={isNotValid && 'Introduzca un valor'}
                            onBlur={ () => setTouched(true)}
                            error={ isNotValid }
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel
                                            key={ option }
                                            value={ option }
                                            control={<Radio />}
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={<SaveAltIcon />}
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>

                </Card>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}>
                  <DeleteForeverIcon />
            </IconButton>

        </Grid>
    </Layout>


  )
}


export default EntryPage;