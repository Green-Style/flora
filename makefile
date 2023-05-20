scp -C -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/greenstyleserver_key.pem -v -r build/* "azureuser@greenstyle.brazilsouth.cloudapp.azure.com:~/apps/dev/flora/build"

scp -C -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i ~/.ssh/greenstyleserver_key.pem -v -r build/* "azureuser@greenstyle.brazilsouth.cloudapp.azure.com:~/apps/prod/flora/build"