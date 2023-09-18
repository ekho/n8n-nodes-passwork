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

	if (!fullResult) {
		items = items.map((item) => {
			item.json = item.json.data as IDataObject;
			return item;
		});
	}

	return items;
};
