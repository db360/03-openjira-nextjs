import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router";

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, useTheme } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { dbEntries } from "../../database";
import { Entry, EntryStatus } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry;
}

export const EntryPage:FC<Props> = ({ entry }) => {

    const router = useRouter();

    const { updatedEntry, deleteEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status as any);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    };

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        if( inputValue.trim().length === 0 ) return;

        const updateEntry:Entry = {
            ...entry,
            status,
            description: inputValue
        };
        updatedEntry( updateEntry, true );
        router.push('/');
        
    }

    const onDelete = () => {
        deleteEntry( entry ,true );
        router.push('/');
    }

    const theme = useTheme();

  return (

    <Layout title={ inputValue.substring(0, 20) + '...'}>
        <Grid
            container
            justifyContent="center"
            sx={{ marginTop: 2}}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader
                        title={'Entrada:'}
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
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

            <IconButton
                onClick={ onDelete }
                sx={{
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as {id: string};

    const entry = await dbEntries.getEntryById(id);

    if ( !entry ){ // si no existe id en mongo, no renderiza el comp y redirect /
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;