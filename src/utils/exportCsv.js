export const exportSubscriptionsToCsv = (subscriptions) => {
    const title = 'Name,Category,Price,Billing';

    const rows = subscriptions.map((sub) => {
        const billing = sub.billingInterval === 0 ? 'monthly' : 'yearly';

        return `${sub.name},${sub.categoryName},${sub.price},${billing}`;
    });

    const csvText = [title, ...rows].join('\n');

    const blob = new Blob(['\uFEFF' + csvText], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'subscriptions.csv';
    link.click();

    URL.revokeObjectURL(url);
};