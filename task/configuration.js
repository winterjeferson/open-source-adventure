const path = './';
const allFile = '*.*';

module.exports = {
    allFile: allFile,
    allFolderFile: `**/${allFile}`,
    src: `${path}src/`,
    dist: `${path}docs/`,
    index: 'index',
    theme: 'theme',
    plugin: 'plugin',
    prefix: '',
    assets: 'assets/',
    ip: '127.0.0.1',
    port: '3015',
}