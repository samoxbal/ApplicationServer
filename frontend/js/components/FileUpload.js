import {Component} from 'react';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this._file = null;
    }

    onDragOver(e) {
        e.preventDefault();
        this._dropzone.classList.add('AddScan__inputFileUpload_over');
        this._label.classList.add('AddScan__labelFileUpload_over');
    }

    onDragLeave(e) {
        e.preventDefault();
        this._dropzone.classList.remove('AddScan__inputFileUpload_over');
        this._label.classList.remove('AddScan__labelFileUpload_over');
    }

    onDrop(e) {
        e.preventDefault();
        this._dropzone.classList.remove('AddScan__inputFileUpload_over');
        this._label.classList.remove('AddScan__labelFileUpload_over');
        const file = e.dataTransfer.files[0];
        this._label.innerHTML = file.name;
        this._file = file;
    }

    getFile() {
        return this._file;
    }

    render() {
        return (
            <div
                className="AddScan__inputFileUpload"
                ref={ref => this._dropzone = ref}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                {...this.props}
            >
                <h3 className="AddScan__labelFileUpload" ref={ref => this._label = ref}>
                    Перетащите файл сюда и отпустите
                </h3>
            </div>
        )
    }
}