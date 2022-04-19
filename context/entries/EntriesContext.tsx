import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
     entries: Entry[];

     //Methods
     addNewEntry:(description: string) => void;
     updatedEntry:(entry: Entry) => void;
}


export const EntriesContext = createContext({} as ContextProps);