import {Stack} from 'expo-router';
import {WasteProvider} from '../features/waste';
export default function Layout(){return <WasteProvider><Stack screenOptions={{headerShown:false}}/></WasteProvider>;}
