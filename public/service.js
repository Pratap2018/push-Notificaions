// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);

  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

self.addEventListener("activate", async () => {
  // This will be called only once when the service worker is activated.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BBqi8weEpFemzMvUc1XsrpEDqp4wrU1CWOt1XnZMSyQnzJHlZgjqJelwGDeR1kj9Sei62jdiQ0LTj_jaVJJETHo"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    self.registration.pushManager.subscribe(options)
    .then((subs) => {
      console.log(JSON.stringify(subs));
      
    })
    .catch((err)=>{console.log(err)})
  } catch (err) {
    console.log("Error", err);
  }
});
self.addEventListener('notificationclick',e=>{
    console.log(e);
    console.log(e.notification);
})
self.addEventListener('notificationclose',e=>{
    console.log(e);
})
self.addEventListener("push", function(event) {
    if (event.data) {
      console.log("Push event!! ", event.data.text());
      console.log(event);
      showLocalNotification("HyperFyre", event.data.text(),  self.registration);
    } else {
      console.log("Push event but no data");
    }
  });
  const showLocalNotification = (title, body, swRegistration) => {
    const options = {
      body,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      "image":"https://miro.medium.com/max/1400/0*xHUheL2XW9FGe9Y5.png",
      "icon":'https://avatars.githubusercontent.com/u/68963187?s=200&v=4',
      "actions":[{action: 'like', title: 'Like'},  
      {action: 'reply', title: 'Reply'}],
      data:{
wow:'such amaze notification data'
      }
      // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
    
    
  };


