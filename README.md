# community-blog

# Create a MongoDB cluster and database

Follow the instruction in the documentation
https://docs.atlas.mongodb.com/getting-started/

# Add your MomgoURI

Create a default.json file in the config directoty.
Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
See https://docs.mongodb.com/ecosystem/drivers/node/ for more details.

```
{
  "mongoURI": "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority",
  "jwtSecret": "<yourSuperSecret>"
}
```

# Start the Dev Server

From root directory run
`npm start`

Web server: http://localhost:3000/
