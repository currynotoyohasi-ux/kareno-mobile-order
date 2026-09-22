self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || "カレーノとよはし";
  const options = {
    body: data.body || "新しい注文が入りました",
    icon: data.icon || "./icon-192.png",
    badge: data.badge || "./icon-192.png",
    data: {
      url: data.url || "./admin.html"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
