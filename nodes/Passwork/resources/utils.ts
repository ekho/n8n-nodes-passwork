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
	const rawResult = this.getNodeParameter('rawResult') as boolean;

	console.log({ rawResult });

	if (rawResult) {
		return items;
	}

	const innerItems: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		const itemsData =
			items[i].json.data instanceof Array
				? (items[i].json.data as IDataObject[])
				: [items[i].json.data as IDataObject];

		innerItems.push(...itemsData.map((json) => ({ json, pairedItem: { item: i } })));
	}

	return innerItems;
};
