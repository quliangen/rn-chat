import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle, Keyboard } from 'react-native';

interface IProps {
    onSend: (text: string) => void;
    onFocus: () => void;
    style?: StyleProp<ViewStyle>;
}

const BaseInput: React.FC<IProps> = ({ onSend, onFocus, style }) => {

    const [inputText, setInputText] = useState<string>('');

    const handleSend = () => {
        // 获取输入配置

        onSend?.(inputText);
        setInputText('');
        Keyboard.dismiss();
    };

    // 用户输入回调
    const handleChangeText = (text: string) => {
        const temp = text.trim();
        setInputText(temp);
    };

    return (
        <View style={[styles.inputContainer, style]}>
            <TextInput
                style={styles.input}
                placeholderTextColor="#BFC5D2" // 设置 placeholder 文字颜色
                value={inputText}
                onChangeText={handleChangeText}
                onFocus={() => onFocus?.()}
                autoFocus
            />
            <Text style={styles.send} onPress={handleSend} >发送</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        elevation: 2,  // Android上的阴影效果
        backgroundColor: '#000',
    },
    input: {
        flex: 1,
        height: 36,
        borderRadius: 6,
        backgroundColor: '#F8F9FC',  // 背景颜色
        fontSize: 14,  // 字号
        color: '#111E36',  // 颜色
        fontWeight: '400',  // 字重
        padding: 8,
        marginVertical: 10,
    },
    send: {
        fontSize: 14,
        color: '#fff',
        letterSpacing: 0, // 在 React Native 中，默认为 0，此行可省略
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center',
        paddingHorizontal: 16,
        marginRight: -16,
    }
});

export default BaseInput;
