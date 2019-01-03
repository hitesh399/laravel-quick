export function addFileListInInput(input, files) {
    
    if (typeof file_paths === 'string')
        file_paths = [file_paths]
    else if (!Array.isArray(file_paths)) {
        throw new Error('file_paths needs to be a file path string or an Array of file path strings')
    }
    files.__proto__ = Object.create(FileList.prototype)

    Object.defineProperty(input, 'files', {
        value: files,
        writeable: false,
    })
    return input;
}