export const exportSubscriptionsToCsv = (subscriptions) => {
    const title = 'Name,Category,Price,Billing';

    const rows = subscriptions.map((sub) => {
        const billing = sub.billingInterval === 0 ? 'monthly' : 'yearly';

        return `${sub.name},${sub.categoryName},${sub.price},${billing}`;
    });

    const csvText = [title, ...rows].join('\n');

    console.log(csvText);
};