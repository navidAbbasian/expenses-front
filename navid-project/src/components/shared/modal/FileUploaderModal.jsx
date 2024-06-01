import { Dialog, DialogContent } from '@mui/material';
import ModalHeader from './ModalHeader';
import SingleFileDropzoneContainer from '../file-uploader/SingleFileDropzoneContainer';
import MultipleFileDropzoneContainer from '../file-uploader/MultipleFileDropzoneContainer';

const FileUploaderModal = (props) => {
    const { title, openModal, setOpenModal, setFile, multi } = props;

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Dialog
            fullWidth
            onClose={handleCloseModal}
            open={openModal}
            aria-labelledby="responsive-dialog-title"
        >
            <ModalHeader title={title} onClose={handleCloseModal} />
            <DialogContent dividers>
                {multi ? (
                    <MultipleFileDropzoneContainer
                        handleCloseModal={handleCloseModal}
                        setFile={setFile}
                    />
                ) : (
                    <SingleFileDropzoneContainer
                        handleCloseModal={handleCloseModal}
                        setFile={setFile}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FileUploaderModal;
