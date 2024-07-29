import { readFileSync } from 'fs';
import { join } from 'path';
import { cosineSimilarity } from '../utils/math.js';

export class EmbedInfoProcessor {
    constructor(filePath, totalItems, chunkSize, embeddingModel) {
        this.filePath = filePath;
        this.totalItems = totalItems;
        this.chunkSize = chunkSize;
        this.embeddingModel = embeddingModel;
        this.embeddings = {};
    }

    readChunk(offset, limit) {
        const fileContent = readFileSync(this.filePath, 'utf8');
        const data = JSON.parse(fileContent);
        return data.slice(offset, offset + limit);
    }

    async augmentData(dataChunk) {
        const augmentedChunk = [];
        for (const item of dataChunk) {
            const embedding = await this.embeddingModel.embed(item.description + this.turnsToText(item.conversation));
            this.embeddings[item.description] = embedding;
            augmentedChunk.push({
                ...item,
                embedding: embedding
            });
        }
        return augmentedChunk;
    }

    turnsToText(turns) {
        return turns.map(turn => `${turn.role}: ${turn.content}`).join('\n');
    }

    async retrieveAndAugmentData() {
        let offset = 0;
        let allData = [];

        while (offset < this.totalItems) {
            const chunk = this.readChunk(offset, this.chunkSize);
            const augmentedChunk = await this.augmentData(chunk);
            allData = allData.concat(augmentedChunk);
            offset += this.chunkSize;
        }

        return allData;
    }

    async getRelevantInfo(query, topK = 5) {
        const queryEmbedding = await this.embeddingModel.embed(query);
        const similarities = Object.entries(this.embeddings).map(([description, embedding]) => ({
            description,
            similarity: cosineSimilarity(queryEmbedding, embedding)
        }));
        similarities.sort((a, b) => b.similarity - a.similarity);
        return similarities.slice(0, topK);
    }
}

// Usage in prompter.js
import { EmbedInfoProcessor } from './embedInfoProcessor.js';

class Prompter {
    constructor(agent, fp) {
        // ... existing constructor code ...
        this.embedInfoProcessor = null;
    }

    async initEmbedInfo() {
        console.log('Initializing embedInfo...');
        const ragInfoPath = join('src', 'agent', 'library', 'raginfo');
        const files = ['codingexamples1.json', 'codingexamples2.json'];
        
        this.embedInfoProcessor = new EmbedInfoProcessor(this.embedding_model);
    
        for (const file of files) {
            const filePath = join(ragInfoPath, file);
            await this.embedInfoProcessor.processFile(filePath);
        }
    
        console.log('embedInfo initialized.');
    }

    async promptCoding(messages) {
        let prompt = this.profile.coding;
        prompt = await this.replaceStrings(prompt, messages, this.coding_examples);
        
        if (this.useEmbedInfo && this.embedInfoProcessor) {
            const relevantInfo = await this.embedInfoProcessor.getRelevantInfo(messages[messages.length - 1].content);
            const embedInfoExamples = relevantInfo.map(info => `Description: ${info.description}\nSimilarity: ${info.similarity}`).join('\n\n');
            prompt += '\n\nAdditional relevant information:\n' + embedInfoExamples;
        }
        
        return await this.chat_model.sendRequest(messages, prompt);
    }
}



