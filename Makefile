CODE_S3_BUCKET="sam-function-code"
STACK_NAME="owntracks-lambda"

.PHONY: build
build:
	sam build

.PHONY: package
package:
	sam package \
		--debug \
		--template-file template.yml \
		--output-template-file packaged.yml \
		--s3-bucket $(CODE_S3_BUCKET)

.PHONY: deploy
deploy: package
	sam deploy \
		--template-file packaged.yml \
		--stack-name $(STACK_NAME) \
		--capabilities CAPABILITY_IAM

.PHONY: outputs
outputs:
	aws cloudformation describe-stacks \
    --stack-name $(STACK_NAME) \
    --query 'Stacks[].Outputs'