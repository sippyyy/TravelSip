export const conversation = {
  roomId: 12324,
  participant: [
    {
      id: 1,
      username: 'user1',
    },
    {
      id: 2,
      username: 'user2',
    },
  ],
  message: [
    {
      id: 1,
      user: {
        id: 1,
        imageUrl:
          'https://nypost.com/wp-content/uploads/sites/2/2023/08/NYPICHPDPICT000025178257.jpg?w=960',
      },
      message: 'Hello, good morning!',
    },
    {
      id: 2,
      user: {
        id: 2,
        imageUrl:
          'https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg',
      },
      message: 'Please waiting for our assistant to reply!',
    },
    {
      id: 3,
      user: {
        id: 2,
        imageUrl:
          'https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg',
      },
      message: 'Can I help you?',
    },
    {
      id: 3,
      user: {
        id: 1,
        imageUrl:
          'https://nypost.com/wp-content/uploads/sites/2/2023/08/NYPICHPDPICT000025178257.jpg?w=960',
      },
      message: 'Something wrong with my voucher',
    },
  ],
};
