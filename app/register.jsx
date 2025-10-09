import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, LinearGradient } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../src/services/supabase';
import { useFonts, Kanit_400Regular, Kanit_600SemiBold } from '@expo-google-fonts/kanit';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_600SemiBold,
    });

    if (!fontsLoaded) return null;

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else router.replace('/');
    };

    return (
        <ExpoLinearGradient
            colors={['#AF070E', '#84224B']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.2, y: 0.5 }}
            locations={[0, 0.8]} // El morado cubre más espacio
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/logo-verito.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Nombre de usuario (alias)"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                        value={email}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Telefono"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                        value={email}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Correo electronico"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                        value={email}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Confirmar Contraseña"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                        value={email}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Nombre completo"
                        placeholderTextColor="#F9C4D8"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <Text style={styles.activationText}>
                    <Text style={styles.link}>Activacion</Text>
                </Text>


                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#F9C4D8" style={styles.icon}/>
                    <TextInput
                        placeholder="Codigo de activacion"
                        placeholderTextColor="#F9C4D8"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

            </View>
        </ExpoLinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 60,
    },
    logo: {
        width: 123,
        height: 43,
    },
    formContainer: {
        paddingHorizontal: 30,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B72963',
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Kanit_400Regular',
    },
    button: {
        backgroundColor: '#B72963',
        borderRadius: 25,
        paddingVertical: 14,
        marginTop: 250,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Kanit_600SemiBold',
    },
    registerText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        marginTop: 12,
        fontFamily: 'Kanit_400Regular',
    },activationText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Kanit_400Regular',
    },
    link: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    error: {
        color: '#FFE4E1',
        textAlign: 'center',
        marginBottom: 10,
    },
});
