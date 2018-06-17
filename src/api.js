// http://lite.ip2location.com/ip-address-ranges-by-country
const locations = {
  usa: [
    "2.17.151.255", "2.20.68.0", "2.16.152.0", "4.16.48.32", "4.15.77.135"
  ],
  turkey: [
    "5.11.255.255", "62.248.127.255", "85.96.0.0", "92.45.26.23", "176.240.255.255",
  ],
  uk: [
    "2.223.255.255", "31.64.0.0", "37.60.64.0", "46.227.200.0", "212.44.0.0",
  ],
  germany: [
    "2.247.255.255", "24.134.0.0", "62.44.32.0", "62.111.0.0", "62.176.224.0"
  ],
  china:[
    "27.227.255.255", "58.155.255.255", "103.67.100.0", "116.236.184.151", "125.95.255.255"
  ],
}


const getNewIP = (location) => {
  const address = locations[location]

  if (address === undefined) {
    return "8.8.8.8"
  }

  const index = Math.floor(Math.random() * address.length)

  return address[index]
}

export default getNewIP;