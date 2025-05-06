import React from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    status: 'loading' | 'success' | 'error';
    onPress?: () => void;
    image?: any; // optional logo preview
};

export default function DesignStatusCard({ status, onPress, image }: Props) {
    if (status === 'loading') {
        return (
            <View style={styles.card}>
                <ActivityIndicator size="large" color="#fff" style={styles.loader} />
                <View>
                    <Text style={styles.successText}>Your Design is Ready!</Text>
                    <Text style={styles.cardSubtitle}>Tap to see it.</Text>
                </View>
            </View>
        );
    }

    if (status === 'success') {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.card, styles.successCard]}>
                {image && <Image source={image} style={styles.previewImage} />}
                <View>
                    <Text style={styles.successText}>Your Design is Ready!</Text>
                    <Text style={styles.cardSubtitle}>Tap to see it.</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (status === 'error') {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.card, styles.errorCard]}>
                <Image source={require('../../assets/images/error_result.png')} style={styles.previewImage} />
                <View>
                    <Text style={styles.successText}>Oops, something went wrong!</Text>
                    <Text style={styles.cardSubtitle}>Click to try again.</Text>
                </View>
                {/*<Text style={styles.errorText}>Oops, something went wrong!</Text>*/}
                {/*<Text style={styles.cardSubtitle}>Click to try again.</Text>*/}
            </TouchableOpacity>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27272A',
        borderRadius: 16,
        // paddingVertical: 16,
        marginBottom: 20,
    },
    loader: {
        backgroundColor: '#18181B',
        width: 70,
        height: 70,
        marginRight: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16
    },
    cardTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardSubtitle: {
        color: '#ccc',
        marginTop: 4,
    },
    successCard: {
        backgroundColor: '#5d2dfd',
    },
    successText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorCard: {
        backgroundColor: '#ff5a5f',
    },
    errorText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    previewImage: {
        width: 70,
        height: 70,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        marginRight: 16,
        backgroundColor: '#fff',
    },
});
