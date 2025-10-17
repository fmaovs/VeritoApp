import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
    const [location, setLocation] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                setPermissionStatus(status);
                if (status !== 'granted') {
                    setErrorMsg('Permiso de ubicación denegado');
                    setLoading(false);
                    return;
                }
                const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                if (mounted) setLocation(pos.coords);
            } catch (e) {
                setErrorMsg(e.message || 'Error obteniendo ubicación');
            } finally {
                setLoading(false);
            }
        })();
        return () => (mounted = false);
    }, []);

    return { location, permissionStatus, errorMsg, loading };
}
