mapFunctionNames(code) {
    const functionMap = [
// Utility 'skills.'
['logMessage', 'writeToConsole' | 'log'],

// Crafting and Smelting 'skills.'
['createItem', 'makeRecipe'|'craftRecipe', 'craftItem'],
['cookItem', 'smeltIron' | 'smeltItem'],
['emptyFurnace', 'cleanFurnace' | 'clearNearestFurnace'],

// Movement and Navigation 'skills.'
['moveTo', 'walkTo', 'goTo' | 'goToPosition'],
['approachPlayer', 'goToEntity' | 'goToPlayer'],
['followEntity', 'tailPlayer' | 'followPlayer'],
['retreat', 'backAway' | 'moveAway'],
['fleeEnemies'| 'avoidEnemies'],
['stay'],
['collectNearbyItems', 'gatherDroppedItems', 'pickupItems' | 'pickupNearbyItems'],

// Block Interaction 'skills.'
['gatherResource', 'mineBlock', 'collectWood' | 'collectBlock'],
['destroyBlockAt', 'removeBlockAt' | 'breakBlockAt'],
['setBlock', 'buildBlock' | 'placeBlock'],
['farmLand', 'prepareSoil' | 'tillAndSow'],

// World Interaction 'skills.'
['openDoor', 'toggleDoor' | 'useDoor'],
['sleep', 'findBed' | 'goToBed'],
['useNearestBlock', 'interactWithBlock' | 'activateNearestBlock'],

// Entity Interaction 'skills.'
['fightNearest', 'engageNearestEnemy' | 'attackNearest'],
['fightEntity', 'engageTarget' | 'attackEntity'],
['protectSelf', 'guardAgainstAttacks' | 'defendSelf'],
['handItemToPlayer', 'transferItemToPlayer' | 'giveToPlayer'],

// Inventory Management 'skills.'
['wieldItem', 'holdItem' | 'equip'],
['dropItem', 'throwAway' | 'discard'],
['consume', 'ingestFood' | 'eat']

// Combat and Equipment 'skills.'
['useStrongestWeapon', 'prepareForCombat' | 'equipHighestAttack'],

// Pathing and Positioning 'world.'
['locateEmptySpace', 'findClearArea' | 'getNearestFreeSpace'],
['getCurrentLocation', 'whereAmI' | 'getPosition'],
['isPathClear', 'canReachDestination' | 'isClearPath'],

// Block Finding 'world.'
['searchForBlocks', 'findMultipleBlocks' | 'getNearestBlocks'],
['locateClosestBlock', 'findSpecificBlock' | 'getNearestBlock'],
['identifyNearbyBlocks', 'getLocalBlockTypes' | 'getNearbyBlockTypes'],

// Entity Finding 'world.'
['detectNearbyEntities', 'scanForEntities' | 'getNearbyEntities'],
['locateSpecificEntity', 'findEntityMatching' | 'getNearestEntityWhere'],
['detectNearbyPlayers', 'scanForPlayers' | 'getNearbyPlayers'],
['getPlayerNamesAround', 'identifyNearbyPlayers' | 'getNearbyPlayerNames'],
['catalogNearbyEntities', 'identifyEntityTypes' | 'getNearbyEntityTypes'],

// Inventory Management 'world.'
['getInventoryContents', 'checkInventoryItems' | 'getInventoryStacks'],
['getInventory', 'checkInventory' | 'getInventoryCounts'],

// World Information 'world.'
['identifyBiome', 'getCurrentBiome' | 'getBiomeName'],
['checkLightLevel', 'isAreaDark' | 'shouldPlaceTorch']
    ];

    for (const mapping of functionMap) {
        const real = mapping[mapping.length - 1];
        const hallucination = mapping.slice(0, -1);
        for (const hypo of hallucination) {
            code = code.replace(new RegExp(`skills\\.${hypo}\\(`, 'g'), `skills.${real}(`);
        }
    }

    return code;
}



async stageCode(code) {
    code = this.sanitizeCode(code);
    code = this.mapFunctionNames(code);



    async load() {
        try {
            const data = await readFile('./bots/codingexamples.json', 'utf8');
            this.examples = JSON.parse(data).codingexamples;
            if (this.model !== null) {
                for (let example of this.examples) {
                    let turn_text = this.turnsToText(example);
                    this.embeddings[turn_text] = await this.model.embed(turn_text);
                }
            }
        } catch (error) {
            console.error('Error loading TEST codingexamples:', error);
        }



        mapFunctionNames(code) {
            const functionMap = [
        // Utility 'skills.'
        ['logMessage', 'writeToConsole' | 'log'],
        
        // Crafting and Smelting 'skills.'
        ['createItem', 'makeRecipe'|'craftRecipe', 'craftItem'],
        ['cookItem', 'smeltIron' | 'smeltItem'],
        ['emptyFurnace', 'cleanFurnace' | 'clearNearestFurnace'],
        
        // Movement and Navigation 'skills.'
        ['moveTo', 'walkTo', 'goTo' | 'goToPosition'],
        ['approachPlayer', 'goToEntity' | 'goToPlayer'],
        ['followEntity', 'tailPlayer' | 'followPlayer'],
        ['retreat', 'backAway' | 'moveAway'],
        ['fleeEnemies'| 'avoidEnemies'],
        ['stay'],
        ['collectNearbyItems', 'gatherDroppedItems', 'pickupItems' | 'pickupNearbyItems'],
        
        // Block Interaction 'skills.'
        ['gatherResource', 'mineBlock', 'collectWood' | 'collectBlock'],
        ['destroyBlockAt', 'removeBlockAt' | 'breakBlockAt'],
        ['setBlock', 'buildBlock' | 'placeBlock'],
        ['farmLand', 'prepareSoil' | 'tillAndSow'],
        
        // World Interaction 'skills.'
        ['openDoor', 'toggleDoor' | 'useDoor'],
        ['sleep', 'findBed' | 'goToBed'],
        ['useNearestBlock', 'interactWithBlock' | 'activateNearestBlock'],
        
        // Entity Interaction 'skills.'
        ['fightNearest', 'engageNearestEnemy' | 'attackNearest'],
        ['fightEntity', 'engageTarget' | 'attackEntity'],
        ['protectSelf', 'guardAgainstAttacks' | 'defendSelf'],
        ['handItemToPlayer', 'transferItemToPlayer' | 'giveToPlayer'],
        
        // Inventory Management 'skills.'
        ['wieldItem', 'holdItem' | 'equip'],
        ['dropItem', 'throwAway' | 'discard'],
        ['consume', 'ingestFood' | 'eat']
        
        // Combat and Equipment 'skills.'
        ['useStrongestWeapon', 'prepareForCombat' | 'equipHighestAttack'],
        
        // Pathing and Positioning 'world.'
        ['locateEmptySpace', 'findClearArea' | 'getNearestFreeSpace'],
        ['getCurrentLocation', 'whereAmI' | 'getPosition'],
        ['isPathClear', 'canReachDestination' | 'isClearPath'],
        
        // Block Finding 'world.'
        ['searchForBlocks', 'findMultipleBlocks' | 'getNearestBlocks'],
        ['locateClosestBlock', 'findSpecificBlock' | 'getNearestBlock'],
        ['identifyNearbyBlocks', 'getLocalBlockTypes' | 'getNearbyBlockTypes'],
        
        // Entity Finding 'world.'
        ['!nearbyEntities', 'detectNearbyEntities', 'scanForEntities' | 'getNearbyEntities'],
        ['locateSpecificEntity', 'findEntityMatching' | 'getNearestEntityWhere'],
        ['detectNearbyPlayers', 'scanForPlayers' | 'getNearbyPlayers'],
        ['getPlayerNamesAround', 'identifyNearbyPlayers' | 'getNearbyPlayerNames'],
        ['catalogNearbyEntities', 'identifyEntityTypes' | 'getNearbyEntityTypes'],
        
        // Inventory Management 'world.'
        ['getInventoryContents', 'checkInventoryItems' | 'getInventoryStacks'],
        ['getInventory', 'checkInventory' | 'getInventoryCounts'],
        
        // World Information 'world.'
        ['identifyBiome', 'getCurrentBiome' | 'getBiomeName'],
        ['checkLightLevel', 'isAreaDark' | 'shouldPlaceTorch']
            ];
        
            for (const mapping of functionMap) {
                const real = mapping[mapping.length - 1];
                const hallucination = mapping.slice(0, -1);
                for (const hypo of hallucination) {
                    code = code.replace(new RegExp(`skills\\.${hypo}\\(`, 'g'), `skills.${real}(`);
                }
            }
        
            return code;
        }