import { INodeProperties } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow/dist/Interfaces';

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
				operation: ['get'],
			},
		},
		default: '',
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
						url: '={{"/folders/" + $parameter.folderId}}',
					},
					output: {
						postReceive: [
							async function (this, items, responseData) {
								const folderId = this.getNodeParameter('folderId') as string;
								const fullResult = this.getNodeParameter('fullResult') as boolean;
								this.logger.info(
									`GET /folders/${folderId}: ${JSON.stringify({
										fullResult,
										items,
										responseDataBody: responseData.body,
									})}`,
								);

								if (!fullResult) {
									items = items.map((item) => {
										item.json = item.json.data as IDataObject;
										return item;
									});
								}

								return items;
							},
						],
					},
				},
			},
		],
		default: 'get',
		noDataExpression: true,
	},
];
