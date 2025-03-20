import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSubmit }) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedWidth = new Animated.Value(200);

    const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedWidth, {
        toValue: 300,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
    }).start();
    };

    const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedWidth, {
        toValue: 200,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
    }).start();
    };

    return (
    <View style={styles.searchContainer}>
        <Animated.View style={[styles.searchBarContainer, { width: animatedWidth }]}>
        <LinearGradient
            colors={isFocused ? ['#907bb4', '#0f056b', '#0d0217'] : ['#0d0217', '#0f056b', '#907bb4']}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <Feather name="search" size={20} color="#fff" style={styles.icon} />
            <TextInput
            style={[styles.searchBar, { color: '#fff' }]}
            placeholder="Search..."
            placeholderTextColor={isFocused ? '#ddd' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
            onSubmitEditing={onSubmit}
            />
        </LinearGradient>
        </Animated.View>
    </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    searchBarContainer: {
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    gradientBackground: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
    },
});

export default SearchBar;
