import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { supabase } from '../src/services/supabase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        router.replace('/login');
        return null;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/login');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bienvenido, {user.email}</Text>
            <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20, backgroundColor: '#DC2626', padding: 10, borderRadius: 8 }}>
                <Text style={{ color: '#FFF' }}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}
