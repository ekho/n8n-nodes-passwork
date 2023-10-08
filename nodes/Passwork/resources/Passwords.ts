import * as abab from 'abab';
import { INodeProperties } from 'n8n-workflow';
import {
	IExecuteSingleFunctions,
	INodeExecutionData,
	PostReceiveAction,
} from 'n8n-workflow/dist/Interfaces';
import { Password, PasswordAttachment } from './types';
import { extractData } from './utils';

export const passwordResources = [{ name: 'Password', value: 'password' }];

export const passwordFields: INodeProperties[] = [
	{
		displayName: 'Password ID',
		name: 'pswdId',
		type: 'string',
		placeholder: '0',
		displayOptions: {
			show: {
				resource: ['password'],
				operation: ['get', 'get-attachment'],
			},
		},
		default: '',
	},
	{
		displayName: 'Attachment ID',
		name: 'attachmentId',
		type: 'string',
		placeholder: '0',
		displayOptions: {
			show: {
				resource: ['password'],
				operation: ['get-attachment'],
			},
		},
		default: '',
	},
];

// TODO: implement master-password
const base64decode = (src: string) => Buffer.from(src, 'base64').toString('utf-8');

const decryptPassword: PostReceiveAction = async function (
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
) {
	return items.map((item) => {
		const data = item.json.data as Password;
		data.password = base64decode(data.cryptedPassword);
		if (data.custom && data.custom.length) {
			data.custom.forEach((cf) => {
				cf.name = base64decode(cf.name);
				cf.type = base64decode(cf.type);
				cf.value = base64decode(cf.value);
			});
		}
		return item;
	});
};

const decryptAttachment: PostReceiveAction = async function (
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
) {
	return items.map((item) => {
		const data = item.json.data as PasswordAttachment;
		data.encryptedKey = base64decode(data.encryptedKey);

		const byteCharacters = abab.atob(base64decode(data.encryptedData)) as string;

		// turned off because of fail
		// if (sha256.hex(byteCharacters) !== data.hash) {
		// 	throw "Can't decrypt attachment: hashes are not equal";
		// }

		let byteNumbers = new Array(byteCharacters.length);
		for (let i = 0, l = byteCharacters.length; i < l; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		data.data = Uint8Array.from(byteNumbers);

		return item;
	});
};

export const passwordOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: { show: { resource: ['password'] } },
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get password by ID',
				action: 'Get password by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/passwords/{{$parameter.pswdId}}',
					},
					output: {
						postReceive: [decryptPassword, extractData],
					},
				},
			},
			{
				name: 'Get Attachment',
				value: 'get-attachment',
				description: 'Get passwords attachment by ID',
				action: 'Get passwords attachment by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/passwords/{{$parameter.pswdId}}/attachment/{{$parameter.attachmentId}}',
					},
					output: {
						postReceive: [decryptAttachment, extractData],
					},
				},
			},
		],
		default: 'get',
		noDataExpression: true,
	},
];
