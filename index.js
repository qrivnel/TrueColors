import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

const ProviderApp = () => (
    <Provider store={store}>
        <PaperProvider>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </PaperProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ProviderApp);