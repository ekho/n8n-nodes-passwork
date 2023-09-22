# n8n-nodes-passwork

This is an n8n community node. It lets you use self-hosted _Passwork_ in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)  <!-- delete if no auth needed -->
[Compatibility](#compatibility)
[Usage](#usage)  <!-- delete if not using this section -->
[Resources](#resources)
[Version history](#version-history)  <!-- delete if not using this section -->

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Auth

- [x] Login _(silent during credentials initialization)_
- [x] Logout _(Do not forget to call this method in the end of workflow)_

### Vaults
- [ ] Add Vault
- [ ] Get vault
- [ ] Edit vault
- [ ] Delete vault
- [ ] Get colors
- [ ] Get folders
- [ ] Get full info
- [ ] Get passwords
- [ ] Get vault sharing info for vault admin
- [ ] Get tags
- [ ] Get all colors
- [ ] Get vaults count
- [ ] Get domain
- [ ] Get vaults
- [ ] Get all tags

### Passwords
- [ ] Add
- [x] Get
- [ ] Edit
- [ ] Delete
- [ ] Add attachment
- [x] Get attachment
- [ ] Delete attachment
- [ ] Copy
- [ ] Favorite
- [ ] Move
- [ ] Get password sharing info
- [ ] Unfavorite
- [ ] Get favorite
- [ ] Generate share link
- [ ] Get recent
- [ ] Search
- [ ] Search by url

### Folders
- [ ] Add
- [x] Get folder
- [ ] Edit
- [ ] Delete
- [ ] Get children
- [ ] Copy
- [ ] Move
- [x] Get passwords
- [x] Search

### Info
- [ ] Get activity report
- [ ] Get settings

### User
- [x] Info
- [x] Get notifications
- [x] Get new notifications count
- [ ] Mark notifications as viewed

### Sharing
- [ ] Get Inbox
- [ ] Inbox count
- [ ] Inbox list
- [ ] Inbox notifications count
- [ ] Inbox notifications mark as viewed

## Credentials

You have to get API key in your account of Passwork: https://your-passwork-domain/#!/api/

## Compatibility

The minimum n8n version is 1.4

## Usage

TBD

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* _Link to app/service documentation._

## Version history

* 0.1.0 - alpha. Not usable
* 0.1.1 - aplha. Minor fixes
* 0.2.0 - beta. Some methods to work with folders
* 0.3.0 - beta. Added methods Password Get and Password Get Attachment

