"use strict";

class LessCheatyBots
{
	static onLoadMod() 
	{
		const config = require("../config/config.json");
		
		for (const botListIndex in config.DontAffectFollowingBots) {
			for (const botType in DatabaseServer.tables.bots.types) {
				
				// if bot type is in the "Dont Affect" list, drop it
				if (config.DontAffectFollowingBots[botListIndex] === botType)
				{
					continue;
				}
				
				// change health
				DatabaseServer.tables.bots.types[botType].health.BodyParts.Head = 		{"min": 35, "max": 35};
				DatabaseServer.tables.bots.types[botType].health.BodyParts.Chest = 		{"min": 85, "max": 85};
				DatabaseServer.tables.bots.types[botType].health.BodyParts.Stomach = 	{"min": 70, "max": 70};
				DatabaseServer.tables.bots.types[botType].health.BodyParts.LeftArm = 	{"min": 60, "max": 60};
				DatabaseServer.tables.bots.types[botType].health.BodyParts.RightArm = 	{"min": 60, "max": 60};
				DatabaseServer.tables.bots.types[botType].health.BodyParts.LeftLeg = 	{"min": 65, "max": 65};
				DatabaseServer.tables.bots.types[botType].health.BodyParts.RightLeg = 	{"min": 65, "max": 65};
				
				// change bot reload & infinite stamina
				if (config.AffectCheatySkills) {
					if (DatabaseServer.tables.bots.types[botType].skills.Common) {
						DatabaseServer.tables.bots.types[botType].skills.Common.BotReload = {"min": 0, "max": 0};
					}
					
					if (DatabaseServer.tables.bots.types[botType].difficulty) {
						for (const difficulty in DatabaseServer.tables.bots.types[botType].difficulty) {
							if (DatabaseServer.tables.bots.types[botType].difficulty[difficulty].Move) {
								DatabaseServer.tables.bots.types[botType].difficulty[difficulty].Move.ETERNITY_STAMINA = false;
							}
						}
					}
				}
				
				// some bot changes to balance out lower health
				// reshala
				if (botType === "bossbully") {
					// headwear
					DatabaseServer.tables.bots.types[botType].inventory.equipment.Headwear.push(
						"5b40e1525acfc4771e1c6611",
						"5b40e2bc5acfc40016388216",
						"5a7c4850e899ef00150be885",
						"5aa7cfc0e5b5b00015693143",
						"5645bc214bdc2d363b8b4571",
						"5aa7e454e5b5b0214e506fa2",
						"5aa7e4a4e5b5b000137b76f2"
					);
					
					// armor vests
					DatabaseServer.tables.bots.types[botType].inventory.equipment.ArmorVest.push(
						"5fd4c474dd870108a754b241"
					);
					
					// rigs
					DatabaseServer.tables.bots.types[botType].inventory.equipment.TacticalVest.push(
						"5ca20abf86f77418567a43f2",
						"5b44cad286f77402a54ae7e5",
						"5e4ac41886f77406a511c9a8",
						"60a3c70cde5f453f634816a3",
						"60a3c68c37ea821725773ef5",
						"5c0e746986f7741453628fe5",
						"5fd4c60f875c30179f5d04c2",
						"603648ff5a45383c122086ac",
						"6040dd4ddcf9592f401632d2"
					);
					
					// add visor to kiver
					DatabaseServer.tables.bots.types[botType].inventory.mods["5645bc214bdc2d363b8b4571"] = {
						"mod_equipment": [
							"5b46238386f7741a693bcf9c"
						]
					};
					
					// add visor to ZSh-1-2M
					DatabaseServer.tables.bots.types[botType].inventory.mods["5aa7e454e5b5b0214e506fa2"] = {
						"mod_equipment": [
							"5aa7e3abe5b5b000171d064d"
						]
					};
					
					// add visor to ZSh-1-2M cover
					DatabaseServer.tables.bots.types[botType].inventory.mods["5aa7e4a4e5b5b000137b76f2"] = {
						"mod_equipment": [
							"5aa7e3abe5b5b000171d064d"
						]
					};
					
					// adjust gear chances
					DatabaseServer.tables.bots.types[botType].chances.equipment.Headwear = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.ArmorVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.TacticalVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.mods.mod_equipment = 50;
				};
				
				// gluhkar
				if (botType === "bossgluhar") {
					//change chest and stomach HP cuz model has armor vest on it
					DatabaseServer.tables.bots.types[botType].health.BodyParts.Chest = 	 {"min": 220, "max": 220};
					DatabaseServer.tables.bots.types[botType].health.BodyParts.Stomach = {"min": 140, "max": 140};
				};
				
				// shturman
				if (botType === "bosskojaniy") {
					// rigs
					DatabaseServer.tables.bots.types[botType].inventory.equipment.TacticalVest.push(
						"5ca20abf86f77418567a43f2",
						"5f5f41f56760b4138443b352",
						"5c0e746986f7741453628fe5",
						"5e4ac41886f77406a511c9a8"
					);
					
					// adjust gear chances
					DatabaseServer.tables.bots.types[botType].chances.equipment.TacticalVest = 100;
					
					//change chest and stomach HP cuz model has armor vest on it
					DatabaseServer.tables.bots.types[botType].health.BodyParts.Chest = 	 {"min": 180, "max": 180};
					DatabaseServer.tables.bots.types[botType].health.BodyParts.Stomach = {"min": 150, "max": 150};
				};
				
				// sanitar
				if (botType === "bosssanitar") {
					// headwear
					DatabaseServer.tables.bots.types[botType].inventory.equipment.Headwear.push(
						"5a7c4850e899ef00150be885",
						"5aa7cfc0e5b5b00015693143",
						"5aa7e276e5b5b000171d0647",
						"5b40e1525acfc4771e1c6611",
						"5b40e2bc5acfc40016388216",
						"5aa7e454e5b5b0214e506fa2",
						"5aa7e4a4e5b5b000137b76f2",
						"5c091a4e0db834001d5addc8",
						"5f60c74e3b85f6263c145586"
					);
					
					// armor vests
					DatabaseServer.tables.bots.types[botType].inventory.equipment.ArmorVest.push(
						"5fd4c474dd870108a754b241"
					);
					
					// rigs
					DatabaseServer.tables.bots.types[botType].inventory.equipment.TacticalVest.push(
						"5e4ac41886f77406a511c9a8",
						"5c0e746986f7741453628fe5",
						"5fd4c60f875c30179f5d04c2",
						"603648ff5a45383c122086ac",
						"6040dd4ddcf9592f401632d2",
						"5ca20abf86f77418567a43f2"
					);
					
					// add visor to ZSh-1-2M
					DatabaseServer.tables.bots.types[botType].inventory.mods["5aa7e454e5b5b0214e506fa2"] = {
						"mod_equipment": [
							"5aa7e3abe5b5b000171d064d"
						]
					};
					
					// add visor to ZSh-1-2M cover
					DatabaseServer.tables.bots.types[botType].inventory.mods["5aa7e4a4e5b5b000137b76f2"] = {
						"mod_equipment": [
							"5aa7e3abe5b5b000171d064d"
						]
					};
					
					// adjust gear chances
					DatabaseServer.tables.bots.types[botType].chances.equipment.Headwear = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.ArmorVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.TacticalVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.mods.mod_equipment = 70;
				};
				
				// cultist priest
				if (botType === "sectantpriest") {
					// armor vests
					DatabaseServer.tables.bots.types[botType].inventory.equipment.ArmorVest.push(
						"5f5f41476bdad616ad46d631",
						"5e4abb5086f77406975c9342",
						"609e8540d5c319764c2bc2e9",
						"5fd4c474dd870108a754b241"
					);
					
					// rigs
					DatabaseServer.tables.bots.types[botType].inventory.equipment.TacticalVest.push(
						"5ca20abf86f77418567a43f2",
						"5f5f41f56760b4138443b352",
						"5648a69d4bdc2ded0b8b457b",
						"603648ff5a45383c122086ac",
						"5c0e9f2c86f77432297fe0a3",
						"5df8a42886f77412640e2e75"
					);
					
					// adjust gear chances
					DatabaseServer.tables.bots.types[botType].chances.equipment.ArmorVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.TacticalVest = 100;
				};
				
				// sanitar
				if (botType === "bosssanitar") {
					// headwear
					DatabaseServer.tables.bots.types[botType].inventory.equipment.Headwear.push(
						"5a7c4850e899ef00150be885",
						"5aa7cfc0e5b5b00015693143",
						"5aa7e276e5b5b000171d0647",
						"5b40e1525acfc4771e1c6611",
						"5b40e2bc5acfc40016388216",
						"5aa7e454e5b5b0214e506fa2",
						"5aa7e4a4e5b5b000137b76f2",
						"5c091a4e0db834001d5addc8",
						"5f60c74e3b85f6263c145586"
					);
					
					// armor vests
					DatabaseServer.tables.bots.types[botType].inventory.equipment.ArmorVest.push(
						"5fd4c474dd870108a754b241"
					);
					
					// rigs
					DatabaseServer.tables.bots.types[botType].inventory.equipment.TacticalVest.push(
						"5e4ac41886f77406a511c9a8",
						"5c0e746986f7741453628fe5",
						"5fd4c60f875c30179f5d04c2",
						"603648ff5a45383c122086ac",
						"6040dd4ddcf9592f401632d2",
						"5ca20abf86f77418567a43f2"
					);
					
					// add visor to ZSh-1-2M
					DatabaseServer.tables.bots.types[botType].inventory.mods["5aa7e454e5b5b0214e506fa2"] = {
						"mod_equipment": [
							"5aa7e3abe5b5b000171d064d"
						]
					};
					
					// add visor to ZSh-1-2M cover
					DatabaseServer.tables.bots.types[botType].inventory.mods["5aa7e4a4e5b5b000137b76f2"] = {
						"mod_equipment": [
							"5aa7e3abe5b5b000171d064d"
						]
					};
					
					// adjust gear chances
					DatabaseServer.tables.bots.types[botType].chances.equipment.Headwear = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.ArmorVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.equipment.TacticalVest = 100;
					DatabaseServer.tables.bots.types[botType].chances.mods.mod_equipment = 70;
				};
				
				// raiders
				if (botType === "pmcbot") {
					// adjust gear chances
					DatabaseServer.tables.bots.types[botType].chances.equipment.ArmorVest = 100;
				};
			}
		}
	}
}
	
module.exports = LessCheatyBots;