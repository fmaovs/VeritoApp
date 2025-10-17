import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../src/hooks/useLocation';
import NotificationCard from '../src/components/NotificationCard';
import { haversineDistance } from '../src/utils/distance';
import { useRouter } from 'expo-router';

// Mock de notificaciones (luego vendrán del backend)
const MOCK_NOTIFICATIONS = [
    { id: '1', title: 'Alerta de robo', description: 'Se reportó robo en la calle 12', lat: 4.60971, lon: -74.08175, severity: 'high', time: 'Hace 5 min' },
    { id: '2', title: 'Incidente vial', description: 'Choque leve en la avenida', lat: 4.6105, lon: -74.0832, severity: 'medium', time: 'Hace 20 min' },
    { id: '3', title: 'Reporte ciudadano', description: 'Persona sospechosa', lat: 4.6078, lon: -74.0793, severity: 'low', time: 'Hace 1 h' },
];

export default function NotificationsScreen() {
    const router = useRouter();
    const { location, loading, errorMsg } = useLocation();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    // calcula distancia con la ubicación del usuario
    const enriched = useMemo(() => {
        if (!location) return notifications.map(n => ({ ...n, distance: undefined, locationText: '—' }));
        return notifications.map(n => {
            const km = haversineDistance(location.latitude, location.longitude, n.lat, n.lon);
            return { ...n, distance: km, locationText: `${(km).toFixed(2)} km` };
        }).sort((a,b) => (a.distance || 999) - (b.distance || 999));
    }, [location, notifications]);

    // handler al presionar tarjeta: ir a detalle o centrar en mapa (ejemplo)
    const onPressNotification = (item) => {
        // por ahora vamos a centrar en el mapa abriendo modal o detalle (simple redirect ejemplo)
        router.push(`/alerts/${item.id}`); // si tienes ruta de detalle
    };

    if (loading) return (
        <SafeAreaView style={[styles.container, styles.center]}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notificaciones</Text>
                <TouchableOpacity onPress={() => {/* refrescar ubicación si quieres */}}>
                    <Text style={styles.refresh}>Refrescar</Text>
                </TouchableOpacity>
            </View>

            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location?.latitude ?? 4.60971,
                        longitude: location?.longitude ?? -74.08175,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {location && (
                        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Tu ubicación" pinColor="#2563EB" />
                    )}
                    {enriched.map(n => (
                        <Marker
                            key={n.id}
                            coordinate={{ latitude: n.lat, longitude: n.lon }}
                            title={n.title}
                            description={n.description}
                            pinColor={n.severity === 'high' ? '#AF070E' : n.severity === 'medium' ? '#F97316' : '#10B981'}
                        />
                    ))}
                </MapView>
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={enriched}
                    keyExtractor={(i) => i.id}
                    renderItem={({ item }) => <NotificationCard item={item} onPress={onPressNotification} />}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    center: { justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#fff', marginTop: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12 },
    headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
    refresh: { color: '#F9C4D8' },
    mapContainer: { height: 220, marginHorizontal: 16, borderRadius: 12, overflow: 'hidden', marginTop: 12 },
    map: { flex: 1 },
    listContainer: { flex: 1, marginTop: 12 },
    error: { color: '#FFE4E1', textAlign: 'center', marginTop: 8 }
});
