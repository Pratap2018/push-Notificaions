if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service.js")
    .then(function (reg) {
      reg.pushManager.getSubscription().then(function (sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push

          console.log("Not subscribed to push service!");
        } else {
          // We have a subscription, update the database
          console.log("Subscription object: ", sub);
        }
      });
    })
    .catch(function (err) {
      console.log("Service Worker registration failed: ", err);
    });
}
async function subscribeUser() {
  try {
    const brave = await navigator.brave.isBrave();
    if (brave) {
      alert(
        "Brave browser Detected User Google Service to Enable Push brave://settings/privacy"
      );
    }
  } catch (error) {
      console.log("Not Brave");
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            "BBqi8weEpFemzMvUc1XsrpEDqp4wrU1CWOt1XnZMSyQnzJHlZgjqJelwGDeR1kj9Sei62jdiQ0LTj_jaVJJETHo",
        })
        .then(function (sub) {
          console.log(sub);
        })
        .catch(function (e) {
          if (Notification.permission === "denied") {
            console.warn("Permission for notifications was denied");
          } else {
            console.error("Unable to subscribe to push", e);
          }
        });
    });
  }
}
