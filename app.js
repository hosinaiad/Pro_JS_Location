// GEO Location in JS:
// navigator.geolocation    يستخدم للتحقق ان كان متصفح وجهاز المستخدم يدعم خاصية تحديد المواقع
// navigator.geolocation.getCurrentPosition()
// يستخدم لطلب صلاحية وصول الى موقع من المستخدم وللحصول على معلومات متعلقة بالموقع المستخدم
// ......................................................................
// navigator.geolocation.watchPosition()
// يستخدم للحصول على موقع المستخدم ويتم تحديث الموقع باستمرار
// ..............................................................................
// navigator.geolocation.clearWatch(id);
// يستخدم لايقاف تتبع مستخدم \\ ايقاف عرض موقع مستخدم بشكل مباشر
// ...................................................................
// انواع الاخطاء التي يمكن ان تحدث عند محاولة الحصول على العنوان
// ………………………………………………………………………………………....
// switch (error.code) {
//     case error.PERMISSION_DENIED:
//         error = "User denied the request for Geolocation"
//         break;
//     case error.PERMISSION_UNAVAILABLE:
//         error = "Location information is unavailable."
//         break;
//     case error.TIMEOUT:
//         error = "The request to get user location timed out."
//         break;
//     case error.UNKNOWN_ERROR:
//         error = "An unknown error occurred."
//         break;
// }


// ....................................... Project .......................
if (localStorage.getItem("longitude") != null && localStorage.getItem("latitude") != null) {
    document.getElementById("map").innerHTML = `
    <iframe height="400" width="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=${localStorage.getItem("longitude")},${localStorage.getItem("latitude")}&;/layers=mapnik"></iframe>`

    localStorage.setItem("longitude", position.coords.longitude)
    localStorage.setItem("latitude", position.coords.latitude)
}



var isLive = false;
var shareLocation;
var accessLocation;
document.getElementById("getLocation").onclick = () => {

    if (isLive === false) {

        shareLocation = navigator.geolocation.watchPosition(
            // Create Two function First One important to get data, and the Second is optional it's for get error when it happened.

            function(position) {
                accessLocation = true;

                document.getElementById("alert").innerHTML = `
            <div class="alert alert-success" role="alert">
  Now your location shows within a map directly!
</div>
`

                document.getElementById("getLocation").innerHTML = "Stop share"
                isLive = true



                document.getElementById("map").innerHTML = `
            <iframe height="400" width="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;/layers=mapnik"></iframe>`
                localStorage.setItem("longitude", position.coords.longitude)
                localStorage.setItem("latitude", position.coords.latitude)
            },
            function(error) {
                switch (error.code) {
                    // Verify from following variable value.
                    case error.PERMISSION_DENIED:
                        // If verify with following value we want run following CMD.
                        document.getElementById("alert").innerHTML = `<div class="alert alert-warning" role="alert mt-3 mb-4">A simple warning alert—check it out!</div>You denied to get location, please try again later`
                        break;
                        // When verify switch case going out.
                    case error.UNKNOWN_ERROR:
                        document.getElementById("alert").innerHTML = `<div class="alert alert-warning" role="alert mt-3 mb-4">A simple warning alert—check it out!</div> Error unknown happened`
                        break;

                }
            }

        )

        // .......

    } else if (isLive === true && accessLocation === true) {
        // console.log("Stop running define location.") We don't need this line now.

        document.getElementById("alert").innerHTML = ` <div class = "alert alert-success"
            role = "alert" >
                Shortly before, has been Stopped my location share successfully!
                </div>
            `
        navigator.geolocation.clearWatch(shareLocation);
        document.getElementById("getLocation").innerHTML = "Show my location"
        isLive = false
    }

}


// ............................................................




// <
// iframe height = "400"
// width = "100%"
// src = "https://www.openstreetmap.org/export/embed.html?bbox=${localStorage.getItem("
// longitude ")},${localStorage.getItem("
// latitude ")}&;/layers=mapnik" > < /iframe>`

// console.log("Running define location.")  We don't need this line now, we add it for test.
//         document.getElementById("alert").innerHTML = `
//         <div class="alert alert-success" role="alert">
// Now your location shows within a map directly!
// </div>
// `
// document.getElementById("getLocation").innerHTML = "Stop share"
// isLive = true
// ........ true
// ........