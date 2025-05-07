import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OutputScreen() {
    const router = useRouter();

    const handleCopy = () => {
        // Clipboard logic
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.topTitle}>Your Design</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Logo Output */}
            <View style={styles.logoBox}>
                <Image
                    source={require('../assets/images/logo_styles/mock_result.png')} // Replace with actual design image
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            {/* Prompt Card */}
            <View style={styles.promptCard}>
                <View style={styles.promptHeader}>
                    <Text style={styles.promptTitle}>Prompt</Text>
                    <Pressable onPress={handleCopy}>
                        <View style={styles.copyRow}>
                            <Ionicons name="copy-outline" size={16} color="#ccc" />
                            <Text style={styles.copyText}> Copy</Text>
                        </View>
                    </Pressable>
                </View>

                <Text style={styles.promptText}>
                    A professional logo for Harrison & Co. Law Firm, using balanced serif fonts
                </Text>

                <View style={styles.tag}>
                    <Text style={styles.tagText}>Monogram</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0c2e',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    topTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    logoBox: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        height: 380,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: '90%',
        height: '90%',
    },
    promptCard: {
        backgroundColor: '#1a1b2f',
        padding: 16,
        borderRadius: 20,
        marginTop: 24,
    },
    promptHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    promptTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    copyRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    copyText: {
        color: '#ccc',
        fontSize: 14,
    },
    promptText: {
        fontSize: 15,
        color: '#eee',
        marginBottom: 10,
    },
    tag: {
        alignSelf: 'flex-start',
        backgroundColor: '#2a2a3d',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    tagText: {
        color: '#ccc',
        fontSize: 13,
    },
});
