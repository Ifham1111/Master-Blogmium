import {useSelector} from 'react-redux';
import {Alert, Button, TextInput} from "flowbite-react";
import React, {useEffect, useRef, useState} from "react";
import {getStorage} from "firebase/storage";
import {app} from "../firebase.js";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = React.createRef();
    const [fileUploadProgress, setFileUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);

    console.log(currentUser, fileUploadProgress, imageUploadError);

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = () => {
        console.log('uploading image...');
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    console.log(imageFile, imageFileUrl);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFileUploadProgress(progress.toFixed(0));
            // console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //     case 'paused':
            //         console.log('Upload is paused');
            //         break;
            //     case 'running':
            //         console.log('Upload is running');
            //         break;
            // }
        },
        (error) => {
        setImageUploadError('Could not upload image (File must be less than 2MB)');
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );

    return(
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <form className='flex flex-col gap-4'>
                    <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
                    <div className="w-32 h-32 self-center cursor-pointer shadow-2xl overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                        <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                    </div>

                    {imageUploadError && <Alert type='error' message={imageUploadError} />}

                    <TextInput label='name' id='username' placeholder='User name' defaultValue={currentUser.username} />
                    <TextInput label='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
                    <TextInput label='password' id='password' placeholder='Password' />

                    <Button type={'submit'} gradientDuoTone={"purpleToBlue"} className='w-32 self-center'>Update</Button>
                </form>

            <div className={'text-red-500 flex justify-between mt-5'}>
                <span className={'cursor-pointer'}>Delete Account</span>
                <span className={'cursor-pointer'}>Sign Out</span>
            </div>
        </div>
    )

}