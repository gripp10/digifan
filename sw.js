// DigiFan service worker: shows a notification whenever a push arrives,
// even when the app is closed.
self.addEventListener('push', (event) => {
  let data = { title: 'DigiFan', body: 'Game update' };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title || 'DigiFan', {
      body: data.body || '',
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(clients.openWindow(url));
});
