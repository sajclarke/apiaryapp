import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// import RNFetchBlob from 'react-native-fetch-blob'
// import RNFetchBlob from 'rn-fetch-blob'
import Toast from 'react-native-tiny-toast';

export const addTodo = async (postObj) => {

    const { key, title, description } = postObj
    console.log(postObj)
    const postId = uuidv4()
    // return 'something'
    const toast = Toast.showLoading('Saving....');
    return firebase
        .firestore()
        .collection('todos')
        .doc(postId)
        .set(postObj)
        .then(ref => {
            Toast.hide(toast);
            Toast.showSuccess('Successfully submitted new report.');
            // res(ref);
        }).catch(error => {
            console.log(error);
            Toast.show('An error occurred')
        });

}

export const addPost = async (postObj) => {

    const { address, imgPath, latitude, longitude, numberTotal, babiesSeen, userId, notes } = postObj
    console.log(postObj)
    // Firebase.submitThing(postObj)
    const id = uuid.v4()
    let remoteUri = ''
    if (imgPath) {
        remoteUri = await Firebase.uploadPhotoAsync(imgPath, `${id}`);
    }
    // const remoteUri = await Firebase.uploadPhotoAsync(imgPath, `${id}`);
    // console.log(remoteUri)

    const uploadData = {
        userId,
        text: address,
        latitude, longitude, numberTotal, babiesSeen,
        // uid: this.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        image: remoteUri,
        notes: notes,
        completed: false
    };
    const toast = Toast.showLoading('Saving....');
    return firebase
        .firestore()
        .collection('reports')
        .doc(id)
        .set(uploadData)
        .then(ref => {
            Toast.hide(toast);
            Toast.showSuccess('Successfully submitted new report.');
            // res(ref);
        }).catch(error => {
            console.log(error);
            Toast.show('An error occurred')
        });

}

export const updatePost = async (postObj) => {

    const { objId, address, imgPath, latitude, longitude, numberTotal, notes } = postObj
    console.log('update info', postObj)
    console.log('notes', postObj.notes)
    // Firebase.submitThing(postObj)
    // const id = uuid.v4()
    const uploadData = {
        text: address,
        latitude, longitude, numberTotal,
        // uid: this.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        notes: notes,
        // image: remoteUri,
        completed: false
    };

    if (imgPath.length > 0) {
        const remoteUri = await uploadPhotoAsync(imgPath, `${objId}`);
        console.log(remoteUri);
        uploadData.image = remoteUri;
    }

    const toast = Toast.showLoading('Saving....');

    return firebase
        .firestore()
        .collection('reports')
        .doc(objId)
        .update(uploadData)
        .then(ref => {
            Toast.hide(toast);
            Toast.showSuccess('Successfully updated report.');
            // res(ref);
        }).catch(error => {
            console.log(error);
            Toast.show('An error occurred')
        });

}
export const removePost = (postId) => {

    console.log('removing id', postId)
    return firebase
        .firestore()
        .collection('reports')
        .doc(postId)
        .delete()
        .then(ref => {
            Toast.showSuccess('Successfully deleted post.');
            // res(ref);
        }).catch(error => {
            console.log(error);
            Toast.show('An error occurred')
        });

}

export const uploadPhotoAsync = (uri, fileName) => {
    return new Promise(async (res, rej) => {
        // const response = await fetch(uri);
        // const file = await response.blob();

        let uploadRef = firebase
            .storage()
            .ref(fileName);

        let snapshot = await uploadRef.putFile(uri)
        let downloadURL = await uploadRef.getDownloadURL()
        console.log('download url', downloadURL)
        res(downloadURL)

    });

}

export const getPosts = (userId) => {
    console.log('Searching for posts made by :', userId)
    return firebase
        .firestore()
        .collection('reports')
        .orderBy('timestamp', 'desc')
        .where("userId", "==", userId.trim())
        // .orderBy('timestamp', 'desc')
        .get()
        .then(function (querySnapshot) {
            // let posts = querySnapshot.docs.map(doc => doc.data())
            // posts.id = doc.id
            // console.log(posts)
            let posts = querySnapshot.docs.map(doc => {
                return ({ id: doc.id, ...doc.data() })
            })
            // console.log(posts)
            return posts
        })
        .catch(function (error) {
            console.log('Error getting documents: ', error)
            Toast.show('Error getting documents. Please reload')
        })
}

