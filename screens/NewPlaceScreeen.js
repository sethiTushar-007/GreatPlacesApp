import React, {useState, useCallback} from 'react';
import { ScrollView, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';
import { addPlace } from '../store/places-actions';

const NewPlaceScreen = props => {
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, [])

    const savePlaceHandler = () => {
        dispatch(addPlace(titleValue, selectedImage, selectedLocation));
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    value={titleValue}
                    onChangeText={titleChangeHandler}
                />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker 
                    navigation={props.navigation}
                    onLocationPicked={locationPickedHandler}
                />
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Save Place"
                        color={Colors.primary}
                        onPress={savePlaceHandler}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Places'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    buttonWrapper: {
        marginTop: 20
    }
})

export default NewPlaceScreen;
