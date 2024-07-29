export default 
{
    "minecraft_version": "1.20.4", // supports up to 1.20.4
    "host": "localhost", // or "localhost", "your.ip.address.here"
    "port": 25565,
    "auth": "offline", // or "microsoft" "offline"
    
    "profiles": [
        "./andy.json",
        // add more profiles here, check ./profiles/ for more
        // more than 1 profile will require you to /msg each bot indivually
    ],
    "load_memory": false, // load memory from previous session
    "init_message": "Say hello world and your name", // sends to all on spawn
    "allow_insecure_coding": true, // enable at own risk
    "code_timeout_mins": -1, // -1 for no timeout
    "verbose_commands": true, // show full command syntax
}