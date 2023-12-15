const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.post('/start-rosbridge-server', (req, res) => {
    exec('/home/orin/workspaces/agv_ros-dev/src/agv_ros/scripts/start_rosbridge.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({error: 'Script failed to run'});
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.json({message: 'Script executed successfully', output: stdout});
    });
});

app.post('/start-robot', (req, res) => {
    exec('/home/orin/workspaces/agv_ros-dev/src/agv_ros/scripts/launch.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({error: 'Script failed to run'});
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.json({message: 'Script executed successfully', output: stdout});
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});