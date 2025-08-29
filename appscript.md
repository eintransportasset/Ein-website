// Google Apps Script: Code.gs
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const targetTab = data.targetTab || "FormSubmissions";
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(targetTab);

    if (!sheet) {
      return ContentService.createTextOutput("Tab not found: " + targetTab);
    }

    // Packers and Movers
    if (targetTab === "PackersAndMoversRequests") {
      sheet.appendRow([
        new Date(),
        data.fromLat,
        data.fromLng,
        data.fromAddress,
        data.fromDistrict || '',
        data.toLat,
        data.toLng,
        data.toAddress,
        data.toDistrict || '',
        data.dateTime,
        data.description,
        data.fullName,
        data.phoneNumber,
        data.email || '',
        data.shiftingThings
      ]);
    }
    // Goods Transport
    else if (targetTab === "goodsTransportRequests") {
      sheet.appendRow([
        new Date(),
        data.fromLat,
        data.fromLng,
        data.fromAddress,
        data.fromDistrict || '',
        data.toLat,
        data.toLng,
        data.toAddress,
        data.toDistrict || '',
        data.dateTime,
        data.description,
        data.fullName,
        data.phoneNumber,
        data.email || '',
        data.materials,
        data.weight,
        data.vehicleRequired
      ]);
    }
    // Fallback
    else {
      sheet.appendRow([new Date(), JSON.stringify(data)]);
    }

    return ContentService
      .createTextOutput("Success")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput("Error: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}