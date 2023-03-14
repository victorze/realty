;(() => {
  const lat = -15.4973474
  const lng = -70.1353139
  const ZOOM = 15
  const map = L.map('map').setView([lat, lng], ZOOM)

  // using provider and geocoder
  const geocodeService = L.esri.Geocoding.geocodeService()

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // pin
  let marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(map)

  // detect pin movement
  marker.on('moveend', (e) => {
    marker = e.target
    const position = marker.getLatLng()
    map.panTo(new L.LatLng(position.lat, position.lng))

    // get street info
    geocodeService
      .reverse()
      .latlng(position, ZOOM)
      .run((err, result) => {
        if (err) return console.log(err)
        marker.bindPopup(result.address.LongLabel)

        document.querySelector('#street-info').textContent =
          result?.address?.Address ?? ''
        document.querySelector('#street').value = result.address?.Address ?? ''
        document.querySelector('#lat').value = result?.latlng?.lat ?? ''
        document.querySelector('#lng').value = result?.latlng?.lng ?? ''
      })
  })
})()
