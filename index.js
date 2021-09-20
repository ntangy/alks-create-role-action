const core = require('@actions/core');
const github = require('@actions/github');
const ALKS = require('alks.js');
const axios = require('axios');

const ALKS_BASE_URL = 'https://alks.coxautoinc.com/rest';


async function run() {
    try {
        const accessKeyId = core.getInput('aws-access-key-id', { required: false });
        const secretAccessKey = core.getInput('aws-secret-access-key', { required: false });
        const sessionToken = core.getInput('aws-session-token', { required: false });
        const roleType = core.getInput('role-type', { required: true });
        const roleName = core.getInput('role-name', { required: true });
    
        const alks = ALKS.create({
            baseUrl: ALKS_BASE_URL,
            accessKey: accessKeyId,
            secretKey: secretAccessKey,
            sessionToken: sessionToken,
        });
        const response = await axios.get(ALKS_BASE_URL + "/loginRoles/id/me", {
            method: 'GET',
            headers: {
                'ALKS-STS-Access-Key': accessKeyId,
                'ALKS-STS-Secret-Key': secretAccessKey,
                'ALKS-STS-Session-Token': sessionToken,
            }
        });
        if(response.status != 200) {
            throw new Error('Could not validate STS credentials/could not be recognized by ALKS')
        }
        const data = response.data;
        const account = data.loginRole.account;
        const role = data.loginRole.role;
        const alias = data.loginRole.skypieaAccount.alias;

        console.log(account, role, alias);
    
        let createdRole = await alks.createRole({
            account: account,
            role: role,
            roleName: roleName,
            roleType: roleType,
            enableAlksAccess: false,
            includeDefaultPolicy: false,
        });

        console.log(createdRole);
        const arn = createdRole.roleArn;
        core.setOutput('arn', arn);
    
    } catch (error) {
        core.setFailed(error.message)
    }
}

run();