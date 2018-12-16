const fs = require('fs');

const serverBasePath = __dirname+'/../server/'

/*
 |---------------------------------
 | Loading the Environment file.
 |----------------------------------
 */
const dotenvFilename = fs.readFileSync(serverBasePath+'.env','utf8');
require('dotenv').config({path: serverBasePath+'/.env.'+dotenvFilename.trim()});	


/*
 |-----------------------------------------
 | Changing the manifest path 
 |-------------------------------
 */
/**
 * Add a new hashed key to the manifest.
 *
 * @param {string} file
 */
 Mix.manifest.hash =  function(file) {
 
	let hash = new File(path.join(__dirname, file)).version();
	let filePath = this.normalizePath(file);
	this.manifest[filePath] = process.env.asset_url+filePath + '?id=' + hash;
	return this;

 }


/**
 * Add the given path to the manifest file.
 *
 * @param {string} filePath
 */
 Mix.manifest.add = function (filePath) {

    filePath = this.normalizePath(filePath);

    let original = filePath.replace(/\?id=\w{20}/, '');

    this.manifest[original] = process.env.asset_url+filePath;

    return this;
}
/**
 * set the manifest path 
 */
Mix.manifest.path = function () {

	return path.join(serverBasePath+'public/', this.name);
}