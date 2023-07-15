# snake

get started:
1. initialise repo on github
2. `gh repo clone DanielChou333/snake` into local machine,
so now you have a folder on your computer .../snake
3. outside the snake folder, `npx create-react-app snake` and it will install react packages and stuff inside the cloned empty repo
4. `npm start` to start making app

working on the app:
1. start with outermost component (App> Background > Container > status+...)
2. ran into JSX not compiling
    * first guess: babel is not installed? use `npm install --save-dev @babel/preset-react` to install, problem persists.
    * after searching on stack-overflow, its because compiler did not parse the bracket () on the new line. To fix, put bracket right after return like so: `return(/*new line*/ )`