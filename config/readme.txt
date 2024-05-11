MainSettings					AFFECTS ALL BOTS
OverwriteBots					OVERWRITES MAIN SETTINGS FOR SPECIFIC BOT

"DontAffect": true, 			SETTING THIS TO TRUE WILL FORCE BOT TO BE SKIPPED AND KEEP IT AS VANILLA (OR AS MODDED IF YOU HAVE OTHER MODS THAT CHANGE ANY OF THOSE PARAMETERS)
"RemoveCheatySkills": {
	"BotSound": false,			TRUE REMOVES BOTSOUND SKILL FROM BOTS, BOTSOUND = SILENT MOVEMENT (CULTISTS, GOONS)
	"BotReload": true,			TRUE REMOVES BOTRELOAD SKILL FROM BOTS, BOTRELOAD = INSTANT RELOAD (KILLA)
	"EternityStamina": true		TRUE SETS ETERNITYSTAMINA BOT PARAM TO FALSE, HAVEN'T REALLY TESTED THIS ONE, BUT THEORETICALLY IT SHOULD REMOVE INFINITE STAMINA FROM BOTS
},

"ChangeHealth": {
	"Enabled": false,			ENABLE/DISABLE HEALTH CHANGES, EVEN IF IT STILL HAS HEALTH VALUE OPTIONS BELOW
	"HealthValues": {			SELF EXPLANATORY
		"Head": 1000,
		"Thorax": 999,
		"Stomach": 69,
		"Arms": 96,
		"Legs": 2
	}
}



------------------
LISTED VALID NAMES TO MODIFY BOTS:

PMCS:
bear
usec
exusec (ROGUES)

SCAVS:
pmcbot (RAIDERS) [THIS ONE MIGHT NOT BEHAVE CORRECTLY FOR SOME REASON]
assault (NORMAL SCAVS)
marksman (SNIPERS)

GOONS:
bossknight
followerbigpipe
followerbirdeye

RESHALA:
bossbully
followerbully (BODYGUARDS)

SHTURMAN:
bosskojaniy
followerkojaniy (BODYGUARDS)

ZRYACHIY:
bosszryachiy
followerzryachiy (BACKUP FOLLOWERS)

SANITAR:
bosssanitar
followersanitar (BODYGUARDS)

GLUKHAR:
bossgluhar
followergluharassault
followergluharscout
followergluharsecurity
followergluharsnipe

KILLA:
bosskilla

KOLLONTAY:
bosskolontay
followerkolontayassault (ROAMERS)
followerkolontaysecurity (BODYGUARDS)

KABAN:
bossboar
followerboarclose1
followerboarclose2
followerboar
