var jqxhr = $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxihb3PShSvoIJCSRnfP93GfVawzE43lhq76KLWETFEAlQnDEFm_dbw/exec',
    method: "GET",
    dataType: "json"
  })
  .then(function(doRef) {
    var data = doRef["data"];
    var items = data.split("&&&&***&&&&");
    for(var i = 0; i < items.length; i++) {
      items[i] = items[i].split("&&&**&&&");
    }
    //console.log(items);

    for (var i = 0; i < items.length; i++) {
      //var codeID = "code" + (i+1).toString();
      //var pointsID = "points" + (i+1).toString();
      var tbody = document.getElementById("tbody");
      var row = document.createElement("tr");
      var cell1 = document.createElement("th");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");
      var cell5 = document.createElement("td");
      var cell1Text = document.createTextNode(items[i][0]);
      var cell2Img = document.createElement("img");
      cell2Img.src = items[i][1];
      var cell3Text = document.createTextNode(items[i][2]);
      var cell4Text = document.createTextNode(items[i][3]);
      var cell5Link = document.createElement("a");
      var cell5Text = document.createTextNode("Link");
      cell5Link.appendChild(cell5Text);
      cell5Link.href = items[i][4];
      cell1.appendChild(cell1Text);
      cell2.appendChild(cell2Img);
      cell3.appendChild(cell3Text);
      cell4.appendChild(cell4Text);
      cell5.appendChild(cell5Link);
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      tbody.appendChild(row);
      //document.getElementById(codeID).innerHTML = CAs[i][0];
      //document.getElementById(pointsID).innerHTML = CAs[i][1];
    }

    document.getElementById("loading").style.display = "none";
    document.getElementById("main").style.display = "block";
  });
