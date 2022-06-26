import {useContext} from 'react';
import {GlobalContext} from "../context/GlobalContext";

// ----------------------------------------------------------------------

const useGlobalState = () => useContext(GlobalContext);

export default useGlobalState;
