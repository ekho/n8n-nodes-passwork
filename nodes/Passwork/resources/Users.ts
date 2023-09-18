import { INodeProperties } from 'n8n-workflow';
import { extractData } from './utils';

export const userResources = [{ name: 'User', value: 'user' }];

export const userFields: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		placeholder: '0',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['notifications'],
			},
		},
		default: '',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		placeholder: '0',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['notifications'],
			},
		},
		default: 50,
	},
];

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: { show: { resource: ['user'] } },
		options: [
			{
				name: 'Info',
				value: 'info',
				description: 'Get user info',
				action: 'Get user info',
				routing: {
					request: {
						method: 'GET',
						url: '/user/info',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
			{
				name: 'New Notifications Count',
				value: 'notifications-count-new',
				description: 'User: Get new notifications count',
				action: 'User get new notifications count',
				routing: {
					request: {
						method: 'GET',
						url: '/user/notifications/count-new',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
			{
				name: 'Notifications',
				value: 'notifications',
				description: 'User: Get notifications',
				action: 'User get notifications',
				routing: {
					request: {
						method: 'GET',
						url: '/user/notifications',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
			{
				name: 'Logout',
				value: 'logout',
				description: 'Logout user',
				action: 'Logout user',
				routing: {
					request: {
						method: 'POST',
						url: '/auth/logout',
					},
					output: {
						postReceive: [extractData],
					},
				},
			},
		],
		default: 'info',
		noDataExpression: true,
	},
];
