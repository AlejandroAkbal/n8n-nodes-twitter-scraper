import { INodeTypeBaseDescription, IVersionedNodeType, VersionedNodeType } from 'n8n-workflow';

import { TwitterScraperV1 } from './V1/TwitterScraperV1.node';

export class TwitterScraper extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Twitter Scraper',
			name: 'twitterScraper',
			icon: 'file:twitter.svg',
			group: ['output'],
			subtitle: '={{$parameter["resource"] + ":" + $parameter["operation"]}}',
			description: 'Consume Twitter without their API',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new TwitterScraperV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
