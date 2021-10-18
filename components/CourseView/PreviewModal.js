import {Modal} from 'antd';
import { useState } from 'react'
import ReactPlayer from 'react-player'

const PreviewModal =({showModal, setShowModal, preview}) =>{
    const [play, setPlay] = useState(false);
    return(
        <>
            <Modal 
            title= "Course Preview" 
            visible ={showModal}
            onCancel = {()=>setShowModal(!showModal)}
            destroyOnClose={true}
            width = {720}
            footer = {null}
            maskClosable = {false}
            >
                
                
                <div className = "wrapper">
                    <ReactPlayer 
                    url = {preview}
                    playing = {showModal}
                    controls = {true}
                    width = "100%"
                    height = "100%"
                    config = {{file: {attributes: {controlsList: 'nodownload'}}}}
                    onContextMenu = {e=>e.preventDefault()}
                    seek
                    >

                    </ReactPlayer>
                </div>
            </Modal>
        </>
    )
};
export default PreviewModal;