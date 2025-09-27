 var chartElement = document.createElement('div');
         //var chartElement = document.querySelector('#chart');                               
         var chart = LightweightCharts.createChart(chartElement, {
             width: 600,
             height: 300,
             layout: {
                 textColor: '#d1d4dc',
                 backgroundColor: '#191B1F',
             },
             rightPriceScale: {
                 scaleMargins: {
                     top: 0.3,
                     bottom: 0.25,
                 },
             },
             crosshair: {
                 vertLine: {
                     width: 5,
                     color: 'rgba(224, 227, 235, 0.1)',
                     style: 0,
                 },
                 horzLine: {
                     visible: false,
                     labelVisible: false,
                 },
             },
             grid: {
                 vertLines: {
                     color: 'rgba(42, 46, 57, 0)',
                 },
                 horzLines: {
                     color: 'rgba(42, 46, 57, 0)',
                 },
             },
         });
         
         // Make Chart Responsive with screen resize
         new ResizeObserver(entries => {
             if (entries.length === 0 || entries[0].target !== chartElement) {
                 return;
             }
             const newRect = entries[0].contentRect;
             chart.applyOptions({
                 height: newRect.height,
                 width: newRect.width
             });
         }).observe(chartElement);
         
         document.body.appendChild(chartElement);
         //document.body.appendChild(switcherElement);
         
         var areaSeries = chart.addAreaSeries({
             topColor: 'rgba(250,164,2, 0.56)',
             bottomColor: 'rgba(250,164,2, 0.04)',
             lineColor: 'rgba(250,164,2,1)',
             lineWidth: 2,
             crossHairMarkerVisible: false,
         });
         
         
         // Get data from moralis and create chart
         Moralis.initialize("ahaDdbVnLkKemcLyNPtSXksa5GKoH6QOXEbScgNm");
         Moralis.serverURL = "https://mystsg7jnkgf.usemoralis.com:2053/server";
         
         async function getData() {
             const moralisRawData = await Moralis.Cloud.run("TotalSupplyBNG")
             dataJSON = JSON.stringify(moralisRawData);
             var dataParse = JSON.parse(dataJSON);
             const cdata = dataParse.map(d => {
                 return {
                     time: (d.Timestamp),
                     value: (d.TotalSupplyBNG)
                 }
             });
             let sortedcdata = cdata.slice().sort((a, b) => a.time - b.time);
             areaSeries.setData(sortedcdata);
         }
         
         getData();
         
         document.body.style.position = 'relative';
         
         var legend = document.createElement('div');
         legend.classList.add('legend');
         document.body.appendChild(legend);
         
         var firstRow = document.createElement('div');
         firstRow.innerHTML = '<div style="font-size: 24px; margin: 4px 0px; color: #fff"> Total Supply </div>';
         firstRow.style.color = 'white';
         legend.appendChild(firstRow);
         
         function pad(n) {
             var s = ('0' + n);
             return s.substr(s.length - 2);
         }
         
         chart.subscribeCrosshairMove((param) => {
             if (param.time) {
                 dateStr = param.time.year + ' - ' + param.time.month + ' - ' + param.time.day;
                 const price = param.seriesPrices.get(areaSeries);
                 firstRow.innerHTML = '<div style="font-size: 24px; margin: 4px 0px; color: #fff"> Total Supply </div>' + '  ' + '<div style="font-size: 15px; margin: 4px 0px; color: #fff">' + price.toFixed(2) + ' BNG </div></div>';
             } else {
                 firstRow.innerHTML = '<div style="font-size: 24px; margin: 4px 0px; color: #fff"> Total Supply </div>' ;
             }
         });    