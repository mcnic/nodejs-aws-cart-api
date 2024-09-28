# Task 9 (Docker and AWS Elastic Beanstalk)

[LINK](https://github.com/rolling-scopes-school/aws/blob/main/aws-developer/09_containerization/task.md)

1. Screenshot

1. What was done?

- Service is done, but FE is partial working...
- Additional scope - logger, swagger, unit tests, transaction

1. Proof links

- [Cart Service API](https://vsc55ky7c2ck5jlbxgxzw4htlm0mudrx.lambda-url.us-east-1.on.aws)
- [updated Frontend](https://d3fihs3nsna7qy.cloudfront.net/)
- [Link to FE PR](https://github.com/mcnic/nodejs-aws-shop-react/pull/6)

Done 5.8.2024

## Evaluation criteria (70 points for covering all criteria)

- [x] Dockerfile is prepared, image is building. Image size is minimized to be less than 500 MB.
- [x] Dockerfile is optimized. Files that change more often and commands that depend on them should be included later, files and commands that change less should be at the top.
- [x] Folders are added to .dockerignore, with explanations. At least 2 big directories should be excluded from build context. ~Elastic Beanstalk~ application is initialized.

## Additional (optional) tasks

- [x] 15 - Environment is created and the app is deployed to the AWS cloud. You must provide a link to your GitHub repo with Cart Service API or PR with created Dockerfile and related configurations.
- [x] 15 - FE application is updated with Cart API endpoint. You must provide a PR with updates in your FE repository and OPTIONALLY link to deployed front-end app which makes proper API calls to your Cart Service.

Total /100 points
