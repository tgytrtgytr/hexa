import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import DesignStatusCard from "@/app/components/DesignStatusCard";

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('no-style');

    // temp logo until style info gathered
    const tempLogo = [{
        name: 'No Style',
        imageUrl: '../assets/images/logo_styles/no-style.png',
        id: 'no-style'
    }]

    const [logoStyles, setLogoStyles] = useState<any[]>(tempLogo);

    const router = useRouter();
    const storage = getStorage();

    //connecting firestorage to access Logo Styles collection
    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, 'logoStyles');
            const snapshot = await getDocs(colRef);
            const items = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const imageRef = ref(storage, data.imageUrl);
                    const url = await getDownloadURL(imageRef);
                    return { ...data, imageUrl: url };
                })
            );
            setLogoStyles(items);
        };
        fetchData();
    }, []);

    //connect backend to processWithRandomDelay method
    const callCloudFunction = async () => {
        setError(false);
        setLoading(true);
        setResponseMessage('');

        try {
            const response = await fetch(
                'https://us-central1-hexa-9ba3e.cloudfunctions.net/processWithRandomDelay'
            );
            const data = await response.json();
            setResponseMessage(data.message);
        } catch (error) {
            console.error(error);
            setError(true);
            setResponseMessage('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/images/back_gradient.png')} // local image
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.container}>
                        <Text style={styles.heading}>AI Logo</Text>

                    {loading && <DesignStatusCard status="loading" />}
                    {responseMessage && (
                        <DesignStatusCard
                            status="success"
                            onPress={() => router.push('/outputScreen')}
                            image={require('../assets/images/logo_styles/mock_result.png')}
                        />
                    )}
                    {error && <DesignStatusCard status="error" onPress={() => {}} />}


                    <View style={styles.promptHeader}>
                        <Text style={styles.subheading}>Enter Your Prompt</Text>
                        <TouchableOpacity onPress={() => router.push('/screens/SurpriseMeGameScreen')}>
                            <Text style={styles.surpriseMe}>🎲 Surprise me</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.inputWrapper, prompt && styles.inputActive]}>
                        <TextInput
                            placeholder="A blue lion logo reading 'HEXA' in bold letters"
                            placeholderTextColor="#71717A"
                            style={styles.textInput}
                            multiline
                            maxLength={500}
                            numberOfLines={10}
                            value={prompt}
                            onChangeText={setPrompt}
                        />
                        <Text style={styles.counter}>{prompt.length}/500</Text>
                    </View>

                    <Text style={styles.styleLabel}>Logo Styles</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.styleRow}>
                            {logoStyles.map((style) => (
                                <TouchableOpacity
                                    key={style.id}
                                    onPress={() => setSelectedStyle(style.id)}
                                >
                                    <Image
                                        source={{ uri: style.imageUrl }}
                                        style={styles.styleImage}
                                    />
                                    <Text
                                        style={[
                                            styles.styleName,
                                            selectedStyle === style.id && styles.selectedStyleText
                                        ]}
                                    >
                                        {style.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <LinearGradient
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        colors={['#943DFF', '#2938DC']}
                        style={styles.createButton}>
                        <TouchableOpacity
                            onPress={callCloudFunction}
                        >
                            <Text style={styles.createButtonText}>Create ✨</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0b0b25',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
    },
    promptHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    subheading: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
    },
    surpriseMe: {
        color: 'white',
    },
    inputWrapper: {
        backgroundColor: '#27272A',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        position: 'relative',
    },
    inputActive: {
        borderColor: 'white',
        borderWidth: 1,
    },
    textInput: {
        color: 'white',
        fontSize: 18,
        minHeight: 150,
        textAlignVertical: 'top',
    },
    counter: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        fontSize: 14,
        color: 'gray',
    },
    styleLabel: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        marginBottom: 10,
    },
    styleRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    styleImage: {
        borderWidth: 1,
        borderRadius: 12,
        width: 100,
        height: 100,
        marginBottom: 6,
    },
    styleName: {
        fontSize: 12,
        color: '#71717A',
        textAlign: 'center',
    },
    selectedStyleText: {
        color: 'white',
    },
    createButton: {
        backgroundColor: '#6943ff',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
