import { StyleSheet, Text, View } from 'react-native';
import Layout from "./ChatView";
import BaseInput from "./BaseInput";
import { useState } from 'react';

export default () => {
    const [flatListScrollToEndTimer, setFlatListScrollToEndTimer] = useState(0);
    const [messages, setMessage] = useState<any[]>(['你好吗', '还行吧', '干啥呢', '写个 RN IM 聊天布局', '要兼容 键盘哇', '嗷嗷']);
    const Header = () => <Text style={styles.navbar}> 头部导航 </Text>
    const handleSend = (text: string) => { 
        setMessage([...messages, text])
    };

    return (
        <View style={styles.container}>
            <View style={styles.scrollView}>
                <Layout 
                    renderHeader={Header} 
                    renderFooter={() => <BaseInput onSend={handleSend} onFocus={() => setFlatListScrollToEndTimer(flatListScrollToEndTimer + 20)} />} 
                    messages={messages}
                    flatListScrollToEndTimer={flatListScrollToEndTimer}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    navbar: {
        width: '100%',
        height: 60,
        lineHeight: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        flex: 1,
        backgroundColor: 'pink',
    },
    scrollItem: {
        width: '100%',
        flex: 1,
        marginBottom: 10,
        lineHeight: 60,
        backgroundColor: 'blue',
    },
    footer: {
        width: '100%',
        height: 150,
        backgroundColor: 'yellowgreen',
    },
});
