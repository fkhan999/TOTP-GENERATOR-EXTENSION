// TOTP class definition
TOTP = function () {
  var dec2hex = function (s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  };

  var hex2dec = function (s) {
    return parseInt(s, 16);
  };

  var leftpad = function (s, l, p) {
    if (l + 1 >= s.length) {
      s = Array(l + 1 - s.length).join(p) + s;
    }
    return s;
  };

  var base32tohex = function (base32) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    var hex = "";
    for (var i = 0; i < base32.length; i++) {
      var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += leftpad(val.toString(2), 5, '0');
    }
    for (var i = 0; i + 4 <= bits.length; i += 4) {
      var chunk = bits.substr(i, 4);
      hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
  };

  this.getOTP = function (secret) {
    try {
      var epoch = Math.round(new Date().getTime() / 1000.0);
      var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
      var hmacObj = new jsSHA(time, "HEX");
      var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
      var offset = hex2dec(hmac.substring(hmac.length - 1));
      var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
      otp = otp.substr(otp.length - 6, 6);
    } catch (error) {
      throw error;
    }
    return otp;
  };
};




function displayArray() {
  const arrayContentDiv = document.getElementById("arrayContent");
  arrayContentDiv.innerHTML = "";

  // Create a table element
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  // Create table headers
  const headerRow = document.createElement("tr");
  const keyHeader = document.createElement("th");
  keyHeader.textContent = "Key";
  keyHeader.style.border = "1px solid #ccc";
  keyHeader.style.padding = "8px";
  const totpHeader = document.createElement("th");
  totpHeader.textContent = "TOTP Code";
  totpHeader.style.border = "1px solid #ccc";
  totpHeader.style.padding = "8px";
  const actionHeader = document.createElement("th");
  actionHeader.textContent = "Action";
  actionHeader.style.border = "1px solid #ccc";
  actionHeader.style.padding = "8px";

  headerRow.appendChild(keyHeader);
  headerRow.appendChild(totpHeader);
  headerRow.appendChild(actionHeader);
  table.appendChild(headerRow);

  // Populate table rows with keys and TOTP codes
  Object.keys(keys).forEach((item) => {
    // Create TOTP instance and generate TOTP code
    var totpObj = new TOTP();
    var totpCode = totpObj.getOTP(keys[item]); // Replace with unique secret if needed

    // Create a table row for each item
    const row = document.createElement("tr");

    // Create a cell for the key name
    const keyCell = document.createElement("td");
    keyCell.textContent = item;
    keyCell.style.border = "1px solid #ccc";
    keyCell.style.padding = "8px";
    row.appendChild(keyCell);

    // Create a cell for the TOTP code
    const totpCell = document.createElement("td");
    totpCell.textContent = totpCode;
    totpCell.style.border = "1px solid #ccc";
    totpCell.style.padding = "8px";
    row.appendChild(totpCell);

    // Create a cell for the copy button
    const actionCell = document.createElement("td");
    actionCell.style.border = "1px solid #ccc";
    actionCell.style.padding = "8px";
    actionCell.style.textAlign = "center";

    // Create a copy button with icon
    const copyButton = document.createElement("button");
    const icon = document.createElement("img");
    icon.src = "https://cdn-icons-png.flaticon.com/128/54/54702.png"; // Icon URL
    icon.alt = "Copy";
    icon.style.width = "20px";
    icon.style.height = "20px";
    icon.style.verticalAlign = "middle";
    copyButton.appendChild(icon);
    copyButton.addEventListener("click", () => copyToClipboard(totpCode, icon));
    actionCell.appendChild(copyButton);
    
    row.appendChild(actionCell);

    // Add the row to the table
    table.appendChild(row);
  });

  // Add the table to the main container
  arrayContentDiv.appendChild(table);
}


function startTimer() {
  const timerDiv = document.getElementById("timer");
  const epoch = Math.round(new Date().getTime() / 1000.0);
  let timeLeft = 30 - (epoch % 30); // Calculate remaining time until next refresh
  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // timeLeft = 30; // Reset timer
      displayArray(); // Refresh TOTP codes
      startTimer(); // Restart timer
    } else {
      timerDiv.textContent = `Time until next refresh: ${timeLeft} seconds`;
      timeLeft--;
    }
  }, 1000);
}

// Copy to clipboard function
// function copyToClipboard1(text,icon) {
//   navigator.clipboard.writeText(text).then(() => {
//     // alert(`Copied TOTP: ${text}`);
//   }).catch((error) => {
//     console.error("Copy failed", error);
//   });
// }
function copyToClipboard(text, icon) {
  navigator.clipboard.writeText(text).then(() => {
    // Change the icon source to indicate success
    icon.src = "https://cdn-icons-png.flaticon.com/128/190/190411.png"; // Change to a success icon (like a checkmark)

    // Reset the icon source after 2 seconds
    setTimeout(() => {
      icon.src = "https://cdn-icons-png.flaticon.com/128/54/54702.png"; // Reset to original icon
    }, 2000);
  }).catch((error) => {
    console.error("Copy failed", error);
  });
}

// Load displayArray and startTimer on page load
document.addEventListener("DOMContentLoaded", () => {
  displayArray();
  startTimer();
});
