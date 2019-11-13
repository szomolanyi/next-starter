# Next and now usefull knowlidge
## Environment
https://www.leighhalliday.com/secrets-env-vars-nextjs-now
### .env or now.json
Enviroment can be specified in .env or now.json (now.json takes precedence). This enviroment is active during server runtime, but not in client.
### next.config.json
Enviroment variables for client must be specified on next.config.json.
### .env.build
Enviroment definitions in .env.build are active during build and can be used in next.config.json to propagate them to client runtime.
### dotenv
Additionaly server.js loads .env through dotenv npm package.
