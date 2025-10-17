import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFonts, Kanit_400Regular, Kanit_600SemiBold } from '@expo-google-fonts/kanit';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from "expo-router";

export default function RegisterScreen() {
    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_600SemiBold,
    });
    const handleRegister = () => {
        // 🔹 Aquí más adelante irá la lógica real con Supabase o el backend
        // Por ahora solo simulamos un registro exitoso
        alert('Registro exitoso 🎉');
        router.replace('/login');
    };


    const router = useRouter();

    return (
        <ExpoLinearGradient
            colors={['#AF070E', '#84224B']}
            start={{x: 1, y: 0}}
            end={{x: 0.2, y: 0.5}}
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
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="call-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Telefono"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Correo electronico"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Confirmar contraseña"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="id-card-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Nombre completo"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                    />
                </View>
                <Text style={styles.registerText}>
                    Ingresa tu código:
                </Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="key-outline" size={22} color="#F9C4D8" style={styles.icon} />
                    <TextInput
                        placeholder="Código de activación"
                        placeholderTextColor="#F9C4D8"
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    {''}
                    <Text
                        style={styles.link}
                        onPress={ () => router.push('/login')}
                    >
                        Ya tienes una cuenta, inicia sesion
                    </Text>
                </Text>
            </View>
        </ExpoLinearGradient>
    )
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        logoContainer: {
            alignItems: 'center',
            marginTop: 50,
            marginBottom: 10,
        },
        logo: {
            width: 110,
            height: 60,
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
            marginTop: 10,
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
            marginTop: 5,
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

