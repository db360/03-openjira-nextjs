import { createContext } from 'react';


interface ContextProps {
     sideMenuOpen: boolean;
     isAddingEntry: boolean;
     isDragging: boolean;

     //Methods que proporciona el provider, lo que devuelve la function en el provider
     openSideMenu: () => void;
     closeSideMenu: () => void;

     setIsAddingEntry: (isAddingEntry: boolean) => void;

     startDragging: () => void;
     endDragging: () => void;

}

export const UIContext = createContext({} as ContextProps);