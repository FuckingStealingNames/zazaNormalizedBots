class Mod
{
    constructor()
    {
		Logger.info("Loading: Less Cheaty Bots");
		
		ModLoader.onLoad["LessCheatyBots"] = require("./src/LessCheatyBots.js").onLoadMod;
    }
}

module.exports.Mod = new Mod();