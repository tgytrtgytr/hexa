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
            <View style={{ flex:1, padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 40 }}>
                    AI Logo
                </Text>



                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
                    <Text style={{ fontSize: 25, fontWeight: '600', color: 'white' }}>
                        Enter Your Prompt
                    </Text>
                    <TouchableOpacity>
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
                            minHeight: 150,
                            textAlignVertical: 'top',
                        }}
                        multiline
                        maxLength={500}
                        numberOfLines={10}
                        value={prompt}
                        onChangeText={setPrompt}
                    />
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
