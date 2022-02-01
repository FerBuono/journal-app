import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);
    
    const date = new Date().getTime();

    const handleSave = () => {
        dispatch(startSaveNote(active));
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            dispatch(startUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>
                {
                    `${moment(date).format('ddd')}, ${moment(date).format('Do')} ${moment(date).format('MMMM')} ${moment(date).format('YYYY')}`
                }
            </span>

            <input 
                id='fileSelector'
                type="file"
                name='file'
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <div>
                <button 
                    className="btn"
                    onClick={handlePictureClick}    
                >
                    Picture
                </button>
               
                <button 
                    className="btn"
                    onClick={handleSave}    
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default NotesAppBar;
