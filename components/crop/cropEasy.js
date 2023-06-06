import { DialogActions, DialogContent } from '@mui/material';
import React, {useState} from 'react'
import Cropper from 'react-easy-crop';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { faCrop } from '@fortawesome/free-solid-svg-icons';

const cropEasy = ({photoUrl}) => {
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({x:0, y:0});
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const cropImage = async () => {
        
    }

  return (
    <>
    <DialogContent dividers
    sx={{
        background: '#333',
        position: 'relative',
        height: 400,
        width: 'auto',
        minWidth: {sm:500}
    }}
    >
        <Cropper
        image={photoUrl}
        zoom={zoom}
        crop={crop}
        rotation={rotation}
        aspect={1}
        onZoomChange={setZoom}
        onCropChange={setCrop}
        onRotationChange={setRotation}
        onCropComplete={cropComplete}
        />

    </DialogContent>
    <DialogActions sx={{flexDirection:"column", mx:3, my:2}}>
        <Box sx={{width: '100%', mb:1}}>
            <Box>
                <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                <Slider
                valueLabelDisplay='auto'
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
                />
                
            </Box>

            <Box>
                <Typography>Rotation: {rotation}</Typography>
                <Slider
                valueLabelDisplay='auto'
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotation) => setRotation(rotation)}
                />
                
            </Box>

        </Box>
        <Box
        sx={{
            display:'flex',
            gap: 2,
            flexWrap: 'wrap'
        }}
        >
            <Button
            variant='outlined'
            startIcon={<faCancel />}
            onClick={() => setOpenCrop(false)}
            >
                Cancel
            </Button>
            <Button
            variant='contained'
            startIcon={<faCrop />}
            onClick={cropImage}
            >
                Crop
            </Button>
        </Box>
    </DialogActions>
    </>
  )
}

export default cropEasy;

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`
}