import LeafletMap from "../components/ui/LeafletMap";
import Entry from "../auth-components/Home/Entry";



export const appRoutes = [
    {
        name: "Home",
        component: Entry,
        options: {
            title: "Home",
            headerShown: false,
        },
    },
    {
        name: "Map",
        component: LeafletMap,
        options: {
            title: "Map",
            headerShown: false,
        },
    },
]