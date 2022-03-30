import { createContext } from 'react';


interface ContextProps {
     sideMenuOpen: boolean;

     //Methods que proporciona el provider, lo que devuelve la function en el provider
     openSideMenu: () => void;
     closeSideMenu: () => void;
}


export const UIContext = createContext({} as ContextProps);