import { createContext, useContext, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const AppContext = createContext();

export function AppContextProvider({ children }) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [openMenu, setOpenMenu] = useState(!isMobile);
    const [storedMenuItem, setStoredMenuItem] = useState('داشبورد');
    const [selectedProduct, setSelectedProduct] = useState({
        val: '',
        name: '',
    });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(
            uploadedFiles.map((file, index) => ({
                id: file?.id,
                source: file,
                order: index,
            }))
        );
    }, [uploadedFiles]);

    console.log('items are', items);

    return (
        <AppContext.Provider
            value={{
                openMenu,
                setOpenMenu,
                storedMenuItem,
                setStoredMenuItem,
                selectedProduct,
                setSelectedProduct,
                items,
                setItems,
                uploadedFiles,
                setUploadedFiles,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
