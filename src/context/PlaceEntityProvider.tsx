import {
    FC,
    createContext,
    ReactNode,
    useMemo,
    useState,
    useContext,
} from "react";

// interface
import { IPlaceCreateEntity } from "../interfaces/place.interface";
  
interface Props {
    children?: ReactNode;
}
  
const PlaceEntityContext = createContext({} as ReturnType<typeof passPlaceEntityValuesForProvider>);
  
    /** Below is for the Chrome React dev Tools extension
     * to display the name of the context instead
     * of "Context.provider"
     **/
    PlaceEntityContext.displayName = "PlaceEntityContext";
  
    /** Custom Hook for importing the 
     *  state in other areas of the app.
     *  Function name could be changed
     **/
export function usePlaceEntityValue() {
    const context = useContext(PlaceEntityContext);

    /** This check is optional if you are wrapping provider around a sub part
     *  of the component tree and not the entire app, to limit is availability
     *  to a certain section of the app.
     **/
    if (context === undefined) {
        throw new Error("useValue must be used within a ValueProvider");
    }

    // prepare getter, setter to be called
    return context;
};
  
  /* Function name could be changed*/
function passPlaceEntityValuesForProvider(){
    // In this case, we want this value variable and it's setter function to be available globally.

    /* CUSTOMIZE HERE BY CHANGING val & setVal's name, initial state*/
    const [placeEntity, setPlaceEntity] = useState<IPlaceCreateEntity>({});

    //The state should be memoized to maintain the referential equality/ same location in memory. If not
    // every time this context is called a new location in memory will be created for the values.
    const valueObject = useMemo(() => {
        return { placeEntity, setPlaceEntity };
    }, [placeEntity, setPlaceEntity]);

    return valueObject;
}
  
// the value prop that is passed down are available to all of it's children.
const PlaceEntityProvider: FC<Props> = ({ children }) => {
    return (
        <PlaceEntityContext.Provider value={passPlaceEntityValuesForProvider()}>
            {children}
        </PlaceEntityContext.Provider>
    );
};

export default PlaceEntityProvider;