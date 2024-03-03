# n8n-nodes-twitter-scraper

This is a n8n community node. It lets you use Twitter in your n8n workflows.

This node uses the [Rishikant181/Rettiwt-API](https://github.com/Rishikant181/Rettiwt-API) package to interact with
Twitter without using the Twitter API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Version history](#version-history)
[Development](#development)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community
nodes documentation.

## Operations

Create, retweet, and like tweets.

## Credentials

Follow the [Rishikant181/Rettiwt-API authentication](https://github.com/Rishikant181/Rettiwt-API#authentication) section
to set up the credentials.

## Compatibility

Tested on n8n v1.29.1

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Rishikant181/Rettiwt-API](https://github.com/Rishikant181/Rettiwt-API)

## Version history

- V1, initial version

## Development

### Initial setup

```bash

# Node
npm i

npm link

# n8n
npm install -g n8n

cd ~/.n8n

mkdir -p custom
cd custom

npm link n8n-nodes-twitter-scraper
```

Then to develop

```bash
 rm -rf dist && npm run build && n8n start
```


