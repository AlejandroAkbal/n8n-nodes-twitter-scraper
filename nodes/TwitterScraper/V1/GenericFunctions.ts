import type { INodeParameterResourceLocator } from 'n8n-workflow';

export function returnId(tweetId: INodeParameterResourceLocator) {
	if (tweetId.mode === 'id') {
		return tweetId.value as string;
	}

	//
	else if (tweetId.mode === 'url') {
		const value = tweetId.value as string;
		const tweetIdMatch = value.includes('lists')
			? value.match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/list(s)?\/(\d+)$/)
			: value.match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/);

		return tweetIdMatch?.[3] as string;
	}

	//
	else {
		throw new Error(`The mode ${tweetId.mode} is not valid!`);
	}
}
