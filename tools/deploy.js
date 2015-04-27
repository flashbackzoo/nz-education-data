var exec = require('child_process').exec,
    secrets = require('../secrets');

console.log('deploying to ' + secrets.publicAddress + '...');

function taskCallback(err, stdout, stderr) {
    if (stdout !== '') {
        console.log(stdout);
    }

    if (stderr !== '') {
        console.log(stderr);
    }

    if (err !== null) {
        console.log(err);
    }
}

function handleErrors(code) {
    if (code > 0) {
        process.exit(code);
    }
}

exec('npm run build:all:prod', taskCallback).on('close', function (code) {
    handleErrors(code);

    exec('rsync -avz -e "ssh" --exclude="config.json" --exclude="docs/" --exclude="data.json" --exclude="tools/deploy.js" --exclude="bower.json" --exclude=".gitignore" --exclude="README.md" --exclude=".DS_Store" --exclude=".git/" --exclude="bower_components/" --exclude="node_modules/" --exclude="secrets.js" . ' + secrets.prodUser + '@' + secrets.publicAddress + ':' + secrets.prodDir, taskCallback).on('close', function (code) {
        handleErrors(code);

        console.log('deployment complete. Now run `npm run deploy:prod` on ' + secrets.publicAddress + ' to install the changes.');
    });
});
