# alks-create-role-action

Create IAM roles through ALKS.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [Credentials](#credentials)
- [Inputs](#inputs)
- [Outputs](#outputs)

<!-- tocstop -->
## Usage

Add the following step to your workflow:

```yaml
    - name: Create ALKS Role
      uses: ntangy/alks-create-role-action@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-session-token: ${{ secrets.AWS_SESSION_TOKEN }}
        role-type: 'AWS Lambda'
        role-name: 'my-lambda-role'
        enable-machine-identity: 'false'
        include-default-policy: 'false'
```

This would create a Lambda role named `my-lambda-role` in the account from where your STS credentials came from.

## Credentials

There are two primary ways of authenticating when using this action
* Pass in STS credentials via Github Secrets. Do not store credentials in the repository's code.
* Implicitly pass credentials via self hosted runner's credentials if the runners already have AWS credentials (for example via ECS) and the runner is using an ALKS enabled IAM role. The action will attempt to query for these credentials when using a self hosted runner.

The STS credentials must either be coming from a Machine Identity or they must have IAM capabilities if you are using your own STS credentials from ALKS. This means STS credentials from a login role such as ReadOnly will not be able to perform IAM actions.

## Inputs

### `role-type`

**Required** The role type to use.

### `role-name`

**Required** The name of the role.

### `enable-machine-identity`

Enable IAM role to have ALKS access. Default `"false"`.

### `include-default-policy`

Include the default policies in the role. Default `"false"`.


## Outputs

### `arn`

The arn of the created role.

