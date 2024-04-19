import * as React from 'react';
import { useEffect, useRef } from 'react';
import { FlatList, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ListRenderItemInfo, Keyboard, StyleProp, ViewStyle, View } from 'react-native';

interface IProps {
    style?: StyleProp<ViewStyle>;
    flatListScrollToEndTimer?: number;
    messages?: any[];
    renderHeader?: () => React.ReactNode;
    renderFooter?: () => React.ReactNode;
    updateKeyboardHeight?: (height: number) => void;
}


const ChatView: React.FC<IProps> = ({ flatListScrollToEndTimer, messages, renderHeader, renderFooter, updateKeyboardHeight, style }) => {
    const flatListRef = useRef<FlatList<any> | null>(null);

    // 添加数据 列表滚动
    useEffect(() => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            flatListRef?.current?.scrollToEnd({ animated: true });
        }, 50)
    }, [messages]);

    // 获取焦点 列表滚动
    useEffect(() => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            flatListRef?.current?.scrollToEnd({ animated: true });
        }, 50)
    }, [flatListScrollToEndTimer]);

    const renderItem = (info: ListRenderItemInfo<any>) => {
        return <MessageItem info={info} />
    }

    const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (event: any) => {
                setKeyboardHeight(event.endCoordinates ? event.endCoordinates.height : event.end.height);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        // console.log('keyboardHeight', keyboardHeight);
        updateKeyboardHeight?.(keyboardHeight);
    }, [keyboardHeight]);

    return (
        <KeyboardAvoidingView style={[styles.container, style]} keyboardVerticalOffset={0} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {/* 聊天消息列表 */}
            {
                renderHeader?.()
            }
            <ScrollView style={[styles.scrollView]} contentContainerStyle={styles.scrollViewContent} >
                <FlatList
                    ref={(ref) => (flatListRef.current = ref)}
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                />
            </ScrollView>

            {
                renderFooter?.()
            }
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        maxHeight: '100%',
        backgroundColor: '#f2f2f2f2',
    },
    scrollView: {
        flex: 1,
        position: 'relative',
    },
    scrollViewContent: {
        flexGrow: 1,
        height: '100%',
    },
});

export default ChatView;


const MessageItem: React.FC<{ info: ListRenderItemInfo<any> }> = ({ info }) => {

    const { index, item } = info;
    return <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 2,
    }}>
        {
            index % 2 === 0
                ?

                <Text style={{
                    width: 50,
                    height: 50,
                    lineHeight: 50,
                    textAlign: 'center',
                    backgroundColor: 'red',
                    color: '#fff',
                    borderRadius: 50,
                }}>Chat</Text>
                :
                <Text style={{
                    width: 50,
                    height: 50,
                }}></Text>
        }

        <Text style={{
            width: '100%',
            flex: 1,
            marginBottom: 10,
            padding: 30,
            backgroundColor: '#fff',
            color: 'black',
            borderRadius: 6,
            textAlign: index % 2 === 0 ? 'left' : 'right'
        }}> {item} </Text>

        {
            index % 2 !== 0
                ?

                <Text style={{
                    width: 50,
                    height: 50,
                    lineHeight: 50,
                    textAlign: 'center',
                    backgroundColor: 'blue',
                    color: '#fff',
                    borderRadius: 50,
                }}>我</Text>
                :
                <Text style={{
                    width: 50,
                    height: 50,
                }}></Text>
        }
    </View>
};