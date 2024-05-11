"use strict";

class Mod {
	postDBLoad(container) {
		// constants
		const logger = container.resolve("WinstonLogger");
		const jsonUtil = container.resolve("JsonUtil");
		const modPath = __dirname.split("\\").slice(0, -1).join("\\");
		const VFS = container.resolve("VFS");
		const database = container.resolve("DatabaseServer").getTables();
		const dbBots = database.bots.types;
		
		const config = require("../config/config.json");
		
		let botSettings = {};
		
		for (const botType in dbBots) {
			// get the config values to each bot
			botSettings[botType] = jsonUtil.clone(config.MainSettings);
			
			const personalConfig = botSettings[botType];
			
			// handle overwrites
			if (config.OverwriteBots[botType]) {
				const overwriteConfig = config.OverwriteBots[botType];
				
				// skip if it has dont affect entry
				if (overwriteConfig.DontAffect) {
					continue;
				}
				
				// replace config values
				// skills
				if (overwriteConfig.RemoveCheatySkills) {
					for (const skillsEntry in overwriteConfig.RemoveCheatySkills) {
						personalConfig.RemoveCheatySkills[skillsEntry] = overwriteConfig.RemoveCheatySkills[skillsEntry];
					}
				}
				
				// health
				if (overwriteConfig.ChangeHealth) {
					if (overwriteConfig.ChangeHealth.Enabled !== undefined) {
						personalConfig.ChangeHealth.Enabled = overwriteConfig.ChangeHealth.Enabled;
					}
					
					if (overwriteConfig.ChangeHealth.HealthValues) {
						for (const healthEntry in overwriteConfig.ChangeHealth.HealthValues) {
							personalConfig.ChangeHealth.HealthValues[healthEntry] = overwriteConfig.ChangeHealth.HealthValues[healthEntry];
						}
					}
				}
			}
			
			// change health
			if (personalConfig.ChangeHealth.Enabled) {
				Mod.changeHealth(dbBots, botType, personalConfig.ChangeHealth.HealthValues);
			}
			
			// remove instant bot reload & infinite stamina & silent movement
			if (personalConfig.RemoveCheatySkills.BotSound) {
				if (dbBots[botType].skills.Common) {
					dbBots[botType].skills.Common.BotSound = {"min": 0, "max": 0};
				}
			}
			
			if (personalConfig.RemoveCheatySkills.BotReload) {
				if (dbBots[botType].skills.Common) {
					dbBots[botType].skills.Common.BotReload = {"min": 0, "max": 0};
				}
			}
			
			if (personalConfig.RemoveCheatySkills.EternityStamina) {
				if (dbBots[botType].difficulty) {
					for (const difficulty in dbBots[botType].difficulty) {
						if (dbBots[botType].difficulty[difficulty].Move) {
							dbBots[botType].difficulty[difficulty].Move.ETERNITY_STAMINA = false;
						}
					}
				}
			}
		}
	}

	static changeHealth(dbBots, botType, healthValues) {
		if (dbBots[botType].health) {
			dbBots[botType].health.BodyParts = [
				{
					"Chest": {
						"max": healthValues.Thorax,
						"min": healthValues.Thorax
					},
					"Head": {
						"max": healthValues.Head,
						"min": healthValues.Head
					},
					"LeftArm": {
						"max": healthValues.Arms,
						"min": healthValues.Arms
					},
					"LeftLeg": {
						"max": healthValues.Legs,
						"min": healthValues.Legs
					},
					"RightArm": {
						"max": healthValues.Arms,
						"min": healthValues.Arms
					},
					"RightLeg": {
						"max": healthValues.Legs,
						"min": healthValues.Legs
					},
					"Stomach": {
						"max": healthValues.Stomach,
						"min": healthValues.Stomach
					}
				}
			]
		}
	}
}

	
module.exports = { mod: new Mod() }
