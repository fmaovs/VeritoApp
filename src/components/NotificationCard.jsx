import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationCard({ item, onPress }) {
    const color = item.severity === 'high' ? '#AF070E' : item.severity === 'medium' ? '#F97316' : '#10B981';
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress && onPress(item)}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
                <View style={styles.meta}>
                    <Ionicons name="location-outline" size={14} color="#999" />
                    <Text style={styles.metaText}>{item.distance !== undefined ? `${item.distance.toFixed(2)} km` : item.locationText}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { flexDirection: 'row', alignItems: 'flex-start', padding: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, marginBottom: 12 },
    dot: { width: 12, height: 12, borderRadius: 6, marginTop: 6, marginRight: 12 },
    content: { flex: 1 },
    title: { color: '#fff', fontWeight: '700', marginBottom: 4 },
    subtitle: { color: '#F3F4F6', fontSize: 13, marginBottom: 8 },
    meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    metaText: { color: '#D1D5DB', marginLeft: 6, fontSize: 12 },
    time: { marginLeft: 12, color: '#9CA3AF', fontSize: 12 },
});
