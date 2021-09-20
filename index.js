const core = require('@actions/core');
const github = require('@actions/github');


try {
    const accessKeyId = core.getInput('aws-access-key-id', { required: false });
    const secretAccessKey = core.getInput('aws-secret-access-key', { required: false });
    const sessionToken = core.getInput('aws-session-token', { required: false });
    const roleType = core.getInput('role-type', { required: true });
    const roleName = core.getInput('role-name', { required: true });


} catch (error) {
    core.setFailed(error.message)
}