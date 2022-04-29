import { FC, useEffect, useReducer } from 'react';
import { entriesAPI } from '../../apis';

import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';

import {EntriesContext, entriesReducer} from './'


export interface EntriesState {
     entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
     entries: [],
}

export const EntriesProvider:FC = ({ children }) => {

     const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
     const { enqueueSnackbar } = useSnackbar();

     const addNewEntry = async( description: string ) => {
          // const newEntry:Entry = {
          //      _id: uuidv4(),
          //      description,               Ya no lo hace el frontend
          //      createdAt: Date.now(),
          //      status: 'pending'
          // }
          const {data} = await entriesAPI.post<Entry>('/entries', { description })
          dispatch({type: '[Entry] - Add-Entry', payload: data})

     }

     const deleteEntry = async(entry: Entry, showSnackbar = false) => {
          try {
               const {data } = await entriesAPI.delete<Entry>(`/entries/${ entry._id}`)
               dispatch({ type: '[Entry] - Delete-Entry', payload: data})

               if(showSnackbar) {
                    enqueueSnackbar('Entrada Borrada Correctamente', {
                         variant: 'success',
                         autoHideDuration: 1500,
                         anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'right'
                         }
                    })
               }
          } catch (error) {
               console.error(error)
               if(showSnackbar) {
                    enqueueSnackbar(`Error -> (${error})`, {
                         variant: 'error',
                         autoHideDuration: 1500,
                         anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'right'
                         }
                    })
               }
          }
     }

     const updatedEntry = async( {_id, description, status}: Entry, showSnackbar = false ) => {
          try {
               const {data} = await entriesAPI.put<Entry>(`/entries/${_id}`, {description, status})
               dispatch({ type: '[Entry] - Updated-Entry', payload: data})

               if ( showSnackbar ) {
                    enqueueSnackbar('Entrada Actualizada', {
                         variant: 'success',
                         autoHideDuration: 1500,
                         anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'right'
                         }
                    })
               }


          } catch (error) {
               console.log({error})
          }
     }

     const refreshEntries = async() => {
          const {data} = await entriesAPI.get<Entry[]>('/entries');
          dispatch({type: '[Entry] - Initial Entries Load', payload: data})
     }

     useEffect(() => {
          refreshEntries();
     }, [])

     return (
          <EntriesContext.Provider value={{
               ...state,
               addNewEntry,
               updatedEntry,
               deleteEntry

          }}>
               {children}
          </EntriesContext.Provider>
     )
}

export default EntriesProvider