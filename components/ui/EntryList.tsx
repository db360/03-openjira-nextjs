import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material"

import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

    const { entries, updatedEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries, status] )

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => { //se se deja hacer el drop
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find( e => e._id === id)!;
        entry.status = status;
        updatedEntry( entry );
        endDragging();

    }

  return (
      //TODO: aqui va el drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflowY: 'auto', overflowX: 'hidden',backgroundColor: 'transparent', padding: '0px 3px'}}>
            {/* Cambiará dependiendo si se hace drag o no */}
            <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s ease-in-out' }}>
              {
                entriesByStatus.map( entry => (
                  <EntryCard key={ entry._id } entry={ entry }/>
                ))
              }
            </List>
        </Paper>
    </div>
  )
}

