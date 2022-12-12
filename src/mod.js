"use strict";

class Mod {
	postDBLoad(container) {
		// constants
		const logger = container.resolve("WinstonLogger");
		const database = container.resolve("DatabaseServer").getTables();
		const dbBots = database.bots.types;
		
		const config = require("../config/config.json");
		
		for (const botListIndex in config.DontAffectFollowingBots) {
			for (const botType in dbBots) {
				
				// if bot type is in the "Dont Affect" list, drop it
				if (config.DontAffectFollowingBots[botListIndex] === botType)
				{
					continue;
				};
				
				// change health
				if (config.ChangeHealth) {
					Mod.changeHealth(logger, dbBots, botType);
				};
				
				// remove instant bot reload & infinite stamina
				if (config.AffectCheatySkills) {
					if (dbBots[botType].skills.Common) {
						dbBots[botType].skills.Common.BotReload = {"min": 0, "max": 0};
					};
					
					if (dbBots[botType].difficulty) {
						for (const difficulty in dbBots[botType].difficulty) {
							if (dbBots[botType].difficulty[difficulty].Move) {
								dbBots[botType].difficulty[difficulty].Move.ETERNITY_STAMINA = false;
							};
						};
					};
				};

				// some bot gear changes to balance out lower health
				if (config.AddMoreGear) {
					Mod.changeGear(logger, dbBots, botType);
				};
			};
		};
	}

	static changeHealth(logger, dbBots, botType) {
		if (dbBots[botType].health) {
			dbBots[botType].health.BodyParts = [
				{
					"Chest": {
						"max": 85,
						"min": 85
					},
					"Head": {
						"max": 35,
						"min": 35
					},
					"LeftArm": {
						"max": 60,
						"min": 60
					},
					"LeftLeg": {
						"max": 65,
						"min": 65
					},
					"RightArm": {
						"max": 60,
						"min": 60
					},
					"RightLeg": {
						"max": 65,
						"min": 65
					},
					"Stomach": {
						"max": 70,
						"min": 70
					}
				}
			];
	
			// gluhkar
			if (botType === "bossgluhar") {
	
				//change chest and stomach HP cuz character mesh has armor vest on it
				dbBots[botType].health.BodyParts[0].Chest =	{"min": 220, "max": 220};
				dbBots[botType].health.BodyParts[0].Stomach = {"min": 140, "max": 140};
			};
	
			// shturman
			if (botType === "bosskojaniy") {
	
				//change chest and stomach HP cuz character mesh has armor vest on it
				dbBots[botType].health.BodyParts[0].Chest =	{"min": 180, "max": 180};
				dbBots[botType].health.BodyParts[0].Stomach = {"min": 150, "max": 150};
			};
		};
	}

	static changeGear(logger, dbBots, botType) {

		//additional constants
		const inv = dbBots[botType].inventory;
		const chances = dbBots[botType].chances;

		// reshala
		if (botType === "bossbully") {
			
			// headwear
			inv.equipment.Headwear["5b40e1525acfc4771e1c6611"] = 1;
			inv.equipment.Headwear["5b40e2bc5acfc40016388216"] = 1;
			inv.equipment.Headwear["5a7c4850e899ef00150be885"] = 1;
			inv.equipment.Headwear["5aa7cfc0e5b5b00015693143"] = 1;
			inv.equipment.Headwear["5645bc214bdc2d363b8b4571"] = 1;
			inv.equipment.Headwear["5aa7e454e5b5b0214e506fa2"] = 1;
			inv.equipment.Headwear["5aa7e4a4e5b5b000137b76f2"] = 1;
			
			// armor vests
			inv.equipment.ArmorVest["5fd4c474dd870108a754b241"] = 1;
			
			// rigs
			inv.equipment.TacticalVest["5ca20abf86f77418567a43f2"] = 1;
			inv.equipment.TacticalVest["5b44cad286f77402a54ae7e5"] = 1;
			inv.equipment.TacticalVest["5e4ac41886f77406a511c9a8"] = 1;
			inv.equipment.TacticalVest["60a3c70cde5f453f634816a3"] = 1;
			inv.equipment.TacticalVest["60a3c68c37ea821725773ef5"] = 1;
			inv.equipment.TacticalVest["5c0e746986f7741453628fe5"] = 1;
			inv.equipment.TacticalVest["5fd4c60f875c30179f5d04c2"] = 1;
			inv.equipment.TacticalVest["603648ff5a45383c122086ac"] = 1;
			inv.equipment.TacticalVest["6040dd4ddcf9592f401632d2"] = 1;
			
			// add visor to kiver
			inv.mods["5645bc214bdc2d363b8b4571"] = {
				"mod_equipment": [
					"5b46238386f7741a693bcf9c"
				]
			};
			
			// add visor to ZSh-1-2M
			inv.mods["5aa7e454e5b5b0214e506fa2"] = {
				"mod_equipment": [
					"5aa7e3abe5b5b000171d064d"
				]
			};
			
			// add visor to ZSh-1-2M cover
			inv.mods["5aa7e4a4e5b5b000137b76f2"] = {
				"mod_equipment": [
					"5aa7e3abe5b5b000171d064d"
				]
			};
			
			// adjust gear chances
			chances.equipment.Headwear = 100;
			chances.equipment.ArmorVest = 100;
			chances.equipment.TacticalVest = 100;
			chances.mods.mod_equipment = 50;
		};
		
		// shturman
		if (botType === "bosskojaniy") {

			// rigs
			inv.equipment.TacticalVest["5ca20abf86f77418567a43f2"] = 1;
			inv.equipment.TacticalVest["5f5f41f56760b4138443b352"] = 1;
			inv.equipment.TacticalVest["5c0e746986f7741453628fe5"] = 1;
			inv.equipment.TacticalVest["5e4ac41886f77406a511c9a8"] = 1;
			
			// adjust gear chances
			chances.equipment.TacticalVest = 100;
		};
		
		// sanitar
		if (botType === "bosssanitar") {

			// headwear
			inv.equipment.Headwear["5a7c4850e899ef00150be885"] = 1;
			inv.equipment.Headwear["5aa7cfc0e5b5b00015693143"] = 1;
			inv.equipment.Headwear["5aa7e276e5b5b000171d0647"] = 1;
			inv.equipment.Headwear["5b40e1525acfc4771e1c6611"] = 1;
			inv.equipment.Headwear["5b40e2bc5acfc40016388216"] = 1;
			inv.equipment.Headwear["5aa7e454e5b5b0214e506fa2"] = 1;
			inv.equipment.Headwear["5aa7e4a4e5b5b000137b76f2"] = 1;
			inv.equipment.Headwear["5c091a4e0db834001d5addc8"] = 1;
			inv.equipment.Headwear["5f60c74e3b85f6263c145586"] = 1;
			
			// armor vests
			inv.equipment.ArmorVest["5fd4c474dd870108a754b241"] = 1;
			
			// rigs
			inv.equipment.TacticalVest["5e4ac41886f77406a511c9a8"] = 1;
			inv.equipment.TacticalVest["5c0e746986f7741453628fe5"] = 1;
			inv.equipment.TacticalVest["5fd4c60f875c30179f5d04c2"] = 1;
			inv.equipment.TacticalVest["603648ff5a45383c122086ac"] = 1;
			inv.equipment.TacticalVest["6040dd4ddcf9592f401632d2"] = 1;
			inv.equipment.TacticalVest["5ca20abf86f77418567a43f2"] = 1;
			
			// add visor to ZSh-1-2M
			inv.mods["5aa7e454e5b5b0214e506fa2"] = {
				"mod_equipment": [
					"5aa7e3abe5b5b000171d064d"
				]
			};
			
			// add visor to ZSh-1-2M cover
			inv.mods["5aa7e4a4e5b5b000137b76f2"] = {
				"mod_equipment": [
					"5aa7e3abe5b5b000171d064d"
				]
			};
			
			// adjust gear chances
			chances.equipment.Headwear = 100;
			chances.equipment.ArmorVest = 100;
			chances.equipment.TacticalVest = 100;
			chances.mods.mod_equipment = 70;
		};
		
		// cultist priest
		if (botType === "sectantpriest") {

			// armor vests
			inv.equipment.ArmorVest["5f5f41476bdad616ad46d631"] = 1;
			inv.equipment.ArmorVest["5e4abb5086f77406975c9342"] = 1;
			inv.equipment.ArmorVest["609e8540d5c319764c2bc2e9"] = 1;
			inv.equipment.ArmorVest["5fd4c474dd870108a754b241"] = 1;
			
			// rigs
			inv.equipment.TacticalVest["5ca20abf86f77418567a43f2"] = 1;
			inv.equipment.TacticalVest["5f5f41f56760b4138443b352"] = 1;
			inv.equipment.TacticalVest["5648a69d4bdc2ded0b8b457b"] = 1;
			inv.equipment.TacticalVest["603648ff5a45383c122086ac"] = 1;
			inv.equipment.TacticalVest["5c0e9f2c86f77432297fe0a3"] = 1;
			inv.equipment.TacticalVest["5df8a42886f77412640e2e75"] = 1;
			
			// adjust gear chances
			chances.equipment.ArmorVest = 100;
			chances.equipment.TacticalVest = 100;
		};
		
		// raiders
		if (botType === "pmcbot") {

			// adjust gear chances
			chances.equipment.ArmorVest = 100;
		};
	}
}

	
module.exports = { mod: new Mod() }