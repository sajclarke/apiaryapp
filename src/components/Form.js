import React, { Component } from 'react';
import { TextInput, Button } from 'react-native';

const UselessTextInput = (props) => {
    const [title, onChangeTitle] = React.useState('Example Title');
    const [description, onChangeDescription] = React.useState('Example Description');

    const handleSubmit = () => {
        props.onAdd({ title, description })
    }

    return (
        <>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginTop: 10 }}
                onChangeText={text => onChangeTitle(text)}
                placeholder="Enter title"
                value={title}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginTop: 20 }}
                onChangeText={text => onChangeDescription(text)}
                placeholder="Enter description"
                value={description}
            />

            <Button
                title="Save New Recordss"
                onPress={handleSubmit}
            />
        </>
    );
}

export default UselessTextInput;