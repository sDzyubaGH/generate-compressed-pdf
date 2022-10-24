async function loadFile() {
  const URL = 'http://127.0.0.1:8000/'
  const A4WIDTHMM = 210
  const MMININCH = 2.54 * 10

  const dpi_x = document.getElementById('inch').offsetWidth
  const mmInPx = MMININCH / dpi_x

  const compressor = new window.Compress();

  const files = document.getElementById('upload').files
  // console.log(files)
  const results = await compressor.compress([...files], {
    size: 4,
    quality: .5,
    rotate: false,
  });
  const output = results[0];
  const file = Compress.convertBase64ToFile(output.data, output.ext);
  console.log(output);

  var doc = new jsPDF(unit = 'mm');

  const imgWidthMM = output.initialWidthInPx * mmInPx
  const imgHeightMM = output.initialHeightInPx * mmInPx

  const imgIncrease = ((A4WIDTHMM - imgWidthMM) / imgWidthMM) * 100

  doc.addImage(imageData = output.data, 0, 0, imgWidthMM * ((imgIncrease / 100) + 1), imgHeightMM * ((imgIncrease / 100) + 1));
  // doc.save('ImgToPDF.pdf')

  const blob = doc.output('blob');

  const formData = new FormData();
  formData.append('pdf', blob);


  fetch(URL, {
    method: 'POST',
    // body: {
    //   formData,
    //   filename: output.alt
    // },
    body: formData,
    mode: 'no-cors',
  })
}