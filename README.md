# IMPORTANT FOR LATER:

Let’s imagine that we want to modify our system in a way that it can track multiple Books in a single Order.
Then, our Order JSON data might have looked like this:

{
"id": "efdd09b1-46b3-4f52-8df3-35675a5c889a",
"book_ids": ["1", "2"],
"user_id": "5c1c37f6-3ee0-4c07-9c8f-5864f74e627d",
"order_date": "2023-07-28T12:00:00Z",
"delivery_date": "2023-08-05T00:00:00Z",
"payment_method": "Credit Card",
"comment": "Please gift wrap the book."
}

## HOW CAN WE SOLVE THIS PROBLEM?

To overcome this little "problem", we could just modify our seed script in this way:

for (const order of orders) {
await prisma.order.upsert({
where: { id: order.id },
update: {},
create: {
...order,
books: {
connect: order.book_ids.map((book) => ({ id: book.id }))
}
}
})
}
