import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView, StyleSheet,
} from 'react-native';
import DesignStatusCard from "@/app/components/DesignStatusCard";
const logoStyles = [
    {
        id: 'no-style',
        name: 'No Style',
        icon: require('../assets/images/logo_styles/no-style.png'),
    },
    {
        id: 'monogram',
        name: 'Monogram',
        icon: require('../assets/images/logo_styles/monogram.png'),
    },
    {
        id: 'abstract',
        name: 'Abstract',
        icon: require('../assets/images/logo_styles/abstract.png'),
    },
    {
        id: 'mascot',
        name: 'Mascot',
        icon: require('../assets/images/logo_styles/mascot.png'),
    },
];

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('no-style');
    const router = useRouter();

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b0b25' }}>
            <View style={{ flex:1, padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 40 }}>
                    AI Logo
                </Text>

                {loading && <DesignStatusCard status="loading" />}

                {/* Or for success */}
                {responseMessage && <DesignStatusCard status="success" onPress={() => router.push('/outputScreen')} image={require('../assets/images/logo_styles/mock_result.png')} />}

                {/* Or for error */}
                {error && <DesignStatusCard status="error" onPress={()=>{}} />}

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
                    <Text style={{ fontSize: 25, fontWeight: '600', color: 'white' }}>
                        Enter Your Prompt
                    </Text>
                    <TouchableOpacity onPress={()=> router.push('/screens/SurpriseMeGameScreen')}>
                        <Text style={{color:'white', alignItems:'center'}}>🎲 Surprise me</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={[{
                        backgroundColor: '#27272A',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 24
                    },prompt?{borderColor: 'white', borderWidth: 1}:{}]}
                >
                    <TextInput
                        placeholder="A blue lion logo reading 'HEXA' in bold letters"
                        placeholderTextColor="#71717A"
                        style={{
                            color: 'white',
                            fontSize: 18,
                            marginBottom:20,
                            minHeight: 150,
                            textAlignVertical: 'top',
                        }}
                        multiline
                        maxLength={500}
                        numberOfLines={10}
                        value={prompt}
                        onChangeText={setPrompt}
                    />
                    <Text style={styles.counter}>{prompt.length + '/500'}</Text>
                </View>

                <Text style={{ fontSize: 22, fontWeight: '600', color: 'white', marginBottom: 10 }}>
                    Logo Styles
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
                        {logoStyles.map((style) => (
                            <TouchableOpacity
                                key={style.id}
                                onPress={() => setSelectedStyle(style.id)}
                            >
                                <Image
                                    source={style.icon}
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        width: 100,
                                        height: 100,
                                        marginBottom: 6
                                    }} />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: selectedStyle === style.id ? 'white' : '#71717A',
                                        textAlign: 'center',
                                    }}
                                >
                                    {style.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={callCloudFunction}
                    style={{
                        justifyContent:'flex-end',
                        backgroundColor: '#6943ff',
                        paddingVertical: 16,
                        borderRadius: 30,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                        Create ✨
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    counter: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        fontSize: 14,
        color: 'gray',
    },
});
