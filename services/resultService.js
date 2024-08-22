const { spawn } = require('child_process');

const runPythonScript = () => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['./test.py']);

        pythonProcess.stdout.on('data', (data) => {
            const result = data.toString().trim();
            resolve(result);
        });

        pythonProcess.stderr.on('data', (data) => {
            const error = data.toString().trim();
            reject(new Error(error));
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            }
        });
    });
};

module.exports = {
    runPythonScript
}