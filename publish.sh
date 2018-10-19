rm index.zip  
zip -X -r -q index.zip *
aws lambda update-function-code --function-name AlexaResdiarySkill --zip-file fileb://index.zip