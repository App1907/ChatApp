import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Images } from '../../assets'; // Import the image assets correctly

const MessageScreen = ({navigation}: {navigation: any}) => {
    const [showModal, setShowModal] = useState(false);

    const start = () => {
        setShowModal(!showModal);
    };

    const newChat = () => {
        navigation.navigate('Search');
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={Images.back} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Chats</Text>
                    <Text style={styles.headerSubtitle}>45 Contacts</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Image source={Images.search} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Images.notification} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search messages..."
                    placeholderTextColor="#AAB4BE"
                />
            </View>

            {/* Announcement Section */}
            <View style={styles.announcementContainer}>
                <TouchableOpacity style={styles.announcementButton}>
                    <Image source={Images.announcementIcon} style={styles.announcementIcon} />
                </TouchableOpacity>
                <Text style={styles.announcementText}>Announcement</Text>
            </View>

            {/* No Chat Section */}
            <View style={styles.noChatContainer}>
                <Image source={Images.noChatIcon} style={styles.noChatIcon} />
                <Text style={styles.noChatText}>No chats, yet!</Text>
                <TouchableOpacity style={styles.startChatButton} onPress={start}>
                    <Text style={styles.startChatButtonText}>Start Chat</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Menu */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity>
                    <Image source={Images.homeIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Images.accountIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Images.favoritesIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Images.menuIcon} style={styles.bottomIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        backgroundColor: '#2A7BBB',
        height: 123,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    backIcon: {
        height: 24,
        width: 24,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    headerSubtitle: {
        color: 'white',
        fontSize: 13,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        height: 24,
        width: 24,
        marginLeft: 20,
    },
    searchContainer: {
        marginTop: 10,
        paddingHorizontal: 16,
    },
    searchInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    announcementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    announcementButton: {
        backgroundColor: '#2A7BBB',
        borderRadius: 50,
        padding: 10,
    },
    announcementIcon: {
        height: 24,
        width: 24,
    },
    announcementText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#7E8A9A',
    },
    noChatContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChatIcon: {
        width: 166,
        height: 130,
    },
    noChatText: {
        fontSize: 16,
        color: '#7E8A9A',
        marginVertical: 20,
    },
    startChatButton: {
        backgroundColor: '#2A7BBB',
        borderRadius: 8,
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    startChatButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    bottomMenu: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
    },
    bottomIcon: {
        height: 24,
        width: 24,
    },
});

export default MessageScreen;
