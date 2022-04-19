import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Entry } from '../../interfaces';

import {EntriesContext, entriesReducer} from './'


export interface EntriesState {
     entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
     entries: [
         {
             _id: uuidv4(),
             description: 'Pendiente: Lorem Ipsum in pretium tempor invidunt ut labore et que dice el tio',
             status: 'in-progress',
             createdAt: Date.now(),
         },
         {
            _id: uuidv4(),
            description: 'En Progreso: Lorem Ipsum in pretium tempor invidunt ut labore et',
            status: 'pending',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Completadas: Lorem Ipsum in pretium tempor invidunt ut labore et d224 2dp,2pd,2 p2d,',
            status: 'finished',
            createdAt: Date.now() - 100000,
        }
     ],
}

export const EntriesProvider:FC = ({ children }) => {

     const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

     const addNewEntry = ( description: string ) => {
          const newEntry:Entry = {
               _id: uuidv4(),
               description,
               createdAt: Date.now(),
               status: 'pending'
          }

          dispatch({type: '[Entry] - Add-Entry', payload: newEntry})
     }

     const updatedEntry = ( entry: Entry ) => {
          dispatch({ type: '[Entry] - Updated-Entry', payload: entry})
     }

     return (
          <EntriesContext.Provider value={{
               ...state,
               addNewEntry,
               updatedEntry,

          }}>
               {children}
          </EntriesContext.Provider>
     )
}

export default EntriesProvider