import { INodeProperties } from 'n8n-workflow';
import { extractData } from './utils';

export const folderResources = [{ name: 'Folder', value: 'folder' }];

export const folderFields: INodeProperties[] = [
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		placeholder: '0',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['get', 'passwords'],
			},
		},
		default: '',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['search'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Vault',
		name: 'vaultId',
		type: 'resourceLocator',
		description: 'Vault ID',
		modes: [
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				hint: 'Enter an ID',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^.+$',
							errorMessage: 'The ID is required',
						},
					},
				],
				placeholder: 'string', // How to use the ID in API call
				url: '=/vaults/{{$value}}',
			},
			{
				displayName: 'List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchVaults',
					searchable: true,
					searchFilterRequired: true,
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['search'],
			},
		},
		default: undefined,
	},
];

export const folderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: { show: { resource: ['folder'] } },
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get folder by ID',
				action: 'Get folder by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/folders/{{$parameter.folderId}}',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search folders by filter parameters',
				action: 'Search folders',
				routing: {
					request: {
						method: 'POST',
						url: '/folders/search',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
			{
				name: 'Passwords',
				value: 'passwords',
				description: 'Get list of passwords in folder',
				action: 'Get list of passwords',
				routing: {
					request: {
						method: 'GET',
						url: '=/folders/{{$parameter.folderId}}/passwords',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
		],
		default: 'get',
		noDataExpression: true,
	},
];
