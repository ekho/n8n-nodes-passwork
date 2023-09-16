import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import {
	folderFields,
	folderOperations,
	folderResources,
	userFields,
	userOperations,
	userResources,
} from './resources';

export class Passwork implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Passwork',
		name: 'passwork',
		icon: 'file:passwork.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Passwork API',
		defaults: {
			name: 'Passwork',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'passworkApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.endpoint.replace(new RegExp("/+$"), "")}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [...userResources, ...folderResources],
				default: '',
				noDataExpression: true,
				required: true,
				description: 'Passwork resources',
			},
			...userOperations,
			...userFields,
			...folderOperations,
			...folderFields,
			{
				displayName: 'Full Result',
				name: 'fullResult',
				type: 'boolean',
				placeholder: '',
				default: false,
			},
		],
	};

	// The execute method will go here
}
