
import { ThemedText, useTheme } from "./theme/Theme";
import { ContextProvider } from './context/context'
import RootNavigator from "./navigators/RootNavigator"
export default function Main() {
    const { colors } = useTheme()
    return <ContextProvider>
        <RootNavigator />
    </ContextProvider>
}