import {
	IDataObject,
	IExecuteSingleFunctions,
	INodeExecutionData,
	PostReceiveAction,
} from 'n8n-workflow/dist/Interfaces';

export const extractData: PostReceiveAction = async function (
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
) {
	const fullResult = this.getNodeParameter('fullResult') as boolean;

	if (fullResult) {
		return items;
	}

	const innerItems: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		const item = items[i];

		if (item.json.data instanceof Array) {
			innerItems.push(
				...(item.json.data as IDataObject[]).map((json) => ({ json, pairedItem: { item: i } })),
			);
		} else {
			innerItems.push(item);
		}
	}

	return innerItems;
};
