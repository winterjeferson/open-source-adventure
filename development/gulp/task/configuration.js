const path = '../../';
const allFile = '*.*';

module.exports = {
    allFile: allFile,
    allFolderFile: `**/${allFile}`,
    development: `${path}development/`,
    homologation: `${path}homologation/`,
    production: `${path}production/`,
    index: 'index',
    theme: 'theme',
    plugin: 'plugin',
    prefix: '',
    assets: 'assets/',
    ip: '127.0.0.1',
    port: '3015',
}