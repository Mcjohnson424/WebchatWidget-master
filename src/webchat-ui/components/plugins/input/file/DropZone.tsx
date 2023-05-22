import React from "react";
import { styled } from '../../../../style';
import AttachFile from './attach-file-20px.svg';

const componentStyles = (({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: theme.unitSize * 15,
    bottom: 0,
}));

const DropZoneContent = styled.div(componentStyles, {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 30px 20px rgba(0,0,0,0.1) inset",
});

const DropZoneContainer = styled.div(componentStyles, {});

const AttachFileIcon = styled(AttachFile)(({ theme }) => ({
    marginBottom: `-${theme.unitSize / 2}px`,
}));

const DragDropTypography = styled.span(() => ({
    color: 'hsla(0, 0%, 0%, .54)',
    fontSize: 14,
}));

interface IDropZoneProps {
    setIsDropZoneVisible: (isVisible: boolean) => void;
    onAddFilesToList: (fileList: File[]) => void;
}

class DropZone extends React.PureComponent<React.HTMLProps<HTMLDivElement> & IDropZoneProps> {
    dropRef: React.RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);
        this.dropRef = React.createRef();
    }

    handleDragOver = e => {
        e.preventDefault();
    };

    handleDragLeave = e => {
        e.preventDefault();
        this.props.setIsDropZoneVisible(false);
    };

    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.setIsDropZoneVisible(false);
        if (e.dataTransfer?.files) {
            const { onAddFilesToList } = this.props;
            const newFilesArray = Array.prototype.slice.call(e.dataTransfer?.files);
            onAddFilesToList(newFilesArray);
        }
    }

    render() {
        return (
            <>
                <DropZoneContent>
                    <AttachFileIcon />
                    <DragDropTypography
                        className="webchat-input-drag-and-drop-file-text"
                    >
                        Drop to attach File
                    </DragDropTypography>
                </DropZoneContent>
                <DropZoneContainer
                    ref={this.dropRef}
                    onDragOver={this.handleDragOver}
                    onDragLeave={e => this.handleDragLeave(e)}
                    onDropCapture={this.handleDrop}
                />
            </>
        );
    }
}

export default DropZone;
