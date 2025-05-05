import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
} from 'react-native';

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

export const options = {
    headerShown: false,
};

export default function Index() {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('no-style');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b0b25' }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 }}>
                    AI Logo
                </Text>

                <Text style={{ fontSize: 24, fontWeight: '600', color: 'white', marginBottom: 8 }}>
                    Enter Your Prompt
                </Text>

                <View
                    style={{
                        backgroundColor: '#1b1b38',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 24,
                    }}
                >
                    <TextInput
                        placeholder="A blue lion logo reading 'HEXA' in bold letters"
                        placeholderTextColor="#999"
                        style={{
                            color: 'white',
                            fontSize: 14,
                            minHeight: 80,
                            textAlignVertical: 'top',
                        }}
                        multiline
                        maxLength={500}
                        value={prompt}
                        onChangeText={setPrompt}
                    />
                </View>

                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', marginBottom: 8 }}>
                    Logo Styles
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
                    {logoStyles.map((style) => (
                        <TouchableOpacity
                            key={style.id}
                            onPress={() => setSelectedStyle(style.id)}
                            style={{
                                backgroundColor: selectedStyle === style.id ? '#2f2fa2' : '#1b1b38',
                                padding: 10,
                                borderRadius: 12,
                                alignItems: 'center',
                                width: 70,
                            }}
                        >
                            <Image source={style.icon} style={{ width: 40, height: 40, marginBottom: 6 }} />
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: 'white',
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
                    style={{
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
            </ScrollView>
        </SafeAreaView>
    );

}
